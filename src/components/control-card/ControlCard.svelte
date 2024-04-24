<script lang="ts">
  export let title = "";
  export let description = "";
</script>

<div class="wrapper control-card">
  <div class="left">
    <div class="title">{title}</div>
    <div class="description">{description}</div>
  </div>

  <div class="control">
    <slot name="control" />
  </div>
</div>

<style lang="postcss">
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 30px;
    padding: 8px 6px;
  }
  .title {
    font-size: 1rem;
    font-weight: 500;
  }
  .description {
    font-size: 0.9rem;
    color: var(--color-text-80);
    font-weight: 400;
  }
</style>
