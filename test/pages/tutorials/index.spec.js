import Index from '@/pages/tutorials/index.vue'
import Vuex from 'vuex'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('axios', () => ({
  get: Promise.resolve('value')
}))

describe('IndexTutorials', () => {
  let wrapper
  let store
  beforeEach(() => {
    const mockRoute = {
      params: {
        id: 1
      }
    }

    const mockRouter = {
      push: jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        VisitorModule: {
          namespaced: true,
          actions: {
            find: jest.fn(() => Promise.resolve()),
            update: jest.fn(() => Promise.resolve())
          }
        },
        MainStore: {
          namespaced: true,
          actions: {
            showSnackbar: jest.fn()
          }
        }
      }
    })

    wrapper = mount(Index, {
      localVue,
      store,
      mocks: {
        $vuetify: {
          breakpoint: {
            smAndDown: () => true
          }
        },
        $axios: {
          $get: () => Promise.resolve(),
          $put: jest.fn(() => Promise.resolve())
        },
        $route: mockRoute,
        $router: mockRouter
      },
      stubs: vuetifyStub
    })
  })

  it('is a Vue component', () => {
    expect(wrapper.findComponent(Index).vm).toBeTruthy()
  })
})
