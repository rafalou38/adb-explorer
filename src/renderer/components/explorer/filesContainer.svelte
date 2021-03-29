<script lang="ts">
  import Element from "./element.svelte";
  export let files: IFile[] = [];
  export let onNavigate: (dirName: string) => void;

  $: files.sort(
    (a, e) =>
      (e.type === "directory" ? 1 : 0) - (a.type === "directory" ? 1 : 0)
  );

  function handleClick(data: IFile) {
    if (data.type == "directory") {
      onNavigate(data.file_name);
    }
  }
</script>

<div class="wrapper">
  <div class="gap">
    {#each files as file (file.file_name)}
      <Element data={file} onClick={handleClick} />
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
