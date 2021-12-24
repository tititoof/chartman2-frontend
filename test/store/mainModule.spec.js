import { namespace } from 'nuxt-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { Store } from 'vuex'
import { createStore } from '~/.nuxt/store'
import MainStore from '~/store/MainStore'

describe('PostStore', () => {
  const store = createStore()
  let mainStore = namespace('MainStore')

  beforeEach(() => {
    mainStore = getModule(MainStore, store)
  })

  it('>> isSnackbarVisible', () => {
    mainStore.setSnackbar(true)

    expect(mainStore.isSnackbarVisible).toBeTruthy()
  })

  it('>> getSnackbarText', () => {
    mainStore.setSnackbarText('toto')

    expect(mainStore.getSnackbarText).toEqual('toto')
  })

  it('>> showSnackbar', () => {
    mainStore.showSnackbar('toto')

    expect(mainStore.getSnackbarText).toEqual('toto')
    expect(mainStore.isSnackbarVisible).toBeTruthy()
  })

  it('>> closeSnackbar', () => {
    mainStore.closeSnackbar()

    expect(mainStore.isSnackbarVisible).toBeTruthy()
  })
})
