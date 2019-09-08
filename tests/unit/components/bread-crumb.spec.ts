import BreadCrumb from '@/modules/common/view/bread-crumb/bread-crumb.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Router from 'vue-router'
import element from 'element-ui'

const localVue = createLocalVue()
localVue.use(element)
localVue.use(Router)
let wrapper: any
let vm: any

const router: any = new Router({
  routes: []
})
describe('bread-crumb.vue test', () => {
  wrapper = shallowMount(BreadCrumb, {
    localVue,
    router
  })
  wrapper.setMethods({
    service: {
      makeBreadcrumb: jest.fn()
    }
  })
  vm = wrapper.vm as any

  const cb = jest.fn()
  it('菜单面包屑测试', () => {
    vm.OnRouteChange(cb)
    expect(vm.service.makeBreadcrumb).toHaveBeenCalled()
    expect(cb).toHaveBeenCalled()
  })
})