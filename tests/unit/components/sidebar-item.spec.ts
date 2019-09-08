import SidebarItem from '@/modules/common/view/sidebar-item/sidebar-item.vue'
import { shallowMount } from '@vue/test-utils'

let wrapper: any
let vm: any

describe('sidebar-item.vue test', () => {
  wrapper = shallowMount(SidebarItem, {
    mocks: {

    }
  })
  wrapper.setMethods({
    service: {
      hasOneShowingChildren: jest.fn()
    }
  })
  vm = wrapper.vm as any
  it('触发测试', () => {
    vm.hasOneShowingChildren()
    expect(vm.service.hasOneShowingChildren).toHaveBeenCalled()
  })
})