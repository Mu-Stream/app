<script lang="ts">
  import { getModalStore } from '@skeletonlabs/skeleton';
  import { PinInput, Toggle } from 'bits-ui';
  import clsx from 'clsx';
  import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
  import LL from "../../../i18n/i18n-svelte";

  const modal_store = getModalStore();

  let unlocked: boolean = false;
  let username: string = '';
  let values: string[] | undefined = ['', '', '', ''];
  let input_type: 'text' | 'password' = 'password';

  $: input_type = unlocked ? 'text' : 'password';

  function submit() {
    if ($modal_store[0].response)
      $modal_store[0].response({
        room_id: values!.join(''),
        username,
      });
    modal_store.close();
  }

  const input_style = clsx('w-12', 'h-12', 'text-center', 'border', 'rounded-lg', 'text-lg');
</script>

{#if $modal_store[0]}
  <form>
    <div class={clsx('card', 'p-12', 'space-y-4', 'rounded-3xl', 'min-w-96')}>
      <section class={clsx('flex', 'justify-center', 'align-center', 'flex-col', 'space-y-4')}>
        <div id="username-input">
          <label for="username" class={clsx('text-lg', 'mb-2')}> {$LL.joinRoomPopup.userName()} </label>
          <input type="text" class={clsx('input', 'w-full', 'h-12', 'px-4')} bind:value={username} />
        </div>
        <div class="flex flex-col items-center">
          <label for="code" class={clsx('text-lg', 'mb-2', 'self-start')}>{$LL.joinRoomPopup.roomCodeInput()}</label>
          <PinInput.Root
            id="code-input"
            bind:value={values}
            class={clsx('min-h-input', 'flex', 'h-full', 'items-center', 'gap-2', 'py-1', 'px-1.5')}
          >
            <PinInput.Input class={input_style} type={unlocked ? 'text' : 'password'} />
            <PinInput.Input class={input_style} type={unlocked ? 'text' : 'password'} />
            <PinInput.Input class={input_style} type={unlocked ? 'text' : 'password'} />
            <PinInput.Input class={input_style} type={unlocked ? 'text' : 'password'} />
            <Toggle.Root
              aria-label="Afficher/masquer le code de la salle"
              class={clsx('transition-all', 'active:scale-98')}
              bind:pressed={unlocked}
            >
              {#if unlocked}
                <EyeOutline />
              {:else}
                <EyeSlashOutline />
              {/if}
            </Toggle.Root>
          </PinInput.Root>
        </div>
      </section>
      <footer class="card-footer pt-4 flex justify-center">
        <button
          id="join-room-btn"
          class={clsx('btn', 'variant-filled-tertiary', 'border-b-4', 'border-b-black')}
          on:click={submit}
          disabled={values?.join('').length !== 4 || !username}
        >
          {$LL.joinRoomPopup.joinBtn()}
        </button>
      </footer>
    </div>
  </form>
{/if}
