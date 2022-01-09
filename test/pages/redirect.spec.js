import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import Index from '~/pages/redirect.vue'
// Mocks
import storeMock from '~/test/mock/storeMock'
import routerMock from '~/test/mock/routerMock'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store(storeMock)

describe('HomePage', () => {
  const wrapper = mount(Index, {
    localVue,
    store,
    mocks: {
      $router: routerMock,
      $route: { 
        query: {
          previous_url: ''
        }
      },
      $vuetify: {
        breakpoint: {
          smAndDown: () => true
        }
      }
    },
    stubs: vuetifyStub
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(Index).vm).toBeTruthy()
  })

  it('>> redirect', () => {
    expect(routerMock.push).toHaveBeenCalledTimes(1)
  })
})
