<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition"

  import QRCode from "./QRCode.svelte"

  const { title, content, visible, onVisible, onInvisible, image, qrCodeUrl, qrCodeCallToAction}: {
    title: string, 
    content: string,
    visible: boolean,
    image: string | undefined,
    qrCodeUrl: string | undefined,
    qrCodeCallToAction: string | undefined,
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
            id="image"
            src={image}
            alt="Slide image"
          />
        </div>
      {/if}
      <div id="contentcontainer" style={image !== undefined ? "padding-left: 20px;" : ""}>
        <h1>{title}</h1>

        {@html content}

        {#if qrCodeUrl !== undefined}
        <div id="qrcode">
          <QRCode
            callToAction={qrCodeCallToAction}
            url={qrCodeUrl}
          />
        </div>
        {/if}
      </div>
    </div>
 {/if}
</div>

<style>
  .slide {
    font-size: 125%;
    height: 100%;
  }

  #slide {
    height: 100%;
  }

  h1 {
    margin-top: 0px;
  }

  #imagecontainer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slideWithImage {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  #image {
    max-width: 500px;
  }

  #contentcontainer {
    position: relative;
    height: 100%;
  }

  #qrcode {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    padding: 0.5rem;
  }

</style>