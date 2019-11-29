<script>
  import ApolloClient from "apollo-boost";
  import { Route, Router } from "svelte-routing";
  import { setClient } from "svelte-apollo";

  import Create from "./create/Create.svelte";
  import Detail from "./detail/Detail.svelte";
  import { graphqlUrl } from "./common/config.js";
  import Library from "./library/Library.svelte";

  export let url = "";

  const client = new ApolloClient({ uri: graphqlUrl });
  setClient(client);
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
