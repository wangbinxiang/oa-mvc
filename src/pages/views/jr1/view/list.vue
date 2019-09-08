<template>
  <div class="container-fluid">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane :label="$t('hzlh.resourceManagement.policy.label.list')">
        <div class="container-fluid">
          <!-- 搜索 -->
          <div class="filter-bar">
            <div class="right">
              <el-row :gutter="10">
                <el-col
                  :xs="24"
                  :sm="24"
                  :md="24"
                  :lg="24"
                  :xl="24"
                >
                  <el-button
                    class="btn-add"
                    type="success"
                    icon="el-icon-plus"
                    plain
                  >
                    {{ $t('operation.addPolicy') }}
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </div>
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
              :label="$t('hzlh.resourceManagement.policy.title')"
              prop="title"
              min-width="220"
            >
              <template slot-scope="scope">
                {{ scope.row.title }}
              </template>
            </el-table-column>

            <template v-if="deviceType !== 'mobile'">
              <!-- 编号 -->
              <el-table-column
                :label="$t('hzlh.resourceManagement.policy.number')"
                prop="number"
                width="180"
                align="center"
              >
                <template slot-scope="scope">
                  <span :title="scope.row.number">{{ scope.row.number }}</span>
                </template>
              </el-table-column>

              <!-- 政策级别 -->
              <el-table-column
                :label="$t('hzlh.resourceManagement.policy.level')"
                prop="level"
                width="140"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.level | statusFilterConverter('level') }}</span>
                </template>
              </el-table-column>
            </template>

            <el-table-column
              :label="$t('operation.operation')"
              fixed="right"
              width="100"
              align="center"
            >
              <template slot-scope="scope">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    {{ $t('operation.operation') }}
                    <i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <router-link :to="{ name: 'policyEdit', params: { id: scope.row.id}}">
                        {{ $t('operation.edit') }}
                      </router-link>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="pagination-container">
            <el-pagination
              :current-page="query.page"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="query.size"
              :total="model.total"
              layout="total, sizes, prev, pager, next"
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import Service from '../service/list-service'
import ListPage from '../model/list-page'
import SetCacheTabData from '@/pages/common/mixin/setcache-tabdata'

@Component({
  mixins: [SetCacheTabData]
})
export default class PolicyList extends Vue {
    @Getter('device', { namespace: 'app' }) public deviceType?: string
    private listLoading!: boolean
    private tabPosition: string = 'top'
    private total!: number
    private list!: any[]
    private query: any = {
      page: 1,
      size: 10
    }
    private model: ListPage = {
      listLoading: false,
      total: 0,
      list: []
    }
    private service: Service = new Service(this.model)
    private created() {
      this.service.fetchModelTpl() // mock
    }

    private handleSizeChange(val: number): void {
      console.log('handleSizeChange')
    }
    private handleCurrentChange(val: number): void {
      console.log('handleCurrentChange')
    }
}
</script>
