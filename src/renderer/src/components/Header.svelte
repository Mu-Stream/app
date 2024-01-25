<script lang="ts">
  import { identity } from '../store/identity'
</script>

<div class="bg-primary-500">
  {#if $identity}
    <span>{$identity}</span>
  {/if}
</div>
