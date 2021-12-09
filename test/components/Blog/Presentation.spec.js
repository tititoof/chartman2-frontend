import Presentation from '@/components/Blog/Presentation.vue'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
// Utilities
import { createLocalVue, mount } from '@vue/test-utils'
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
// const vuetify = new Vuetify()
localVue.use(Vuex)
const categoriesData = { data: [{ id: 1, attributes: { name: 'test' } }] }

jest.mock('axios', () => ({
  $get: jest.fn(() =>
    Promise.resolve({ data: {} })
  ),
  $post: jest.fn(() =>
    Promise.resolve({ data: {} })
  ),
  $delete: jest.fn(() =>
    Promise.resolve({ data: {} })
  )
}))

describe('Presentation', () => {
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
        MainStore: {
          namespaced: true,
          actions
        }
      }
    })

    wrapper = mount(Presentation, {
      localVue,
      store,
      mocks: {
        $vuetify: {
          breakpoint: {
            smAndDown: () => true
          }
        },
        $route: mockRoute,
        $router: mockRouter,
        $axios: {
          $get: jest.fn(() =>
            Promise.resolve({ data: [{ id: 1, attributes: { name: 'test' } }] })
          )
        }
      },
      stubs: vuetifyStub
    })
  })

  it('is a Vue component', () => {
    expect(wrapper.findComponent(Presentation).vm).toBeTruthy()
  })

  it('get categories', async () => {
    wrapper.vm.getCategories()

    await flushPromises()

    expect(wrapper.vm.$axios.$get).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$axios.$get).toHaveBeenCalledWith('/categories')
  })

  it('get categoryId', () => {
    const routeId = wrapper.vm.getCategoryId('test', categoriesData.data)

    expect(routeId).toEqual(1)
  })

  it('go to tutorials', async () => {
    wrapper.vm.goTo('test')

    await flushPromises()

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/tutorials/category/1')
  })
})
