<script>
  import Create from "./create/Create.svelte";
  import Detail from "./detail/Detail.svelte";
  import Library from "./library/Library.svelte";

  const states = {
    create: Create,
    detail: Detail,
    library: Library
  };
  let state = "create";
  let stateArgs = {};

  function handleStateChange(newState, args = {}) {
    state = newState;
    stateArgs = args;
  }
</script>

<style>
  main {
    padding: var(--spacingLarge);
  }
</style>

<main>
  <svelte:component
    this={states[state]}
    {...stateArgs}
    onStateChange={handleStateChange} />
</main>
