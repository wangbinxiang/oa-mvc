import CommonService from '@/pages/common/service/common-service'
import BreadCrumbPage from '../model/breadCrumb-page'
import { Route } from 'vue-router'
export default class Service extends CommonService {
    private model: BreadCrumbPage
    constructor(model: BreadCrumbPage) {
      super()
      this.model = model
    }

    // 生成面包屑
    public makeBreadcrumb(): void {
      const route = this.Store.get$route().matched
      const validatedRoute: any[] = route.filter((item: Route) => item.name)
      const firstRoute = validatedRoute[0]
      const breadcrumbs = this.addDashboard(firstRoute, validatedRoute)
      this.model.levelList = breadcrumbs
    }

    // 添加dashboard
    private addDashboard(firstBreadcrumb: any, breadcrumbNames: any[]): any[] {
      let newBreadcrumbNames = breadcrumbNames
      if (firstBreadcrumb && firstBreadcrumb.name !== 'dashboard') {
        newBreadcrumbNames = [
          {
            path: '/dashboard',
            meta: { title: 'dashboard' }
          }
        ].concat(breadcrumbNames)
      }
      return newBreadcrumbNames
    }
}