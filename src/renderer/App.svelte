<script lang="ts">
  import Navbar from "./components/explorer/navbar.svelte";
  import FilesContainer from "./components/explorer/filesContainer.svelte";
  const { ipcRenderer } = require("electron");

  let path = "/sdcard/";
  let files = [];
  function handlePathChange(newPath: string) {
    path = newPath;
    ipcRenderer.invoke("list-content", newPath).then((v) => {
      files = v;
    });
  }
  function handleNavigate(dir: string) {
    path = `${path}/${dir}/`;
    handlePathChange(path);
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main>
  <Navbar {path} onChange={handlePathChange} />
  <FilesContainer {files} onNavigate={handleNavigate} />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;

    height: 100%;

    padding: 20px;
    box-sizing: border-box;

    gap: 10px;
  }
</style>
