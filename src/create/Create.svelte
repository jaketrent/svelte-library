<script>
  import { createEventDispatcher } from "svelte";

  import BackButtonRow from "../common/BackButtonRow.svelte";
  import BookCover from "../common/BookCover.svelte";
  import Button from "../common/Button.svelte";
  import Header from "../common/Header.svelte";
  import TextInput from "./TextInput.svelte";

  const dispatch = createEventDispatcher();

  // TODO: handle edit
  let title;
  let author;
  let cover;
  let about;

  $: book = { title, author, cover, about };
</script>

<style>
  form {
    display: grid;
    grid-auto-rows: auto;
    gap: var(--spacingMedium);
  }
  .submit-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .book-container {
    display: grid;
    grid-template-rows: minmax(20vh, 20rem);
    grid-template-columns: minmax(50vw, 20rem);
  }
</style>

<BackButtonRow on:page-change />

<Header element="h1" size="large">Create</Header>

<form
  on:submit|preventDefault={_ => {
    dispatch('create', { book });
    dispatch('page-change', { page: 'library' });
  }}>

  <TextInput label="Title" bind:value={title} />
  <TextInput label="Author" bind:value={author} />
  <TextInput label="Cover URL" bind:value={cover} />
  <TextInput label="About" bind:value={about} multiline />

  <div class="submit-row">
    <Header>Preview</Header>
    <Button>Save</Button>
  </div>

  <div class="book-container">
    <BookCover {book} />
  </div>

</form>
