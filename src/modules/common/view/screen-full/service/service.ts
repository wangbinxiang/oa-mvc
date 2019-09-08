import CommonService from '@/pages/common/service/common-service'
import ScreenPage from '../model/screen-page'

export default class Service extends CommonService {
  private model: ScreenPage
  constructor(model: ScreenPage) {
    super()
    this.model = model
  }
  public toggleScreenFull($message: any) {
    if (!this.model.screenf.enabled) {
      $message({
        message: 'you browser can not work',
        type: 'warning'
      })
      return
    }
    return this.model.screenf.toggle()
  }
}
