import type { TerminalController } from "@/stores/terminal/terminal.controller";

export type ITabView = {
  axis: "vertical" | "horizontal";
  views?: ITabView[];
  controller?: TerminalController;
};

export type TerminalTab = {
  id: string;
  title?: string;
  view: ITabView;
};
