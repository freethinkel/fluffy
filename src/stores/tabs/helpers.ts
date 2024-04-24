import type { ITabView, TerminalTab } from "@/types";
import { TerminalController } from "../terminal/terminal.controller";
import * as terminalStore from "../terminal";
import { nanoid } from "nanoid";

export const bybassTabViews = (
  tab: TerminalTab,
  callback: (view: ITabView) => void
) => {
  const bypass = (views: ITabView[]) =>
    views.forEach((view) => {
      callback(view);
      if (view.views) {
        bypass(view.views);
      }
    });

  bypass(tab.view.views ?? []);
};

export const createTab = (): TerminalTab => {
  const controller = new TerminalController(terminalStore.createTerminal());

  return {
    id: nanoid(),
    title: "",
    view: {
      axis: "vertical",
      controller: controller,
    },
  };
};
