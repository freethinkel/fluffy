import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebglAddon } from "@xterm/addon-webgl";
import { Unicode11Addon } from "@xterm/addon-unicode11";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { TauriPtyAddon } from "tauri-plugin-pty";
import { currentTheme$ } from "../themes";
import { themesStore } from "..";
import { transparentize } from "polished";
import * as settingsStore from "@/stores/settings";
import { fixFontRender } from "./helpers";

const loadAddons = async (terminal: Terminal) => {
  const ws = new WebSocket("ws://127.0.0.1:7703");
  const fitAddon = new FitAddon();

  const tauriPtyAddon = new TauriPtyAddon(ws);
  const webglAddon = new WebglAddon(false);
  const unicodeAddon = new Unicode11Addon();

  // let linkHovered = false;

  // const updateMouseCursor = (keys: string[], isHovered: boolean) => {
  //   const element = terminal.element;
  //   if (keys.length === 1 && keys.includes("Meta") && isHovered) {
  //     element.style.cursor = "pointer";
  //   } else {
  //     element.style.cursor = "";
  //   }
  // };
  // keymapsStore.pressedKeys$.subscribe((keys) => {
  //   updateMouseCursor(keys, linkHovered);
  // });
  // const weblinksAddon = new WebLinksAddon(
  //   async (_, uri) => {
  //     if (isOnlyPressed("Meta")) {
  //       await open(uri);
  //     }
  //   },
  //   {
  //     hover: (event, text, location) => {
  //       console.log(event, text, location);
  //       linkHovered = true;
  //       updateMouseCursor(keymapsStore.pressedKeys$.getState(), linkHovered);
  //     },
  //     leave: (_, __) => {
  //       linkHovered = false;
  //       updateMouseCursor(keymapsStore.pressedKeys$.getState(), linkHovered);
  //     },
  //   }
  // );
  // const canvasAddon = new CanvasAddon();
  // canvasAddon.onAddTextureAtlasCanvas(console.log);
  // canvasAddon.onChangeTextureAtlas(console.log);
  // const ligaturesAddon = new LigaturesAddon();

  // terminal.loadAddon(weblinksAddon);
  terminal.loadAddon(tauriPtyAddon);
  terminal.loadAddon(fitAddon);
  terminal.loadAddon(unicodeAddon);
  terminal.loadAddon(webglAddon);
  // terminal.loadAddon(canvasAddon);
  // terminal.loadAddon(ligaturesAddon);

  await new Promise((resolve, reject) => {
    ws.addEventListener("open", () => resolve(null));
    ws.addEventListener("error", () => reject("error socket"));

    setTimeout(() => reject("Timeout"), 5000);
  }).catch(console.error);

  fitAddon.fit();

  settingsStore.settings$.subscribe(() => {
    setTimeout(() => {
      fitAddon.fit();
    }, 10);
  });

  ws.addEventListener("open", () => {
    fitAddon.fit();
  });

  window.addEventListener("resize", () => {
    fitAddon.fit();
  });
};

export const createTerminal = (): Terminal => {
  const terminal = new Terminal({
    fontFamily: `${settingsStore.fontFamily$.getState()}, Menlo`,
    fontSize: settingsStore.fontSize$.getState(),
    fontWeight: "400",
    fontWeightBold: "500",
    lineHeight: settingsStore.lineHeight$.getState(),
    allowProposedApi: true,
    allowTransparency: false,
    customGlyphs: true,
    macOptionIsMeta: true,
    theme: {
      ...currentTheme$.getState().terminal,
      background: transparentize(
        1,
        currentTheme$.getState().terminal.background!
      ),
    },
    minimumContrastRatio: 0,
  });

  loadAddons(terminal);

  themesStore.currentTheme$.watch((theme) => {
    setTimeout(() => {
      fixFontRender(terminal, true);
    }, 10);

    terminal.options.allowTransparency = theme.type === "dark";
    terminal.options.theme = {
      ...theme.terminal,
      background: transparentize(
        theme.type === "dark" ? 1 : 0,
        theme.terminal.background!
      ),
    };
  });
  settingsStore.lineHeight$.watch((value) => {
    terminal.options.lineHeight = value;
  });
  settingsStore.fontSize$.watch((value) => {
    terminal.options.fontSize = value;
  });
  settingsStore.fontFamily$.watch((value) => {
    terminal.options.fontFamily = value;
  });
  //
  //
  settingsStore.settings$.watch(() =>
    setTimeout(() => {
      fixFontRender(terminal, true);
    }, 10)
  );

  // setTimeout(() => {
  //   loadAddons(terminal);
  // });
  //
  setTimeout(() => {
    fixFontRender(terminal);
  }, 50);

  return terminal;
};
