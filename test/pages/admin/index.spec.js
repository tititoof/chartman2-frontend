import AdminIndex from '@/pages/admin/index.vue'
import Vuetify from 'vuetify'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
import vuetifyStub from '~/test/stub/vuetifyStub'

const localVue = createLocalVue()
const vuetify = new Vuetify()

describe('IndexAdmin', () => {
  it('is a Vue component', () => {
    const mockRoute = {
      params: {
        id: 1
      }
    }
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = shallowMount(AdminIndex, {
      localVue,
      vuetify,
      mocks: {
        $vuetify: {
          breakpoint: {
            smAndDown: () => true
          }
        },
        $auth: {
          user: {
            loggedIn: true,
            admin: true
          }
        },
        $axios: {
          $get: () => {
            return new Promise((resolve) => {
              resolve('foo')
            })
          }
        },
        $route: mockRoute,
        $router: mockRouter
      },
      stubs: vuetifyStub
    })

    expect(wrapper.findComponent(AdminIndex).vm).toBeTruthy()
  })
})
