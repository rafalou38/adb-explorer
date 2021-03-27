<script lang="ts">
  import Navbar from "./components/explorer/navbar.svelte";
  let path = "/sdcard/Download/Received/bluetooth/files";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main>
  <Navbar {path} />
</main>

<style>
</style>
