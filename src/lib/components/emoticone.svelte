<script lang="ts">
  import { Emotes } from "$lib/webrtc/types/emotes";
  import { createEventDispatcher } from "svelte";

  export let emote: Emotes;
  let positionX = "0px";
  let positionY = -80;
  let opacity = 1;
  export let parentContainer: any;
  const dispatch = createEventDispatcher();

  const conteneurWidth = parentContainer.offsetWidth;
  const hauteurFenetre = window.innerHeight;
  positionX = Math.floor(Math.random() * (conteneurWidth - 80)) + "px";

  const interval = setInterval(() => {
    opacity -= 0.01;
    positionY += 2;
    if (positionY >= hauteurFenetre) {
      clearInterval(interval);
    }
  }, 7);
</script>

<div style="left: {positionX}; bottom: {positionY}px; opacity: {opacity};">
  {#if emote === Emotes.HAPPY}
    😀
  {/if}
  {#if emote === Emotes.LAUGH}
    😂
  {/if}
  {#if emote === Emotes.CRY}
    😢
  {/if}
  {#if emote === Emotes.LOVE}
    😍
  {/if}
</div>

<style>
  div {
    position: absolute;
    bottom: 0;
    transition: opacity 2s;
    z-index: -50;
    font-size: 80px;
  }
</style>
