/* eslint-disable import/namespace */
import colors from 'vuetify/es5/util/colors'
import { getRoutes } from './utils/sitemap'

export default {
  server: {
    host: '127.0.0.1', // default: localhost
    port: 3000 // default: 3000
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'chartman2.fr',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'description', name: 'description', content: 'Website chartman2.fr' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:url', name: 'og:url', content: process.env.WEBSITE_URL },
      { hid: 'og:title', name: 'og:title', content: 'chartman2.fr' },
      { hid: 'og:site_name', name: 'og:site_name', content: 'chartman2.fr' },
      { hid: 'og:locale', name: 'og:locale', content: 'fr_FR' },
      { hid: 'og:image', name: 'og:image', content: `${process.env.WEBSITE_URL}/android-chrome-512x512.png` },
      { hid: 'og:keywords', name: 'og:keywords', content: 'Ruby, NuxtJS, Jenkins, Gitea, SonarQube, OpenProject, DevOps' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: [
  //   '~/node_modules/highlight.js/styles/tomorrow-night-eighties.css'
  // ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/axios-accessor.ts',
    '~/plugins/filters.js',
    '~/plugins/api.ts'
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    // https://github.com/nuxt-community/dayjs-module
    '@nuxtjs/dayjs',
    // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt#readme
    'cookie-universal-nuxt',
    'nuxt-vuex-localstorage',
    '@nuxtjs/markdownit',
    // https://www.npmjs.com/package/nuxt-vuex-localstorage
    // 'nuxt-vuex-localstorage'
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    ['nuxt-highlightjs', {
      style: 'obsidian',
      ssr: false
    }],
    [
      '@dansmaculotte/nuxt-security',
      {
        hsts: {
          maxAge: 15552000,
          includeSubDomains: true,
          preload: true
        },
        csp: {
          directives: {
            defaultSrc: ["https://chartman2.fr https://cdn.jsdelivr.net https://fonts.gstatic.com https://fonts.googleapis.com https://images.unsplash.com 'unsafe-inline' 'self'"],
            scriptSrc: ["https://chartman2.fr https://cdn.jsdelivr.net https://fonts.gstatic.com https://fonts.googleapis.com https://images.unsplash.com 'unsafe-inline' 'self'"],
            objectSrc: ["'unsafe-inline'"]
          },
          reportOnly: false
        },
        additionalHeaders: true
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
    debug: false,
    proxyHeaders: false,
    headers: {
      client: '',
      'access-token': '',
      uid: '',
      'token-type': ''
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
        scheme: 'local',
        token: {
          property: 'client',
          maxAge: 1800,
          global: true
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'data',
          autoFetch: false
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
        autoFetchUser: false
      }
    },
    redirect: {
      login: '/admin',
      logout: '/',
      callback: '/admin',
      home: '/'
    },
    localStorage: {
      prefix: 'chartman2_auth.'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  sitemap: {
    path: '/sitemap.xml', // L'emplacement de votre fichier sitemap.
    hostname: process.env.WEBSITE_URL, // L'adresse de votre site, que vous pouvez placer comme ici dans une variable d'environnement.
    cacheTime: 1000 * 60 * 15, // La durée avant que le sitemap soit regénéré. Ici 15mn.
    gzip: true,
    generate: false, // Génère une version statique du sitemap quand activé. À utiliser avec nuxt generate.
    exclude: [ // Les pages qu'on a pas trop envie de voir atterrir sur Google.
      '/admin/**',
      '/admin',
      '/authenticate',
      '/redirect'
    ],
    routes () {
      // Nous allons utiliser une fonction personnalisée pour charger nos routes dynamiques dans le sitemap.
      return getRoutes()
    }
  },

  robots: {
    Disallow: [
      '/authenticate',
      '/admin'
    ],
    Sitemap: `${process.env.WEBSITE_URL}/sitemap.xml`
  },

  // dayjs
  dayjs: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
    defaultTimeZone: 'Paris/Europe',
    plugins: [
      'utc',
      'timezone',
      'relativeTime'
    ] // Your Day.js plugin
  },

  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    use: [
      'markdown-it-div',
      'markdown-it-attrs',
      'markdown-it-highlightjs'
    ],
    injected: true
  }
}
