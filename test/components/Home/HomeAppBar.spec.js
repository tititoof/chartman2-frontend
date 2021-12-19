import HomeAppBar from '@/components/Home/HomeAppBar.vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('HomeAppBar', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(HomeAppBar, {
      localVue,
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(HomeAppBar).vm).toBeTruthy()
  })

  it('>> items getter', () => {
    expect(wrapper.vm.items).toStrictEqual([
      { name: 'Home', route: '/' },
      { name: 'Tutoriels', route: '/tutorials' },
      { name: 'Exemples', route: '/authenticate' },
      { name: 'Admin', route: '/admin' }
    ])
  })
})
