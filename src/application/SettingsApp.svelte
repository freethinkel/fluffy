<script lang="ts">
  import { SettingsTab } from "@/components/settings-tab";
  import { SettingsGeneral } from "@/views/settings-general";
  import { SettingsThemes } from "@/views/settings-themes";

  let current = "general";

  const scopes = [
    {
      id: "general",
      icon: "settings",
      text: "General",
    },
    {
      id: "themes",
      icon: "themes",
      text: "Themes",
    },
  ];
</script>

<div class="wrapper">
  <div class="titlebar" data-tauri-drag-region>Settings</div>
  <div class="tabbar" data-tauri-drag-region>
    {#each scopes as scope}
      <SettingsTab
        icon={scope.icon}
        active={current === scope.id}
        on:select={() => (current = scope.id)}
      >
        {scope.text}
      </SettingsTab>
    {/each}
  </div>
  <div class="body">
    {#if current === "general"}
      <SettingsGeneral />
    {:else if current === "themes"}
      <SettingsThemes />
    {/if}
  </div>
</div>

<style lang="postcss">
  .wrapper {
    background: var(--color-primary-100);
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .titlebar {
    padding: 2px 70px;
    text-align: center;
    font-weight: 600;
    opacity: 0.5;
  }
  .tabbar {
    display: flex;
    justify-content: center;
    gap: 4px;
  }
  .body {
    overflow: auto;
    min-height: 0;
    flex: 1;
  }
</style>
