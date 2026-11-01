// Sütunların sırası aynı zamanda durum geçiş sırasıdır:
// Okunacak -> Okunuyor -> Bitti
export const STATUSES = [
  { key: 'todo', label: 'Okunacak' },
  { key: 'reading', label: 'Okunuyor' },
  { key: 'done', label: 'Bitti' },
]

export const STORAGE_KEY = 'kitap-kanban:books'
