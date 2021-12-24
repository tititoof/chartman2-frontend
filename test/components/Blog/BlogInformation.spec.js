import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import BlogInformation from '@/components/Blog/BlogInformation.vue'
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('BlogInformation', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(BlogInformation, {
      localVue,
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(BlogInformation).vm).toBeTruthy()
  })

  it('>> itemTypeOf', () => {
    const itemTypeOf = wrapper.vm.itemTypeOf('test', '')

    expect(itemTypeOf).toEqual('test')
  })
})
