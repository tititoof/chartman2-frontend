import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import AdminCards from '@/pages/admin/cards.vue'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CardsAdmin', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AdminCards, {
      localVue,
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(AdminCards).vm).toBeTruthy()
  })
})
