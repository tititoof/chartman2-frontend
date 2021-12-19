import AdminIndex from '@/pages/admin/index.vue'
import { createLocalVue, mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
//Mocks
import routerMock from '~/test/mock/routerMock'
import storeMock from '~/test/mock/storeMock'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store(storeMock)

describe('IndexAdmin', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AdminIndex, {
      localVue,
      store,
      mocks: {
        $router: routerMock,
        $auth: {
          user: {
            loggedIn: true,
            admin: true
          }
        },
        $axios: {
          $get: () => Promise.resolve()
        }
      },
      stubs: vuetifyStub,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(AdminIndex).vm).toBeTruthy()
  })

  it('>> onLoginDone', async () => {
    await flushPromises()

    expect(routerMock.push).toHaveBeenCalledWith('/admin/cards')
  })
})
