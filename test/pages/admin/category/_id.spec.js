import AdminCategoryId from '@/pages/admin/category/_id.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
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

const mockRoute = {
  params: {
    id: 1
  }
}

describe('AdminCategoryId', () => {
  let wrapper

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()

    wrapper = shallowMount(AdminCategoryId, {
      localVue,
      store,
      mocks: {
        $router: routerMock,
        $route: mockRoute,
        $api: apiMock
      },
      propsData: {
        id: 1
      },
      stubs: vuetifyStub
    })

    wrapper.vm.category = {"id":"1","type":"category","attributes":{"name":"NuxtJS"},"relationships":{"posts":{"data":[{"id":"1","type":"post"},{"id":"2","type":"post"},{"id":"3","type":"post"},{"id":"4","type":"post"}]}}}
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(AdminCategoryId).vm).toBeTruthy()
  })

  it('>> asyncData - categories.find', async () => {
    const apiCategorySpy = jest.spyOn(apiMock.categories, 'find')
    const response = await wrapper.vm.$options.asyncData({ $api: apiMock, params: mockRoute.params })

    await flushPromises()

    expect(apiCategorySpy).toHaveBeenCalledTimes(1)
    expect(response.category).toStrictEqual({"id":"1","type":"category","attributes":{"name":"NuxtJS"},"relationships":{"posts":{"data":[{"id":"1","type":"post"},{"id":"2","type":"post"},{"id":"3","type":"post"},{"id":"4","type":"post"}]}}})
  })

  it('>> initialize', async () => {
    wrapper.vm.initialize()

    expect(wrapper.vm.title).toStrictEqual('Edition de la catégorie NuxtJS')
    expect(wrapper.vm.form.name).toStrictEqual('NuxtJS')
  })

  it('>> submitForm', async () => {
    const apiCategorySpy = jest.spyOn(apiMock.categories, 'update')
    wrapper.vm.form.title = "title"
    wrapper.vm.submitForm()

    await flushPromises()

    expect(apiCategorySpy).toHaveBeenCalledTimes(1)
  })

  it('>> router.back', () => {
    wrapper.vm.goBack()

    expect(routerMock.back).toHaveBeenCalledTimes(1)
  })
})
