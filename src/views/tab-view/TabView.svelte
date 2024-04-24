<script lang="ts">
  import * as tabsStore from "@/stores/tabs";
  import ViewGroup from "./ViewGroup.svelte";
  import Tabbar from "./Tabbar.svelte";
  import { listen } from "@tauri-apps/api/event";

  const tabs = tabsStore.tabs$;
  const currentTab = tabsStore.currentTab$;
</script>

<div class="wrapper">
  <Tabbar />

  <div class="view__wrapper">
    {#each $tabs as tab}
      <div class="view" class:view__active={tab.id === $currentTab.id}>
        <ViewGroup view={tab.view} isRoot tabId={tab.id} />
      </div>
    {/each}
  </div>
</div>

<style lang="postcss">
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .view__wrapper {
    flex: 1;
    min-height: 0;
    width: 100%;
    position: relative;
  }

  .view {
    position: absolute;
    top: 0;
    left: -9999em;
    width: 100%;
    height: 100%;
  }
  .view__active {
    left: 0;
  }
</style>
