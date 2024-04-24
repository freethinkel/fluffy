<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Splitpanes } from "svelte-splitpanes";

  export let axis: "vertical" | "horizontal" = "vertical";

  const dispatch = createEventDispatcher();
</script>

<Splitpanes
  horizontal={axis === "horizontal"}
  on:resize={({ detail }) => dispatch("resize", detail)}
>
  <slot />
</Splitpanes>

<style lang="postcss">
  :global(.splitpanes) {
    & :global(.splitpanes__pane) {
      background: none !important;
    }
    & :global(.splitpanes__splitter) {
      background: var(--color-selection-10) !important;
      border: none !important;
      &::after {
        content: none;
        display: none;
      }
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        height: 25px !important;
        transform: translate(-50%, -50%) !important;
        width: 2px !important;
        margin: 0 !important;
        border-radius: 2px;
        background: var(--color-selection-100) !important;
      }
    }
    &
      :global(.splitpanes--horizontal)
      > :global(.splitpanes__splitter)::before {
      height: 2px !important;
      width: 25px !important;
    }
  }
</style>
