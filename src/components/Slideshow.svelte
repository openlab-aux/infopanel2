<script lang="ts">
  import { type Slide } from "../types/slide";

  import { onMount } from "svelte";
  import SlideComponent from "./Slide.svelte";

  let slides: Slide[] = $state([])
  let currentSlide = $state(0)
  let visible = $state(true)

  async function reloadContent () {
    fetch("/slides.json").
      then((response) => {
        return response.json()
      }).
      then((data) => {
        slides = data as Slide[]
      })
  }

  onMount(reloadContent)
</script>


{#if slides.length == 0}
  loading content...
{:else}
  <SlideComponent
    visible={visible}
    content={slides[currentSlide].content}
    title={slides[currentSlide].title}
    image={slides[currentSlide].image}
    qrCodeUrl={slides[currentSlide].qrCodeUrl}
    qrCodeCallToAction={slides[currentSlide].qrCodeCallToAction}
    onVisible={() => {
      setTimeout(() => { visible = false}, slides[currentSlide].duration * 1000)
    }}
    onInvisible={async () => {
      currentSlide = (currentSlide + 1) % slides.length

      if(currentSlide == 0) {
        await reloadContent()
      }

      setTimeout(() => { visible = true }, 50)
    }}
  />
{/if}