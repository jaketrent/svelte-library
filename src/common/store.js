import { writable } from 'svelte/store'

function createBooks() {
  const { subscribe, set, update: up } = writable([])

  let books = []
  subscribe(val => (books = val))

  return {
    subscribe,
    add(book) {
      up(books => {
        return [book, ...books]
      })
    },
    set,
    find(id) {
      return books.find(book => book.id === parseInt(id, 10))
    },
    update(book) {
      up(cache => {
        const i = cache.findIndex(b => b.id === book.id)
        cache = [...cache.slice(0, i), book, ...cache.slice(i + 1)]
        return [...cache]
      })
    },
    exist() {
      return books.length > 0
    }
  }
}

export const books = createBooks()
