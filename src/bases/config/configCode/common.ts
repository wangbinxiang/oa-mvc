export default {
  CACHE_MARK: '#_CACHE',
  DEVICE_NAV_WIDTH: 260,
  CLOSE_NAV_WIDTH: 36,
  NAV_WORD_COUNT: 3,
  NAV_WORD_WIDTH: 14,

  // 富文本编辑器key
  TINYMCE_KEY: 'izbp85lql4tov63c3zdjq36dt8jxllx0ekdcqw655k23srlq',

  // 静态资源地址
  STATIC_DOMAIN: 'https://huizhong-united.oss-cn-beijing.aliyuncs.com/oa/img/',
  // 动态资源地址
  DOMAIN: 'https://huizhong-united.oss-cn-beijing.aliyuncs.com/', // ossSandbox/ ossProduction/

  // 默认头像
  defaultAvatar: 'default_avatar.png',
  idBackAfterUpload: {
    name: '银行卡默认图片',
    identify: 'idback-after-upload.png'
  },
  idCardFacadeBeforeUpload: {
    name: '身份证正面照片',
    identify: 'idfront-before-upload.png'
  },
  idCardNegativeBeforeUpload: {
    name: '身份证反面照片',
    identify: 'idback-before-upload.png'
  },
  idCardHandAfterBeforeUpload: {
    name: '手持身份证照片',
    identify: 'idhand-before-upload.png'
  },
  licenseBeforeUpload: {
    name: '营业执照照片',
    identify: 'license-before-upload.png'
  },
  defaultServiceCategory: {
    name: '默认服务分类图片',
    identify: 'serviceCategory.jpg'
  },

  HTTP_RESPONSE_STATUS_SUCCESS: 1,
  HTTP_RESPONSE_STATUS_ERROR: 0,
  HTTP_CODE_DATA_FORMAT_ERROR: 400,
  HTTP_CODE_SIGN_IN_FAIL_ERROR: 401,
  HTTP_CODE_NO_PERMISSION_ERROR: 403,
  HTTP_CODE_RESOURCE_NOT_FOUND_ERROR: 404,
  HTTP_CODE_OPERATIONAL_FAILURE_ERROR: 500,
  aliOss: {
    key: '',
    policy: '',
    OSSAccessKeyId: '',
    success_action_status: '200',
    callback: '',
    signature: ''
  },
  tabOptions: [
    {
      id: '2',
      name: '待审核'
    },
    {
      id: '4',
      name: '已通过'
    },
    {
      id: '-4',
      name: '已驳回'
    }
  ],
  transDataTag: {
    applicableObject: { // 适用对象
      '1': '微型企业',
      '2': '小型企业',
      '3': '中型企业',
      '4': '大型企业',
      '5': '创业个人',
      '6': '个体商户',
      '7': '其他'
    },
    dispatchDepartment: { // 发文部门
      '1': '国务院',
      '2': '工信部',
      '3': '财政部',
      '4': '发展和改革委',
      '5': '环保部',
      '6': '建设部',
      '7': '交通部',
      '8': '科技部',
      '9': '人保部',
      '10': '农业部'
    },
    applicableIndustries: { // 适用行业
      '1': '矿产品（煤、磷）精细化工',
      '2': '生物医学',
      '3': '食品饮料',
      '4': '纺织服装',
      '5': '化学纤维',
      '6': '家具制品',
      '7': '造纸和印刷品',
      '8': '橡胶和塑料',
      '9': '通用设备',
      '10': '专用设备',
      '11': '汽车制造',
      '12': '船舶、航空航天',
      '13': '电气机械',
      '14': '通信电子、仪器仪表',
      '15': '电力、热力供应',
      '16': '其他'
    },
    classify: { // 政策分类
      '1': '产业政策',
      '2': '金融支持',
      '3': '环境发展',
      '4': '财政扶持',
      '5': '创业创新',
      '6': '税收优惠',
      '7': '综合政策'
    },
    serviceModes: { // 服务方式
      '1': '合同式服务',
      '2': '柜台服务',
      '3': '电话服务',
      '4': '其他'
    },
    financialCategories: { // 中介分类
      '1': {
        categoriesName: '股权投资',
        isRequire: '是',
        certificateName: '银行业监督管理机构许可证'
      },
      '2': {
        categoriesName: '股权融资',
        isRequire: '是',
        certificateName: '银行业监督管理机构许可证'
      },
      '3': {
        categoriesName: '担保服务',
        isRequire: '是',
        certificateName: '银行业监督管理机构许可证'
      },
      '4': {
        categoriesName: '信托服务',
        isRequire: '是',
        certificateName: '银行业监督管理机构许可证'
      },
      '5': {
        categoriesName: '理财服务',
        isRequire: '是',
        certificateName: '银行业监督管理机构许可证'
      },
      '6': {
        categoriesName: '保险',
        isRequire: '是',
        certificateName: '银行业监督管理机构许可证'
      },
      '7': {
        categoriesName: '证券',
        isRequire: '是',
        certificateName: '银行业监督管理机构许可证'
      },
      '8': {
        categoriesName: '基金',
        isRequire: '是',
        certificateName: '银行业监督管理机构许可证'
      },
      '9': {
        categoriesName: '政策性金融产品',
        isRequire: '是',
        certificateName: '银行业监督管理机构许可证'
      },
      '10': {
        categoriesName: '小额贷款',
        isRequire: '是',
        certificateName: '银行业监督管理机构许可证'
      },
      '11': {
        categoriesName: '典当',
        isRequire: '是',
        certificateName: '银行业监督管理机构许可证'
      },
      '12': {
        categoriesName: '其他',
        isRequire: '是',
        certificateName: '银行业监督管理机构许可证'
      }
    },
    loanMethod: { // 贷款方式
      '1': '信用贷款',
      '2': '担保贷款',
      '3': '票据贷款',
      '4': '抵押贷款',
      '5': '质押贷款',
      '6': '其他'
    },
    jrApplicableObject: { // 金融适用对象
      '1': '个人',
      '2': '企业'
    }
  }
}
