<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator-class="el-icon-arrow-right"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in model.levelList"
        :key="item.path"
      >
        <span
          v-if="
            item.redirect === 'noredirect' || index === model.levelList.length - 1
          "
          class="no-redirect"
        >
          {{ generateTitle(item.meta.title) }}
        </span>
        <router-link
          v-else
          :to="item.redirect || item.path"
        >
          {{ generateTitle(item.meta.title) }}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'

import { generateTitle } from '@/bases/utils/i18n'

import BreadCrumbPage from './model/breadCrumb-page'
import Service from './service/service'
import OperateStore from '@/pages/common/service/operate-store'

@Component
export default class Breadcrumb extends Vue {

  private generateTitle: (title: string) => string = generateTitle

  private model: BreadCrumbPage = {
    levelList: []
  }
  private service: Service = new Service(this.model)

  @Watch('$route')
  private OnRouteChange(unitCb?: () => void) {
    this.service.makeBreadcrumb()
    typeof unitCb === 'function' && unitCb()
  }
  private created() {
    this.service.operateStore(new OperateStore())
    this.service.makeBreadcrumb()
  }
}
</script>

