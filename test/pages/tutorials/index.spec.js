import Index from '@/pages/tutorials/index.vue'
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

describe('IndexTutorials', () => {
  let wrapper
  const mockRoute = {
    params: {
      id: 1
    }
  }

  beforeEach(() => {
    wrapper = mount(Index, {
      localVue,
      store,
      mocks: {
        $router: routerMock
      },
      stubs: vuetifyStub,
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(Index).vm).toBeTruthy()
  })

  it('>> asyncData - articles.categories', async () => {
    const apiSpy = jest.spyOn(apiMock.articles, 'categories')
    const response = await wrapper.vm.$options.asyncData({ $api: apiMock })
    
    await flushPromises()

    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(response.categories).toStrictEqual([{"id":"1","type":"category","attributes":{"name":"NuxtJS"},"relationships":{"posts":{"data":[{"id":"1","type":"post"},{"id":"2","type":"post"},{"id":"3","type":"post"},{"id":"4","type":"post"}]}}}])
  })

  it('>> goToCategory', () => {
    const route = 1
    wrapper.vm.goToCategory(route)

    expect(routerMock.push).toHaveBeenCalledWith('/tutorials/category/' + route)
  })
})
