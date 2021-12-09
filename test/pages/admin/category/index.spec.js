import AdminCategory from '@/pages/admin/category/index.vue'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import vuetifyStub from '~/test/stub/vuetifyStub'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
const mockAxiosGetResult = { data: [{ id: '5', type: 'post', attributes: { title: 'yy', description: 'description', content: 'tt' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [] } } }] }
localVue.use(Vuex)
jest.mock('~/plugins/api', () => ({
  $api: {
    categories: {
      get: jest.fn(() =>
        Promise.resolve(mockAxiosGetResult)
      )
    }
  }
}))

describe('AdminCategory', () => {
  let wrapper
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        PostModule: {
          namespaced: true,
          actions: {
            findAll: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
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
    wrapper = mount(AdminCategory, {
      localVue,
      store,
      mocks: {
        $vuetify: {
          breakpoint: {
            smAndDown: () => true
          }
        },
        $auth: {
          user: {
            admin: true
          }
        }
      },
      stubs: vuetifyStub
    })
  })

  it('is a Vue component', () => {
    expect(wrapper.findComponent(AdminCategory).vm).toBeTruthy()
  })

  it('get categories', async () => {
    wrapper.vm.getCategories()

    await flushPromises()

    expect($api.categories.delete).toBeCalledWith('/categories')
  })
})
