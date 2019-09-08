jest.mock('@/modules/common/index.ts')
import Layout from '@/pages/views/layout/layout-page.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)

const router = new Router({
  routes: [{
    name: 'xx',
    path: '/aa'
  }]
})

let wrapper: any
let vm: any
let store: any
let actions: any
describe('layout组件测试', () => {
  beforeEach(() => {
    actions = {
      toggleDevice: jest.fn(),
      closeSideBar: jest.fn()
    }
    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            sidebar: {
              opened: true
            },
            device: 'mobile'
          },
          actions
        }
      }
    })
  })

  it('v-if测试', () => {
    wrapper = shallowMount(Layout, {
      localVue,
      store,
      router

    })
    wrapper.setMethods({
      service: {
        getCurRouteName: jest.fn(),
        getClassObj: jest.fn(),
        getDevice: () => 'mobile',
        getSideBar: () => ({ opened: true }),
        getGenerateWidth: () => 0,
        handleClickOutside: jest.fn()
      }
    })
    vm = wrapper.vm as any
    expect(wrapper.find('.drawer-bg').exists()).toBe(true)
    wrapper.find('.drawer-bg').trigger('click')
    expect(vm.service.handleClickOutside).toHaveBeenCalled()
  })
})
