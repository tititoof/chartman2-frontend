import { namespace } from 'nuxt-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { Store } from 'vuex'
import { createStore } from '~/.nuxt/store'
import PostModule from '~/store/PostModule'

const mockAxiosGetResult = { data: { id: '5', type: 'post', attributes: { title: 'yy', description: 'description', content: 'tt' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [] } } } }
jest.mock('axios', () => ({
  $get: () => Promise.resolve(mockAxiosGetResult.data)
}))

describe('PostStore', () => {
  const store: Store<any> = createStore()
  let postStore: any = namespace('PostModule')

  beforeEach(() => {
    postStore = getModule(PostModule, store)
  })

  test('find', () => {
    const axiosSpy = jest.spyOn(postStore, 'find')
    postStore.find(1)
    expect(axiosSpy).toBeCalledTimes(1)
  })

  test('findAll', () => {
    const axiosSpy = jest.spyOn(postStore, 'findAll')
    postStore.findAll()
    expect(axiosSpy).toBeCalledTimes(1)
  })

  test('update', () => {
    const axiosSpy = jest.spyOn(postStore, 'update')
    postStore.update(1, { name: 'toto' })
    expect(axiosSpy).toBeCalledTimes(1)
  })
})
