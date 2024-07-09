<script lang="ts">
  import { App } from '$lib/app';
  import clsx from 'clsx';
  //@ts-ignore
  import ColorThief from 'colorthief';
  import { onMount } from 'svelte';

  const thief = new ColorThief();

  const SIZE = 5;
  const MOVING_BG_COUNT = 5;
  const DEFAULT_BG_COLORS = ['#BDB8E3', '#e2bbf2'];
  const COLOR_TO_PICK_COUNT = 5;
  const MOVE_DURATION_MS = 6000;

  let bg_colors: string[] = DEFAULT_BG_COLORS;

  function randomMovingBGSize() {
    return Array.from({ length: MOVING_BG_COUNT }, (_, __) => Math.floor(Math.max(Math.random() * 800, 400)));
  }

  function randomBGNewPos(width: number, height: number) {
    const slice = MOVING_BG_COUNT / 2;
    return Array.from({ length: MOVING_BG_COUNT }, (_, idx) =>
      idx < slice
        ? [Math.floor((Math.random() * width) / 2), Math.floor((Math.random() * height) / 2)]
        : [Math.floor(Math.random() * width), Math.floor(Math.random() * height)]
    );
  }

  function randomMoivingColors() {
    return Array.from({ length: MOVING_BG_COUNT }, (_, __) => bg_colors[Math.floor(Math.random() * bg_colors.length)]);
  }

  function randomStaticBGColors() {
    return Array.from({ length: SIZE }, (_, __) => {
      return Array.from({ length: SIZE }, (_, __) => bg_colors[Math.floor(Math.random() * bg_colors.length)]);
    });
  }

  const rgbToHex = (r: number, g: number, b: number) =>
    '#' +
    [r, g, b]
      .map(x => {
        return x.toString(16).padStart(2, '0');
      })
      .join('');

  let random_moving_bg_size = randomMovingBGSize();

  let moving_colors: string[] = randomMoivingColors();

  const current_meta = App.instance.context.audio_manager.readable('CURRENTLY_METADATA');

  let positions: string[][] = [];

  let moving_positions: number[][] = [];

  $: bg_colors && (positions = randomStaticBGColors());

  $: bg_colors && (moving_colors = randomMoivingColors());

  $: bg_colors && (random_moving_bg_size = randomMovingBGSize());

  let latest_meta: any | undefined = undefined;

  const unsub = current_meta.subscribe(async meta => {
    if (meta === latest_meta) return;

    setTimeout(async () => {
      if (meta.img.length !== 0) {
        const cover = document.getElementById('main-cover');
        if (cover) {
          const color = await thief.getPalette(cover, [COLOR_TO_PICK_COUNT]);
          bg_colors = color.map((c: number[]) => rgbToHex(c[0], c[1], c[2]));
        }
      } else {
        bg_colors = ['#BDB8E3', '#e2bbf2'];
      }
    }, 300);

    latest_meta = meta;
  });

  onMount(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    moving_positions = randomBGNewPos(width, height);

    const interval = setInterval(() => {
      moving_positions = randomBGNewPos(width, height);
    }, MOVE_DURATION_MS - 1000);

    return () => {
      if (unsub) {
        unsub();
      }
      clearInterval(interval);
    };
  });
</script>

<div class={clsx('fixed', 'top-0', 'left-0', 'w-screen', 'h-screen', 'z-[-1]')}>
  <div
    class={clsx('relative', 'w-screen', 'h-screen', 'grid', 'bg-black', 'z-0')}
    style="grid-template-columns: {'auto '.repeat(SIZE)};"
  >
    {#each positions as row, i}
      {#each row as color, j}
        <div
          id={`bg-${i}-${j}`}
          class={clsx('min-w-[30px]', 'relative', 'z-0', 'transition-colors', 'duration-500')}
          style="background-color: {color};"
        />
      {/each}
    {/each}
  </div>
  {#each moving_positions as [x, y], idx}
    <div
      id={`bg-moving-${idx}`}
      class={clsx('absolute', 'top-0', 'left-0', 'z-0', 'rounded-full')}
      style={`
	  background-color: ${moving_colors[idx]};
	  transform: translate(${x}px, ${y}px);
	  width: ${random_moving_bg_size[idx]}px;
	  height: ${random_moving_bg_size[idx]}px;
	  transition: transform ${MOVE_DURATION_MS}ms ease-in-out, background-color 300ms ease-in-out;
	  `}
    />
  {/each}
  <div class={clsx('backdrop-blur-[90px]', 'w-screen', 'h-screen', 'absolute', 'top-0', 'z-1', 'bg-[#0000004D]')} />
</div>
