<template>
  <div class="container-fluid">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane :label="$t('zj.resourceManagement.orderManagement.label.list')">
        <div class="container-fluid">
          <el-tabs :tab-position="tabPosition">
            <el-row class="row-bg">
              <div>
                <el-radio-group
                  v-model="model.radio"
                  fill="#409EFF"
                  size="medium"
                  @change="radioChange"
                >
                  <el-radio-button
                    v-for="(item, index) in radioSelectList"
                    :key="index"
                    :label="item.label"
                    class="button-white"
                  />
                </el-radio-group>
              </div>
            </el-row>

            <el-row>
              <el-col :span="6">
                <span class="demonstration">订单编号：</span>
                <el-input
                  v-model="model.orderno"
                  style="width: 190px; display:inline-block;"
                  placeholder="请输入订单编号"
                  type="number"
                />
              </el-col>
              <el-col :span="18">
                <span class="demonstration">创建时间：</span>
                <el-date-picker
                  v-model="model.startTime"
                  type="date"
                  value-format="timestamp"
                  placeholder="开始时间"
                  :picker-options="startPickerOptions"
                />
                &nbsp;
                <el-date-picker
                  v-model="model.endTime"
                  placeholder="结束日期"
                  value-format="timestamp"
                  type="date"
                  :picker-options="endPickerOptions"
                />
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <span class="demonstration">服务商企业名称：</span>
                <el-select
                  v-model="model.sellerEnterprise"
                  style="width: 190px; display:inline-block;"
                  :multiple="false"
                  filterable
                  remote
                  clearable
                  placeholder="请输入关键词"
                  :remote-method="sellerRemoteMethod"
                  :loading="model.sellerLoading"
                >
                  <el-option
                    v-for="(item, index) in model.sellerEnterpriseList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
              <el-col :span="18">
                <span class="demonstration">买家企业名称：</span>
                <el-select
                  v-model="model.buyerEnterprise"
                  style="width: 190px; display:inline-block;"
                  filterable
                  remote
                  clearable
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="buyerRemoteMethod"
                  :loading="model.buyerLoading"
                >
                  <el-option
                    v-for="(item, index) in model.buyerEnterpriseList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>

            <el-row>
              <el-col>
                <span class="demonstration">服务商分类：</span>
                <el-select
                  v-model="model.parentCategoryValue"
                  placeholder="全部一级分类"
                  size="medium"
                  style="width: 200px; display:inline-block;"
                  @change="parentCategorySelectChange"
                >
                  <el-option
                    v-for="(item, index) in model.parentCategory"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                &nbsp;
                <el-select
                  v-model="model.serviceCategoryValue"
                  placeholder="全部二级分类"
                  size="medium"
                  style="width: 200px; display:inline-block;"
                >
                  <el-option
                    v-for="(item, index) in model.serviceCategory"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                &nbsp;
                <el-button
                  plain
                  icon="el-icon-search"
                  @click="search"
                >
                  查询
                </el-button>
              </el-col>
            </el-row>

            <!-- 列表 -->
            <el-table
              v-loading="model.listLoading"
              v-superScroll:el-table
              :element-loading-text="$t('loading.loadingText')"
              :data="model.list"
              border
              style="width: 100%"
            >
              <el-table-column
                label="订单编号"
              >
                <template slot-scope="scope">
                  <span :title="scope.row.orderno">
                    {{ scope.row.orderno }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="服务"
                align="center"
                prop="number"
                min-width="100"
              >
                <template slot-scope="scope">
                  <span :title="scope.row.orderCommodities[0].commodity.title">
                    {{ scope.row.orderCommodities[0].commodity.title }}
                  </span>
                  <br>
                  <el-tag>
                    {{ scope.row.orderCommodities[0].commodity.price[scope.row.orderCommodities[0].skuIndex].name }}
                  </el-tag>
                </template>
              </el-table-column>
              <template v-if="deviceType !== 'mobile'">
                <!-- 金融产品名称 -->
                <el-table-column
                  label="买家信息"
                  align="center"
                  prop="title"
                  min-width="100"
                >
                  <template slot-scope="scope">
                    <span :title="scope.row.buyerEnterprise.companyName">
                      {{ scope.row.buyerEnterprise.companyName }}
                    </span>
                    <br>
                    <span :title="scope.row.buyerEnterprise.contactName">
                      {{ scope.row.buyerEnterprise.contactName }}
                    </span>
                    <br>
                    <span :title="scope.row.buyerEnterprise.contactPhone">
                      {{ scope.row.buyerEnterprise.contactPhone }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="服务商信息"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span :title="scope.row.sellerEnterprise.companyName">
                      {{ scope.row.sellerEnterprise.companyName }}
                    </span>
                    <br>
                    <span :title="scope.row.sellerEnterprise.contactName">
                      {{ scope.row.sellerEnterprise.contactName }}
                    </span>
                    <br>
                    <span :title="scope.row.sellerEnterprise.contactPhone">
                      {{ scope.row.sellerEnterprise.contactPhone }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单价"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span :title="scope.row.orderCommodities[0].commodity.price[scope.row.orderCommodities[0].skuIndex].value">
                      {{ scope.row.orderCommodities[0].commodity.price[scope.row.orderCommodities[0].skuIndex].value }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="数量"
                  align="center"
                  width="90"
                >
                  <template slot-scope="scope">
                    <span :title="scope.row.orderCommodities[0].number">
                      {{ scope.row.orderCommodities[0].number }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="平台补贴"
                  align="center"
                >
                  ￥0.00
                </el-table-column>
                <el-table-column
                  label="店铺优惠"
                  align="center"
                >
                  0
                </el-table-column>
                <el-table-column
                  label="买家实付金额"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span :title="scope.row.totalPrice">
                      ￥{{ scope.row.totalPrice }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="订单金额"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span :title="scope.row.totalPrice">
                      ￥{{ scope.row.totalPrice }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="订单状态"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>
                      {{ scope.row.status === 0 ? '待付款' : (scope.row.status === 2 ? '待服务开始' : (scope.row.status === 4 ? '服务中' : (scope.row.status === 6 ? '待确认服务完成' : (scope.row.status === 8 ? '服务完成' : '交易关闭')))) }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="创建时间"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span :title="scope.row.createTime | timestampToTime('YMDhms')">{{ scope.row.createTime | timestampToTime('YMDhms') }}</span>
                  </template>
                </el-table-column>
              </template>
              <el-table-column
                :label="$t('operation.operation')"
                fixed="right"
                width="100"
                align="center"
              >
                <template>
                  <el-button plain>
                    详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="pagination-container">
              <el-pagination
                :current-page="model.query.page"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="model.query.size"
                :total="model.total"
                layout="total, sizes, prev, pager, next"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </el-tabs>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Service from '../service/list-service'
import OrderList from '../model/list-page'
import OperateStore from '@/pages/common/service/operate-store'
@Component
export default class ListManagement extends Vue {
  private tabPosition: string = 'top'

  private radioSelectList = [
    {
      value: null,
      label: '全部'
    }, {
      value: 0,
      label: '待付款'
    }, {
      value: 2,
      label: '待服务开始'
    }, {
      value: 4,
      label: '服务中'
    }, {
      value: 6,
      label: '待确认服务完成'
    }, {
      value: 8,
      label: '服务完成'
    }, {
      value: 10,
      label: '交易关闭'
    }
  ]

  private model: OrderList = {
    deviceType: '',
    listLoading: false, // 状态
    radio: '全部', // 类型
    query: {
      page: 1,
      size: 10,
      scene: '4'
    },
    total: 0,
    list: [], // 表格data
    startTime: null, // 订单创建起始时间
    endTime: null,
    parentCategory: [ // 服务商一级分类
      {
        value: null,
        label: '全部一级分类'
      }
    ],
    parentCategoryValue: '', //一级分类

    serviceCategory: [
      {
        value: null,
        label: '全部二级分类'
      }
    ],
    serviceCategoryValue: '', // 二级分类
    orderno: '',  // 订单编号

    sellerEnterprise: '', // 服务商企业名称
    sellerLoading: false, // 服务商关键词加载
    sellerEnterpriseList: [], // 服务商企业名称列表

    buyerEnterprise: '', // 买家企业
    buyerLoading: false, // 买家关键词加载
    buyerEnterpriseList: [] // 买家关键词列表
  }
  private service: Service = new Service(this.model)

  private startPickerOptions = {
    disabledDate: this.startDisable
  }
   private endPickerOptions = {
     disabledDate: this.endDisable
   }
   private startDisable(time: any) {
     return this.service.startDisable(time)
   }

   private endDisable(time: any) {
     return this.service.endDisable(time)
   }


   get deviceType(): string {
     return this.service.getDevice()
   }
   private created(): void{
     this.service.operateStore(new OperateStore())
     this.service.fetchDataTpl()
   }

   private radioChange(): void {
     this.service.radioChange()
   }

   private sellerRemoteMethod(query: string) {
     return this.service.sellerRemoteMethod(query)
   }
   private buyerRemoteMethod(query: string) {
     return this.service.buyerRemoteMethod(query)
   }

   private parentCategorySelectChange() {
     this.service.parentCategorySelectChange()
   }

   private handleSizeChange(val: number): void {
     this.service.handleSizeChange(val)
   }
   private handleCurrentChange(val: number): void {
     this.service.handleCurrentChange(val)
   }

   private search(): void {
     this.service.search()
   }
}



</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.el-tag {
  margin: 0 3px;
}
.text {
  font-size: 14px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.item {
  padding: 18px 0;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>
<style>
.button-white span.el-radio-button__inner {
  background-color: rgba(0,0,0,0);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>

