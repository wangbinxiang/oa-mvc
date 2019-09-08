import filters from './filters'
import route from './route'

import hzlh from './model/hzlh'
import zj from './model/zj'
import jr from './model/jr'

export default {
  operation: {
    operation: '操作',
    view: '查看',
    submit: '提交',
    add: '新增',
    delete: '删除',
    checkAll: '全选',
    edit: '编辑',
    reEdit: '重新编辑',
    disable: '禁用',
    enable: '启用',
    audit: '审核管理',
    approve: '通过',
    reject: '驳回',
    topping: '置顶',
    unpin: '取消置顶',
    agreed: '同意',
    noAgreed: '不同意',
    shelves: '上架',
    unShelves: '下架',
    open: '打开',
    close: '关闭',
    relationAnalyzing: '关联政策解读',
    relieveAnalyzing: '解除政策解读关联',
    showBankCard: '查看银行卡',
    transferCompleted: '确认转账',
    // hzlh
    addPolicy: '发布政策',
    addPolicyAnalyzing: '发布解读',
    addText: '添加文字',
    addImg: '添加图片',
    // zj
    parentCategoriesAdd: '新增父级分类',
    addChild: '添加子分类',
    editChild: '编辑子分类',
  },
  placeholder: {
    // jr
    relationAnalyzing: '请选择政策解读'
  },
  // 加载
  loading: {
    loadingText: '加载中...'
  },
  // 菜单
  headerBar: {
    logo: '后台管理平台',
    signOut: '退出',
    dashboard: '首页',
    personalCenter: '个人中心',
    todoList: '待办事项',
    refresh: '刷新页面',
    screenfull: '全屏',
    theme: '换肤',
    rose: '红色',
    jack: '绿色',
    bee: '金色'
  },
  form: {
    submit: '提交',
    change: '修改',
    confirm: '确定',
    close: '关闭',
    cancel: '取消'
  },
  table: {
    number: '编号',
    noImg: '暂无图片'
  },
  tagsView: {
    dashboard: '首页',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  forward: '敬请期待',
  filters,
  route,

  hzlh,
  zj,
  jr
}
