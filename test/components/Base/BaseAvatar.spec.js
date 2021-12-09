import BaseAvatar from '@/components/Base/BaseAvatar.vue'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import vuetifyStub from '~/test/stub/vuetifyStub'
// Utilities

const localVue = createLocalVue()
// const vuetify = new Vuetify()
localVue.use(Vuex)

describe('BaseAvatar', () => {
  let wrapper
  let store
  beforeEach(() => {
    const mockRoute = {
      params: {
        id: 1
      }
    }

    const mockRouter = {
      push: jest.fn()
    }

    const actions = {
      showSnackbar: jest.fn()
    }
    store = new Vuex.Store({
      modules: {
        Main: {
          namespaced: true,
          actions
        }
      }
    })

    wrapper = mount(BaseAvatar, {
      localVue,
      store,
      mocks: {
        $vuetify: {
          breakpoint: {
            smAndDown: () => true
          }
        },
        $route: mockRoute,
        $router: mockRouter
      },
      stubs: vuetifyStub,
      propsData: {
        icon: 'test',
        outlined: true,
        size: {
          type: 56
        }
      }
    })
  })

  it('is a Vue component', () => {
    expect(wrapper.findComponent(BaseAvatar).vm).toBeTruthy()
  })

  it('classes', () => {
    const test = wrapper.vm.classes
    expect(test).toEqual(['base-avatar--outlined'])
  })
})
