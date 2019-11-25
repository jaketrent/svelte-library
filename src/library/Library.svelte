<script>
  import { createEventDispatcher } from "svelte";

  import Button from "../common/Button.svelte";
  import BookGrid from "./BookGrid.svelte";
  import Title from "./Title.svelte";

  export let books;

  const dispatch = createEventDispatcher();
</script>

<style>
  .greeting {
    font-size: var(--typeSizeSmall);
  }
</style>

<Title />

<p class="greeting">
  This is a library for the people. Welcome. Read the books here. Be inspired.
  Go homn, and share them with your family.
</p>

<Button on:click={_ => dispatch('page-change', { to: 'create' })}>
  + Add Book
</Button>

<BookGrid
  {books}
  onBookSelect={args => dispatch('page-change', { to: 'detail', args })} />
