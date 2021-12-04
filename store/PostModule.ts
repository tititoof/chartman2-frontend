import { Module, VuexModule, VuexAction } from 'nuxt-property-decorator'
import { config } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'

// Set rawError to true by default on all @Action decorators
config.rawError = true

@Module({
  name: 'PostModule',
  stateFactory: true,
  namespaced: true
})
export default class PostModule extends VuexModule {
  @VuexAction
  async create (payload: any): Promise<any> {
    return await $axios.$post('/posts', payload)
  }

  @VuexAction
  async find (id: number): Promise<any> {
    return await $axios.$get('/posts/' + id)
  }

  @VuexAction
  async findAll (): Promise<any> {
    return await $axios.$get('/posts')
  }

  @VuexAction
  async destroy (id: number): Promise<any> {
    return await $axios.$delete('/posts/' + id)
  }

  @VuexAction
  async update (id: number, payload: any): Promise<any> {
    return await $axios.$put('/posts/' + id, payload)
  }
}
