<script lang="ts">
  import { TabView } from "@/views/tab-view";
  import * as themeStore from "@/stores/themes";
  import * as settingsStore from "@/stores/settings";
  import { transparentize } from "polished";

  const theme = themeStore.currentTheme$;
  const opacity = settingsStore.opacity$;

  $: background = transparentize(1 - $opacity, $theme.terminal.background);
</script>

<div class="wrapper" style:--color={background}>
  <TabView />
</div>

<style>
  .wrapper {
    height: 100%;
    background: var(--color);
  }
</style>
