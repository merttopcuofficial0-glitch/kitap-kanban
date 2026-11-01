import { useMemo, useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import { STATUSES, STORAGE_KEY } from './constants'
import BookForm from './components/BookForm'
import Column from './components/Column'

function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

export default function App() {
  const [books, setBooks] = useLocalStorage(STORAGE_KEY, [])
  const [query, setQuery] = useState('')

  const addBook = ({ title, author, coverUrl }) => {
    const book = {
      id: createId(),
      title,
      author,
      coverUrl,
      status: STATUSES[0].key,
      createdAt: Date.now(),
    }
    setBooks((prev) => [book, ...prev])
  }

  // step: -1 bir önceki sütun, +1 bir sonraki sütun
  const moveBook = (id, step) => {
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id !== id) return book
        const current = STATUSES.findIndex((s) => s.key === book.status)
        const next = Math.min(Math.max(current + step, 0), STATUSES.length - 1)
        return { ...book, status: STATUSES[next].key }
      }),
    )
  }

  const deleteBook = (id) => {
    const book = books.find((b) => b.id === id)
    if (book && window.confirm(`"${book.title}" silinsin mi?`)) {
      setBooks((prev) => prev.filter((b) => b.id !== id))
    }
  }

  const visibleBooks = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr')
    if (!q) return books
    return books.filter(
      (b) =>
        b.title.toLocaleLowerCase('tr').includes(q) ||
        b.author.toLocaleLowerCase('tr').includes(q),
    )
  }, [books, query])

  const doneCount = books.filter((b) => b.status === 'done').length
  const progress = books.length ? Math.round((doneCount / books.length) * 100) : 0

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Kitap Kanban</h1>
          <p className="subtitle">Okuma listeni üç sütunda takip et.</p>
        </div>

        <div className="summary" aria-live="polite">
          <strong>{books.length}</strong> kitap · <strong>{doneCount}</strong> bitti · %{progress}
          <div className="progress" aria-hidden="true">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </header>

      <BookForm onAdd={addBook} />

      <div className="toolbar">
        <input
          type="search"
          className="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kitap veya yazar ara..."
          aria-label="Kitap veya yazar ara"
        />
      </div>

      <main className="board">
        {STATUSES.map((status) => (
          <Column
            key={status.key}
            status={status}
            books={visibleBooks.filter((b) => b.status === status.key)}
            onMove={moveBook}
            onDelete={deleteBook}
          />
        ))}
      </main>
    </div>
  )
}
