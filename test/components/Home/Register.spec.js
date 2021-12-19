import Register from '@/components/Home/Register.vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Register', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Register, {
      localVue,
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(Register).vm).toBeTruthy()
  })

  it('>> passwordMatch', () => {
    wrapper.vm.password = 'toto'
    wrapper.vm.verify = 'toto'
    const passwordMatch = wrapper.vm.passwordMatch()

    expect(passwordMatch).toBeTruthy()
  })

  it('>> register', () => {
    const register = wrapper.vm.register()

    expect(register).toBeTruthy()
  })
})
