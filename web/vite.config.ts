import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        globIgnores: ['**/node_modules/**/*'],
      },
      manifest: {
        name: 'Improvisator',
        short_name: 'Improv',
        description: 'Progressive web app for improv comedy practice',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon-192-maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: '/screenshot-wide.png',
            sizes: '540x720',
            type: 'image/png',
            form_factor: 'wide'
          },
          {
            src: '/screenshot-narrow.png',
            sizes: '270x540',
            type: 'image/png',
            form_factor: 'narrow'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@improvisator/core': path.resolve(__dirname, '../core/src/index.ts')
    }
  },
  server: {
    port: parseInt(process.env.VITE_PORT || '54321'),
    host: '0.0.0.0',
    open: false,
    watch: {
      usePolling: true
    }
  }
});
