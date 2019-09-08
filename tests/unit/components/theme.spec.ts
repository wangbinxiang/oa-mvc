import Theme from '@/modules/common/view/theme-select/theme-select.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ui from 'element-ui'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ui)

let wrapper: any
let vm: any
let store: any
let actions: any
describe('theme.vue test', () => {
  actions = {
    setTheme: jest.fn()
  }
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        app: {
          state: {
            theme: 'gold'
          },
          actions
        }
      }
    })
  })
  wrapper = shallowMount(Theme, {
    store,
    localVue,
    mocks: {
      $t: jest.fn()
    }
  })
  wrapper.setMethods({
    service: {
      setTheme: jest.fn(),
      getTheme: jest.fn()
    }
  })
  vm = wrapper.vm as any
  it('setTheme test', () => {
    vm.handleSetTheme()
    expect(vm.service.setTheme).toHaveBeenCalled()
  })
})