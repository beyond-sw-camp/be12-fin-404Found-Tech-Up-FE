export default defineNuxtPlugin((nuxtApp) => {
    const token = useCookie('ATOKEN').value;
    const axios = nuxtApp.$axios;
    
    if (axios) {
      axios.onRequest((config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });
    }
  });
  