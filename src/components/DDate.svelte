<script lang="ts">
  import { DateTime } from "luxon"
  import DDate from "../lib/ddate/ddate";
  import { onMount } from "svelte";

  let ddate = $state(new DDate(DateTime.now()))
  let interval: any

  onMount(() => {
    interval = setInterval(() => {
      ddate = new DDate(DateTime.now())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })
</script>

<div>{ddate.toString()}</div>