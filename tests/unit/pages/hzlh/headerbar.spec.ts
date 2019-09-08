jest.mock('@/modules/common/index.ts')
import Layout from '@/pages/views/header/header-bar.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import element from 'element-ui'
const localVue = createLocalVue()
localVue.use(element)

let wrapper: any
let vm: any

describe('layout组件测试', () => {

  it('logout测试', () => {
    wrapper = shallowMount(Layout, {
      localVue,
      mocks: {
        $t: jest.fn()
      }

    })
    wrapper.setMethods({
      service: {
        getDevice: () => 'mobile',
        getSidebar: () => ({ opened: false }),
        getAdminName: jest.fn(),
        classOption: jest.fn(),
        showImg: jest.fn(),
        SignOut: jest.fn()
      }
    })
    vm = wrapper.vm as any
    wrapper.find('.signOut_el').trigger('click')
    expect(vm.service.SignOut).toHaveBeenCalled()
  })
})