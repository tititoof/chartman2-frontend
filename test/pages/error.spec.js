import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import Error from '~/layouts/error.vue'
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ErrorPage', () => {
  test('is a Vue component', () => {
    // const wrapper = mount(Index)
    const wrapper = mount(Error, {
      localVue,
      propsData: { error: { statusCode: 404 } },
      mocks: {
        $vuetify: {
          breakpoint: {
            smAndDown: () => true
          }
        }
      },
      stubs: vuetifyStub
    })

    expect(wrapper.findComponent(Error).vm).toBeTruthy()
  })
})
