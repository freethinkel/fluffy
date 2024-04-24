<script lang="ts">
  export let name = "";
  export let size = 22;
  let svgInner = "";

  const onLoad = (name: string) => {
    import(`./icons/${name}.svg?raw`).then((module) => {
      svgInner = module.default;
    });
  };

  $: onLoad(name);
</script>

<div class="icon" style:--size="{size}px">
  {@html svgInner}
</div>

<style lang="postcss">
  .icon {
    display: inline-flex;

    & :global(svg) {
      height: var(--size);
      width: var(--size);
    }
  }
</style>
