<script lang="ts">
  import './app.css'
  import { AppShell } from '@skeletonlabs/skeleton'
  import Header from './components/Header.svelte'
  import Footer from './components/Footer.svelte'
  import SideBar from './components/SideBar.svelte'
  import Main from './components/Main.svelte'
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
