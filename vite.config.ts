import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue-todo-pwa/',
  plugins: [
    vue(),
    VitePWA({    
      manifest: { 
        icons: [{
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png'
        }, {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        }, {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'  
        }, {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith("/ecanquiz/vue-todo-pwa");
            },
            //urlPattern: /^https:\/.my-json-server\.typicode\.com/,
            handler: "CacheFirst" as const,
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
