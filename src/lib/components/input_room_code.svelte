<script lang="ts">
  import { room } from '$lib/webrtc/webrtc'
  import { PinInput, Toggle } from 'bits-ui'
  import { EyeSlashOutline, EyeOutline } from 'flowbite-svelte-icons'

  let values: string[] | undefined = ['', '', '', '']

  let roomId: string

  let unlocked = false
  let pinInputType: 'text' | 'password' = 'password'
  $: pinInputType = unlocked ? 'text' : 'password'

  $: roomId = values?.join('') ?? ''
</script>

<PinInput.Root
  bind:value={values}
  class="min-h-input flex h-full items-center gap-2 variant-filled py-1 px-1.5"
  type={pinInputType}
>
  <PinInput.Input class="w-5 text-center" />
  <PinInput.Input class="w-5 text-center" />
  <PinInput.Input class="w-5 text-center" />
  <PinInput.Input class="w-5 text-center" />
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
  <button class="btn" on:click={() => room.joinRoom(roomId)}>Join</button>
  <div class="w-[1px] h-[30px] bg-gray-500" />
  <button class="btn" on:click={room.hostRoom}>Host</button>
</PinInput.Root>
