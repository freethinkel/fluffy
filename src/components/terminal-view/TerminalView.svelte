<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { Terminal } from "@xterm/xterm";
  import "@xterm/xterm/css/xterm.css";
  import TerminalApp from "@/application/TerminalApp.svelte";

  export let terminal: Terminal;

  const dispatch = createEventDispatcher();

  let el: HTMLElement;

  onMount(() => {
    terminal.open(el);
    terminal.onTitleChange((newTitle) => {
      dispatch("change_title", newTitle);
    });

    setTimeout(() => {
      terminal.focus();
    }, 2000);
  });
</script>

<div class="wrapper" bind:this={el}></div>

<style lang="postcss">
  .wrapper {
    height: 100%;
    width: 100%;
    font-family: FiraCode Nerd Font;
  }

  .wrapper :global(.terminal) {
    height: 100%;
  }
</style>
