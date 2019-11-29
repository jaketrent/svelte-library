<script>
  import { getClient, mutate, query } from "svelte-apollo";
  import { gql } from "apollo-boost";
  import { onMount } from "svelte";

  import BackButtonRow from "../common/BackButtonRow.svelte";
  import BookCover from "../common/BookCover.svelte";
  import Button from "../common/Button.svelte";
  import Header from "../common/Header.svelte";

  export let id;

  let book;
  const client = getClient();
  const fetchQuery = query(client, {
    query: gql`
      {
        Book(id: ${id}) {
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
  fetchQuery.subscribe(async query => {
    const result = await query;
    book = result.data.Book;
  });

  async function handleFavoriteClick() {
    mutate(client, {
      mutation: gql`
        mutation {
          updateBook(id: ${book.id}, favorite: ${!book.favorite}) {
            id
            favorite
          }
        }
      `
    });
  }
</script>

<style>
  .detail {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(40vw, 20rem));
    grid-template-rows: minmax(64vw, 32rem) auto;
    gap: var(--spacingXLarge);
  }
  .cover {
    position: relative;
    display: flex;
    margin-bottom: var(--spacingXLarge);
  }
  .favorite {
    position: absolute;
    width: 90%;
    left: calc(10% + var(--spacingSmall));
    bottom: var(--spacingLarge);
  }
</style>

<BackButtonRow />

<Header element="h1" size="large">Discover</Header>

{#await $fetchQuery}
  Loading...
{:then result}
  <div class="detail">
    <div class="cover">
      <BookCover book={result.data.Book} />
      <div class="favorite">
        <Button on:click={handleFavoriteClick}>
          {result.data.Book.favorite ? 'Unfavorite' : 'Favorite'}
        </Button>
      </div>
    </div>
    <div>
      <Header>About</Header>
      <p>{result.data.Book.about}</p>
    </div>
  </div>
{:catch error}
  Error: {error}
{/await}
