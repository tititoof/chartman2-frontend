import { Module, VuexModule, VuexAction } from 'nuxt-property-decorator'
import { config } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'

// Set rawError to true by default on all @Action decorators
config.rawError = true

@Module({
  name: 'VisitorModule',
  stateFactory: true,
  namespaced: true
})
export default class CategoryModule extends VuexModule {
  @VuexAction
  async findAllCategories () {
    return await $axios.$get('/visitors/categories')
  }

  @VuexAction
  async findArticle (id: number) {
    return await $axios.$get(`/visitors/article/${id}`)
  }

  @VuexAction
  async findArticlesFromCategory (id: number) {
    return await $axios.$get(`/visitors/articles/${id}`)
  }

  @VuexAction
  async findCategory (id: number) {
    return await $axios.$get(`/visitors/category/${id}`)
  }
}
