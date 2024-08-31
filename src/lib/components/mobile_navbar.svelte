<script lang="ts">
  import { Tab, TabGroup } from '@skeletonlabs/skeleton';
  import { navigation } from '$lib/stores/navigation';
  import { CogSolid, ListMusicSolid, PlaySolid, UsersGroupSolid } from 'flowbite-svelte-icons';
  import clsx from 'clsx';
  const size = 'lg';
</script>

<div class="p-4">
  <TabGroup
    justify="justify-around"
    active="variant-filled-tertiary"
    hover="hover:variant-soft-tertiary"
    flex="flex-1 lg:flex-none"
    rounded=""
    border=""
    class="bg-transparent-tertiary w-full rounded-3xl p-2 shadow-lg"
  >
    <Tab
      bind:group={$navigation}
      value={'PLAYER'}
      name="player"
      flex={clsx(
        'items-center justify-center btn-icon btn-sm',
        $navigation === 'PLAYER' && 'border-b-4',
        'border-black'
      )}
    >
      <PlaySolid {size} />
    </Tab>
    <Tab
      bind:group={$navigation}
      value={'PLAYLIST'}
      name="playlist"
      flex={clsx(
        'items-center justify-center btn-icon btn-sm',
        $navigation === 'PLAYLIST' && 'border-b-4',
        'border-black'
      )}
    >
      <ListMusicSolid {size} />
    </Tab>
    <Tab
      bind:group={$navigation}
      value={'PARTICIPANTS'}
      name="participants"
      flex={clsx(
        'items-center justify-center btn-icon btn-sm',
        $navigation === 'PARTICIPANTS' && 'border-b-4',
        'border-black'
      )}
    >
      <UsersGroupSolid {size} />
    </Tab>
  </TabGroup>
</div>
