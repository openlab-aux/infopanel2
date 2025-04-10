<script lang="ts">
  import { onMount } from "svelte";
  import QRCode from "qrcode";

  const {
    callToAction,
    url,
  }: {
    callToAction: string;
    url: string;
  } = $props()

  onMount(async () => {
    QRCode.toCanvas(
      url,
      (res, canvas: HTMLElement) => {
        const qrCodeContainer = document.getElementById("canvasContainer");
        if(!qrCodeContainer) {
          console.error("canvas not found")
          return
        }
        
        while(qrCodeContainer.firstChild) {
          qrCodeContainer.firstChild.remove()
        }
        
        qrCodeContainer.appendChild(canvas)
        
        canvas.style = "width: 100%; height: 100%;"
      }
    )
  })
</script>

<div>{callToAction}</div>
<div id="canvasContainer"></div>

<style>
#canvasContainer {
  width: 300px;
}
</style>