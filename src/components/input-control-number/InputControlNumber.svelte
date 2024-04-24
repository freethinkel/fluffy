<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { ControlCard } from "../control-card";

  export let value = 0;
  export let title = "";
  export let description = "";
  export let min = 0;
  export let max = 10;
  export let step = 0.1;

  const dispatch = createEventDispatcher();
  const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;

    dispatch("change", target.value);
    target.value = String(value);
  };
</script>

<ControlCard {title} {description}>
  <div class="control" slot="control">
    <input
      {step}
      {min}
      {max}
      placeholder={title}
      {value}
      type="number"
      on:change={onChange}
    />
  </div>
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
    &::-webkit-inner-spin-button {
      transform: scale(1.2);
    }
  }
</style>
