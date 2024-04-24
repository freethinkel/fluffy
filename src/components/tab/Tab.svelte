<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Icon } from "../icon";

  export let active = false;
  export let disabled = false;

  const dispatch = createEventDispatcher();
</script>

<button
  class:active
  class="wrapper"
  type="button"
  class:disabled={disabled}
  data-tauri-drag-region
  on:click={() => dispatch("click")}
>
  <span>
    <slot />
  </span>
  <button
    class="close"
    type="button"
    on:click|stopPropagation={() => dispatch("close")}
  >
    <Icon name="close" size={18} />
  </button>
</button>

<style lang="postcss">
  .wrapper {
    appearance: none;
    border: none;
    background: none;
    border-radius: var(--border-radius);
    height: 30px;
    font-size: 0.9rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    padding: 3px;
    padding-left: 6px;
    color: var(--color-text-100);
    &.disabled {
      opacity: 1;
    }
    &:hover .close {
      opacity: 1;
    }
    &:not(.disabled) {
      &.active,
      &:hover {
        background: var(--color-selection-10);
      }
    }
  }
  .wrapper span {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: none;
  }

  .close {
    appearance: none;
    border: none;
    background: none;
    border-radius: var(--border-radius);
    padding: 0;
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;

    &:hover {
      background: var(--color-selection-10);
    }
  }
</style>
