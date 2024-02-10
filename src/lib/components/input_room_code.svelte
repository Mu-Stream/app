<script lang="ts">
  import { room_id } from '$lib/stores/room_id'
  import { room } from '$lib/webrtc/room'
  import { PinInput, Toggle } from 'bits-ui'
  import { EyeSlashOutline, EyeOutline } from 'flowbite-svelte-icons'

  let values: string[] | undefined = ['', '', '', '']

  let roomId: string

  let unlocked = false
  let pinInputType: 'text' | 'password' = 'password'
  $: pinInputType = unlocked ? 'text' : 'password'

  $: roomId = values?.join('') ?? ''

  async function joinRoom() {
    const id = await room.join(roomId)
    room_id.set(room.id!)
  }

  async function hostRoom() {
    const id = await room.host()
    room_id.set(room.id!)
  }
</script>

<PinInput.Root
  bind:value={values}
  class="min-h-input flex h-full items-center gap-2 variant-filled py-1 px-1.5"
  type={pinInputType}
>
  <PinInput.Input class="w-5 text-center border border-gray-500 rounded-lg" />
  <PinInput.Input class="w-5 text-center border border-gray-500 rounded-lg" />
  <PinInput.Input class="w-5 text-center border border-gray-500 rounded-lg" />
  <PinInput.Input class="w-5 text-center border border-gray-500 rounded-lg" />
  <PinInput.HiddenInput />
  <Toggle.Root
    aria-label="toggle code visibility"
    class="transition-all active:scale-98"
    bind:pressed={unlocked}
  >
    {#if unlocked}
      <EyeOutline />
    {:else}
      <EyeSlashOutline />
    {/if}
  </Toggle.Root>
  <button class="btn" on:click={joinRoom}>Join</button>
  <div class="w-[1px] h-[30px] bg-gray-500" />
  <button class="btn" on:click={hostRoom}>Host</button>
</PinInput.Root>
