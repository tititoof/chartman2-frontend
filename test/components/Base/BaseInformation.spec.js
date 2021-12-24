import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import BaseInformation from '@/components/Base/BaseInformation.vue'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('BaseInformation', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(BaseInformation, {
      localVue,
      stubs: vuetifyStub,
      propsData: {
        avatarColorProp: 'purple',
        iconColorProp: 'green',
        textContentClassProp: 'text-class',
        contentProp: 'content-prop'
      }
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(BaseInformation).vm).toBeTruthy()
  })

  it('>> avatarColor getter', () => {
    expect(wrapper.vm.avatarColor).toEqual('purple')
  })

  it('>> typeIconImage getter', () => {
    expect(wrapper.vm.typeIconImage).toEqual('icon')
  })

  it('>> icon getter', () => {
    expect(wrapper.vm.icon).toEqual('mdi-cursor-default-outline')
  })

  it('>> iconColor getter', () => {
    expect(wrapper.vm.iconColor).toEqual('green')
  })

  it('>> iconHeight getter', () => {
    expect(wrapper.vm.iconHeight).toEqual('72px')
  })

  it('>> image getter', () => {
    expect(wrapper.vm.image).toEqual('images/gitea.png')
  })

  it('>> text getter', () => {
    expect(wrapper.vm.text).toEqual('Default text')
  })

  it('>> textContentClass getter', () => {
    expect(wrapper.vm.textContentClass).toEqual('text-class')
  })

  it('>> content getter', () => {
    expect(wrapper.vm.content).toEqual('content-prop')
  })

  it('>> textClass getter', () => {
    expect(wrapper.vm.textClass).toEqual('base-body text-body-1 mx-auto text--lighten-1 text-left')
  })
})
