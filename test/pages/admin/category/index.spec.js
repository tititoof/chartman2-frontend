import { createLocalVue, mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import AdminCategory from '@/pages/admin/category/index.vue'
// Mocks
import apiMock from '~/test/mock/apiMock'
import storeMock from '~/test/mock/storeMock'
import localStorageMock from '~/test/mock/localStorage'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store(storeMock)

global.localStorage = localStorageMock

describe('AdminCategory', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AdminCategory, {
      localVue,
      store,
      mocks: {
        $auth: {
          user: {
            loggedIn: true,
            admin: true
          }
        }
      },
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(AdminCategory).vm).toBeTruthy()
  })

  it('>> asyncData - categories.findAll', async () => {
    const apiSpy = jest.spyOn(apiMock.categories, 'findAll')
    const response = await wrapper.vm.$options.asyncData({ $api: apiMock })

    await flushPromises()

    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(response.categories).toStrictEqual([{ id: '1', type: 'category', attributes: { name: 'NuxtJS' }, relationships: { posts: { data: [{ id: '1', type: 'post' }, { id: '2', type: 'post' }, { id: '3', type: 'post' }, { id: '4', type: 'post' }] } } }])
  })
})
