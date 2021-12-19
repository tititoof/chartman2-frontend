import BaseIcon from '@/components/Base/BaseIcon.vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('BaseIcon', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(BaseIcon, {
      localVue,
      propsData: {
        size: 56
      },
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(BaseIcon).vm).toBeTruthy()
  })
})
