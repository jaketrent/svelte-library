<script>
  // TODO: fix cover image appearance
  export let book;
  export let interactive = false;

  function isValidUrl(url) {
    return url && /^https?:\/\/[^.]+\.(jpg|png|gif)$/.test(url);
  }
</script>

<style>
  .book {
    --bg: #f5c839;
    --bgDark: #f3b131;
    --bgLight: #ffde77;

    background-image: linear-gradient(
      to right,
      var(--bgLight) 10%,
      var(--bg) 20%
    );
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 4px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    color: #000;
    font-size: var(--typeSizeLarge);
    overflow: hidden;
    position: relative;
    width: 100%;
    text-align: left;
    text-transform: uppercase;
    text-shadow: 2px 2px 0 #fff;
    transition: all 150ms;
  }

  .book--no-cover::after {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    content: " ";
    background: linear-gradient(to right, var(--bg) 50%, var(--bgDark));
    width: 10%;
  }

  .book--variation-1 {
    --bg: #ea7025;
    --bgDark: #d7480b;
    --bgLight: #fb9c61;
  }
  .book--variation-2 {
    --bg: #76c267;
    --bgDark: #57b356;
    --bgLight: #a6e69a;
  }

  .book--interactive {
    border: none;
    cursor: pointer;
  }
  .book--interactive:hover,
  .book--interactive:focus {
    filter: brightness(85%);
  }

  .content,
  .title,
  .author {
    display: block;
  }
  .content {
    position: absolute;
    top: 3rem;
    left: 0;
    padding-left: calc(10% + var(--spacingSmall));
  }

  .title {
    font-size: var(--typeSizeXLarge);
    font-weight: var(--typeWeightBold);
    line-height: var(--typeLineHeightTight);
    margin-bottom: var(--spacingMedium);
  }
  .author {
    letter-spacing: 0.25em;
  }
</style>

{#if interactive}
  <button
    on:click
    class="book book--variation-{book.variation} book--interactive {isValidUrl(book.cover) ? 'book--cover' : 'book--no-cover'}"
    style={isValidUrl(book.cover) ? 'background-image: url(' + book.cover + ')' : ''}>
    <span class="content">
      <span class="title">{book.title || ''}</span>
      <span class="author">{book.author || ''}</span>
    </span>
  </button>
{:else}
  <article
    class="book book--variation-{book.variation}
    {isValidUrl(book.cover) ? 'book--cover' : 'book--no-cover'}"
    style={isValidUrl(book.cover) ? 'background-image: url(' + book.cover + ')' : ''}>
    <div class="content">
      <header>
        <h2 class="title">{book.title || ''}</h2>
      </header>
      <div class="author">{book.author || ''}</div>
    </div>
  </article>
{/if}
