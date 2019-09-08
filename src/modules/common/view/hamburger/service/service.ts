import CommonService from '@/pages/common/service/common-service'
import HamburgerPage from '../model/hamburger-page'

export default class Service extends CommonService {
  private model: HamburgerPage
  constructor(model: HamburgerPage) {
    super()
    this.model = model
  }

  public toggleSideBar(): void {
    return this.Store.get$store().dispatch('app/toggleSideBar')
  }
}
