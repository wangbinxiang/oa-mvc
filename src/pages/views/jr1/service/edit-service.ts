import EditPage from '../model/edit-page'
import CommonService from '@/pages/common/service/common-service'

// 服务层
export default class Service extends CommonService {

  private model: EditPage
  constructor(model: EditPage) {
    super()
    this.model = model
  }


  public cacheViewData(fn: any) {
    if (this.routeName) {
      const params = {
        viewName: this.routeName,
        viewType: this.model.viewType,
        cacheData: {
          form: this.model.form
        }
      }
      fn(params)
    }
  }
  public async initialize() {
    if (this.isCacheViewAndHasCacheData()) {
      this.model.form = this.getProp(this.Store.getCacheData(), 'form')
    }
  }
  private getProp(targetData: { [propName: string]: any }, prop: string) {
    const val = targetData[this.routeName][this.model.viewType][prop]
    if (!val) {
      return false
    }
    return val
  }

  get routeHash() {
    return this.Store.get$route().hash
  }
  get routeName(): any {
    return this.Store.get$route().name
  }

  private isCacheViewAndHasCacheData() {
    return (
      this.routeName &&
      this.routeHash &&
      this.Store.getCacheData()[this.routeName] &&
      this.Store.getCacheData()[this.routeName][this.model.viewType]
    )
  }

}
