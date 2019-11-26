<script>
  import BookCover from "../common/BookCover.svelte";

  export let books = [];
  export let onBookSelect = () => {};
</script>

<style>
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: minmax(12.5rem, 16rem);
    gap: var(--spacingMedium);
    list-style: none;
    max-width: 100%;
    padding: 0;
  }
  li {
    display: flex;
  }
</style>

<ul>
  {#each books as book}
    <li on:click={() => onBookSelect({ book })} key={book.id}>
      <BookCover {book} />
    </li>
  {/each}
</ul>
