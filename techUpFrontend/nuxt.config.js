import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
  ],

  plugins: [
    { src: '~/plugins/ws.client.js', mode: 'client' },
  ],

  nitro: {
    devProxy: {
      '/api': {
        target: 'https://localhost:8443',
        secure: false,
        changeOrigin: true,
        prependPath: true,
      },
      '/rec': {
        target: 'http://192.0.40.205:8000',
        secure: false,
        changeOrigin: true,
        prependPath: true,
      },
    },
    preset: 'static',
    prerender: {
      ignore: [
        '/home-2',
        '/home-3',
        '/home-4',
        '/shop-categories',
        '/shop-list',
        '/shop-filter-offcanvas',
        '/product-details-video',
        '/product-details',
        '/product-details-swatches',
        '/product-details-gallery',
        '/product-details-list',
        '/product-details-slider',
        '/product-details-countdown',
        '/order',
        '/shop-1600',
        '/shop-full-width',
        '/shop-right-sidebar',
        '/shop-no-sidebar',
        '/shop-filter-dropdown'
      ]
    }
  },

  devtools: {
    enabled: true
  },

  app: {
    head: {
      title: 'Tech Up',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js'
        }
      ]
    }
  },

  vite: {
    define: {
      global: 'window',
    },
    ssr: {
      noExternal: ['vuetify']
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
        '@core': fileURLToPath(new URL('./@core', import.meta.url)),
        '@layouts': fileURLToPath(new URL('./@layouts', import.meta.url)),
        '@/images': fileURLToPath(new URL('./public/images/', import.meta.url)),
        '@styles': fileURLToPath(new URL('./assets/styles/', import.meta.url)),
        '@configured-variables': fileURLToPath(new URL('./assets/styles/variables/_template.scss', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api']
        }
      }
    }
  },

  css: [
    '@core/scss/template/index.scss',
    '@styles/styles.scss',
    '@/plugins/iconify/icons.css',
    '@layouts/styles/index.scss',
    '@/assets/css/font-awesome-pro.css',
    '@/assets/css/flaticon_techup.css',
    '@/assets/scss/main.scss'
  ],

  compatibilityDate: '2025-01-27'
})
