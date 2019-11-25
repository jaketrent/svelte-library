<script>
  export let book;
  // TODO: tie variation permanently to book
  export let variation = 0;

  function isValidUrl(url) {
    return url && /^https?:\/\/[^.]+\.(jpg|png|gif)$/.test(url);
  }
</script>

<style>
  article {
    background-image: linear-gradient(
      to right,
      var(--bgLight) 10%,
      var(--bg) 20%
    );
    border-radius: 4px;
    color: #000;
    font-size: var(--typeSizeLarge);
    overflow: hidden;
    padding: 3rem 0 0 0;
    position: relative;
    width: 100%;
    text-transform: uppercase;
    text-shadow: 2px 2px 0 #fff;
    background-size: cover;
    background-repeat: norepeat;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  }
  article.noCover::after {
    position: absolute;
    top: 0;
    height: 100%;
    content: " ";
    background: linear-gradient(to right, var(--bg) 50%, var(--bgDark));
    width: 10%;
  }
  article.book0 {
    --bg: #f5c839;
    --bgDark: #f3b131;
    --bgLight: #ffde77;
  }
  article.book1 {
    --bg: #ea7025;
    --bgDark: #d7480b;
    --bgLight: #fb9c61;
  }
  article.book2 {
    --bg: #76c267;
    --bgDark: #57b356;
    --bgLight: #a6e69a;
  }
  .content {
    position: absolute;
    padding-left: calc(10% + var(--spacingSmall));
  }
  h2 {
    font-size: var(--typeSizeXLarge);
    line-height: var(--typeLineHeightTight);
    margin-bottom: var(--spacingMedium);
  }
  .author {
    letter-spacing: 0.25em;
  }
</style>

<article
  class="book{variation}
  {isValidUrl(book.cover) ? 'hasCover' : 'noCover'}"
  style={isValidUrl(book.cover) ? 'background-image: url(' + book.cover + ')' : ''}>
  <div class="content">
    <header>
      <h2>{book.title || ''}</h2>
    </header>
    <div class="author">{book.author || ''}</div>
  </div>
</article>
