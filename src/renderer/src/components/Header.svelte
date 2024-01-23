<script lang="ts">
  import { identity } from '../store/identity'
</script>

<div class="bg-primary-500">
  Mu Stream

  {#if $identity}
    <span>I'm {$identity}</span>
  {/if}
</div>
