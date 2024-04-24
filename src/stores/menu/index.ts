import { Menu, MenuItem, Submenu } from "@tauri-apps/api/menu";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { createEffect, createEvent, sample } from "effector";

const initMenu = async () => {
  const menu = await Menu.default();
  const items = await menu.items();
  const appMenu = items[0] as Submenu;
  appMenu.insert(
    await MenuItem.new({
      text: "Settings",

      action: (id) => {
        openSettings();
        console.log("Settings activted", id);
      },
      accelerator: "CmdOrCtrl+,",
    }),
    1
  );

  menu.setAsAppMenu();
};

// Events
const openSettings = createEvent();

// Effects
const openSettingsFx = createEffect(async () => {
  const webviewWindow = new WebviewWindow("settings", {
    title: "Settings",
    width: 500,
    height: 440,
    focus: true,
    titleBarStyle: "overlay",
    hiddenTitle: true,
    resizable: false,
    fullscreen: false,
  });

  if (
    !(await webviewWindow.isVisible()) ||
    !(await webviewWindow.isFocused())
  ) {
    await webviewWindow.show();
    await webviewWindow.setFocus();
  }
});

sample({
  clock: openSettings,
  target: openSettingsFx,
});

export { initMenu };
