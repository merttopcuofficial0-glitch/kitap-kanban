import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' sayesinde derlenen proje Netlify, Vercel ve GitHub Pages
// (alt klasörde bile) sorunsuz çalışır.
export default defineConfig({
  base: './',
  plugins: [react()],
})
