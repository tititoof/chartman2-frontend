import { createLocalVue, mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import TutorialsArticle from '@/pages/tutorials/article/_id.vue'
// Mocks
import apiMock from '~/test/mock/apiMock'
import routerMock from '~/test/mock/routerMock'
import storeMock from '~/test/mock/storeMock'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TutorialsArticle', () => {
  let wrapper
  let store
  const mockRoute = {
    params: {
      id: 1
    }
  }
  beforeEach(() => {
    store = new Vuex.Store(storeMock)

    wrapper = mount(TutorialsArticle, {
      localVue,
      store,
      mocks: {
        $router: routerMock,
        $dayjs: () => {
          return {
            format: jest.fn()
          }
        }
      },
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(TutorialsArticle).vm).toBeTruthy()
  })

  it('>> asyncData - articles.find', async () => {
    const apiSpy = jest.spyOn(apiMock.articles, 'find')
    const response = await wrapper.vm.$options.asyncData({ $api: apiMock, params: mockRoute.params })

    await flushPromises()

    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(response.article.attributes.title).toStrictEqual('mon test')
    expect(response.article.attributes.description).toStrictEqual('C\'est ma little description')
    expect(response.article.attributes.content).toStrictEqual('# Yey !!!!\n\nHello comment ça va ? ')
    expect(response.article.relationships.categories).toStrictEqual({ data: [{ id: '1', type: 'category' }] })

    const redirect = jest.fn()
    await wrapper.vm.$options.asyncData({ params: mockRoute.params, redirect })

    await flushPromises()

    expect(redirect).toHaveBeenCalledTimes(1)
  })

  it('>> head', async () => {
    const response = await wrapper.vm.$options.asyncData({ $api: apiMock, params: mockRoute.params })

    await flushPromises()

    expect(wrapper.vm.head).toBeUndefined()
  })

  it('>> router.back', () => {
    wrapper.vm.goBack()

    expect(routerMock.back).toHaveBeenCalledTimes(1)
  })
})
