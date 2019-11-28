let cache = []

export function addBook(book) {
  cache = [book, ...cache]
  return [...cache]
}

export function setBooks(books) {
  cache = books
  return [...cache]
}

export function allBooks() {
  return [...cache]
}

export function findBook(id) {
  return cache.find(book => book.id === parseInt(id, 10))
}

export function updateBook(book) {
  const i = cache.findIndex(b => b.id === book.id)
  cache = [...cache.slice(0, i), book, ...cache.slice(i + 1)]
  return [...cache]
}

export function hasBooks() {
  return cache.length > 0
}
