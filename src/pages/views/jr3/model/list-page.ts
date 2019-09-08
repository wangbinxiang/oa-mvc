
interface Query {
  page: number;
  size: number;
  scene: string;
  startTime?: number | null;
  endTime?: number | null;
  status?: number;
  orderno?: string;
  buyerEnterprise? : string;
  sellerEnterprise? : string;
  serviceCategory?: string;
  serviceCategories?: any;
}
 interface Kind {
  value: string | null; label: string;
 }

export default class OrderList {
  public deviceType: string = 'mobile'
  public listLoading: boolean = false // 状态
  public radio: string = '全部'
  public query!: Query

  public total: number = 0
  public list!: OrderListItem[]; // 表格data

  public startTime: number | null = null // 订单创建起始时间
  public endTime: number | null = null
  public parentCategory: Kind[] = [ // 服务商一级分类
    {
      value: null,
      label: '全部一级分类'
    }
  ]
  public parentCategoryValue: string = '' //一级分类
  public serviceCategory!: Kind[];
  public serviceCategoryValue: string | null = null

  public orderno: string = ''  // 订单编号

  public sellerEnterprise: string = '' // 服务商企业名称
  public sellerLoading: boolean = false // 服务商关键词加载
  public sellerEnterpriseList!: Kind[]; // 服务商企业名称列表

  public buyerEnterprise: string = '' // 买家企业
  public buyerLoading: boolean = false // 买家关键词加载
  public buyerEnterpriseList!: Kind[]; // 买家关键词列表
}

export class OrderListItem {
  public buyerEnterprise: object = []
  public createTime: string = ''
  public id: string = ''
  public orderCommodities: [] = [];
  public orderno: string = ''
  public paymentIdpublic: string = ''
  public paymentTime: number = 1
  public paymentType: number = 1
  public sellerEnterprise: object = {}
  public status: number = 0
  public statusTime: number = 1
  public totalPrice: string = '1'
  public updateTime: number = 1
}