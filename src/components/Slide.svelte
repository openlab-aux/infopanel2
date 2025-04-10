<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition"

  const { title, content, visible, onVisible, onInvisible, image}: {
    title: string, 
    content: string,
    visible: boolean,
    image: string | undefined,
    onVisible?: () => void,
    onInvisible?: () => void
  } = $props()

  onMount(() => {
    console.log(image)
    if(visible) {
      onVisible?.()
    }
  });
</script>

<div class="slide">
  {#if visible}
    <div
      id="slide"
      transition:fade={{ duration: 500,  }} 
      class={image !== undefined ? "slideWithImage" : ""}
      on:introend={onVisible}
      on:outroend={onInvisible}
    >
      {#if image !== undefined}
        <div id="imagecontainer">
          <img
            src={image}
            alt="Slide image"
          />
        </div>
      {/if}
      <div id="contentcontainer" style={image !== undefined ? "padding-left: 20px;" : ""}>
        <h1>{title}</h1>

        {@html content}
      </div>
    </div>
 {/if}
</div>

<style>
  .slide {
    font-size: 125%;
  }

  h1 {
    margin-top: 0px;
  }

  #imagecontainer {
    justify-content: center;
    align-items: center;
  }

  .slideWithImage {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
</style>