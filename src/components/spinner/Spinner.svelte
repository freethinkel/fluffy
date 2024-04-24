<script lang="ts">
  export let size = 20;
</script>

<div class="wrapper" style:--size="{size}px">
  {#each Array(8) as _, i}
    <div
      class="blade"
      style:--rotate="{(360 / 8) * i}deg"
      style:animation-delay="{(1 / 8) * i - 14}s"
    ></div>
  {/each}
</div>

<style lang="postcss">
  .wrapper {
    position: relative;
    width: var(--size);
    height: var(--size);
  }

  .blade {
    position: absolute;
    top: calc(var(--size) / 3);
    left: calc(var(--size) / 2);
    width: calc(var(--size) / 8);
    height: calc(var(--size) / 3);
    transform: rotate(var(--rotate)) translateY(calc(var(--size) / 3));
    border-radius: 10em;
    background-color: #8e8e93;
    animation: iSpinnerBlade 1s linear infinite;
    will-change: opacity;
  }

  @keyframes iSpinnerBlade {
    0% {
      opacity: 0.85;
    }
    50% {
      opacity: 0.25;
    }
    100% {
      opacity: 0.25;
    }
  }
</style>
