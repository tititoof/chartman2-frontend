import { namespace } from 'nuxt-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { Store } from 'vuex'
import { createStore } from '~/.nuxt/store'
import VisitorModule from '~/store/VisitorModule'

const mockAxiosGetResult = { data: { id: '5', type: 'post', attributes: { title: 'yy', description: 'description', content: 'tt' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [] } } } }
jest.mock('axios', () => ({
  $get: () => Promise.resolve(mockAxiosGetResult.data)
}))

describe('VisitorStore', () => {
  const store: Store<any> = createStore()
  let visitorStore: any = namespace('VisitorModule')

  beforeEach(() => {
    visitorStore = getModule(VisitorModule, store)
  })

  test('findAllCategories', () => {
    const axiosSpy = jest.spyOn(visitorStore, 'findAllCategories')
    visitorStore.findAllCategories()
    expect(axiosSpy).toBeCalledTimes(1)
  })

  test('findArticle', () => {
    const axiosSpy = jest.spyOn(visitorStore, 'findArticle')
    visitorStore.findArticle(1)
    expect(axiosSpy).toBeCalledTimes(1)
  })

  test('findArticlesFromCategory', () => {
    const axiosSpy = jest.spyOn(visitorStore, 'findArticlesFromCategory')
    visitorStore.findArticlesFromCategory(1)
    expect(axiosSpy).toBeCalledTimes(1)
  })

  test('findCategory', () => {
    const axiosSpy = jest.spyOn(visitorStore, 'findCategory')
    visitorStore.findCategory(1)
    expect(axiosSpy).toBeCalledTimes(1)
  })
})
