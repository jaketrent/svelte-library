<script>
  import { Link, Route, Router } from "svelte-routing";
  import { onMount } from "svelte";

  import { bookApiUrl } from "./common/config.js";
  import Create from "./create/Create.svelte";
  import Detail from "./detail/Detail.svelte";
  import Library from "./library/Library.svelte";

  export let url = "";

  let books = [];

  onMount(async function fetchBooks() {
    const res = await fetch(bookApiUrl + "?_sort=id&_order=desc");
    const json = await res.json();
    books = json;
  });

  async function handleBookCreate(evt) {
    books = [evt.detail.book, ...books];
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

<Router {url}>
  <main>
    <Route path="/books/:id" let:params>
      <Detail id={params.id} on:book-update={handleBookUpdate} />
    </Route>
    <Route path="/create">
      <Create on:create={handleBookCreate} />
    </Route>
    <Route path="/">
      <Library {books} />
    </Route>
  </main>
</Router>
