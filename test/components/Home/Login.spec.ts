import Login from '@/components/Home/Login.vue'
import Vuex from 'vuex'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Login', () => {
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

    wrapper = mount(Login, {
      localVue,
      store,
      mocks: {
        $vuetify: {
          breakpoint: {
            smAndDown: () => true
          }
        },
        $route: mockRoute,
        $router: mockRouter,
        $auth: {
          setUser: jest.fn(),
          setUserToken: jest.fn(),
          loginWith: jest.fn(),
          logout: jest.fn()
        }
      }
    })
  })

  it('is a Vue component', () => {
    expect(wrapper.findComponent(Login).vm).toBeTruthy()
  })

  it('login', () => {
    wrapper.vm.login()
    expect(wrapper.vm.$auth.loginWith).toHaveBeenCalledTimes(1)
  })

  it('logout', () => {
    wrapper.vm.logout()
    expect(wrapper.vm.$auth.logout).toHaveBeenCalledTimes(1)
  })

  it('userLogin', () => {
    wrapper.vm.userLogin()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$auth.setUser).toHaveBeenCalledTimes(1)
      expect(wrapper.vm.$auth.setUserToken).toHaveBeenCalledTimes(1)
      expect(wrapper.vm.showSnackbar).toHaveBeenCalledTimes(1)
      expect(wrapper.vm.onLoginDone).toHaveBeenCalledTimes(1)
    })
  })

  it('setUserToken', () => {
    wrapper.vm.setUserToken()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.showSnackbar).toHaveBeenCalledTimes(1)
      expect(wrapper.vm.onLoginDone).toHaveBeenCalledTimes(1)
    })
  })

  it('onLoginDone emitted', () => {
    wrapper.vm.userLogin()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('login-done')).toBeTruthy()
    })
  })
})
