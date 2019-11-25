<script>
  import Button from "../common/Button.svelte";
  import BookGrid from "./BookGrid.svelte";
  import Title from "./Title.svelte";

  export let books;
  export let onStateChange = () => {};
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

<Button on:click={_ => onStateChange('create')}>+ Add Book</Button>

<BookGrid {books} onBookSelect={args => onStateChange('detail', args)} />
