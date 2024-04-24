import { combine, createEvent, createStore, sample } from "effector";
import { CORE_THEMES } from "./core-themes";
import { createCssTheme } from "./helpers";
import { invoke } from "@tauri-apps/api/core";
import { createSharedStore } from "@/helpers/store";
import type { ITheme } from "@/types";

const FALLBACK_THEME = CORE_THEMES[0];

const _currentThemeName$ = createSharedStore(
  "current_theme_name",
  FALLBACK_THEME.name
);

const themes$ = createStore([...CORE_THEMES]);
const currentTheme$ = combine(
  themes$,
  _currentThemeName$,
  (themes, name) =>
    themes.find((theme) => theme.name === name) ?? FALLBACK_THEME
);

// Events
const setTheme = createEvent<ITheme>();

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

sample({
  clock: setTheme,
  fn: (theme) => theme.name,
  target: _currentThemeName$,
});

export { currentTheme$, themes$, initTheme, setTheme };
