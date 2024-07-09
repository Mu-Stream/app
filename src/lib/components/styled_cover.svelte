<script lang="ts">
  import clsx from 'clsx';
  export let alt: string;
  export let src: string;
  export let width: string;
  export let height: string;
  export let thiccness: 'medium' | 'high' = 'high';
  export let id: string | undefined = undefined;
</script>

<img
  {alt}
  {src}
  {id}
  class={clsx(
    'rounded-t-3xl',
    'rounded-bl-3xl',
    'rounded-br-sm',
    thiccness === 'high' && 'border-4',
    thiccness === 'high' && 'border-b-8',
    thiccness === 'medium' && 'border-2',
    thiccness === 'medium' && 'border-b-4',
    'border-black',
    'object-cover',
    'aspect-square',
    width,
    height
  )}
/>
