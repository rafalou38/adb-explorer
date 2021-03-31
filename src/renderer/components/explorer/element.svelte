<script lang="ts">
  // import Ripple from "@smui/ripple";
  // import { fly } from "svelte/transition";
  const { ipcRenderer } = require("electron");

  export let data: IFile;
  export let onClick: (data: IFile) => void;
  let image: string;
  const max_name_lenght = 10;

  $: {
    if (data.type === "file") {
      ipcRenderer.invoke("get-icon", data.file_name).then((v) => {
        image = v;
      });
    }
  }
  // console.log(name, mimeTypes.lookup(name));
</script>

<div class="wrapper" title={data.file_name} on:click={() => onClick(data)}>
  {#if data.type === "file"}
    <img class="iconify wrapper__icon" src={image} alt="uwu" />
  {:else if data.type === "directory"}
    <span
      class="iconify wrapper__icon"
      data-icon="flat-color-icons:folder"
      data-inline="false"
    />
  {:else if data.type === "link"}
    <span
      class="iconify wrapper__icon"
      data-icon="flat-color-icons:link"
      data-inline="false"
    />
  {/if}
  <p class="wrapper__text">
    {data.file_name.length < max_name_lenght
      ? data.file_name
      : data.file_name.slice(0, max_name_lenght) + " ..."}
  </p>
</div>

<style lang="scss">
  .wrapper {
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-content: center;

    position: relative;
    padding-top: 80px;
  }
  .wrapper__icon {
    aspect-ratio: 1/1;

    height: 80px;
    width: auto;

    margin-bottom: 3px;

    position: absolute;
    top: 0;
  }
  .wrapper__text {
    margin: 0;
    // width: 55px;
    color: #7c7c7c;
    overflow-wrap: break-word;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 12px;

    text-align: center;

    color: #7c7c7c;
  }
</style>
