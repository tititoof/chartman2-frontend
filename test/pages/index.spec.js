import { createLocalVue, shallowMount } from '@vue/test-utils'
import Index from '~/pages/index.vue'
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()

describe('HomePage', () => {
  it('is a Vue component', () => {
    // const wrapper = mount(Index)
    const wrapper = shallowMount(Index, {
      localVue,
      mocks: {
        $vuetify: {
          breakpoint: {
            smAndDown: () => true
          }
        }
      },
      stubs: vuetifyStub
    })

    expect(wrapper.findComponent(Index).vm).toBeTruthy()
  })
})
