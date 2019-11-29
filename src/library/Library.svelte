<script>
  import { getClient, query } from "svelte-apollo";
  import { gql } from "apollo-boost";

  import Button from "../common/Button.svelte";
  import BookGrid from "./BookGrid.svelte";
  import Title from "./Title.svelte";

  const client = getClient();
  const books = query(client, {
    query: gql`
      {
        allBooks(sortField: "id", sortOrder: "desc") {
          id
          title
          author
          cover
          about
          variation
          favorite
        }
      }
    `
  });
</script>

<style>
  .greeting {
    font-size: var(--typeSizeSmall);
  }
</style>

<Title />

<p class="greeting">
  This is a library for the people. Welcome. Read the books here. Be inspired.
  Go home, and share them with your family.
</p>

<Button to="/create">+ Add Book</Button>

{#await $books}
  Loading...
{:then result}
  <BookGrid books={result.data.allBooks} />
{:catch error}
  Error: {error}
{/await}
