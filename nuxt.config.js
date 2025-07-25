export default {
  target: 'static',

  generate: {
    fallback: true,
    dir: 'dist'
  },

  buildModules: [
    '@nuxt/image',
  ],

  modules: [
    '@nuxt/image',
  ],
  image: {
    provider: 'static',
  },

  css: [
    '~/main.scss',
  ],
}