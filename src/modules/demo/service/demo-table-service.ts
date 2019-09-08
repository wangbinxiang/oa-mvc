import { DataAccess } from '../dao/demo-table-dao'
import PersonPage from '../model/demo-table'
// 服务层
export default class Service {
    private dataAccess: DataAccess;
    constructor(model: PersonPage) {
      this.dataAccess = new DataAccess(model)
    }

    public async requireAndRenderDataByPageNo(pageNo: number): Promise<any> {
      await this.dataAccess.requiredDataPageDataByPageNp(pageNo)
    }
}

