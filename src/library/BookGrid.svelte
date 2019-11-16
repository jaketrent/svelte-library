<script>
  import BookCover from "../common/BookCover.svelte";

  export let books = [];
  export let onBookSelect = () => {};

  const variationsCount = 3;
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
  {#each books as book, i}
    <li on:click={() => onBookSelect({ book })}>
      <BookCover {book} variation={i % variationsCount} />
    </li>
  {/each}
</ul>
