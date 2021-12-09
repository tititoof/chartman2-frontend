import AdminArticleId from '@/pages/admin/article/_id.vue'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

const mockAxiosGetResult = { data: { id: '5', type: 'post', attributes: { title: 'yy', description: 'description', content: 'tt' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [] } } } }
jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockAxiosGetResult.data))
}))

describe('AdminArticleId', () => {
  let wrapper
  let store

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
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
        PostModule: {
          namespaced: true,
          actions: {
            find: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
            update: jest.fn(() => Promise.resolve(mockAxiosGetResult))
          }
        },
        CategoryModule: {
          namespaced: true,
          actions: {
            findAll: jest.fn(() => Promise.resolve(mockAxiosGetResult))
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

    wrapper = shallowMount(AdminArticleId, {
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
      propsData: {
        id: 1
      },
      stubs: vuetifyStub
    })
  })

  it('is a Vue component', () => {
    expect(wrapper.findComponent(AdminArticleId).vm).toBeTruthy()
  })

  it('send form', async () => {
    const updateSpy = jest.spyOn(wrapper.vm, 'putPost')
    wrapper.vm.submitForm()

    await flushPromises()

    expect(updateSpy).toHaveBeenCalledTimes(1)
  })

  it('get post', async () => {
    const findPostSpy = jest.spyOn(wrapper.vm, 'findPost')
    wrapper.vm.getPost()

    await flushPromises()

    expect(findPostSpy).toHaveBeenCalledTimes(1)
  })

  it('get categories', async () => {
    wrapper.vm.getListCategories()

    await flushPromises()

    expect(wrapper.vm.listCategories).toEqual(mockAxiosGetResult.data)
  })
})
