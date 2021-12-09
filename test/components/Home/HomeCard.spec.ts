import HomeCard from '@/components/Home/HomeCard.vue'
import Vuex from 'vuex'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

const localVue = createLocalVue()
// const vuetify = new Vuetify()
localVue.use(Vuex)

describe('HomeCard', () => {
  let wrapper: any
  let store: any
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

    wrapper = mount(HomeCard, {
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
      }
    })
  })

  it('is a Vue component', () => {
    expect(wrapper.findComponent(HomeCard).vm).toBeTruthy()
  })
})
