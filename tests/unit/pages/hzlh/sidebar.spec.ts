jest.mock('@/modules/common/index.ts')
import Layout from '@/pages/views/sidebar/side-bar.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import element from 'element-ui'
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(element)

let wrapper: any
let vm: any

wrapper = shallowMount(Layout, {
  localVue,
  mocks: {
    $t: jest.fn()
  }
})
wrapper.setMethods({
  service: {
    cobyStyle: jest.fn(),
    isCollapse: jest.fn(),
    handleOpen: jest.fn(),
    handleClose: jest.fn(),
    getRouters: jest.fn(),
    Store: {
      refreshRoute: jest.fn()
    }
  }
})
vm = wrapper.vm as any
describe('layout组件测试', () => {
  it('事件触发测试', () => {
    vm.handleClose()
    expect(vm.service.handleClose).toHaveBeenCalled()
    vm.handleOpen()
    expect(vm.service.handleOpen).toHaveBeenCalled()
  })
})