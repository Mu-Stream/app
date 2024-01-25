<script lang="ts">
  import { FileDropzone } from '@skeletonlabs/skeleton'
  import { me, createMediaSource, createRoom, joinRoom } from '../webrtc'

  let files: FileList
  let roomId: string

  async function onChangeHandler(e: Event) {
    console.log('file data:', e)
    const { remote_stream, media_source } = await createMediaSource(files[0])
    console.log({ me })
    media_source.start()
    me.addStream(remote_stream.stream)
  }
</script>

<div class="w-full h-full bg-gray-600 items-center justify-center p-12 flex flex-col">
  <FileDropzone name="files" bind:files on:change={onChangeHandler}>
    <svelte:fragment slot="lead">(icon)</svelte:fragment>
    <svelte:fragment slot="message">(message)</svelte:fragment>
    <svelte:fragment slot="meta">(meta)</svelte:fragment>
  </FileDropzone>
  <input class="input" bind:value={roomId} />
  <button class="btn bg-primary-500" on:click={() => createRoom()}>server</button>
  <button class="btn bg-primary-500" on:click={() => joinRoom(roomId)}>room</button>
</div>
