import Authenticate from '@/pages/authenticate.vue'
import Vuex from 'vuex'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)
const actions = {
  showSnackbar: jest.fn()
}

const store = new Vuex.Store({
  modules: {
    user: {
      namespaced: true,
      actions
    }
  }
})

describe('Authenticate', () => {
  it('is a Vue component', () => {
    const mockRoute = {
      params: {
        id: 1
      }
    }
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = shallowMount(Authenticate, {
      localVue,
      store,
      mocks: {
        $vuetify: {
          breakpoint: {
            smAndDown: () => true
          }
        },
        $auth: {
          loggedIn: true
        },
        $route: mockRoute,
        $router: mockRouter
      },
      stubs: vuetifyStub
    })

    expect(wrapper.findComponent(Authenticate).vm).toBeTruthy()
  })
})
