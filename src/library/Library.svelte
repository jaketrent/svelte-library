<script>
  import Button from "../common/Button.svelte";
  import BookGrid from "./BookGrid.svelte";
  import Title from "./Title.svelte";

  export let onStateChange = () => {};

  const books = [
    {
      id: 1,
      title: "Little Women",
      author: "Louisa May Alcott",
      cover: "",
      about: "This is an about"
    },
    {
      id: 2,
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      cover: "",
      about: "This is an about"
    },
    {
      id: 3,
      title: "Grapes of Wrath",
      author: "John Steinbeck",
      cover: "",
      about: "This is an about"
    },
    {
      id: 4,
      title: "To Kill a Mocking Bird",
      author: "Harper Lee",
      cover: "https://i.imgur.com/BPmn7bUm.jpg",
      about: "This is an about"
    },
    {
      id: 5,
      title: "Moby Dick",
      author: "Hermann Melville",
      cover: "",
      about: "This is an about"
    }
  ];
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

<Button>+ Add Book</Button>

<BookGrid {books} onBookSelect={args => onStateChange('detail', args)} />
