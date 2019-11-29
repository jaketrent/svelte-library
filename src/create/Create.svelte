<script>
  import { getClient, query, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";
  import { navigate } from "svelte-routing";

  import BackButtonRow from "../common/BackButtonRow.svelte";
  import BookCover from "../common/BookCover.svelte";
  import Button from "../common/Button.svelte";
  import Header from "../common/Header.svelte";
  import TextInput from "./TextInput.svelte";

  let title;
  let author;
  let cover;
  let about;
  $: book = { title, author, cover, about };
  const client = getClient();

  async function handleSubmit(evt) {
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function isValid() {
      const required = ["title", "author", "about"];
      return required.reduce(
        (valid, field) => valid && book[field] && book[field].length > 0,
        true
      );
    }
    function getNextId(books = []) {
      return Math.max.apply(null, books.map(b => parseInt(b.id, 10))) + 1;
    }

    if (!isValid()) return;

    const fetchQuery = query(client, {
      query: gql`
        {
          allBooks(sortField: "id", sortOrder: "desc") {
            id
            title
            author
            cover
            about
            variation
            favorite
          }
        }
      `
    });
    fetchQuery.subscribe(async query => {
      const result = await query;
      const books = result.data.allBooks;

      const newBook = {
        ...book,
        id: getNextId(books),
        variation: getRandomInt(0, 2),
        favorite: false
      };

      await mutate(client, {
        // TODO: would be great if id wasn't required here, but I think json-graphql-server is requiring it with ID!
        // TODO: is there a way to make this less cumbersome?
        mutation: gql`
        mutation {
          createBook(id: ${newBook.id}, title: "${newBook.title}", author: "${newBook.author}", cover: "${newBook.cover}", about: "${newBook.about}", variation: ${newBook.variation}, favorite: ${newBook.favorite}) {
            id
            title
            author
            cover
            about
            variation
            favorite
          }
        }
      `
      });
      // TODO: get this new book added to the graphql store list of book entities (library page)

      navigate("/");
    });
  }
</script>

<style>
  form {
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: 1fr;
    gap: var(--spacingXLarge);
  }
  .fields {
    display: grid;
    grid-auto-rows: auto;
    gap: var(--spacingMedium);
  }
  .preview {
    display: grid;
    grid-template-columns: minmax(20vw, 10rem);
    grid-template-rows: minmax(32vw, 16rem);
  }
  @media (min-width: 48rem) {
    form {
      grid-template-columns: 60vw 20vw;
    }
  }
</style>

<BackButtonRow />

<Header element="h1" size="large">Create</Header>

<form on:submit|preventDefault={handleSubmit}>
  <div class="fields">
    <TextInput label="Title" bind:value={title} />
    <TextInput label="Author" bind:value={author} />
    <TextInput label="Cover URL" bind:value={cover} />
    <TextInput label="About" bind:value={about} multiline />
    <div>
      <Button>Save</Button>
    </div>
  </div>

  <div>
    <Header>Preview</Header>
    <div class="preview">
      <BookCover {book} />
    </div>
  </div>
</form>
