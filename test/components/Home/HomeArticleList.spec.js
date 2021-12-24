import { createLocalVue, mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import HomeArticleList from '@/components/Home/HomeArticleList.vue'
// Mocks
import apiMock from '~/test/mock/apiMock'
import routerMock from '~/test/mock/routerMock'
import storeMock from '~/test/mock/storeMock'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store(storeMock)

describe('HomeArticleList', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(HomeArticleList, {
      localVue,
      store,
      mocks: {
        $router: routerMock,
        $api: apiMock
      },
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(HomeArticleList).vm).toBeTruthy()
  })

  it('>> pathNew getter', () => {
    const pathNew = wrapper.vm.pathNew

    expect(pathNew).toEqual('/new')
  })

  it('>> pathEdit getter', () => {
    const pathEdit = wrapper.vm.pathEdit

    expect(pathEdit).toEqual('/_id')
  })

  it('>> formatedCategories', () => {
    wrapper.vm.categories = [{ id: 1, attributes: { name: 'toto' } }]
    const formatedCategories = wrapper.vm.formatedCategories([{ id: 1 }])

    expect(formatedCategories).toEqual('toto')
  })

  it('>> confirmDestroy', () => {
    wrapper.vm.confirmDestroy(1, 1, 'test')

    expect(wrapper.vm.dialogItemId).toEqual(1)
    expect(wrapper.vm.dialogItemIndex).toEqual(1)
    expect(wrapper.vm.dialogName).toEqual('Êtes vous sûr de vouloir supprimer l\'article "test" ?')
    expect(wrapper.vm.dialogShow).toBeTruthy()
  })

  it('>> edit', () => {
    wrapper.vm.edit(1)

    expect(routerMock.push).toHaveBeenCalledWith('/1')
  })

  it('>> destroy', async () => {
    const apiPostsSpy = jest.spyOn(apiMock.posts, 'destroy')
    wrapper.vm.dialogItemId = 1
    wrapper.vm.destroy()

    await flushPromises()

    expect(apiPostsSpy).toHaveBeenCalledTimes(1)
  })

  it('>> getCategories', async () => {
    const apiCategoriesSpy = jest.spyOn(apiMock.categories, 'findAll')
    wrapper.vm.getCategories()

    await flushPromises()

    expect(apiCategoriesSpy).toHaveBeenCalledTimes(1)
  })

  it('>> show', () => {
    wrapper.vm.show('titre', 'contenu')

    expect(wrapper.vm.showDialogTitle).toEqual('titre')
    expect(wrapper.vm.showDialogContent).toEqual('contenu')
    expect(wrapper.vm.showDialogVisible).toBeTruthy()
  })
})
