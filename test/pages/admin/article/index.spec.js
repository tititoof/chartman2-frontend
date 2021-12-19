import AdminArticle from '@/pages/admin/article/index.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
//Mocks
import apiMock from '~/test/mock/apiMock'
import storeMock from '~/test/mock/storeMock'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store(storeMock)

describe('AdminArticle', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(AdminArticle, {
      localVue,
      store,
      mocks: {
        $auth: {
          user: {
            loggedIn: true,
            admin: true
          }
        },
      },
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(AdminArticle).vm).toBeTruthy()
  })

  it('>> asyncData - posts.findAll', async () => {
    const apiSpy = jest.spyOn(apiMock.posts, 'findAll')
    const response = await wrapper.vm.$options.asyncData({ $api: apiMock })

    await flushPromises()

    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(response.articles).toStrictEqual([
      {"id":"1","type":"post","attributes":{"title":"mon test","description":"C'est ma little description","content":"# Yey !!!!\n\nHello comment ça va ? "},"relationships":{"user":{"data":{"id":"1","type":"user"}},"categories":{"data":[{"id":"1","type":"category"}]}}},
      {"id":"2","type":"post","attributes":{"title":"test","description":"test","content":"test"},"relationships":{"user":{"data":{"id":"1","type":"user"}},"categories":{"data":[{"id":"1","type":"category"}]}}},
      {"id":"3","type":"post","attributes":{"title":"tt","description":"ee","content":"fezf"},"relationships":{"user":{"data":{"id":"1","type":"user"}},"categories":{"data":[{"id":"1","type":"category"}]}}},
      {"id":"4","type":"post","attributes":{"title":"dzad","description":"dzad","content":"dzadzad"},"relationships":{"user":{"data":{"id":"1","type":"user"}},"categories":{"data":[{"id":"1","type":"category"}]}}}
    ])
  })
})
