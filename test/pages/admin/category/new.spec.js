import AdminCategoryNew from '@/pages/admin/category/new.vue'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import vuetifyStub from '~/test/stub/vuetifyStub'
// Utilities

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AdminCategoryNew', () => {
  let wrapper
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        CategoryModule: {
          namespaced: true,
          actions: {
            find: jest.fn(() => Promise.resolve()),
            create: jest.fn(() => Promise.resolve())
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
    wrapper = mount(AdminCategoryNew, {
      localVue,
      store,
      mocks: {
        $vuetify: {
          breakpoint: {
            smAndDown: () => true
          }
        },
        $axios: {
          $post: jest.fn(() => Promise.resolve(''))
        }
      },
      stubs: vuetifyStub
    })
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
      expect(wrapper.vm.$axios.$post).toHaveBeenCalledTimes(1)
    })
  })

  it('is a Vue component', () => {
    expect(wrapper.findComponent(AdminCategoryNew).vm).toBeTruthy()
  })
})
