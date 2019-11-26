<script>
  import { onMount } from "svelte";

  import { bookApiUrl } from "./common/config.js";
  import Create from "./create/Create.svelte";
  import Detail from "./detail/Detail.svelte";
  import Library from "./library/Library.svelte";

  const booksApiUrl = "http://localhost:3000/books?_sort=id&_order=desc";

  async function handleBookCreate(evt) {
    const variationsCount = 3;
    const book = {
      ...evt.detail.book,
      id: books.length + 1,
      variation: books.length % variationsCount,
      favorite: false
    };

    const res = await fetch(booksApiUrl + "?_sort=id&_order=desc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(book)
    });
    if (res.ok) {
      books = [book, ...books];
    }
  }

  let books = [];

  onMount(async _ => {
    const res = await fetch(booksApiUrl);
    const json = await res.json();
    books = json;

    // TODO: rm

    page = "detail";
    pageArgs = { book: books[0] };
    console.log({ pageArgs });
  });

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
