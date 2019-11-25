<script>
  import Create from "./create/Create.svelte";
  import Detail from "./detail/Detail.svelte";
  import Library from "./library/Library.svelte";

  function handleBookCreate(evt) {
    const book = evt.detail.book;
    books = [book, ...books];
  }

  // TODO: make a dynamic data request
  let books = [
    {
      id: 1,
      title: "Little Women",
      author: "Louisa May Alcott",
      cover: "",
      about: "This is an about"
    },
    {
      id: 2,
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      cover: "",
      about: "This is an about"
    },
    {
      id: 3,
      title: "Grapes of Wrath",
      author: "John Steinbeck",
      cover: "",
      about: "This is an about"
    },
    {
      id: 4,
      title: "To Kill a Mocking Bird",
      author: "Harper Lee",
      cover: "https://i.imgur.com/BPmn7bUm.jpg",
      about: "This is an about"
    },
    {
      id: 5,
      title: "Moby Dick",
      author: "Hermann Melville",
      cover: "",
      about: "This is an about"
    }
  ];

  const defaultStateArgs = {
    // TODO: convert on:stateChange convention
    onStateChange: handleStateChange
  };
  const states = {
    create: { ui: Create, args: { "on:create": handleBookCreate } },
    detail: { ui: Detail },
    library: { ui: Library, args: { books } }
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
  {#if state === 'create'}
    <Create {...defaultStateArgs} {...stateArgs} on:create={handleBookCreate} />
  {:else if state === 'detail'}
    <Detail {...defaultStateArgs} {...stateArgs} />
  {:else}
    <Library {...defaultStateArgs} {...stateArgs} {books} />
  {/if}
</main>
