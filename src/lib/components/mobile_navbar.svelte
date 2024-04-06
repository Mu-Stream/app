<script lang="ts">
  import { Tab, TabGroup } from '@skeletonlabs/skeleton';
  import { navigation } from '$lib/stores/navigation';
  import { CogSolid, ListMusicSolid, PlaySolid, UsersGroupSolid } from 'flowbite-svelte-icons';
  const size = 'lg';
</script>

<TabGroup
  justify="justify-around"
  active="variant-filled-tertiary"
  hover="hover:variant-soft-tertiary"
  flex="flex-1 lg:flex-none"
  rounded=""
  border=""
  class="bg-tertiary-500 w-full"
>
  <Tab bind:group={$navigation} value={'PLAYER'} name="player" flex="items-center justify-center">
    <PlaySolid {size} />
  </Tab>
  <Tab bind:group={$navigation} value={'PLAYLIST'} name="playlist" flex="items-center justify-center">
    <ListMusicSolid {size} />
  </Tab>
  <Tab bind:group={$navigation} value={'PARTICIPANTS'} name="participants" flex="items-center justify-center">
    <UsersGroupSolid {size} />
  </Tab>
  <Tab bind:group={$navigation} value={'SETTINGS'} name="settings" flex="items-center justify-center">
    <CogSolid {size} />
  </Tab>
</TabGroup>
