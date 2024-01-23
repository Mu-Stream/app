<script lang="ts">
  import { FileDropzone } from '@skeletonlabs/skeleton'
  import { createRoom, joinRoom } from '../webrtc'

  let files: FileList
  let uuid: string

  function onChangeHandler(e: Event): void {
    console.log('file data:', e)
  }
</script>

<div class="w-full h-full bg-gray-600 items-center justify-center p-12 flex flex-col">
  <FileDropzone name="files" bind:files on:change={onChangeHandler}>
    <svelte:fragment slot="lead">(icon)</svelte:fragment>
    <svelte:fragment slot="message">(message)</svelte:fragment>
    <svelte:fragment slot="meta">(meta)</svelte:fragment>
  </FileDropzone>
  <input class="input" bind:value={uuid} />
  <button class="btn bg-primary-500" on:click={() => createRoom()}>server</button>
  <button class="btn bg-primary-500" on:click={() => joinRoom(uuid)}>room</button>
</div>
