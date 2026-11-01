# Kitap Kanban

Okumak istediğim, şu an okuduğum ve bitirdiğim kitapları **Okunacak / Okunuyor / Bitti** sütunlarında takip ettiğim küçük bir kanban uygulaması. Web Geliştirme; Yapay Zeka eğitim programının proje ödevi olarak hazırladım.

- **Canlı site:** https://6ae72094567c8a1c84787801--sage-kleicha-cf6211.netlify.app/
- **GitHub:** https://github.com/merttopcuofficial0-glitch/kitap-kanban
![Kitap Kanban ekran görüntüsü](docs/ekran-goruntusu.png)

## Özellikler

- Kitap adı, yazar ve (isteğe bağlı) kapak bağlantısıyla kitap ekleme
- Kapak bağlantısı yoksa ya da yüklenemezse, kitap adına göre renklenen harfli kapak
- Kartlardaki **← Geri** ve **İleri →** butonlarıyla durum değiştirme
- Silmeden önce onay isteme
- Kitap veya yazara göre arama
- Üstte toplam kitap sayısı, biten kitap sayısı ve ilerleme çubuğu
- Veriler **LocalStorage**'da saklanır; sayfayı yenileyince kaybolmaz
- Mobil, tablet ve masaüstünde çalışan duyarlı tasarım

## Kullanılan Teknolojiler

- React (Vite ile kurulum)
- Saf CSS (CSS değişkenleri, Grid, Flexbox, medya sorguları)
- LocalStorage (özel `useLocalStorage` hook'u)
- Netlify / Vercel / GitHub Pages ile yayına alınabilir statik çıktı

## Kurulum

Node.js yüklü olmalı.

```bash
git clone GITHUB-DEPO-LİNKİNİ-BURAYA-YAZ
cd kitap-kanban

# Bağımlılıkları kur
npm install react react-dom
npm install -D vite @vitejs/plugin-react

# Geliştirme sunucusunu başlat
npm run dev
```

Üretim derlemesi için:

```bash
npm run build     # çıktı dist/ klasörüne alınır
npm run preview   # derlenen çıktıyı yerelde dener
```

## Klasör Yapısı

```
src/
├── main.jsx               # Uygulamanın giriş noktası
├── App.jsx                # Ana durum (state) ve sayfa düzeni
├── constants.js           # Sütun tanımları ve LocalStorage anahtarı
├── index.css              # Tüm stiller
├── hooks/
│   └── useLocalStorage.js # State'i LocalStorage ile eşleyen hook
└── components/
    ├── BookForm.jsx       # Kitap ekleme formu ve doğrulama
    ├── Column.jsx         # Tek bir kanban sütunu
    └── BookCard.jsx       # Kitap kartı (kapak, butonlar)
```

## Veri Modeli

```js
{
  id: 'string',
  title: 'string',
  author: 'string',
  coverUrl: 'string',            // boş olabilir
  status: 'todo' | 'reading' | 'done',
  createdAt: 1700000000000       // zaman damgası
}
```

## Yayına Alma

1. Projeyi GitHub'da public bir depoya yükle.
2. Netlify veya Vercel'de depoyu bağla.
3. Build komutu: `npm run build`, yayın klasörü: `dist`.
4. Oluşan canlı linki bu README'nin en üstüne yaz.

`vite.config.js` içinde `base: './'` ayarlı olduğu için GitHub Pages gibi alt klasörlü yayınlarda da çalışır.

## Yapay Zeka Kullanımı

Bu projede yapay zeka asistanı olarak **Claude** kullandım.

- **Planlama:** Uygulama fikrini, üç ekranlık yapıyı (form, arama, kanban panosu) ve veri modelini Claude ile birlikte netleştirdim.
- **Geliştirme:** Proje iskeletini, `useLocalStorage` hook'unu, `BookForm`, `Column`, `BookCard` bileşenlerini ve duyarlı CSS'i Claude'a ürettirdim; ardından kodu okuyup nasıl çalıştığını anlamaya çalıştım.
- **Dokümantasyon:** Bu README'nin ilk taslağını Claude ile hazırladım, sonra kendi projeme göre düzenledim.

Yapay zekanın ürettiği kodu olduğu gibi kullanmadım; çalıştırıp denedim ve gerektiğinde değiştirdim.
