import HomeCategoryList from '@/components/Home/HomeCategoryList.vue'
import Vuex from 'vuex'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

const localVue = createLocalVue()
// const vuetify = new Vuetify()
localVue.use(Vuex)

describe('HomeCategoryList', () => {
  let wrapper: any
  let store: any
  let mockRouter: any
  beforeEach(() => {
    const mockRoute = {
      params: {
        id: 1
      }
    }

    mockRouter = {
      push: jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        CategoryModule: {
          namespaced: true,
          actions: {
            findAll: jest.fn(() => Promise.resolve()),
            destroy: jest.fn(() => Promise.resolve())
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

    wrapper = mount(HomeCategoryList, {
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
          $delete: jest.fn(() => Promise.resolve('toto'))
        }
      }
    })
  })

  it('is a Vue component', () => {
    expect(wrapper.findComponent(HomeCategoryList).vm).toBeTruthy()
  })

  it('get pathNew', () => {
    const pathNew = wrapper.vm.pathNew
    expect(pathNew).toEqual('/new')
  })

  it('get pathEdit', () => {
    const pathEdit = wrapper.vm.pathEdit
    expect(pathEdit).toEqual('/_id')
  })

  it('confirmDestroy', () => {
    wrapper.vm.confirmDestroy(1, 1, 'toto')
    expect(wrapper.vm.dialogItemId).toEqual(1)
    expect(wrapper.vm.dialogItemIndex).toEqual(1)
    expect(wrapper.vm.dialogName).toEqual('Êtes vous sûr de vouloir supprimer la catégorie "toto" ?')
    expect(wrapper.vm.dialogShow).toBeTruthy()
  })

  it('router push to edit', () => {
    wrapper.vm.edit(1)
    expect(mockRouter.push).toHaveBeenCalledWith('/1')
  })

  it('destroy an item', () => {
    wrapper.vm.dialogItemId = 1
    wrapper.vm.destroy()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$axios.$delete).toHaveBeenCalledTimes(1)
    })
  })
})
