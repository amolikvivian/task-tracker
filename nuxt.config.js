export default {
  head: {
    title: 'task-tracker',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: ['@/assets/css/main.css'],

  // plugins: [{ src: '~/plugins/vuex-persist', ssr: false }],

  components: true,

  buildModules: ['@nuxtjs/tailwindcss'],

  modules: ['@nuxtjs/axios'],

  axios: {
    baseURL: 'http://localhost:8000',
  },
  router: {
    middleware: 'auth',
  },

  build: {},

  target: 'static',
}
