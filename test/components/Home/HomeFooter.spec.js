import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import HomeFooter from '@/components/Home/HomeFooter.vue'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('HomeFooter', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(HomeFooter, {
      localVue,
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(HomeFooter).vm).toBeTruthy()
  })

  it('>> social getter', () => {
    expect(wrapper.vm.social).toStrictEqual([
      { name: 'Facebook', route: 'https://www.facebook.com/christophe.hartmann1/' },
      { name: 'LinkedIn', route: 'https://www.linkedin.com/in/christophe-hartmann-3a297a42/' }
    ])
  })
})
