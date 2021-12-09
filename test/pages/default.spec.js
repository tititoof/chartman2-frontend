import Default from '@/layouts/default.vue'
import Vuex from 'vuex'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

const actions = {
  closeSnackbar: jest.fn()
}
const getters = {
  isSnackbarVisible: jest.fn(),
  getSnackbarText: jest.fn()
}

const store = new Vuex.Store({
  modules: {
    user: {
      namespaced: true,
      actions,
      getters
    }
  }
})
describe('DefaultPage', () => {
  it('is a Vue component', () => {
    // const wrapper = mount(Index)
    const wrapper = mount(Default, {
      localVue,
      store,
      mocks: {
        $vuetify: {
          breakpoint: {
            smAndDown: () => true
          }
        }
      },
      stubs: vuetifyStub
    })

    expect(wrapper.findComponent(Default).vm).toBeTruthy()
  })
})
