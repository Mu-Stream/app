<script lang="ts">
  import clsx from 'clsx';

  export let emoji: string;
</script>

<span
  style={`left: ${Math.random() * window.innerWidth}px; bottom:  ${Math.random() * window.innerHeight}px; scale: ${Math.random() * 2 + 1};`}
  class={clsx('emoji-animation', 'absolute', 'text-xl')}>{emoji}</span
>

<style>
  .emoji-animation {
    animation: floatUp 5s forwards;
    position: absolute;
    opacity: 1;
  }

  @keyframes floatUp {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-100px);
      opacity: 0;
    }
  }
</style>
