import AdminCategoryId from '@/pages/admin/category/_id.vue'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import vuetifyStub from '~/test/stub/vuetifyStub'
// Utilities

const localVue = createLocalVue()
localVue.use(Vuex)

const mockAxiosGetResult = { data: { id: '5', type: 'post', attributes: { name: 'yy', description: 'description', content: 'tt' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [] } } } }
jest.mock('axios', () => ({
  $get: () => Promise.resolve(mockAxiosGetResult.data)
}))

describe('AdminCategoryId', () => {
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

    store = new Vuex.Store({
      modules: {
        CategoryModule: {
          namespaced: true,
          actions: {
            find: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
            update: jest.fn(() => Promise.resolve(mockAxiosGetResult))
          }
        },
        MainStore: {
          namespaced: true,
          actions: {
            showSnackbar: jest.fn()
          }
        }
      }
    })

    wrapper = mount(AdminCategoryId, {
      localVue,
      store,
      mocks: {
        $vuetify: {
          breakpoint: {
            smAndDown: () => true
          }
        },
        $axios: {
          $get: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
          $put: jest.fn(() => Promise.resolve(mockAxiosGetResult))
        },
        $route: mockRoute,
        $router: mockRouter
      },
      stubs: vuetifyStub
    })
  })

  it('is a Vue component', () => {
    expect(wrapper.findComponent(AdminCategoryId).vm).toBeTruthy()
  })

  it('trigger submitForm', () => {
    wrapper.setMethods({ submitForm: jest.fn() })
    const button = wrapper.find('#submit')
    button.trigger('click')

    expect(wrapper.vm.submitForm).toHaveBeenCalledTimes(1)
  })

  it('send form', () => {
    wrapper.vm.submitForm()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$axios.$put).toHaveBeenCalledTimes(1)
    })
  })

  it('get categories', () => {
    wrapper.vm.getCategory()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$axios.$get).toHaveBeenCalledTimes(1)
    })
  })
})
