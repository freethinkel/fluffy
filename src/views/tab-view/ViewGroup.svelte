<script lang="ts">
  import * as tabsStore from "@/stores/tabs";
  import { Pane, SplitView } from "@/components/split-view";
  import { TerminalView } from "@/components/terminal-view";
  import type { ITabView } from "@/types";

  export let view: ITabView;
  export let isRoot = false;
  export let tabId: string;
</script>

{#if isRoot}
  <svelte:self view={{ views: [view] }} {tabId} />
{/if}

{#if view.views && !isRoot}
  <SplitView
    axis={view.axis}
    on:resize={() => view.views?.forEach((view) => view.controller?.resize())}
  >
    {#each view.views as v}
      <svelte:self {tabId} view={v} />
    {/each}
  </SplitView>
{/if}

{#if view.controller && !view.views && !isRoot}
  <Pane>
    <TerminalView
      terminal={view.controller?.terminal}
      on:change_title={({ detail }) =>
        tabsStore.setTabTitle({
          tabId,
          title: detail,
        })}
    />
  </Pane>
{/if}
