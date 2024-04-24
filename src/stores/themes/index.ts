import { createStore } from "effector";
import { CORE_THEMES } from "./core-themes";
import { createCssTheme } from "./helpers";
import { getCurrent } from "@tauri-apps/api/webviewWindow";
import { invoke } from "@tauri-apps/api/core";

const currentTheme$ = createStore(CORE_THEMES[0]);

const initTheme = async () => {
  const style = document.createElement("style");
  style.setAttribute("data-type", "app-theme");
  document.head.appendChild(style);
  currentTheme$.subscribe((theme) => {
    const styles = createCssTheme(theme);

    invoke("plugin:theme|set_theme", {
      theme: theme.type,
    });

    style.innerHTML = styles;
  });
};

export { currentTheme$, initTheme };
