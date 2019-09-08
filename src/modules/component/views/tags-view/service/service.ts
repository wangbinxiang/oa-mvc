import CommonService from '@/pages/common/service/common-service'
import TagsPage from '../model/tags-page'

// 服务层
export default class Service extends CommonService {
  private model: TagsPage

  constructor(model: TagsPage) {
    super()
    this.model = model
  }

  public getVisitedViews(): any {
    return this.Store.getTagsViewStore().visitedViews
  }

  public isActive(route: any) {
    return this.Store.get$route() && route.path === this.Store.get$route().path
  }

  public isDashboard() {
    return this.Store.get$route() && this.Store.get$route().path === '/dashboard'
  }

  public initDataOnMounted(): void {
    this.addViewTags()
  }

  private addViewTags() {
    const route = this.generateRoute()
    if (!route) {
      return false
    }
    this.Store.get$store().dispatch('tagsView/addVisitedViews', route)
  }

  private generateRoute() {
    if (this.Store.get$route()) {
      return this.Store.get$route()
    }
    return false
  }

}
