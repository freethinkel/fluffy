import { createSharedStore } from "@/helpers/store";
import type { ISettings } from "@/types/settings";
import { createEvent, sample } from "effector";

const DEFAULT: ISettings = {
  fontSize: 13,
  fontFamily: "Menlo",
  lineHeight: 1.1,
  opacity: 1,
  isAutoHideToolbar: false,
  isEnabledFancyBackground: false,
  isEnabledTerminalContextMenu: true,
};

type PickSettings<K extends keyof typeof DEFAULT = keyof typeof DEFAULT> = {
  key: K;
  value: typeof DEFAULT[K];
};

const settings$ = createSharedStore("settings", { ...DEFAULT });

const fontFamily$ = settings$.map((value) => value.fontFamily);
const fontSize$ = settings$.map((value) => value.fontSize);
const lineHeight$ = settings$.map((value) => value.lineHeight);
const opacity$ = settings$.map((value) => value.opacity);

const changeSettings = createEvent<PickSettings>();

sample({
  clock: changeSettings,
  source: settings$,
  fn: (store, payload) => ({
    ...store,
    [payload.key]: payload.value,
  }),
  target: settings$,
});

export {
  settings$,
  fontFamily$,
  fontSize$,
  lineHeight$,
  opacity$,
  changeSettings,
};
