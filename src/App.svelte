<script>
  import { Link, Route, Router } from "svelte-routing";

  import { bookApiUrl } from "./common/config.js";
  import Create from "./create/Create.svelte";
  import Detail from "./detail/Detail.svelte";
  import { httpGet } from "./common/api.js";
  import Library from "./library/Library.svelte";

  export let url = "";

  // TODO: attempt store refactor, compare
  let books = [];

  async function handleBookCreate(evt) {
    books = [evt.detail.book, ...books];
  }

  async function handleBookUpdate(evt) {
    if (books.length === 0) {
      const { data } = await httpGet("/?_sort=id&_order=desc");
      books = data;
    } else {
      const { book } = evt.detail;
      const i = books.findIndex(b => b.id === book.id);
      books = [...books.slice(0, i), book, ...books.slice(i + 1)];
    }
  }

  function handleBooksFetch(evt) {
    books = evt.detail.books;
  }

  function findBook(id) {
    return books.find(b => b.id === parseInt(id, 10));
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
      <Detail
        id={params.id}
        on:book-update={handleBookUpdate}
        book={findBook(params.id)} />
    </Route>
    <Route path="/create">
      <Create on:create={handleBookCreate} />
    </Route>
    <Route path="/">
      <Library {books} on:books-fetch={handleBooksFetch} />
    </Route>
  </main>
</Router>
