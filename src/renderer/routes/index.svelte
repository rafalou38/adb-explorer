<script lang="ts">
  import { ipcRenderer } from "electron";

  ipcRenderer.invoke("perform-action", { user: "rafael" });
</script>

<main>
  <h1>Hello worlds!</h1>
</main>
