import HomeCategoryList from '@/components/Home/HomeCategoryList.vue'
import { createLocalVue, mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
//Mocks
import apiMock from '~/test/mock/apiMock'
import routerMock from '~/test/mock/routerMock'
import storeMock from '~/test/mock/storeMock'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store(storeMock)

describe('HomeCategoryList', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(HomeCategoryList, {
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
    expect(wrapper.findComponent(HomeCategoryList).vm).toBeTruthy()
  })

  it('>> pathNew getter', () => {
    const pathNew = wrapper.vm.pathNew

    expect(pathNew).toEqual('/new')
  })

  it('>> pathEdit getter', () => {
    const pathEdit = wrapper.vm.pathEdit

    expect(pathEdit).toEqual('/_id')
  })

  it('>> confirmDestroy', () => {
    wrapper.vm.confirmDestroy(1, 1, 'toto')

    expect(wrapper.vm.dialogItemId).toEqual(1)
    expect(wrapper.vm.dialogItemIndex).toEqual(1)
    expect(wrapper.vm.dialogName).toEqual('Êtes vous sûr de vouloir supprimer la catégorie "toto" ?')
    expect(wrapper.vm.dialogShow).toBeTruthy()
  })

  it('>> edit', () => {
    wrapper.vm.edit(1)

    expect(routerMock.push).toHaveBeenCalledWith('/1')
  })

  it('>> destroy', async () => {
    const apiCategorySpy = jest.spyOn(apiMock.categories, 'destroy')
    wrapper.vm.dialogItemId = 1
    wrapper.vm.destroy()

    await flushPromises()

    expect(apiCategorySpy).toHaveBeenCalledTimes(1)
  })
})
