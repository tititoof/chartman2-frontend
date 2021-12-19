import TutorialsCategory from '@/pages/tutorials/category/_id.vue'
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

describe('TutorialsCategory', () => {
  let wrapper
  let store
  const mockRoute = {
    params: {
      id: 1
    }
  }

  beforeEach(() => {
    store = new Vuex.Store(storeMock)

    wrapper = mount(TutorialsCategory, {
      localVue,
      store,
      mocks: {
        $router: routerMock
      },
      stubs: vuetifyStub,
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(TutorialsCategory).vm).toBeTruthy()
  })

  it('>> asyncData - articles.category', async () => {
    const apiCategorySpy = jest.spyOn(apiMock.articles, 'category')
    const apiArticleSpy = jest.spyOn(apiMock.articles, 'fromCategory')
    
    const response = await wrapper.vm.$options.asyncData({ $api: apiMock, params: mockRoute.params })

    await flushPromises()

    expect(apiCategorySpy).toHaveBeenCalledTimes(1)
    expect(apiArticleSpy).toHaveBeenCalledTimes(1)
    expect(response.articles).toStrictEqual(
      [
        {"id":"1","type":"post","attributes":{"title":"mon test","description":"C'est ma little description","content":"# Yey !!!!\n\nHello comment ça va ? "},"relationships":{"user":{"data":{"id":"1","type":"user"}},"categories":{"data":[{"id":"1","type":"category"}]}}},
        {"id":"2","type":"post","attributes":{"title":"test","description":"test","content":"test"},"relationships":{"user":{"data":{"id":"1","type":"user"}},"categories":{"data":[{"id":"1","type":"category"}]}}},
        {"id":"3","type":"post","attributes":{"title":"tt","description":"ee","content":"fezf"},"relationships":{"user":{"data":{"id":"1","type":"user"}},"categories":{"data":[{"id":"1","type":"category"}]}}},
        {"id":"4","type":"post","attributes":{"title":"dzad","description":"dzad","content":"dzadzad"},"relationships":{"user":{"data":{"id":"1","type":"user"}},"categories":{"data":[{"id":"1","type":"category"}]}}}
      ]
    )
    expect(response.category).toStrictEqual("NuxtJS")
  })

  it('>> goToArticle', () => {
    const route = 1
    wrapper.vm.goToArticle(route)

    expect(routerMock.push).toHaveBeenCalledWith('/tutorials/article/' + route)
  })

  it('>> router.back', () => {
    wrapper.vm.goBack()

    expect(routerMock.back).toHaveBeenCalledTimes(1)
  })
})
