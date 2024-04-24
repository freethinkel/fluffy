<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Icon } from "../icon";
  export let icon = "";
  export let active = false;

  const dispatch = createEventDispatcher();
</script>

<button
  type="button"
  class="tab"
  class:active
  on:click={() => dispatch("select")}
>
  <div class="icon">
    <Icon name={icon} />
  </div>
  <span>
    <slot />
  </span>
</button>

<style lang="postcss">
  button {
    appearance: none;
    border: none;
    border-radius: var(--border-radius);
    background: none;
    font-size: 1rem;
    color: var(--color-text);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 5px 10px;

    & span {
      opacity: 0.7;
    }

    & :global(.icon svg) {
      height: 24px;
      width: 24px;

      & :global(*) {
        stroke-width: 2px;
      }
    }

    & :global(.icon svg *) {
      stroke: var(--color-text);
    }

    &:hover {
      background: var(--color-selection-10);
    }
  }
  .active {
    background: var(--color-selection-10);
  }
</style>
