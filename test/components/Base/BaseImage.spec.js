import BaseImage from '@/components/Base/BaseImage.vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('BaseImage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(BaseImage, {
      localVue,
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(BaseImage).vm).toBeTruthy()
  })
})
