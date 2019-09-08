import { plainToClass } from 'class-transformer'
import { ClassType } from 'class-transformer/ClassTransformer'
import { personsOne, personsLast } from '../api/demo-api'
import PersonPage from '../model/demo-table'
import Person from '../model/Person'

// 数据操作层
export class DataAccess {
    private model: PersonPage;
    constructor(model: PersonPage) {
      this.model = model
    }
    public translatorObjToClass<T>(obj: object, classType: ClassType<T>): T {
      return plainToClass(classType, obj)
    }
    public getData(url: string, pageNum: number, pageSize: number): Promise<Person[]> {
      let that = this
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let result: any = null
          if (pageNum === 1) {
            result = that.translatorObjToClass(personsOne, Person)
          } else {
            result = personsLast.map(item =>
              that.translatorObjToClass(item, Person)
            )
          }
          resolve(result)
        }, 1000)
      })
    }
    public async requiredDataPageDataByPageNp(pageNo: number): Promise<any> {
      this.model.isLoading = true
      this.model.persons = await this.getData('', pageNo, this.model.pageSize)
      this.model.isLoading = false
    }
}
