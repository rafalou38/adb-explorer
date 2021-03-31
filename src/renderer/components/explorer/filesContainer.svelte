<script lang="ts">
  import { files } from "../../stores";

  import Element from "./element.svelte";
  export let onOpen: (data: IFile) => void;
</script>

<div class="wrapper">
  <div class="gap">
    {#each $files as file (file.file_name)}
      <Element data={file} onClick={onOpen} />
    {/each}
  </div>
</div>

<style>
  .wrapper {
    flex-grow: 1;
    background-color: #f5f5f5;
    overflow-y: scroll;
  }
  .gap {
    margin-bottom: 100px;
    align-content: flex-start;

    padding: 30px;
    gap: 10px;

    border-radius: 10px;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(70px, auto));
  }
</style>
