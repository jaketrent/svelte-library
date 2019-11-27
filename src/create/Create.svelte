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

<BackButtonRow on:page-change />

<Header element="h1" size="large">Create</Header>

<form
  on:submit|preventDefault={_ => {
    dispatch('create', { book });
    dispatch('page-change', { page: 'library' });
  }}>

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
