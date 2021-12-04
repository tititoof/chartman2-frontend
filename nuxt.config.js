import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - chartman2',
    title: 'chartman2',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/axios-accessor.ts',
    '~/plugins/filters.js',
    "~/plugins/api.js" 
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
    debug: false,
    proxyHeaders: true,
    headers: {
      common: {
        client: '',
        'access-token': '',
        uid: '',
        'token-type': ''
      }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      icons: 'mdi'
    },
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: colors.blue.lighten1,
          accent: colors.grey.lighten2,
          secondary: colors.amber.lighten1,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.lighten1,
          success: colors.green.lighten1
        }
      }
    }
  },

  // Auth configuration
  auth: {
    cookie: false,
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'client',
          maxAge: 1800
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'user'
          // autoFetch: true
        },
        endpoints: {
          // login: { url: '/auth/sign_in', method: 'post', propertyName: false },
          login: { url: '/auth/sign_in', method: 'post' },
          logout: { url: '/auth/sign_out', method: 'delete' },
          user: { url: '/auth/validate_token', method: 'get', propertyName: 'data' },
          refresh: { url: '/auth/sign_in', method: 'get' }
        },
        tokenRequired: true,
        tokenType: 'bearer',
        autoFetchUser: true
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/applications'
    },
    localStorage: {
      prefix: 'chartman2_auth.'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
