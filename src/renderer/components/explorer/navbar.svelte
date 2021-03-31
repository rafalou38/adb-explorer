<!-- TODO show less items if not enough place -->
<script lang="ts">
  import Ripple from "@smui/ripple";
  import { setPath, upDir } from "../../Path";
  import { path_history } from "../../stores";

  let typing = false;
  let textInput: HTMLInputElement;

  function gotoPath(index: number) {
    let newPath = path_history.value;
    let asaray = newPath.split("/").filter((e) => e);
    asaray.splice(index + 1, asaray.length - index);
    newPath = "/" + asaray.join("/");
    setPath(newPath);
  }

  function startTyping(e: MouseEvent) {
    if (e.target.classList.contains("nav")) {
      typing = true;
    }
  }
  function stopTyping(e: MouseEvent) {
    if (!e.target.classList.contains("nav") && typing) {
      typing = false;
      setPath(textInput.value);
    }
  }
  function init(e: HTMLInputElement) {
    e.focus();
  }
</script>

<svelte:body on:click={stopTyping} />

<header>
  <div class="history">
    <button
      class="history__btn icon-btn"
      use:Ripple={{ ripple: true, color: "surface" }}
      on:click={() => path_history.undo()}
    >
      <span class="iconify" data-icon="mdi:arrow-left" data-inline="false" />
    </button>
    <button
      class="history__btn icon-btn"
      use:Ripple={{ ripple: true, color: "surface" }}
      on:click={() => path_history.redo()}
    >
      <span class="iconify" data-icon="mdi:arrow-right" data-inline="false" />
    </button>
  </div>
  <button
    class="up-button icon-btn"
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
        bind:this={textInput}
        use:init
      />
    {:else}
      {#each $path_history.split("/").filter((e) => e) as folder, i (i)}
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
  .icon-btn {
    background: #f6f6f6;
    height: 40px;
    width: 40px;
    border-radius: 25px;
    border: none;
    cursor: pointer;
  }
  .history {
    flex-shrink: 0;
    display: flex;
    margin-right: 10px;
    &__btn {
      &:nth-child(1) {
        border-radius: 25px 0 0 25px;
      }
      &:nth-child(2) {
        border-radius: 0 25px 25px 0;
      }
    }
  }
  .up-button {
    margin-right: 10px;
    flex-shrink: 0;
  }
  .nav {
    font-family: "Roboto";
    font-weight: 500;

    background: #f6f6f6;

    border-radius: 45px;
    padding-right: 50px;

    height: 40px;
    flex-grow: 1;
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
