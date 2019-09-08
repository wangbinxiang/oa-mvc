import CommonService from '@/pages/common/service/common-service'
import ThemePage from '../model/theme-page'

import {
  appModuleHandler
} from '@/pages/common/store/modules/app'

import { appActionTypes } from '@/pages/common/store/modules/app/actions/types'

import configPrompt from '@/bases/config/configPrompt'
const { SUCCESS_THEME_HAS_BEEN_CHANGED } = configPrompt

const appCloseSidebarHandler = appModuleHandler(appActionTypes.SET_THEME)

export default class Service extends CommonService {
  private model: ThemePage
  constructor(model: ThemePage) {
    super()
    this.model = model
  }
  public getTheme() {
    return this.Store.getAppStore().theme
  }
  public async setTheme($message: any, themeItem: string) {
    let app: any = document.getElementById('app')
    await this.Store.get$store().dispatch(appCloseSidebarHandler, themeItem)
    $message({
      message: SUCCESS_THEME_HAS_BEEN_CHANGED,
      type: 'success'
    })
    app.className = themeItem
  }
}
