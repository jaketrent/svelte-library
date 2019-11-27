<script>
  import { createEventDispatcher } from "svelte";

  import BackButtonRow from "../common/BackButtonRow.svelte";
  import { bookApiUrl } from "../common/config.js";
  import BookCover from "../common/BookCover.svelte";
  import Button from "../common/Button.svelte";
  import Header from "../common/Header.svelte";

  export let book;

  const dispatch = createEventDispatcher();

  async function handleFavoriteClick() {
    const toggledBook = {
      ...book,
      favorite: !book.favorite
    };
    const res = await fetch(bookApiUrl + "/" + book.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toggledBook)
    });
    if (res.ok) {
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
