<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { ControlCard } from "../control-card";

  export let value = "";
  export let title = "";
  export let description = "";

  const dispatch = createEventDispatcher();

  const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;

    dispatch("change", target.value);
    target.value = String(value);
  };
</script>

<ControlCard {title} {description}>
  <input
    slot="control"
    placeholder={title}
    {value}
    type="text"
    on:change={onChange}
  />
</ControlCard>

<style lang="postcss">
  input {
    width: 150px;
    appearance: none;
    font-size: 1rem;
    background: var(--color-selection-10);
    border-radius: var(--border-radius);
    height: 24px;
    padding: 0 4px;
    border: none;
  }
</style>
