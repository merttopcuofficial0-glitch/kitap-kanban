import { useState } from 'react'

const EMPTY = { title: '', author: '', coverUrl: '' }

export default function BookForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const title = form.title.trim()
    const author = form.author.trim()
    const coverUrl = form.coverUrl.trim()

    if (!title || !author) {
      setError('Kitap adı ve yazar adı boş bırakılamaz.')
      return
    }
    if (coverUrl && !/^https?:\/\//i.test(coverUrl)) {
      setError('Kapak bağlantısı http:// veya https:// ile başlamalı.')
      return
    }

    onAdd({ title, author, coverUrl })
    setForm(EMPTY)
    setError('')
  }

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">Yeni kitap ekle</h2>

      <div className="form-grid">
        <label className="field">
          <span>Kitap adı</span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Örn. Sefiller"
            autoComplete="off"
          />
        </label>

        <label className="field">
          <span>Yazar</span>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Örn. Victor Hugo"
            autoComplete="off"
          />
        </label>

        <label className="field">
          <span>Kapak bağlantısı (isteğe bağlı)</span>
          <input
            name="coverUrl"
            type="url"
            value={form.coverUrl}
            onChange={handleChange}
            placeholder="https://..."
            autoComplete="off"
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Ekle
        </button>
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
