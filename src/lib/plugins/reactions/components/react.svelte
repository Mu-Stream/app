<script lang="ts">
  import { App } from '$lib/app';
  import { outline_style } from '$lib/global_styles';
  import { ReactCommand } from '../commands/react';
  import clsx from 'clsx';

  function react() {
    App.instance.executeCommand(new ReactCommand('😁'));
  }
</script>

<button class={clsx('btn', 'variant-filled-tertiary', outline_style)} on:click={react}>
  <span>😁</span>
  <span class="hidden md:inline">réagir</span>
</button>
