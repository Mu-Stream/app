<script lang="ts">
  import { room_id } from "$lib/stores/room_id";
  import InputRoomCode from "$lib/components/input_room_code.svelte";
  import RoomCode from "$lib/components/room_code.svelte";
  import { Avatar, FileDropzone, ProgressBar } from "@skeletonlabs/skeleton";
  import {
    CaretLeftOutline,
    CaretRightOutline,
    PauseOutline,
  } from "flowbite-svelte-icons";
  import { room } from "$lib/webrtc/room";
  import { P2PPayloadType } from "$lib/webrtc/types/p2p";
  import { Emotes } from "$lib/webrtc/types/emotes";
  import Emoticone from "$lib/components/emoticone.svelte";
  import { EmotesWithId } from "$lib/webrtc/types/emotes_with_id";

  let files: FileList;
  let containerOfEmoticones;

  room.emoteChanged = emoteChanged;

  // FIXME: JUST FOR QUICK TESTING
  const playImediatly = async () => {
    room.playFile(files[0]);
  };

  function sendEmote(emote: Emotes) {
    room._sendEmoticonToParicipants({
      type: P2PPayloadType.EMOTE,
      emote: emote,
    });
  }

  function emoteChanged() {
    const app = new Emoticone({
      target: document.getElementById("detail")!,
      props: {
        parentContainer: containerOfEmoticones!,
        emote: room.emote,
      },
    });

    setTimeout(() => {
      app.$destroy();
    }, 10000);
  }

  let albums = [
    {
      title: "Random Access Memories",
      artist: "Daft Punk",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg",
    },
    {
      title: "Rumours",
      artist: "Fleetwood Mac",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/e/e3/Fleetwood_Mac_-_Rumours.jpg",
    },
    {
      title: "Dark Side of the Moon",
      artist: "Pink Floyd",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png",
    },
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/The_Weeknd_-_After_Hours.png/220px-The_Weeknd_-_After_Hours.png",
    },
    {
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      album: "Fine Line",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Fine_Line_cover.png/220px-Fine_Line_cover.png",
    },
    {
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png/220px-Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png",
    },
    {
      title: "Save Your Tears",
      artist: "The Weeknd",
      album: "After Hours",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/The_Weeknd_-_After_Hours.png/220px-The_Weeknd_-_After_Hours.png",
    },
    {
      title: "Peaches",
      artist: "Justin Bieber",
      album: "Justice",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/Justice_%28Justin_Bieber_Album%29.png/220px-Justice_%28Justin_Bieber_Album%29.png",
    },
    {
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Olivia_Rodrigo_-_Sour.png/220px-Olivia_Rodrigo_-_Sour.png",
    },
    {
      title: "Montero (Call Me By Your Name)",
      artist: "Lil Nas X",
      album: "Montero",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Lil_Nas_X_-_Montero.png/220px-Lil_Nas_X_-_Montero.png",
    },
    {
      title: "Kiss Me More",
      artist: "Doja Cat ft. SZA",
      album: "Planet Her",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Doja_Cat_-_Planet_Her.png/220px-Doja_Cat_-_Planet_Her.png",
    },
    {
      title: "Leave The Door Open",
      artist: "Silk Sonic",
      album: "An Evening with Silk Sonic",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Silk_Sonic_-_An_Evening_with_Silk_Sonic.png/220px-Silk_Sonic_-_An_Evening_with_Silk_Sonic.png",
    },
    {
      title: "Deja Vu",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Olivia_Rodrigo_-_Sour.png/220px-Olivia_Rodrigo_-_Sour.png",
    },
  ];

  $: files && playImediatly();
</script>

<div
  class="grid overflow-hidden h-screen w-screen grid-cols-[10fr_2fr] grid-rows-[11fr_1fr]"
>
  <div
    bind:this={containerOfEmoticones}
    id="detail"
    class="flex flex-col items-center justify-center py-12"
  >
    <div class="shadow-gray-800 shadow-2xl rounded-2xl overflow-hidden mx-12">
      <Avatar
        src="https://imgs.search.brave.com/YC9kvmP87RU4ql5Zmk-9zUGmiL37whN2jDyO85RTWSA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzc3Lzkz/LzNlLzc3OTMzZTQ4/ODhmZDQ0NDFmYjVl/Y2ZiMzhjYWUzZjY4/LmpwZw"
        width="max-w-xl"
        rounded="rounded-none"
      />
    </div>
    <div
      class="absolute top-0 left-0 flex flex-col p-2 bg-white rounded-full shadow-lg"
    >
      <button
        on:click={() => {
          sendEmote(Emotes.HAPPY);
        }}
        class="mb-2 text-2xl hover:bg-gray-200 rounded-full">😀</button
      >
      <button
        on:click={() => {
          sendEmote(Emotes.LAUGH);
        }}
        class="mb-2 text-2xl hover:bg-gray-200 rounded-full">😂</button
      >
      <button
        on:click={() => {
          sendEmote(Emotes.LOVE);
        }}
        class="mb-2 text-2xl hover:bg-gray-200 rounded-full">😍</button
      >
      <button
        on:click={() => {
          sendEmote(Emotes.CRY);
        }}
        class="text-2xl hover:bg-gray-200 rounded-full">😢</button
      >
    </div>
  </div>
  <div class="border border-gray-800 w-full overflow-y-hidden min-w-min">
    <div class="flex items-center w-full">
      {#if $room_id}
        <div class="flex flex-col">
          <RoomCode />
          <FileDropzone name="files" bind:files />
        </div>
      {/if}
      {#if !$room_id}
        <InputRoomCode />
      {/if}
    </div>
    <div class="flex flex-col h-full">
      <h2 class="text-center p-4">Playlist</h2>
      <div class="overflow-y-scroll">
        {#each albums as album}
          <div class="flex items-center">
            <header class="card-header">
              <Avatar src={album.imgUrl} rounded="rounded-2xl" />
            </header>
            <div>
              <section class="font-bold">{album.title}</section>
              <footer class="text-sm">{album.artist}</footer>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div class="col-span-3">
    <ProgressBar max={100} value={80} rounded="rounded-none" />
    <div class="flex items-center justify-center gap-8 h-full">
      <button class="btn-icon variant-ghost flex items-center justify-center">
        <CaretLeftOutline size="xl" />
      </button>
      <button class="btn-icon variant-ghost flex items-center justify-center">
        <PauseOutline size="xl" />
      </button>
      <button class="btn-icon variant-ghost flex items-center justify-center">
        <CaretRightOutline size="xl" />
      </button>
    </div>
  </div>
</div>
