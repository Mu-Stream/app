<script lang="ts">
  import clsx from 'clsx';
  import { onMount } from 'svelte';
  export let alt: string;
  export let src: string;
  export let thiccness: 'medium' | 'high' = 'high';
  export let id: string | undefined = undefined;

  let width: number;

  const MAX_WIDTH = 500;

  onMount(() => {
    width = Math.min(window.innerWidth, window.innerHeight, MAX_WIDTH);
    width = width - width * 0.1;
    const listener = () => {
      width = Math.min(window.innerWidth, window.innerHeight, MAX_WIDTH);
      width = width - width * 0.1;
    };
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  });
</script>

<div
  class={clsx(
    'overflow-hidden',
    'rounded-t-3xl',
    'rounded-bl-3xl',
    'rounded-br-sm',
    thiccness === 'high' && 'border-4',
    thiccness === 'high' && 'border-b-8',
    thiccness === 'medium' && 'border-2',
    thiccness === 'medium' && 'border-b-4',
    'border-black',
    'aspect-square'
  )}
  style="width: {width}px; height: {width}px;"
>
  <img
    {alt}
    {src}
    {id}
    class={clsx('object-cover', 'animate-[scale-reverse_10s_ease-in-out_infinite_alternate]', 'w-full', 'h-full')}
  />
</div>
