import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import Authenticate from '@/pages/authenticate.vue'
// Mocks
import storeMock from '~/test/mock/storeMock'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Authenticate', () => {
  const store = new Vuex.Store(storeMock)

  const wrapper = shallowMount(Authenticate, {
    localVue,
    store,
    mocks: {
      $auth: {
        loggedIn: true
      }
    },
    stubs: vuetifyStub
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(Authenticate).vm).toBeTruthy()
  })
})
