<!-- TODO show less items if not enough place -->
<script lang="ts">
  import Ripple from "@smui/ripple";

  export let path: string;
  export let onChange: (newPath: string) => void;
  let typing = false;

  function gotoPath(index: number) {
    let asaray = path.split("/").filter((e) => e);
    asaray.splice(index + 1, asaray.length - index);
    path = "/" + asaray.join("/");
    onChange(path);
  }
  function startTyping(e: MouseEvent) {
    if (e.target.classList.contains("nav")) {
      console.log("start typing");
      typing = true;
    }
  }
  function stopTyping(e: MouseEvent) {
    if (!e.target.classList.contains("nav") && typing) {
      console.log("stopped typing");
      typing = false;
      onChange(path);
    }
  }
  function init(e: HTMLInputElement) {
    e.focus();
  }
</script>

<svelte:body on:click={stopTyping} />

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

<style lang="scss">
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
