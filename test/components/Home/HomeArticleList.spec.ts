import HomeArticleList from '@/components/Home/HomeArticleList.vue'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import vuetifyStub from '~/test/stub/vuetifyStub'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
// const vuetify = new Vuetify()
localVue.use(Vuex)

describe('HomeArticleList', () => {
  let wrapper: any
  let store: any
  const mockRouter = {
    push: jest.fn()
  }
  beforeEach(() => {
    const mockRoute = {
      params: {
        id: 1
      }
    }

    store = new Vuex.Store({
      modules: {
        PostModule: {
          namespaced: true,
          actions: {
            find: jest.fn(() => Promise.resolve()),
            create: jest.fn(() => Promise.resolve()),
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

    wrapper = mount(HomeArticleList, {
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
          $get: jest.fn(() => Promise.resolve('toto')),
          $delete: jest.fn(() => Promise.resolve('toto'))
        }
      },
      stubs: vuetifyStub
    })
  })

  it('is a Vue component', () => {
    expect(wrapper.findComponent(HomeArticleList).vm).toBeTruthy()
  })

  it('get pathNew', () => {
    const pathNew = wrapper.vm.pathNew

    expect(pathNew).toEqual('/new')
  })

  it('get pathEdit', () => {
    const pathEdit = wrapper.vm.pathEdit

    expect(pathEdit).toEqual('/_id')
  })

  it('format categories', () => {
    wrapper.vm.categories = [{ id: 1, attributes: { name: 'toto' } }]
    const formatedCategories = wrapper.vm.formatedCategories([{ id: 1 }])

    expect(formatedCategories).toEqual('toto')
  })

  it('confirmDestroy', () => {
    wrapper.vm.confirmDestroy(1, 1, 'test')

    expect(wrapper.vm.dialogItemId).toEqual(1)
    expect(wrapper.vm.dialogItemIndex).toEqual(1)
    expect(wrapper.vm.dialogName).toEqual('Êtes vous sûr de vouloir supprimer l\'article "test" ?')
    expect(wrapper.vm.dialogShow).toBeTruthy()
  })

  it('push to edit', () => {
    wrapper.vm.edit(1)

    expect(mockRouter.push).toHaveBeenCalledWith('/1')
  })

  it('destroy', async () => {
    wrapper.vm.dialogItemId = 1
    wrapper.vm.destroy()

    await flushPromises()

    expect(wrapper.vm.$axios.$delete).toHaveBeenCalledTimes(1)
  })

  it('getCategories', async () => {
    wrapper.vm.getCategories()

    await flushPromises()

    expect(wrapper.vm.$axios.$get).toHaveBeenCalledTimes(1)
  })

  it('show article', () => {
    wrapper.vm.show('titre', 'contenu')

    expect(wrapper.vm.showDialogTitle).toEqual('titre')
    expect(wrapper.vm.showDialogContent).toEqual('contenu')
    expect(wrapper.vm.showDialogVisible).toBeTruthy()
  })
})
