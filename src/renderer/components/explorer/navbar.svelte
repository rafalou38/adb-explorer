<!-- TODO show less items if not enough place -->
<script lang="ts">
  import Ripple from "@smui/ripple";

  const { dirname } = require("path");
  export let path: string;
  export let onChange: (newPath: string) => void;
  let typing = false;

  function gotoPath(index: number) {
    let asaray = path.split("/").filter((e) => e);
    asaray.splice(index + 1, asaray.length - index);
    path = "/" + asaray.join("/");
    onChange(path);
  }
  function upDir() {
    path = dirname(path);
    onChange(path);
  }
  function startTyping(e: MouseEvent) {
    if (e.target.classList.contains("nav")) {
      typing = true;
    }
  }
  function stopTyping(e: MouseEvent) {
    if (!e.target.classList.contains("nav") && typing) {
      typing = false;
      onChange(path);
    }
  }
  function init(e: HTMLInputElement) {
    e.focus();
  }
</script>

<svelte:body on:click={stopTyping} />

<header>
  <button
    class="up-button"
    use:Ripple={{ ripple: true, color: "surface" }}
    on:click={upDir}
  >
    <span class="iconify" data-icon="mdi:arrow-up" data-inline="false" />
  </button>
  <div class="nav" on:click={startTyping}>
    {#if typing}
      <input
        type="text"
        class="nav"
        id="input"
        spellcheck="false"
        bind:value={path}
        use:init
      />
    {:else}
      {#each path.split("/").filter((e) => e) as folder, i (i)}
        <span
          class="nav__item"
          use:Ripple={{ ripple: true, color: "surface" }}
          on:click={() => gotoPath(i)}>{folder}</span
        >
      {/each}
    {/if}
  </div>
</header>

<style lang="scss">
  header {
    display: flex;
  }
  .up-button {
    background: #f6f6f6;
    height: 40px;
    width: 40px;
    border-radius: 25px;
    flex-shrink: 0;
    margin-right: 10px;
    border: none;
    cursor: pointer;
  }
  .nav {
    font-family: "Roboto";
    font-weight: 500;

    background: #f6f6f6;

    border-radius: 45px;
    padding-right: 50px;

    height: 40px;
    width: 100%;
    flex-shrink: 0;

    display: flex;
    align-items: flex-start;

    overflow: hidden;

    cursor: text;
    border: none;

    box-sizing: border-box;
    &#input {
      padding-left: 20px;
      padding-right: -50px;
    }
    &:focus {
      outline: none;
    }
  }
  .nav__item {
    display: flex;

    height: 100%;
    padding: 0 10px;

    align-items: center;

    user-select: none;
    cursor: pointer;

    border-right: 1px solid #bcbcbc;

    &:nth-child(1) {
      padding: 0 10px 0 20px;
    }
  }
</style>
