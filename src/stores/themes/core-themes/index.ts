import defaultTheme from "./default.json";
import mountainTheme from "./mountain.json";
import tokyoNightTheme from "./tokyo-night.json";
import monokaiProTheme from "./monokai_pro.json";
import nordTheme from "./nord.json";
import type { ITheme } from "@/types";

export const CORE_THEMES: Array<ITheme> = [
  defaultTheme,
  tokyoNightTheme,
  mountainTheme,
  monokaiProTheme,
  nordTheme,
];
