import Vue from 'vue'
import PerfectScrollbar from 'perfect-scrollbar'
//对应的css
import 'perfect-scrollbar/css/perfect-scrollbar.css'
//classList的垫片
import 'classlist-polyfill'

/**
 * @description 为自定义滚动条全局注入自定义指令。自动判断该更新PerfectScrollbar还是创建它
 * @param {Element} el - 必填。dom元素
 */
const el_scrollBar = (el: any) => {
  //在元素上加点私货，名字随便取，确保不会和已有属性重复即可，我取名叫做_ps_
  if (el._ps_ instanceof PerfectScrollbar) {
    el._ps_.update()
  } else {
    //el上挂一份属性
    el._ps_ = new PerfectScrollbar(el, { suppressScrollX: false })
  }
}

Vue.directive('superScroll', {
  inserted(el, binding) {
    let element: any = el
    const { arg } = binding
    if (arg === 'el-table') {
      element = element.querySelector('.el-table__body-wrapper')
      if (!element) {
        return console.warn('未发现 className 为el-table__body-wrapper 的 dom')
      }
    }
    const rules = ['fixed', 'absolute', 'relative']
    if (!rules.includes((window as any).getComputedStyle(element, null).position)) {
      console.error(
        `perfect-scrollbar 所在的容器的 position 属性必须是以下之一：${rules.join(
          '、'
        )}`
      )
    }
    el_scrollBar(element)
  },
  componentUpdated(el, binding, vNode) {
    let element: any = el
    const { arg } = binding
    if (arg === 'el-table') {
      element = element.querySelector('.el-table__body-wrapper')
      if (!element) {
        return console.warn('未发现 className 为el-table__body-wrapper 的 dom')
      }
    }
    (vNode as any).context.$nextTick(() => {
      try {
        el_scrollBar(element)
      } catch (error) {
        console.error(error)
      }
    })
  }
})
