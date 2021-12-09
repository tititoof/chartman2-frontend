import { namespace } from 'nuxt-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { Store } from 'vuex'
import { createStore } from '~/.nuxt/store'
import MainStore from '~/store/MainStore'

const mockAxiosGetResult = { data: { id: '5', type: 'post', attributes: { title: 'yy', description: 'description', content: 'tt' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [] } } } }
jest.mock('axios', () => ({
  $get: () => Promise.resolve(mockAxiosGetResult.data)
}))

describe('PostStore', () => {
  const store: Store<any> = createStore()
  let mainStore: any = namespace('MainStore')

  beforeEach(() => {
    mainStore = getModule(MainStore, store)
  })

  test('snackbar visible', () => {
    mainStore.setSnackbar(true)
    expect(mainStore.isSnackbarVisible).toBeTruthy()
  })

  test('findAll', () => {
    mainStore.setSnackbarText('toto')
    expect(mainStore.getSnackbarText).toEqual('toto')
  })

  test('showSnackbar', () => {
    mainStore.showSnackbar('toto')
    expect(mainStore.getSnackbarText).toEqual('toto')
    expect(mainStore.isSnackbarVisible).toBeTruthy()
  })

  test('closeSnackbar', () => {
    mainStore.closeSnackbar()
    expect(mainStore.isSnackbarVisible).toBeTruthy()
  })
})
