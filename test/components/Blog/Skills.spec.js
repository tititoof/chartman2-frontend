import Skills from '@/components/Blog/Skills.vue'
import Vuex from 'vuex'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
// const vuetify = new Vuetify()
localVue.use(Vuex)

describe('Skills', () => {
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

    const actions = {
      showSnackbar: jest.fn()
    }
    store = new Vuex.Store({
      modules: {
        Main: {
          namespaced: true,
          actions
        }
      }
    })

    wrapper = mount(Skills, {
      localVue,
      store,
      mocks: {
        $vuetify: {
          breakpoint: {
            smAndDown: () => true
          }
        },
        $route: mockRoute,
        $router: mockRouter
      },
      stubs: vuetifyStub
    })
  })

  it('is a Vue component', () => {
    expect(wrapper.findComponent(Skills).vm).toBeTruthy()
  })
})
