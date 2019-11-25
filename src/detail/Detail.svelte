<script>
  import BackButtonRow from "../common/BackButtonRow.svelte";
  import BookCover from "../common/BookCover.svelte";
  import Button from "../common/Button.svelte";
  import Header from "../common/Header.svelte";

  export let book;
</script>

<style>
  .detail {
    display: grid;
    grid-template-rows: minmax(22rem, 60vh) auto;
  }
  .cover {
    display: flex;
    margin-bottom: var(--spacingXLarge);
  }
</style>

<BackButtonRow on:page-change />

<Header element="h1" size="large">Discover</Header>

<div class="detail">
  <div class="cover">
    <BookCover {book} />
  </div>
  <div>
    <Header>About</Header>
    <p>{book.about}</p>
  </div>

</div>
