import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    autoClose: 5000,
    position: 'top-right',
    theme: 'light', // 또는 'dark'
    pauseOnHover: true,
    closeOnClick: true,
    transition: 'zoom', // 'slide', 'flip', 'bounce' 등 가능
    hideProgressBar: false
  })

  // 전역으로 사용하기 위해 provide에 등록 (선택)
  nuxtApp.provide('toast', toast)
})
