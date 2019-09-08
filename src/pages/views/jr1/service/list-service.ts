import ListPage from '../model/list-page'
import CommonService from '@/pages/common/service/common-service'
import getOrderClass from '../repository/list-repository'

// 服务层
export default class Service extends CommonService {

  private model: ListPage
  constructor(model: ListPage) {
    super()
    this.model = model
  }

  // mock****
  public fetchModelTpl(): void {
    this.openLoading()
    getOrderClass().then(res => {
      const { total, list } = res
      this.model.total = total || 0
      this.model.list = list
    })
    this.closeLoading()
  }
  // mock end****

  private openLoading() {
    this.model.listLoading = true
  }
  private closeLoading() {
    this.model.listLoading = false
  }

}
