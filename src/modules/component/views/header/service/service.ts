import HeaderPage from '../model/header-page'
import CommonService from '@/pages/common/service/common-service'

import c from '@/bases/config/configCode'

import { logout } from '@/bases/utils/auth'

// 服务层
export default class Service extends CommonService {

  private defaultAvatar: string = c.defaultAvatar
  private staticDomain: string = c.STATIC_DOMAIN
  private domain: string = c.DOMAIN

  private model: HeaderPage
  constructor(model: HeaderPage) {
    super()
    this.model = model
  }
  public getDevice(): string {
    return this.Store.getAppStore().device
  }
  public getSidebar(): object {
    return this.Store.getAppStore().sidebar
  }
  public getAdminName(): string {
    return this.Store.getUser().adminName
  }
  public classOption(): object {
    return {
      direction: 2,
      limitMoveNum: 2
    }
  }
  public showImg(): string {
    return this.Store.getUser().adminAvatar
      ? this.domain + this.Store.getUser().adminAvatar
      : this.staticDomain + this.defaultAvatar
  }
  public SignOut(): () => Promise<any> {
    return this.Store.get$store().dispatch('user/SignOut')
      .then(() => {
        logout()
        this.Store.get$store().dispatch('user/ClearVuexCache')
        this.Store.get$router().push({ path: '/signIn' })
      })
  }
}
