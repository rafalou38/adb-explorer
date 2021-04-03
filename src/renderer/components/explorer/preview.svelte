<script lang="ts">
  export let curentPreview: IPreview;
  let resizing = false;
  let current_width = 300;
  function resize(e: MouseEvent) {
    if (!resizing) return;
    current_width -= e.movementX;
    console.log(e);
  }
</script>

<svelte:body on:mousemove={resize} on:mouseup={() => (resizing = false)} />

{#if curentPreview.type !== ""}
  <div class="preview" style={`width: ${current_width}px`}>
    <div class="preview__dragger" on:mousedown={() => (resizing = true)} />
    <div class="preview__content">
      {#if curentPreview.type === "text"}
        <pre class="preview__body--raw-text">{curentPreview.body}</pre>
      {/if}
    </div>
  </div>
{/if}

<style>
  .preview {
    background: #f5f5f5;
    height: 100%;
    position: relative;
  }
  .preview__dragger {
    position: absolute;
    cursor: col-resize;
    width: 5px;
    height: 100%;
    margin-left: -2.5px;
  }
  .preview__content {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 10px;
    box-sizing: border-box;
  }
  .preview__content {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 10px;
    box-sizing: border-box;
  }
</style>
