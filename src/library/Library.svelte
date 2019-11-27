<script>
  import Button from "../common/Button.svelte";
  import BookGrid from "./BookGrid.svelte";
  import Title from "./Title.svelte";

  export let books;
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

<BookGrid {books} />
