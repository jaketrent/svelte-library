<script>
  import Create from "./create/Create.svelte";
  import Detail from "./detail/Detail.svelte";
  import Library from "./library/Library.svelte";

  function handleBookCreate(evt) {
    const variationsCount = 3;
    const book = {
      ...evt.detail.book,
      variation: books.length % variationsCount
    };
    books = [book, ...books];
  }

  // TODO: make a dynamic data request
  // TODO: better abouts
  let books = [
    {
      id: 1,
      title: "Little Women",
      author: "Louisa May Alcott",
      cover: "",
      about: "This is an about",
      variation: 0
    },
    {
      id: 2,
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      cover: "",
      about: "This is an about",
      variation: 1
    },
    {
      id: 3,
      title: "Grapes of Wrath",
      author: "John Steinbeck",
      cover: "",
      about: "This is an about",
      variation: 2
    },
    {
      id: 4,
      title: "To Kill a Mocking Bird",
      author: "Harper Lee",
      cover: "https://i.imgur.com/BPmn7bUm.jpg",
      about: "This is an about",
      variation: 0
    },
    {
      id: 5,
      title: "Moby Dick",
      author: "Hermann Melville",
      cover: "",
      about: "This is an about",
      variation: 1
    }
  ];

  let page = "library";
  let pageArgs = {};

  function handlePageChange(evt) {
    const { to, args = {} } = evt.detail;
    page = to;
    pageArgs = args;
  }
</script>

<style>
  main {
    padding: var(--spacingLarge);
  }
</style>

<main>
  {#if page === 'create'}
    <Create
      {...pageArgs}
      on:create={handleBookCreate}
      on:page-change={handlePageChange} />
  {:else if page === 'detail'}
    <Detail {...pageArgs} on:page-change={handlePageChange} />
  {:else}
    <Library {...pageArgs} {books} on:page-change={handlePageChange} />
  {/if}
</main>
