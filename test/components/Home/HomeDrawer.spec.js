import HomeDrawer from '@/components/Home/HomeDrawer.vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
// const vuetify = new Vuetify()
localVue.use(Vuex)

describe('HomeDrawer', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(HomeDrawer, {
      localVue,
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(HomeDrawer).vm).toBeTruthy()
  })
})
