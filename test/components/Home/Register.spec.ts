import Register from '@/components/Home/Register.vue'
import Vuex from 'vuex'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

const localVue = createLocalVue()
// const vuetify = new Vuetify()
localVue.use(Vuex)

describe('Register', () => {
  let wrapper: any
  let store: any
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

    wrapper = mount(Register, {
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
      }
    })
  })

  it('is a Vue component', () => {
    expect(wrapper.findComponent(Register).vm).toBeTruthy()
  })

  it('match passwords', () => {
    wrapper.vm.password = 'toto'
    wrapper.vm.verify = 'toto'
    const passwordMatch = wrapper.vm.passwordMatch()
    expect(passwordMatch).toBeTruthy()
  })

  it('register', () => {
    const register = wrapper.vm.register()
    expect(register).toBeTruthy()
  })
})
