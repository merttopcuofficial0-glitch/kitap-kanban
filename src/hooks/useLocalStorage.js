import { useEffect, useState } from 'react'

// useState gibi çalışır, fakat değeri LocalStorage'a da kaydeder.
// LocalStorage kapalıysa veya bozuk veri varsa uygulama çökmez,
// başlangıç değeriyle devam eder.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw !== null ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Kota dolmuş veya erişim engellenmiş olabilir; sessizce geç.
    }
  }, [key, value])

  return [value, setValue]
}
