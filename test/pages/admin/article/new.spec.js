import { createLocalVue, shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import AdminArticleNew from '@/pages/admin/article/new.vue'
// Mocks
import apiMock from '~/test/mock/apiMock'
import routerMock from '~/test/mock/routerMock'
import storeMock from '~/test/mock/storeMock'
import localStorageMock from '~/test/mock/localStorage'
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

global.localStorage = localStorageMock

describe('AdminArticleNew', () => {
  let wrapper

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()

    wrapper = shallowMount(AdminArticleNew, {
      localVue,
      store,
      mocks: {
        $router: routerMock,
        $route: mockRoute,
        $api: apiMock,
        newArticleForm: {
          reset: () => { return true }
        }
      },
      propsData: {
        id: 1
      },
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(AdminArticleNew).vm).toBeTruthy()
  })

  it('>> asyncData - categories.findAll - posts.find', async () => {
    const apiCategoriesSpy = jest.spyOn(apiMock.categories, 'findAll')

    const response = await wrapper.vm.$options.asyncData({ $api: apiMock, params: mockRoute.params })

    await flushPromises()

    expect(apiCategoriesSpy).toHaveBeenCalledTimes(1)
    expect(response.categories).toStrictEqual([{ id: '1', type: 'category', attributes: { name: 'NuxtJS' }, relationships: { posts: { data: [{ id: '1', type: 'post' }, { id: '2', type: 'post' }, { id: '3', type: 'post' }, { id: '4', type: 'post' }] } } }])
  })

  it('>> submitForm', async () => {
    const apiArticleSpy = jest.spyOn(apiMock.posts, 'create')
    wrapper.vm.form.categories = [1]
    wrapper.vm.form.title = 'title'
    wrapper.vm.form.description = 'description'
    wrapper.vm.form.content = 'content'
    wrapper.vm.submitForm()

    await flushPromises()

    expect(apiArticleSpy).toHaveBeenCalledTimes(1)
  })

  it('>> router.back', () => {
    wrapper.vm.goBack()

    expect(routerMock.push).toHaveBeenCalledWith('/admin/article')
  })

  it('>> rules', () => {
    expect(wrapper.vm.rules.required('')).toStrictEqual('Requis.')
    expect(wrapper.vm.rules.categories([])).toStrictEqual('Au moins 1 catégorie est requise')
  })
})
