import AdminArticleNew from '@/pages/admin/article/new.vue'
import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    PostModule: {
      namespaced: true,
      actions: {
        find: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
        create: jest.fn(() => Promise.resolve(mockAxiosGetResult))
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
const mockAxiosGetResult = { data: { id: '5', type: 'post', attributes: { title: 'yy', description: 'description', content: 'tt' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [] } } } }
jest.mock('axios', () => ({
  $get: () => Promise.resolve(mockAxiosGetResult.data)
}))
describe('AdminArticleNew', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AdminArticleNew, {
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
          $post: jest.fn(() => Promise.resolve(mockAxiosGetResult))
        }
      },
      stubs: vuetifyStub
    })
  })

  it('is a Vue component', () => {
    expect(wrapper.findComponent(AdminArticleNew).vm).toBeTruthy()
  })

  it('get categories', () => {
    wrapper.vm.getListCategories()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$axios.$get).toHaveBeenCalledTimes(1)
    })
  })

  it('send form', () => {
    wrapper.vm.submitForm()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$axios.$post).toHaveBeenCalledTimes(1)
    })
  })
})
