import { createLocalVue, shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import Login from '@/components/Home/Login.vue'
// Mocks
import apiMock from '~/test/mock/apiMock'
import routerMock from '~/test/mock/routerMock'
import storeMock from '~/test/mock/storeMock'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store(storeMock)

describe('Login', () => {
  let wrapper
  beforeEach(() => {
    const mockRoute = {
      params: {
        id: 1
      }
    }

    wrapper = shallowMount(Login, {
      localVue,
      store,
      mocks: {
        $router: routerMock,
        $route: mockRoute,
        $api: apiMock,
        $auth: {
          setUser: jest.fn(),
          setUserToken: jest.fn(),
          loginWith: jest.fn(),
          logout: jest.fn()
        }
      },
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(Login).vm).toBeTruthy()
  })

  it('>> userLogin', () => {
    wrapper.vm.userLogin()

    expect(wrapper.vm.$auth.loginWith).toHaveBeenCalledTimes(1)
  })

  it('>> logout', () => {
    wrapper.vm.logout()

    expect(wrapper.vm.$auth.logout).toHaveBeenCalledTimes(1)
  })

  it('>> setUserToken', async () => {
    const showSnackbarSpy = jest.spyOn(wrapper.vm, 'showSnackbar')
    const onLoginDoneSpy = jest.spyOn(wrapper.vm, 'onLoginDone')
    wrapper.vm.setUserToken()

    await flushPromises()

    expect(showSnackbarSpy).toHaveBeenCalledTimes(1)
    expect(onLoginDoneSpy).toHaveBeenCalledTimes(1)
  })

  it('>> Emit - onLoginDone', async () => {
    wrapper.vm.onLoginDone()

    await flushPromises()

    expect(wrapper.emitted('login-done')).toBeTruthy()
  })
})
