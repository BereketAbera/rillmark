import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { watch: { ignored: ['**/test-results/**', '**/playwright-report/**', '**/docs/evidence/**'] } },
  resolve: { alias: [
    { find: /^rillmark\/(.+)$/, replacement: fileURLToPath(new URL('./packages/rillmark/src/ui/$1', import.meta.url)) },
    { find: '@/components/ui', replacement: fileURLToPath(new URL('./packages/rillmark/src/ui', import.meta.url)) },
    { find: '@/lib/rillmark-utils', replacement: fileURLToPath(new URL('./packages/rillmark/src/lib/rillmark-utils.ts', import.meta.url)) },
    { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
  ] },
  test: { environment: 'jsdom', setupFiles: ['tests/setup.ts'], include: ['tests/**/*.test.{ts,tsx}'] },
})
