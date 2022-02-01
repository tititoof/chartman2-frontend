import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import BaseBtn from '@/components/Base/BaseBtn.vue'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('BaseBtn', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(BaseBtn, {
      localVue,
      propsData: {
        color: 'primary',
        depressed: true,
        minWidth: 164,
        tile: true
      },
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(BaseBtn).vm).toBeTruthy()
  })
})
