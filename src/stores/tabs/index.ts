import type { TerminalTab } from "@/types";
import { createEffect, createEvent, createStore, sample } from "effector";
import { bybassTabViews, createTab } from "./helpers";

const _initialTab = createTab();

const tabs$ = createStore([_initialTab]);
const currentTab$ = createStore(_initialTab);

// Events
const setTabTitle = createEvent<{ tabId: string; title: string }>();
const createNewTab = createEvent();
const tabCreated = createEvent<TerminalTab>();
const selectTab = createEvent<TerminalTab>();
const closeTab = createEvent<TerminalTab>();

// Effects
const onSelectTabFx = createEffect((tab: TerminalTab) => {
  bybassTabViews(tab, (view) => {
    view.controller?.fixRender();
  });
  tab.view.controller?.focus();
});

sample({
  clock: setTabTitle,
  source: tabs$,
  fn: (tabs, payload) => {
    return tabs.map((tab) => {
      if (tab.id === payload.tabId) {
        return {
          ...tab,
          title: payload.title,
        };
      }
      return tab;
    });
  },
  target: tabs$,
});

sample({
  clock: createNewTab,
  fn: () => createTab(),
  target: tabCreated,
});

sample({
  clock: tabCreated,
  source: tabs$,
  fn: (tabs, tab) => [...tabs, tab],
  target: tabs$,
});

sample({
  clock: tabCreated,
  target: currentTab$,
});

sample({
  clock: selectTab,
  target: currentTab$,
});

sample({
  clock: currentTab$,
  target: onSelectTabFx,
});

sample({
  clock: closeTab,
  source: {
    tabs: tabs$,
    currentTab: currentTab$,
  },
  fn: ({ tabs, currentTab }, tab) => {
    const index = tabs.findIndex((t) => t.id === tab.id);
    if (currentTab.id === tab.id) {
      return tabs[(index + 1) % tabs.length];
    } else {
      return currentTab;
    }
  },
  target: selectTab,
});

sample({
  clock: closeTab,
  source: tabs$,
  fn: (tabs, tab) => tabs.filter((t) => t !== tab),
  target: tabs$,
});

export { tabs$, currentTab$, setTabTitle, createNewTab, selectTab, closeTab };
