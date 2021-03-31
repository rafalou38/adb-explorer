<script lang="ts">
  import Navbar from "./components/explorer/navbar.svelte";
  import FilesContainer from "./components/explorer/filesContainer.svelte";
  import { cleanPath } from "./utils";
  import { History } from "./History";
  const { ipcRenderer } = require("electron");

  let files = [];
  let path_history = new History("/sdcard/");

  function handlePathChange(newPath: string) {
    if (!newPath.endsWith("/")) {
      newPath += "/";
    }
    path_history.change(cleanPath(newPath));
  }

  path_history.subscribe(updateFilesList, () => {});
  function updateFilesList() {
    ipcRenderer.invoke("list-content", path_history.value).then((v) => {
      files = v;
    });
  }

  handlePathChange(path_history.value);
  async function handleOpen(data) {
    switch (data.type) {
      case "directory":
        path_history.change(
          cleanPath(`${path_history.value}/${data.file_name}/`)
        );
        handlePathChange(path_history.value);
        break;
      case "link":
        let link_data = await ipcRenderer.invoke("get-link-data", data.link_to);
        console.log("link points to:", data);

        if (link_data.type === "directory") {
          handlePathChange(data.file_name);
        }
        break;

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

<main>
  <Navbar path={$path_history} onChange={handlePathChange} />
  <FilesContainer {files} onOpen={handleOpen} />
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
