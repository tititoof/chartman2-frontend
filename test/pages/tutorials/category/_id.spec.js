import TutorialsCategory from '@/pages/tutorials/category/_id.vue'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import vuetifyStub from '~/test/stub/vuetifyStub'
// Utilities
const mockAxiosGetResult = { data: { id: '5', type: 'post', attributes: { name: 'yy', description: 'description', content: 'tt' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [] } } } }

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TutorialsCategory', () => {
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

    wrapper = mount(TutorialsCategory, {
      localVue,
      store,
      mocks: {
        $vuetify: {
          breakpoint: {
            smAndDown: () => true
          }
        },
        $axios: {
          $get: () => Promise.resolve(mockAxiosGetResult),
          $put: jest.fn(() => Promise.resolve(mockAxiosGetResult))
        },
        $route: mockRoute,
        $router: mockRouter
      },
      stubs: vuetifyStub
    })
  })

  it('is a Vue component', () => {
    expect(wrapper.findComponent(TutorialsCategory).vm).toBeTruthy()
  })
  it('get all posts from category', () => {
    wrapper.vm.getArticlesFromCategory()

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.articles).toStrictEqual(mockAxiosGetResult.data)
    })
  })

  it('get category', () => {
    wrapper.vm.getCategory()

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$axios.$get).toHaveBeenCalledTimes(1)
      expect(wrapper.vm.title).toStrictEqual(mockAxiosGetResult.data.attributes.name)
    })
  })
})
