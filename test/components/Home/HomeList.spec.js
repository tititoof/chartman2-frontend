import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import HomeList from '~/components/Home/HomeList.vue'
// Mocks
import routerMock from '~/test/mock/routerMock'
// Stubs
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('HomeList', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(HomeList, {
      localVue,
      mocks: {
        $router: routerMock
      },
      stubs: vuetifyStub
    })
  })

  it('>> Vue component', () => {
    expect(wrapper.findComponent(HomeList).vm).toBeTruthy()
  })

  it('>> itemComponentInstance getter', () => {
    expect(wrapper.vm.itemComponentInstance).toBeInstanceOf(Function)
  })

  it('>> pathNew getter', () => {
    expect(wrapper.vm.pathNew).toStrictEqual('/new')
  })

  it('>> router.back', () => {
    wrapper.vm.goBack()

    expect(routerMock.push).toHaveBeenCalledWith('/admin/cards')
  })
})
