import router from '@/bases/router'
import store from '@/pages/common/store'
import { Route } from 'vue-router'

import { isLogin } from '@/bases/utils/auth'
import {
  triggerGetSessionStorage
} from '@/bases/utils/storage-event'

import {
  appModuleHandler
} from '@/pages/common/store/modules/app'

import { appActionTypes } from '@/pages/common/store/modules/app/actions/types'



import '@/bases/event/storage'


const appPageLoadingHandler = appModuleHandler(appActionTypes.PAGE_LOADING)

export async function generateRoutes(next: Function, to: Route) {
  if (!store.getters['permission/hasCachePermission']) {
    try {
      const _permission: Ajax.AxiosResponse = await store.dispatch(
        'permission/GetPermission'
      )
      const routers: any[] = await store.dispatch('permission/GenerateRoutes', {
        _permission
      })
      router.addRoutes(routers)
      if (to.path === '/signIn') {
        next({ path: '/' })
      } else {
        next({ ...to, replace: true })
      }
    } catch (error) {
      next()
    }
  } else {
    next()
  }
}
router.beforeEach(routerNext)

export function routerNext(to: Route, from: Route, next: Function) {
  store.dispatch(appPageLoadingHandler, true)
  if (store.getters['user/adminId'] || isLogin()) {
    generateRoutes(next, to)
  } else {
    triggerGetSessionStorage() // 从其他tab获取session
    setTimeout(function() {
      if (isLogin()) {
        // await store.dispatch('user/GetUserInfo')
        generateRoutes(next, to)
      } else {
        if (to.path !== '/signIn') next({ path: '/signIn' })
        else next()
      }
    }, 500)
  }
}

export const pageLoading = () => {
  store.dispatch(appPageLoadingHandler, false)
}
router.afterEach(pageLoading)

