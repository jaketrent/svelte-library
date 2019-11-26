<script>
  import BookCover from "../common/BookCover.svelte";
  import Heart from "./Heart.svelte";

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
    position: relative;
    display: flex;
  }
  .heart {
    position: absolute;
    bottom: calc(-1 * var(--spacingSmall));
    right: calc(-1 * var(--spacingSmall));
  }
</style>

<ul>
  {#each books as book}
    <li on:click={() => onBookSelect({ book })} key={book.id}>
      <BookCover {book} />
      {#if book.favorite}
        <div class="heart">
          <Heart />
        </div>
      {/if}
    </li>
  {/each}
</ul>
