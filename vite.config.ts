import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // 关键：让资源用相对路径
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
