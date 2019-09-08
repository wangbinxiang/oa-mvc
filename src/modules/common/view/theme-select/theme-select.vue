<template>
  <el-dropdown
    class="theme-setting "
    trigger="click"
    @command="handleSetTheme"
  >
    <span class="el-dropdown-link">
      <i class="iconfont icon-setting" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :disabled="theme === 'rose'"
        command="rose"
      >
        {{ $t('headerBar.rose') }}
      </el-dropdown-item>
      <el-dropdown-item
        :disabled="theme === 'jack'"
        command="jack"
      >
        {{ $t('headerBar.jack') }}
      </el-dropdown-item>
      <el-dropdown-item
        :disabled="theme === 'bee'"
        command="bee"
      >
        {{ $t('headerBar.bee') }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import ThemePage from './model/theme-page'
import Service from './service/service'
import OperateStore from '@/pages/common/service/operate-store'

@Component
export default class ThemeSelect extends Vue {
  public model: ThemePage = {}
  private service: Service = new Service(this.model)
  get theme() {
    return this.service.getTheme()
  }
  private handleSetTheme(themeItem: any) {
    this.service.setTheme(this.$message, themeItem)
  }
  private created() {
    this.service.operateStore(new OperateStore())
  }
}
</script>
