import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import Register from '@/components/Home/Register.vue'
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

  it('>> rules', () => {
    expect(wrapper.vm.rules.required('')).toStrictEqual('Requis.')
    expect(wrapper.vm.rules.validEmail('notValidEmail')).toStrictEqual('doit être valide')
    expect(wrapper.vm.rules.min('test')).toStrictEqual('8 charactères minimum')
  })

  it('>> passwordMatch', () => {
    wrapper.vm.password = 'test'
    wrapper.vm.verify = 'test'

    expect(wrapper.vm.passwordMatch()).toBeTruthy()

    wrapper.vm.verify = 'test 2'

    expect(wrapper.vm.passwordMatch()).toStrictEqual('Les mots de passes doivent correspondre')
  })
})
