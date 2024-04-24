import type { ITerminalAddon, Terminal } from "@xterm/xterm";
import { TauriPtyAddon } from "tauri-plugin-pty";
import { nanoid } from "nanoid";
import { FitAddon } from "@xterm/addon-fit";
import { WebglAddon } from "@xterm/addon-webgl";

export class TerminalController {
  id: string = nanoid();
  terminal: Terminal;

  get addons() {
    return (
      this.terminal as unknown as {
        _addonManager: { _addons: (ITerminalAddon & { instance: unknown })[] };
      }
    )._addonManager._addons;
  }

  constructor(terminal: Terminal) {
    this.terminal = terminal;
  }

  fixRender() {
    setTimeout(() => {
      (
        this.addons.find((addon) => addon instanceof FitAddon)
          ?.instance as FitAddon
      ).fit();
      (
        this.addons.find((addon) => addon instanceof WebglAddon)
          ?.instance as WebglAddon
      ).clearTextureAtlas();
    });
  }

  focus(): void {
    setTimeout(() => {
      this.terminal.focus();
    });
  }

  async paste(): Promise<void> {
    const clipboardText = await navigator.clipboard.readText();
    this.terminal.paste(clipboardText);
  }

  async copySelectedText(): Promise<void> {
    const selection = this.terminal.getSelection();
    await navigator.clipboard.writeText(selection);
  }

  resize() {
    const addon = this.addons.find(
      (addon) => addon.instance instanceof FitAddon
    )?.instance as FitAddon | undefined;
    addon?.fit();
  }

  sendChars(chars: string) {
    const addon = this.addons.find(
      (addon) => addon.instance instanceof TauriPtyAddon
    )?.instance as TauriPtyAddon | undefined;
    addon?.sendData(chars);
  }
}
