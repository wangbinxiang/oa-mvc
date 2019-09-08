import CommonService from '@/pages/common/service/common-service'
import SidebarItemPage from '../model/sidebar-item'
export default class SidebarItem extends CommonService {
  private model: SidebarItemPage
  constructor(model: SidebarItemPage) {
    super()
    this.model = model
  }
  public hasOneShowingChildren(children: any[]) {
    const showingChildren = children.filter(item => {
      return !item.hidden
    })
    return this.checkLen(showingChildren) ? true : false
  }
  private checkLen(showingChildren: any[]) {
    if (showingChildren.length === 1) {
      return true
    }
    return false
  }
}
