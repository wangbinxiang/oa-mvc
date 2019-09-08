import BreadCrumb from '@/modules/common/view/hamburger/hamburger.vue'
import { shallowMount } from '@vue/test-utils'

let wrapper: any
let vm: any


describe('hamburger.vue test', () => {
  wrapper = shallowMount(BreadCrumb)
  wrapper.setMethods({
    service: {
      toggleSideBar: jest.fn()
    }
  })
  vm = wrapper.vm as any
  it('props传递class测试', () => {
    wrapper.setProps({
      isActive: true
    })
    expect(wrapper.find('.is-active').exists()).toBeTruthy()
  })

  it('service方法调用测试', () => {
    wrapper.find('.icon-hamburger').trigger('click')
    expect(vm.service.toggleSideBar).toHaveBeenCalled()
  })
})