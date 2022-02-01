import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import Default from '@/layouts/default.vue'
// Mocks
import storeMock from '~/test/mock/storeMock'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store(storeMock)
describe('DefaultPage', () => {
  const wrapper = mount(Default, {
    localVue,
    store,
    stubs: vuetifyStub
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(Default).vm).toBeTruthy()
  })
})
