<script>
  import { createEventDispatcher } from "svelte";

  import Button from "../common/Button.svelte";

  const dispatch = createEventDispatcher();
</script>

<style>
  nav {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    margin-bottom: var(--spacingXLarge);
  }
  .text {
    margin-left: var(--spacingSmall);
  }
  span {
    font-weight: var(--typeWeightBold);
  }
</style>

<nav>
  <Button on:click={() => dispatch('page-change', { to: 'library' })}>
    &lt; Back
  </Button>
  <div class="text">
    To the
    <span>Library</span>

  </div>
</nav>
