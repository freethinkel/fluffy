<script lang="ts">
  import { Icon } from "@/components/icon";
  import { Tab } from "@/components/tab";
  import * as tabsStore from "@/stores/tabs";
  import { listen } from "@tauri-apps/api/event";
  import { getCurrent } from "@tauri-apps/api/webviewWindow";

  const tabs = tabsStore.tabs$;
  const currentTab = tabsStore.currentTab$;
  let isFullscreen = false;

  listen("on_exit_fullscreen", () => {
    isFullscreen = false;
  });
  listen("on_enter_fullscreen", () => {
    isFullscreen = true;
  });
</script>

<div class="header" data-tauri-drag-region class:fullscreened={isFullscreen}>
  <div class="tabs">
    {#each $tabs as tab}
      <Tab
        title={tab.title}
        active={$currentTab.id === tab.id}
        disabled={$tabs.length <= 1}
        on:close={() => tabsStore.closeTab(tab)}
        on:click={() => tabsStore.selectTab(tab)}
      />
    {/each}
  </div>
  <button class="add-tab" on:click={() => tabsStore.createNewTab()}>
    <Icon size={18} name="plus" />
  </button>
</div>

<style lang="postcss">
  .header {
    padding: 4px;
    padding-left: 76px;
    display: flex;
    gap: 4px;

    &.fullscreened {
      padding-left: 4px;
    }
  }

  .tabs {
    flex: 1;
    min-width: 0;
    display: flex;
    gap: 4px;

    & > :global(*) {
      flex: 1;
      min-width: 0;
    }
  }

  .add-tab {
    width: 32px;
    padding: 0;
    border: none;
    background: none;
    border-radius: var(--border-radius);
    &:hover {
      background: var(--color-selection-10);
    }

    & :global(.icon svg path) {
      color: var(--color-text);
    }
  }
</style>
