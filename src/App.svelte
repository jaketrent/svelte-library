<script>
  import { onMount } from "svelte";

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

  let books = [];

  onMount(async _ => {
    const res = await fetch("http://localhost:3000/books");
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
