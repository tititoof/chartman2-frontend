import { createLocalVue, shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import AdminArticleId from '@/pages/admin/article/_id.vue'
// Mocks
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

describe('AdminArticleId', () => {
  let wrapper

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()

    wrapper = shallowMount(AdminArticleId, {
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
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(AdminArticleId).vm).toBeTruthy()
  })

  it('>> asyncData - categories.findAll - posts.find', async () => {
    const apiCategoriesSpy = jest.spyOn(apiMock.categories, 'findAll')
    const apiArticleSpy = jest.spyOn(apiMock.posts, 'find')

    const response = await wrapper.vm.$options.asyncData({ $api: apiMock, params: mockRoute.params })

    await flushPromises()

    expect(apiCategoriesSpy).toHaveBeenCalledTimes(1)
    expect(apiArticleSpy).toHaveBeenCalledTimes(1)
    expect(response.article).toStrictEqual({ id: '1', type: 'post', attributes: { title: 'mon test', description: "C'est ma little description", content: '# Yey !!!!\n\nHello comment ça va ? ' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [{ id: '1', type: 'category' }] } } })
    expect(response.categories).toStrictEqual([{ id: '1', type: 'category', attributes: { name: 'NuxtJS' }, relationships: { posts: { data: [{ id: '1', type: 'post' }, { id: '2', type: 'post' }, { id: '3', type: 'post' }, { id: '4', type: 'post' }] } } }])
  })

  it('>> initialize', async () => {
    wrapper.vm.article = { id: '1', type: 'post', attributes: { title: 'mon test', description: "C'est ma little description", content: '# Yey !!!!\n\nHello comment ça va ? ' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [{ id: '1', type: 'category' }] } } }
    wrapper.vm.initialize()

    expect(wrapper.vm.title).toStrictEqual('Edition de l\'article mon test')
    expect(wrapper.vm.form.categories).toStrictEqual(['1'])
    expect(wrapper.vm.form.title).toStrictEqual('mon test')
    expect(wrapper.vm.form.description).toStrictEqual("C'est ma little description")
    expect(wrapper.vm.form.content).toStrictEqual('# Yey !!!!\n\nHello comment ça va ? ')
  })

  it('>> submitForm', async () => {
    const apiArticleSpy = jest.spyOn(apiMock.posts, 'update')
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

    expect(routerMock.back).toHaveBeenCalledTimes(1)
  })

  it('>> rules', () => {
    expect(wrapper.vm.rules.required('')).toStrictEqual('Requis.')
    expect(wrapper.vm.rules.categories([])).toStrictEqual('Au moins 1 catégorie est requise')
  })
})
