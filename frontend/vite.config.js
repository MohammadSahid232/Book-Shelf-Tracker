import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    babel({
      presets: [reactCompilerPreset()]
    })
  ],
  optimizeDeps: {
    include: ['react-is', 'recharts', 'react-pdf', 'pdfjs-dist']
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
})
