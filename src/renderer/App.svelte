<script lang="ts">
  import Navbar from "./components/explorer/navbar.svelte";
  import FilesContainer from "./components/explorer/filesContainer.svelte";
  import Preview from "./components/explorer/preview.svelte";

  const { ipcRenderer } = require("electron");
  import { cd } from "./Path";
  import { path_history } from "./stores";
  const join = require("path");

  async function handleOpen(data: IFile) {
    switch (data.type) {
      case "directory":
        cd(data.file_name);
        break;
      case "link":
        let link_data = await ipcRenderer.invoke("get-link-data", data.link_to);
        console.log("link points to:", data);

        if (link_data.type === "directory") {
          cd(data.file_name);
        }
        break;
      case "file":
        let file_data = await ipcRenderer.invoke(
          "get-file-data",
          join(path_history.value, data.file_name)
        );

      default:
        break;
    }
  }

  let handleKeyPress: svelte.JSX.KeyboardEventHandler<HTMLElement> = (
    event
  ) => {
    console.log(event);
  };
  let handleAuxclick: svelte.JSX.MouseEventHandler<HTMLElement> = (event) => {
    switch (event.button) {
      case 3: // mouse-btn back
        console.log("go to last directory");
        path_history.undo();
        break;
      case 4: // mouse-btn forwards
        console.log("back to previous directory");
        path_history.redo();
        break;
      default:
        break;
    }
  };
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<svelte:body on:auxclick={handleAuxclick} on:keypress={handleKeyPress} />

<div class="app">
  <Navbar />
  <div class="main">
    <FilesContainer onOpen={handleOpen} />
    <Preview />
  </div>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;

    height: 100%;

    padding: 20px;
    box-sizing: border-box;

    gap: 10px;
  }
  .main {
    display: flex;
    flex-grow: 1;
  }
</style>
