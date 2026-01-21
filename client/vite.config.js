import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // ✅ important for Vercel/static deployment
  define: {
    'process.env': process.env
  },
  plugins: [react()],
  build: {
    outDir: 'dist',
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
})
