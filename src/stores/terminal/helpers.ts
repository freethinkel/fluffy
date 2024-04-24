import type { Terminal } from "@xterm/xterm";

export const fixFontRender = (() => {
  let __atlas: any;

  return (terminal: Terminal, force?: boolean) => {
    if (force) __atlas = null;
    const atlas =
      __atlas ??
      (terminal as any)?._core?._renderService?._renderer?._value?._charAtlas;

    if (!atlas) {
      return;
    }
    if (atlas === __atlas) {
      return;
    }
    __atlas = atlas;
    document.body.appendChild(atlas?._tmpCanvas);
    atlas._tmpCanvas.style.display = "none";
    terminal.clearTextureAtlas();
  };
})();
