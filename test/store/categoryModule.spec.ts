import { namespace } from 'nuxt-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { Store } from 'vuex'
import { createStore } from '~/.nuxt/store'
import CategoryModule from '~/store/CategoryModule'

const mockAxiosGetResult = { data: { id: '5', type: 'post', attributes: { title: 'yy', description: 'description', content: 'tt' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [] } } } }
jest.mock('axios', () => ({
  $get: () => Promise.resolve(mockAxiosGetResult.data)
}))

describe('PostStore', () => {
  const store: Store<any> = createStore()
  let categoryStore: any = namespace('CategoryModule')

  beforeEach(() => {
    categoryStore = getModule(CategoryModule, store)
  })

  test('create', () => {
    const axiosSpy = jest.spyOn(categoryStore, 'create')
    categoryStore.create()
    expect(axiosSpy).toBeCalledTimes(1)
  })

  test('destroy', () => {
    const axiosSpy = jest.spyOn(categoryStore, 'destroy')
    categoryStore.destroy(1)
    expect(axiosSpy).toBeCalledTimes(1)
  })

  test('findAll', () => {
    const axiosSpy = jest.spyOn(categoryStore, 'findAll')
    categoryStore.findAll()
    expect(axiosSpy).toBeCalledTimes(1)
  })

  test('find', () => {
    const axiosSpy = jest.spyOn(categoryStore, 'find')
    categoryStore.find(1)
    expect(axiosSpy).toBeCalledTimes(1)
  })

  test('update', () => {
    const axiosSpy = jest.spyOn(categoryStore, 'update')
    categoryStore.update(1, { name: 'toto' })
    expect(axiosSpy).toBeCalledTimes(1)
  })
})
