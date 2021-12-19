import Skills from '@/components/Blog/Skills.vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
//Mocks
import apiMock from '~/test/mock/apiMock'
import routerMock from '~/test/mock/routerMock'
import storeMock from '~/test/mock/storeMock'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store(storeMock)

describe('Skills', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Skills, {
      localVue,
      store,
      mocks: {
        $vuetify: {
          breakpoint: {
            smAndDown: () => true
          }
        },
        $router: routerMock,
        $api: apiMock
      },
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(Skills).vm).toBeTruthy()
  })

  it('>> itemTypeOf', () => {
    const itemTypeOf = wrapper.vm.itemTypeOf('test', '')

    expect(itemTypeOf).toEqual('test')
  })
})
