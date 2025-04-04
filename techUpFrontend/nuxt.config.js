// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // npm run generate를 위한 설정정
  // nitro: {
  //   preset: 'static'
  // },

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
