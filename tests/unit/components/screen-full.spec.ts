import ScreenFull from '@/modules/common/view/screen-full/screen-full.vue'
import { shallowMount } from '@vue/test-utils'

let wrapper: any
let vm: any

describe('screen-full.vue test', () => {
  wrapper = shallowMount(ScreenFull, {
    mocks: {
      $message: jest.fn()
    }
  })
  wrapper.setMethods({
    click: jest.fn()
  })
  vm = wrapper.vm as any
  it('触发测试', () => {
    wrapper.find('i').trigger('click')
    expect(vm.click).toHaveBeenCalled()
  })


})