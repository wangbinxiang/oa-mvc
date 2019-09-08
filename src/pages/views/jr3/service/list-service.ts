import CommonService from '@/pages/common/service/common-service'
import OrderList from '../model/list-page'
import { fetchParentCategoriesAndServiceCategories } from '../api/serverCategories'
import { fetchIdentifyCompany } from '../api/identify-company'
import getOrderClass from '../repository/list-repository'
export default class Service extends CommonService {
  private categoryMap: any[] = [] // 一级二级分类
  private model: OrderList
  constructor(model: OrderList) {
    super()
    this.model = model
  }

  public async fetchDataTpl() {
    this.openLoading()
    try {
      let category = await fetchParentCategoriesAndServiceCategories()
      this.categoryMap = category.data
      this.sortCategoryMap()
      this.buildParentCategory()
      this.initListData()
      this.closeLoading()
    } catch (err) {
      this.closeLoading()
    }
  }
  public openLoading(): void {
    this.model.listLoading = true
  }
  public closeLoading(): void {
    this.model.listLoading = false
  }
  public radioChange() {
    this.openLoading()
    this.buildQuery()
    this.initList()
    this.closeLoading()
  }

  public startDisable(time: any) {
    if (this.model.endTime !== null) {
      const date = time.getTime()
      return date >= this.model.endTime
    }
    return false
  }
  public endDisable(time: any) {
    if (this.model.startTime !== null) {
      const date = time.getTime()
      return date <= this.model.startTime
    }
    return false
  }


  public async sellerRemoteMethod(query: string) {
    if (query !== '') {
      this.model.sellerLoading = true

      const res = await fetchIdentifyCompany({ page: 1, size: 9999, scene: '4', name: query })
      this.model.sellerLoading = false
      if (res.data.data.length > 0) {
        this.model.sellerEnterpriseList = []
        res.data.data.forEach((v: any) => {
          this.model.sellerEnterpriseList.push({ value: v.id, label: v.companyName })
        })
      }

    } else {
      this.model.sellerEnterpriseList = []
      this.model.sellerEnterprise = ''
      delete this.model.query.sellerEnterprise
    }
  }

  public async buyerRemoteMethod(query: string) {
    if (query !== '') {
      this.model.buyerLoading = true

      const res = await fetchIdentifyCompany({ page: 1, size: 9999, scene: '4', name: query })
      this.model.buyerLoading = false

      if (res.data.data.length > 0) {
        this.model.buyerEnterpriseList = []
        res.data.data.forEach((v: any) => {
          this.model.buyerEnterpriseList.push({ value: v.id, label: v.companyName })
        })
      }

    } else {
      this.model.buyerEnterpriseList = []
      this.model.buyerEnterprise = ''
      delete this.model.query.buyerEnterprise
    }
  }
  public handleSizeChange(val: number): void {
    this.model.query.size = val
    this.fetchDataTpl()
  }
  public handleCurrentChange(val: number): void {
    this.model.query.page = val
    this.fetchDataTpl()
  }

  public search() {
    // 构建查询参数 查询  处理返回数据  渲染列表
    this.openLoading()
    this.buildQuery()
    this.initListData()
    this.closeLoading()
  }

  public getDevice(): string {
    return this.Store.getAppStore().device
  }

  // eslint-disable-next-line complexity
  public parentCategorySelectChange() {
    switch (this.model.parentCategoryValue) {
      case null:
        this.model.serviceCategory = [
          {
            value: null,
            label: '全部二级分类'
          }
        ]
        this.model.serviceCategoryValue = null
        delete this.model.query.serviceCategory
        this.buildServiceCategory(null)
        break
      case '1':
        this.buildServiceCategory('1')
        break
      case '2':
        this.buildServiceCategory('2')
        break
      case '3':
        this.buildServiceCategory('3')
        break
      case '4':
        this.buildServiceCategory('4')
        break
      case '5':
        this.buildServiceCategory('5')
        break
      case '6':
        this.buildServiceCategory('6')
        break
      case '7':
        this.buildServiceCategory('7')
        break
      case '8':
        this.buildServiceCategory('8')
        break
      case '9':
        this.buildServiceCategory('9')
        break
      default:
        this.model.serviceCategory = []
        break
    }
  }
  private buildServiceCategory(id: string | null) {
    if (id === null) {
      this.model.serviceCategoryValue = null
      return
    }
    let serviceCategory
    this.model.serviceCategory = [] as any
    for (let value of this.categoryMap) {
      if (value.parentCategory.id === id) {
        serviceCategory = value.serviceCategories
        break
      }
    }
    if (serviceCategory) {
      serviceCategory.forEach((value: any) => {
        this.model.serviceCategory.push({ value: value.id, label: value.name })
      })
    }
    this.model.serviceCategoryValue = this.model.serviceCategory[0].value
  }


  private buildQuery() {
    this.model.query = { ...this.model.query }
    if (this.model.startTime) {
      this.model.query = { ...this.model.query, startTime: Number(this.model.startTime) / 1000 }
    } else {
      this.model.query.startTime = null
    }
    if (this.model.endTime) {
      this.model.query = { ...this.model.query, endTime: Number(this.model.endTime) / 1000 }
    } else {
      this.model.query.endTime = null
    }
    // 订单状态
    let status = this.getRadioValue()
    if (status || status === 0) {
      this.model.query = { ...this.model.query, status }
    } else {
      delete this.model.query.status
      this.model.radio = '全部'
    }
    // 订单编号
    let orderno = this.model.orderno
    if (orderno) {
      this.model.query = { ...this.model.query, orderno }
    } else {
      delete this.model.query.orderno
    }
    // 服务商企业ID
    let buyerEnterprise = this.model.buyerEnterprise
    if (buyerEnterprise) {
      this.model.query = { ...this.model.query, buyerEnterprise }
    } else {
      delete this.model.query.buyerEnterprise
    }
    let sellerEnterprise = this.model.sellerEnterprise
    if (sellerEnterprise) {
      this.model.query = { ...this.model.query, sellerEnterprise }
    } else {
      delete this.model.query.sellerEnterprise
    }
    // 企业分类
    if (this.model.serviceCategoryValue) {
      let serviceCategory = this.model.serviceCategoryValue
      this.model.query = { ...this.model.query, serviceCategory }
    } else if (this.model.parentCategoryValue) {
      let serviceCategory = this.model.parentCategoryValue
      this.model.query = { ...this.model.query, serviceCategory }
    } else {
      delete this.model.query.serviceCategories
    }
  }

  private getRadioValue(): number | null {
    switch (this.model.radio) {
      case '全部':
        return null
      case '待付款':
        return 0
      case '待服务开始':
        return 2
      case '服务中':
        return 4
      case '待确认服务完成':
        return 6
      case '服务完成':
        return 8
      case '交易关闭':
        return 10
      default:
        return null
    }
  }

  // 分类数据根据id排序
  private sortCategoryMap() {
    let len = this.categoryMap.length
    if (len > 0) {
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          if (this.categoryMap[i].parentCategory.id > this.categoryMap[j].parentCategory.id) {
            let temp = this.categoryMap[i]
            this.categoryMap[i] = this.categoryMap[j]
            this.categoryMap[j] = temp
          }
        }
      }
    }
  }

  // 构建 服务商一级分类数据
  private buildParentCategory() {
    this.categoryMap.forEach((value) => {
      this.model.parentCategory.push({ value: value.parentCategory.id, label: value.parentCategory.name })
    })
  }

  // 每次构建新的query时重新获取list
  private async initList() {
    this.openLoading()
    try {
      await this.initListData()
      this.closeLoading()
    } catch (err) {
      this.closeLoading()
    }
  }

  private async initListData() {
    getOrderClass(this.model.query).then(res => {
      const { total, list } = res
      this.model.total = total || 0
      this.model.list = list
    })
  }
}
