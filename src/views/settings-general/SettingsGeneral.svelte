<script lang="ts">
  import { ControlCardGroup } from "@/components/control-card";
  import { InputControl } from "@/components/input-control";
  import { InputControlNumber } from "@/components/input-control-number";
  import { SliderControl } from "@/components/slider-control";
  import * as settingsStore from "@/stores/settings";

  const settings = settingsStore.settings$;
</script>

<div class="page">
  <ControlCardGroup label="General">
    <InputControl
      title="Font family"
      value={$settings.fontFamily}
      on:change={({ detail }) =>
        settingsStore.changeSettings({
          key: "fontFamily",
          value: detail,
        })}
    />
    <InputControlNumber
      min={4}
      max={30}
      step={1}
      title="Font size"
      value={$settings.fontSize}
      on:change={({ detail }) =>
        settingsStore.changeSettings({
          key: "fontSize",
          value: detail,
        })}
    />
    <InputControlNumber
      title="Line height"
      value={$settings.lineHeight}
      on:change={({ detail }) =>
        settingsStore.changeSettings({
          key: "lineHeight",
          value: detail,
        })}
    />
  </ControlCardGroup>
  <ControlCardGroup label="Background">
    <SliderControl
      title="Opacity"
      value={$settings.opacity}
      on:change={({ detail }) =>
        settingsStore.changeSettings({
          key: "opacity",
          value: detail,
        })}
    />
  </ControlCardGroup>
</div>

<style lang="postcss">
  .page {
    padding: 6px 10px;
  }
</style>
