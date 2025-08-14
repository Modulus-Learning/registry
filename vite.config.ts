import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart({ customViteReactPlugin: true, target: 'node-server' }),
    viteReact(),
    tailwindcss(),
  ],
  ssr: {
    noExternal: ['@infonomic/uikit'],
  },
  build: {
    manifest: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Use content hash for CSS files to ensure consistency
          if (assetInfo?.names.some(name => name.endsWith('.css'))) {
            const cssName = assetInfo.names.find(name => name.endsWith('.css'));
            const baseName = cssName?.replace('.css', '') || 'unknown';
            return `assets/${baseName}-[hash][extname]`;
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
})
