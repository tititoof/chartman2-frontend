import { Module, VuexModule, VuexAction } from 'nuxt-property-decorator'
import { config } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'

// Set rawError to true by default on all @Action decorators
config.rawError = true

@Module({
  name: 'CategoryModule',
  stateFactory: true,
  namespaced: true
})
export default class CategoryModule extends VuexModule {
  @VuexAction
  async create (payload: any) {
    return await $axios.$post('/categories', payload)
  }

  @VuexAction
  async destroy (id: number) {
    return await $axios.$delete('/categories/' + id)
  }

  @VuexAction
  async findAll () {
    return await $axios.$get('/categories')
  }

  @VuexAction
  async find (id: number) {
    return await $axios.$get('/categories/' + id)
  }

  @VuexAction
  async update (id: number, payload: any) {
    return await $axios.$put('/categories/' + id, payload)
  }
}
