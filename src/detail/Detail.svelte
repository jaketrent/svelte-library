<script>
  import { createEventDispatcher, onMount } from "svelte";

  import BackButtonRow from "../common/BackButtonRow.svelte";
  import BookCover from "../common/BookCover.svelte";
  import Button from "../common/Button.svelte";
  import Header from "../common/Header.svelte";
  import { httpGet, httpPut } from "../common/api.js";

  export let book = {};
  export let id;

  const dispatch = createEventDispatcher();

  onMount(async _ => {
    // TODO: get only if needed
    const { data } = await httpGet("/" + id);
    book = data;
  });

  async function handleFavoriteClick() {
    const toggledBook = {
      ...book,
      favorite: !book.favorite
    };
    const { ok } = await httpPut("/" + book.id, toggledBook);
    if (ok) {
      book = toggledBook;
      dispatch("book-update", { book: toggledBook });
    }
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

<BackButtonRow on:page-change />

<Header element="h1" size="large">Discover</Header>

<div class="detail">
  <div class="cover">
    <BookCover {book} />
    <div class="favorite">
      <Button on:click={handleFavoriteClick}>
        {book.favorite ? 'Unfavorite' : 'Favorite'}
      </Button>
    </div>
  </div>
  <div>
    <Header>About</Header>
    <p>{book.about}</p>
  </div>
</div>
