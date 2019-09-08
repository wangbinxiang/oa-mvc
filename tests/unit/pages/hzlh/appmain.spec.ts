import { shallowMount, createLocalVue } from '@vue/test-utils'
import AppMain from '@/pages/views/appmain/app-main.vue'
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
describe('appMain组件测试', () => {
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        tagsView: {
          state: {
            visitedViews: []
          }
        }
      }
    })
  })
  it('key分支测试1', () => {
    wrapper = shallowMount(AppMain, {
      localVue,
      store,
      router,
      mocks: {
        $route: {

        }
      }
    })
    vm = wrapper.vm as any
    expect(vm.key).toBeGreaterThan(0)
  })

})
