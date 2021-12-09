import AdminCards from '@/pages/admin/cards.vue'
import { createLocalVue, mount } from '@vue/test-utils'
import vuetifyStub from '~/test/stub/vuetifyStub'
// Utilities

const localVue = createLocalVue()

describe('CardsAdmin', () => {
  it('is a Vue component', () => {
    // const wrapper = mount(Index)
    const wrapper = mount(AdminCards, {
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

    expect(wrapper.findComponent(AdminCards).vm).toBeTruthy()
  })
})
