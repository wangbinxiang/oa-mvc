import SidebarPage from '../model/sidebar-page'
import { generateTitle } from '@/bases/utils/i18n'
import configCode from '@/bases/config/configCode'
import CommonService from '@/pages/common/service/common-service'

import {
  appModuleHandler
} from '@/pages/common/store/modules/app'

import { appActionTypes } from '@/pages/common/store/modules/app/actions/types'

const appSetVaryWidthHandler = appModuleHandler(appActionTypes.SET_VARY_WIDTH)

const {
  DEVICE_NAV_WIDTH,
  CLOSE_NAV_WIDTH,
  NAV_WORD_COUNT,
  NAV_WORD_WIDTH
} = configCode

export default class Service extends CommonService {
  private context: any
  private model: SidebarPage
  constructor(model: SidebarPage) {
    super()
    this.model = model
  }

  public setContext(context: any) {
    this.context = context
  }
  public getRouters() {
    return this.Store.getPermissionStore().routers
  }
  public cobyStyle(): object {
    return {
      width: this.computedStyle() + 'px'
    }
  }
  public isCollapse() {
    return !this.Store.getAppStore().sidebar.opened
  }
  public setNavMaxWidth() {
    try {
      // await this.GetUserInfo()
      this.generateSideBar()
    } catch (error) {
      if (this.Store.get$route().path !== '/signIn') {
        this.Store.get$router().push({ path: '/signIn' })
      }
    }
  }

  public handleOpen(key: string, keyPath: string[]) {
    const result = this.findRouteName(this.getRouters(), key, keyPath)
    if (this.Store.getAppStore().device === 'desktop' && result) {
      const res = this.recalculate()
      this.setVaryWidth(res)
      this.model.varyWidth = res
    }
  }
  public handleClose(key: string) {
    if (this.Store.getAppStore().device === 'desktop') {
      delete this.model.cacheCount[key]
      const res = this.recalculate()
      this.setVaryWidth(res)
      this.model.varyWidth = res
    }
  }

  private findRouteName(router: any[], key: string, keyPath: string[]) {
    return router.some(
      (item: any): boolean => {
        // 查找对应点击的路由 && // 查找对应路由里侧导航显示的子路由，并且子路由中的字数超出显示范围
        if (
          (item.name === key || item.path === key) &&
          this.findRouteNameOverfloow(item)
        ) {
          return true
        } else {
          if (item.children && item.children.length > 0) {
            return this.findRouteName(item.children, key, keyPath)
          }
          return false
        }
      }
    )
  }


  private findRouteNameOverfloow(item: any) {
    if (item.children && item.children.length > 0) {
      const wordCount: number[] = []
      item.children.forEach(
        (itemChild: any): void => {
          // 计算出每个子路由的字数长度，对比是否大于标准长度，若是，则存到数组中
          if (!itemChild.hidden && itemChild.meta && itemChild.meta.title) {
            const zhName = generateTitle.call(this.context, itemChild.meta.title)
            if (zhName && zhName.length > NAV_WORD_COUNT) {
              wordCount.push(zhName.length)
            }
          }
        }
      )
      // 找出数组最长的一个，计算出对应宽度
      if (wordCount.length) {
        const len = Math.max(...wordCount)
        const width = Math.ceil(len - NAV_WORD_COUNT) * NAV_WORD_WIDTH
        // 缓存对应路由菜单动态宽度
        this.model.cacheCount[item.name || item.path] = width
        return true
      }
      return false
    }
    return false
  }

  private recalculate(): number {
    const cacheArr: number[] = Object.values(this.model.cacheCount)
    if (cacheArr.length) {
      return Math.max(...cacheArr)
    }
    return 0
  }
  private setVaryWidth(varyWidth: number) {
    return this.Store.get$store().dispatch('app/setVaryWidth', varyWidth)
  }

  private computedStyle() {
    if (this.Store.getAppStore().device === 'desktop') {
      return this.Store.getAppStore().sidebar.opened
        ? this.Store.getAppStore().desktopNavWidth + this.model.varyWidth
        : CLOSE_NAV_WIDTH
    }
    if (this.Store.getAppStore().device === 'mobile') {
      return DEVICE_NAV_WIDTH
    }
  }

  private setNavWidth(navWidth: number) {
    this.Store.get$store().dispatch(appSetVaryWidthHandler, navWidth)
  }
  private generateSideBar() {
    const wordCount: number[] = []
    this.getRouters().forEach((item: any) => {
      if (!item.hidden && item.meta && item.meta.title) {
        const zhName = generateTitle.call(this.context, item.meta.title)
        if (zhName && zhName.length > 5) {
          wordCount.push(zhName.length)
        }
      }
    })
    if (wordCount.length) {
      const len = Math.max(...wordCount)
      const width = Math.ceil(len - 5) * NAV_WORD_WIDTH
      this.setNavWidth(width)
    }
  }
}
