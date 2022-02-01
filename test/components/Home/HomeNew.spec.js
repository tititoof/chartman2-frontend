import { createLocalVue, mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import HomeNew from '@/components/Home/HomeNew.vue'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('HomeNew', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(HomeNew, {
      localVue,
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(HomeNew).vm).toBeTruthy()
  })

  it('>> pathNew getter', () => {
    const pathNew = wrapper.vm.pathNew

    expect(pathNew).toEqual('/new')
  })

  it('>> pathEdit getter', () => {
    const pathEdit = wrapper.vm.pathEdit

    expect(pathEdit).toEqual('/_id')
  })
})
