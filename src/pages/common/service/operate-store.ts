import store from '@/pages/common/store/index'
import router from '@/bases/router'

export default class OperateStore {
  private $route: any
  public refreshRoute(route: any): void {
    this.$route = route
  }
  public getAppStore(): any {
    return (store.state as any).app
  }

  public getPermissionStore(): any {
    return (store.state as any).permission
  }

  public getTagsViewStore(): any {
    return (store.state as any).tagsView
  }

  public getUser(): any {
    return (store.state as any).user
  }

  public get$store(): any {
    return store
  }

  public get$route(): any {
    return this.$route || router.currentRoute
  }

  public get$router(): any {
    return router
  }

  public getCacheData(): any {
    return (store.state as any).cache.cacheData
  }

}
