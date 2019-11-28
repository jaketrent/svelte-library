<script>
  import { onMount } from "svelte";

  import { allBooks, hasBooks, setBooks } from "../common/store.js";
  import Button from "../common/Button.svelte";
  import BookGrid from "./BookGrid.svelte";
  import { httpGet } from "../common/api.js";
  import Title from "./Title.svelte";

  export let books = allBooks();

  onMount(async function fetchBooks() {
    if (!hasBooks()) {
      const { data } = await httpGet("/?_sort=id&_order=desc");
      books = setBooks(data);
    }
  });
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
