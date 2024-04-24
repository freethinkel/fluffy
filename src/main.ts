import { getCurrent } from "@tauri-apps/api/webview";
import "./styles.pcss";
import TerminalApp from "@/application/TerminalApp.svelte";
import SettingsApp from "@/application/SettingsApp.svelte";
import * as themesStore from "@/stores/themes";
import * as menuStore from "@/stores/menu";

const label = (() => {
  try {
    return getCurrent().label;
  } catch (_) {
    return "main";
  }
})();

const Component = {
  main: () => TerminalApp,
  settings: () => SettingsApp,
}[label]!();

new Component({
  target: document.getElementById("app")!,
});

menuStore.initMenu();
themesStore.initTheme();
