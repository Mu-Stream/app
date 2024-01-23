<script lang="ts">
  import { FileDropzone } from '@skeletonlabs/skeleton'
  let files: FileList

  function onChangeHandler(e: Event): void {
    console.log('file data:', e)
  }
</script>

<div class="w-full h-full bg-gray-600 flex items-center justify-center p-12">
  <FileDropzone name="files" bind:files on:change={onChangeHandler}>
    <svelte:fragment slot="lead">(icon)</svelte:fragment>
    <svelte:fragment slot="message">(message)</svelte:fragment>
    <svelte:fragment slot="meta">(meta)</svelte:fragment>
  </FileDropzone>
</div>
