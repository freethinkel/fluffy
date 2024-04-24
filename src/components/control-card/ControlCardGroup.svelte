<script lang="ts">
  export let label = "";
</script>

<div class="wrapper">
  {#if label}
    <div class="label">{label}</div>
  {/if}
  <div class="card">
    <slot />
  </div>
</div>

<style lang="postcss">
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 2px;

    & + :global(&) {
      margin-top: 12px;
    }
  }
  .label {
    color: var(--color-text-70);
    font-size: 1rem;
    font-weight: 600;
  }
  .card {
    box-shadow: var(--shadow1);
    border-radius: calc(var(--border-radius) * 2);
    background: var(--color-selection-10);
    border: 1px solid var(--color-selection-10);
    overflow: hidden;

    & > :global(*) {
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: -1px;
        left: 0;
        width: 100%;
        border-top: 1px solid var(--color-primary-80);
      }
    }
  }
</style>
