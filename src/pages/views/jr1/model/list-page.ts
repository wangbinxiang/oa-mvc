export default class ListPage {
  public listLoading: boolean = false
  public total: number = 0
  public list: ListItem[] = []
}

export class ListItem {
  id: string = ''
  number: string = ''
  title: string = ''
  applicableObject: number[] = []
  dispatchDepartment: number[] = []
  applicableIndustries: number[] =[]
  level: string = ''
  classify: number[] =[]
  detail: string = ''
  createTime: string = ''
  updateTime: string = ''
}