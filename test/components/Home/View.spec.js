import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import FadeView from '~/components/Home/FadeView.vue'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('FadeView', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(FadeView, {
      localVue,
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(FadeView).vm).toBeTruthy()
  })
})
