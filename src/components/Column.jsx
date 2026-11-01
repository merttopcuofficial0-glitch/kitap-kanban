import BookCard from './BookCard'
import { STATUSES } from '../constants'

export default function Column({ status, books, onMove, onDelete }) {
  const index = STATUSES.findIndex((s) => s.key === status.key)

  return (
    <section className={`column column-${status.key}`} aria-label={status.label}>
      <header className="column-header">
        <h2>{status.label}</h2>
        <span className="count">{books.length}</span>
      </header>

      <div className="column-list">
        {books.length === 0 ? (
          <p className="empty">Bu sütunda henüz kitap yok.</p>
        ) : (
          books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isFirst={index === 0}
              isLast={index === STATUSES.length - 1}
              onMove={onMove}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  )
}
