<script>
  import { Link, Route, Router } from "svelte-routing";

  import {
    addBook,
    allBooks,
    findBook,
    hasBooks,
    setBooks,
    updateBook
  } from "./common/store.js";
  import { bookApiUrl } from "./common/config.js";
  import Create from "./create/Create.svelte";
  import Detail from "./detail/Detail.svelte";
  import { httpGet } from "./common/api.js";
  import Library from "./library/Library.svelte";

  export let url = "";
</script>

<style>
  main {
    padding: var(--spacingLarge);
  }
</style>

<Router {url}>
  <main>
    <Route path="/books/:id" let:params>
      <Detail id={params.id} />
    </Route>
    <Route path="/create">
      <Create />
    </Route>
    <Route path="/">
      <Library />
    </Route>
  </main>
</Router>
