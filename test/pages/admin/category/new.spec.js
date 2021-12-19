import AdminCategoryNew from '@/pages/admin/category/new.vue'
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

describe('AdminCategoryNew', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AdminCategoryNew, {
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
    expect(wrapper.findComponent(AdminCategoryNew).vm).toBeTruthy()
  })

  it('>> submitForm', async () => {
    const apiCategorySpy = jest.spyOn(apiMock.categories, 'create')
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
