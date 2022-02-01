import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import Index from '~/pages/index.vue'
// Mocks
import storeMock from '~/test/mock/storeMock'
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
})
