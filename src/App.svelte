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
  });

  let page = "library";
  let pageArgs = {};

  function handlePageChange(evt) {
    const { to, args = {} } = evt.detail;
    page = to;
    pageArgs = args;
  }

  function handleBookUpdate(evt) {
    const { book } = evt.detail;
    const i = books.findIndex(b => b.id === book.id);
    books = [...books.slice(0, i), book, ...books.slice(i + 1)];
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
    <Detail
      {...pageArgs}
      on:page-change={handlePageChange}
      on:book-update={handleBookUpdate} />
  {:else}
    <Library {...pageArgs} {books} on:page-change={handlePageChange} />
  {/if}
</main>
