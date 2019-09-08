import BaseService from './base-service'
export default class CommonService extends BaseService {
    public Store: any
    public operateStore(store: any) {
      this.Store = store
    }
}