<script>
  import Button from "../common/Button.svelte";

  export let onClick;
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
  <Button onClick={() => onClick('library')}>&lt; Back</Button>
  <div class="text">
    To the
    <span>Library</span>

  </div>
</nav>
