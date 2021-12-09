import AdminArticle from '@/pages/admin/article/index.vue'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import vuetifyStub from '~/test/stub/vuetifyStub'
// Utilities

const localVue = createLocalVue()
localVue.use(Vuex)
const mockAxiosGetResult = { data: [{ id: '5', type: 'post', attributes: { title: 'yy', description: 'description', content: 'tt' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [] } } }] }
jest.mock('axios', () => ({
  $get: () => Promise.resolve(mockAxiosGetResult.data)
}))

describe('AdminArticle', () => {
  let wrapper
  let store
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        PostModule: {
          namespaced: true,
          actions: {
            findAll: jest.fn(() => Promise.resolve(mockAxiosGetResult))
          }
        }
      }
    })
    wrapper = mount(AdminArticle, {
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
        },
        $axios: {
          $get: () => Promise.resolve(mockAxiosGetResult)
        }
      },
      stubs: vuetifyStub
    })
  })
  it('is a Vue component', () => {
    expect(wrapper.findComponent(AdminArticle).vm).toBeTruthy()
  })

  it('get articles', () => {
    wrapper.vm.getArticles()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.articles).toStrictEqual(mockAxiosGetResult.data)
    })
  })
})
