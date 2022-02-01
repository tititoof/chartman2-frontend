import { createLocalVue, mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import Presentation from '@/components/Blog/Presentation.vue'
// Mocks
import apiMock from '~/test/mock/apiMock'
import routerMock from '~/test/mock/routerMock'
import storeMock from '~/test/mock/storeMock'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store(storeMock)

describe('Presentation', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Presentation, {
      localVue,
      store,
      mocks: {
        $vuetify: {
          breakpoint: {
            mdAndDown: () => true
          }
        },
        $router: routerMock,
        $api: apiMock
      },
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(Presentation).vm).toBeTruthy()
  })

  it('>> getCategories', async () => {
    const apiCategoriesSpy = jest.spyOn(apiMock.categories, 'findAll')
    const response = await wrapper.vm.getCategories()

    await flushPromises()

    expect(apiCategoriesSpy).toHaveBeenCalledTimes(1)
    expect(response.data).toStrictEqual([{ id: '1', type: 'category', attributes: { name: 'NuxtJS' }, relationships: { posts: { data: [{ id: '1', type: 'post' }, { id: '2', type: 'post' }, { id: '3', type: 'post' }, { id: '4', type: 'post' }] } } }])
  })

  it('>> getCategoryId', () => {
    const routeId = wrapper.vm.getCategoryId('NuxtJS', apiMock.categories.findAll().data)

    expect(routeId).toEqual('1')
  })

  it('>> goTo', async () => {
    wrapper.vm.goTo('NuxtJS')

    await flushPromises()

    expect(routerMock.push).toHaveBeenCalledTimes(1)
    expect(routerMock.push).toHaveBeenCalledWith('/tutorials/category/1')

    const showSnackbarSpy = jest.spyOn(wrapper.vm, 'showSnackbar')
    wrapper.vm.goTo('ThisIsNotValid')

    await flushPromises()

    expect(showSnackbarSpy).toHaveBeenCalledTimes(1)
  })

  it('>> maxHeight', async () => {
    wrapper.vm.$vuetify.breakpoint.mdAndDown = false

    expect(wrapper.vm.maxHeight).toStrictEqual(700)
    
    wrapper.vm.$vuetify.breakpoint.mdAndDown = true

    expect(wrapper.vm.maxHeight).toStrictEqual(1800)
  })
})
