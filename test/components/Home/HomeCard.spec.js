import HomeCard from '@/components/Home/HomeCard.vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
// const vuetify = new Vuetify()
localVue.use(Vuex)

describe('HomeCard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(HomeCard, {
      localVue,
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(HomeCard).vm).toBeTruthy()
  })
})
