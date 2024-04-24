<script lang="ts">
  import { ThemeCard } from "@/components/theme-card";
  import * as themesStore from "@/stores/themes";

  const themes = themesStore.themes$;
  const currentTheme = themesStore.currentTheme$;
</script>

<div class="page">
  <div class="label">Themes</div>
  <div class="themes">
    {#each $themes as theme}
      <ThemeCard
        {theme}
        active={$currentTheme === theme}
        on:select={() => themesStore.setTheme(theme)}
      />
    {/each}
  </div>
</div>

<style lang="postcss">
  .page {
    padding: 6px 10px;
  }
  .themes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
</style>
