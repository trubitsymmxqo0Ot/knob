import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      'shared': path.resolve(__dirname, './src/shared'),
      'app': path.resolve(__dirname, './src/app'),
      'widgets': path.resolve(__dirname, './src/widgets'),
      'entities': path.resolve(__dirname, './src/entities'),
      'features': path.resolve(__dirname, './src/features'),
      'pages': path.resolve(__dirname, './src/pages')
    }
  },
})
