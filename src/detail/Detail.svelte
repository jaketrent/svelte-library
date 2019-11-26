<script>
  import BackButtonRow from "../common/BackButtonRow.svelte";
  import { bookApiUrl } from "../common/config.js";
  import BookCover from "../common/BookCover.svelte";
  import Button from "../common/Button.svelte";
  import Header from "../common/Header.svelte";

  export let book;

  async function handleFavoriteClick() {
    const toggledBook = {
      ...book,
      favorite: !book.favorite
    };
    const res = await fetch(bookApiUrl + "/" + book.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ favorite: !book.favorite })
    });
    if (res.ok) {
      book = toggledBook;
    }
    // TODO: dispatch up
  }
</script>

<style>
  .detail {
    display: grid;
    grid-template-rows: minmax(22rem, 60vh) auto;
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
