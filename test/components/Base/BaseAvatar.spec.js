import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import BaseAvatar from '@/components/Base/BaseAvatar.vue'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('BaseAvatar', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(BaseAvatar, {
      localVue,
      stubs: vuetifyStub,
      propsData: {
        icon: 'test',
        outlined: true,
        size: 56
      }
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(BaseAvatar).vm).toBeTruthy()
  })

  it('>> classes getter', () => {
    const test = wrapper.vm.classes

    expect(test).toEqual(['base-avatar--outlined'])
  })

  it('>> outlineSize getter', () => {
    const test = wrapper.vm.outlineSize

    expect(test).toEqual(56 + 56 / 6)
  })

  it('>> styles getter', () => {
    const test = wrapper.vm.styles
    const margin = 56 / 12

    expect(test).toEqual({ margin: `-${margin}px 0 0 -${margin}px` })
  })
})
