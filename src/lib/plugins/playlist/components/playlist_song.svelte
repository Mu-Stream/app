<script lang="ts">
  import StyledCover from '$lib/components/styled_cover.svelte';
  import clsx from 'clsx';
  import { DotsVerticalOutline } from 'flowbite-svelte-icons';
  import type { Song } from '../notifier/playlist_manager';
  import { App } from '$lib/app';
  export let song: Song;

  const image = () => {
    if (song.img?.length === 0) return '';
    var blob = new Blob([new Uint8Array(song.img[0].data)], { type: song.img[0].format });
    return URL.createObjectURL(blob);
  };

  const user_list = App.instance.context.room.readable('USER_LIST');
  console.log($user_list);

  const name = song.identity === 'host' ? 'hôte' : $user_list.users.find(p => p.id === song.identity)?.username;
</script>

<div class="flex space-x-2 px-2 items-center my-2">
  <StyledCover alt={`cover-${song.title}`} src={image()} height="h-14" width="w-full max-w-16" thiccness="medium" />
  <div class={clsx('pr-8', 'w-full')}>
    <h5 class={clsx('font-bold')}>{song.title}</h5>
    <h4>{song.artist}</h4>
    <span>ajouté par {name}</span>
  </div>
  <DotsVerticalOutline size="xl" />
</div>
