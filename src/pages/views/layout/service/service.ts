import LayoutPage from '../model/layout-page'
import CommonService from '@/pages/common/service/common-service'

import {
  appModuleHandler
} from '@/pages/common/store/modules/app'

import { appActionTypes } from '@/pages/common/store/modules/app/actions/types'

const appCloseSidebarHandler = appModuleHandler(appActionTypes.CLOSE_SIDEBAR)

// 服务层
export default class Service extends CommonService {
  private model: LayoutPage
  constructor(model: LayoutPage) {
    super()
    this.model = model
  }

  public handleClickOutside(): void {
    this.Store.get$store().dispatch(appCloseSidebarHandler, { withoutAnimation: false })
  }
}
