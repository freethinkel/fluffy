import type { ITheme } from "@/types";
import { transparentize, mix } from "polished";

const opacity = (color: string, amount: number) =>
  transparentize(1 - amount, color);

const createPalette = (scope: string, color: string): string[] => {
  return Array(10)
    .fill(null)
    .map(
      (_, i) =>
        [`--color-${scope}-${(i + 1) * 10}`, opacity(color, (i + 1) / 10)].join(
          ": "
        ) + ";"
    );
};

export const createCssTheme = (theme: ITheme): string => {
  const textColor = theme.type === "dark" ? "#fff" : "#000";
  return [
    ":root {",
    ...createPalette("primary", theme.primary),
    ...createPalette("selection", theme.selection),
    // ...createPalette("accent", mix(0.3, textColor, theme.primary)),
    ...createPalette("text", textColor),
    // ...Object.entries({
    //   ...Object.fromEntries(
    //     Array(10)
    //       .fill(null)
    //       .map((_, i) => [
    //         `--color-primary-${(i + 1) * 10}`,
    //         opacity(theme.primary, (i + 1) / 10),
    //       ])
    //   ),
    // }).map(([key, value]) => [key, value].join(": ") + ";"),
    "}",
  ].join("\n");
};
