import { useState } from 'react'

// Aynı başlık her zaman aynı rengi üretsin diye metinden bir ton (hue) hesaplanır.
function hueFromText(text) {
  let hash = 0
  for (const ch of text) {
    hash = (hash * 31 + ch.charCodeAt(0)) % 360
  }
  return hash
}

export default function BookCard({ book, isFirst, isLast, onMove, onDelete }) {
  const [imgFailed, setImgFailed] = useState(false)
  const showImage = book.coverUrl && !imgFailed
  const initial = book.title.trim().charAt(0).toLocaleUpperCase('tr')

  return (
    <article className="card">
      <div className="cover" style={{ '--hue': hueFromText(book.title) }}>
        {showImage ? (
          <img
            src={book.coverUrl}
            alt={`${book.title} kapağı`}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="cover-initial" aria-hidden="true">
            {initial}
          </span>
        )}
      </div>

      <div className="card-body">
        <h3 className="card-title">{book.title}</h3>
        <p className="card-author">{book.author}</p>

        <div className="card-actions">
          <button
            type="button"
            className="btn btn-small"
            onClick={() => onMove(book.id, -1)}
            disabled={isFirst}
            aria-label={`${book.title} kitabını bir önceki sütuna taşı`}
          >
            ← Geri
          </button>
          <button
            type="button"
            className="btn btn-small btn-primary"
            onClick={() => onMove(book.id, 1)}
            disabled={isLast}
            aria-label={`${book.title} kitabını bir sonraki sütuna taşı`}
          >
            İleri →
          </button>
          <button
            type="button"
            className="btn btn-small btn-danger"
            onClick={() => onDelete(book.id)}
            aria-label={`${book.title} kitabını sil`}
          >
            Sil
          </button>
        </div>
      </div>
    </article>
  )
}
