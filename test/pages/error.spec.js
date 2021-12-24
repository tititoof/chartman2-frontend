import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import Error from '~/layouts/error.vue'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ErrorPage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Error, {
      localVue,
      propsData: { error: { statusCode: 404 } },
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(Error).vm).toBeTruthy()
  })

  it('>> data', () => {
    expect(wrapper.vm.pageNotFound).toStrictEqual('404 Not Found')
    expect(wrapper.vm.otherError).toStrictEqual('An error occurred')
  })
})
