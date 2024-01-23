<script lang="ts">
  import './app.css'
  import { AppShell } from '@skeletonlabs/skeleton'
  import Header from './components/Header.svelte'
  import Footer from './components/Footer.svelte'
  import SideBar from './components/SideBar.svelte'
  import Main from './components/Main.svelte'
  import { identity } from './store/identity'
  import { createIceCandidate } from './webrtc'
  import { MessageType, type SocketMessage } from './types.d.ts'
  const ws = new WebSocket(`ws://127.0.0.1:8080`)

  ws.onopen = (_) => {
    console.info(`ws connection established`)
  }

  ws.onerror = (err) => {
    console.error(`ws error ${err}`)
  }

  ws.onmessage = ({ data }) => {
    const payload: SocketMessage = JSON.parse(data)

    switch (payload.type) {
      case MessageType.INIT:
        identity.set(payload.uuid)
        console.info(`server sent init message, i'm ${$identity}`)
        break
      case MessageType.LOGIN:
        break
      case MessageType.CLOSE:
        break
    }
  }

  async function test() {
    // const candidate = await createIceCandidate()
    // console.warn(candidate)
  }
  test()
</script>

<AppShell>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>
  <!-- (sidebarLeft) -->
  <svelte:fragment slot="sidebarRight">
    <SideBar />
  </svelte:fragment>
  <!-- (pageHeader) -->
  <!-- Router Slot -->
  <Main />
  <!-- ---- / ---- -->
  <svelte:fragment slot="footer">
    <Footer />
  </svelte:fragment>
  <!-- (footer) -->
</AppShell>
