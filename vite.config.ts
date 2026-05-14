import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: [
    { find: '@/components/ui', replacement: fileURLToPath(new URL('./registry/rillmark/ui', import.meta.url)) },
    { find: '@/lib/utils', replacement: fileURLToPath(new URL('./registry/rillmark/lib/utils.ts', import.meta.url)) },
    { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
  ] },
  test: { environment: 'jsdom', setupFiles: ['tests/setup.ts'], include: ['tests/**/*.test.{ts,tsx}'] },
})
