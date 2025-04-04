// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //npm run generate를 위한 설정정
  nitro: {
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

  devtools: { enabled: true },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore']
        ]
      }
    ]
  ],

  app: {
    head: {
      title: "Tech Up",
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
        }
      ]
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["legacy-js-api"]
        }
      }
    }
  },

  css: [
    "@/assets/css/font-awesome-pro.css",
    "@/assets/css/flaticon_techup.css",
    "@/assets/scss/main.scss"
  ],

  compatibilityDate: "2025-01-27"
});
