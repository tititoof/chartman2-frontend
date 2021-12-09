import TutorialsArticle from '@/pages/tutorials/article/_id.vue'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import vuetifyStub from '~/test/stub/vuetifyStub'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)
const mockAxiosGetResult = { data: { id: '5', type: 'post', attributes: { title: 'yy', description: 'description', content: 'tt' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [] } } } }

describe('TutorialsArticle', () => {
  let wrapper
  let store
  let mockRouter
  const mockRoute = {
    params: {
      id: 1
    }
  }
  beforeEach(() => {
    mockRouter = {
      push: jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        VisitorModule: {
          namespaced: true,
          actions: {
            findArticle: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
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

    wrapper = mount(TutorialsArticle, {
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
    expect(wrapper.findComponent(TutorialsArticle).vm).toBeTruthy()
  })

  test('get post', async () => {
    wrapper.vm.getArticle()

    await flushPromises()

    expect(wrapper.vm.$axios.$get).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.title).toStrictEqual('yy')
    expect(wrapper.vm.description).toStrictEqual('description')
    expect(wrapper.vm.content).toStrictEqual('tt')
    expect(wrapper.vm.categories).toStrictEqual([])
  })

  it('back', () => {
    wrapper.vm.back()

    expect(mockRouter.push).toHaveBeenCalledWith('/tutorials')
  })
})
