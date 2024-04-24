<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { ControlCard } from "../control-card";
  import { Slider } from "../slider";

  export let title = "";
  export let description = "";
  export let value = 0;

  const dispatch = createEventDispatcher();
</script>

<ControlCard {title} {description}>
  <div class="control" slot="control">
    <Slider {value} on:change={({ detail }) => dispatch("change", detail)} />
    <div class="value">
      {Math.round(value * 100)}
    </div>
  </div>
</ControlCard>

<style lang="postcss">
  .control {
    width: 200px;
    display: flex;
    align-items: center;
  }
  .value {
    text-align: right;
    padding-left: 5px;
    min-width: 25px;
    font-size: 0.8rem;
    color: var(--color-text-80);
    font-weight: 500;
  }
</style>
