import { Plugin } from '@nuxt/types'
import Auth from '~/api/auth'
import Articles from '~/api/articles'
import Categories from '~/api/categories'
import Posts from '~/api/post'

declare module 'vue/types/vue' {
  // this.$api inside Vue components
  interface Vue {
    $api: any
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$api inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $api: any
  }
  // nuxtContext.$api
  interface Context {
    $api: any
  }
}

declare module 'vuex/types/index' {
  // this.$api inside Vuex stores
  interface Store<S> {
    $api: any
  }
}

const ch2ApiPlugin: Plugin = (context, inject) => {
  const factories = {
    auth: Auth(context.$axios),
    categories: Categories(context.$axios),
    articles: Articles(context.$axios),
    posts: Posts(context.$axios)
  }

  inject('api', factories)
}

export default ch2ApiPlugin
