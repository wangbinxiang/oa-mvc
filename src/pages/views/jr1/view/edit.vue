<template>
  <div class="edit container-fluid">
    <el-tabs
      :element-loading-text="$t('loading.loadingText')"
      :tab-position="tabPosition"
    >
      <el-tab-pane :label="$t('hzlh.resourceManagement.policy.label.' + model.viewType)">
        <el-form
          ref="form"
          :model="model.form"
          class="operate-form"
        >
          <el-row :gutter="10">
            <el-col
              :xs="24"
              :sm="24"
              :md="1"
              :lg="1"
              :xl="1"
            />
            <el-col
              :xs="24"
              :sm="24"
              :md="20"
              :lg="20"
              :xl="20"
            >
              <div class="form-wrap">
                <!-- 标题 -->
                <el-form-item prop="title">
                  <el-input
                    v-model="model.form.title"
                    :maxlength="150"
                    type="text"
                  >
                    {{ $t('hzlh.resourceManagement.policy.title') }}
                  </el-input>
                </el-form-item>
              </div>
              <div class="form-wrap">
                <el-form-item>
                  <el-col
                    :span="12"
                    style="padding-left: 0; padding-right: 12px;"
                  >
                    <el-button
                      class="operate-form-button"
                      plain
                    >
                      {{ $t('form.cancel') }}
                    </el-button>
                  </el-col>
                  <el-col
                    :span="12"
                    style="padding-left: 12px; padding-right: 0;"
                  >
                    <el-button
                      class="operate-form-button"
                      type="success"
                      plain
                    >
                      {{ $t('form.confirm') }}
                    </el-button>
                  </el-col>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Route from 'vue-router'
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { ISetCacheViewData } from '@/pages/common/store/type'
import Service from '../service/edit-service'
import EditPage from '../model/edit-page'
import OperateStore from '@/pages/common/service/operate-store'

const counterModule = namespace('cache')
@Component
export default class Edit extends Vue {
  @counterModule.Action public SetCacheViewData!: (
    data: ISetCacheViewData
  ) => void

  private tabPosition: string = 'top'
  private viewType!: string

  private model: EditPage = {
    form: {
      title: '我是标题'
    },
    viewType: 'edit'
  }
  // get getCacheData() {
  //   return this.service.Store.getCacheData()
  // }
  private service: Service = new Service(this.model)

  beforeRouteLeave(to: Route, from: Route, next: Function) {
    this.service.cacheViewData(this.SetCacheViewData)
    next()
  }
  private created(): void {
    this.service.operateStore(new OperateStore())
    this.service.initialize()
  }
}
</script>

<style scoped>

</style>
