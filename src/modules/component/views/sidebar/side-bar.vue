<template>
  <div>
    <el-menu
      :collapse="isCollapse"
      mode="vertical"
      @open="handleOpen"
      @close="handleClose"
    >
      <sidebar-item :routes="permissionRouters" />
    </el-menu>
    <div
      class="copy"
      :style="cobyStyle"
    >
      <a
        href="https://www.qixinyun.com/index.html"
        target="_blank"
      >
        {{ $t('route.support') }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SidebarItem } from '@/modules/common/'
import SidebarPage from './model/sidebar-page'
import Service from './service/service'
import OperateStore from '@/pages/common/service/operate-store'

@Component({
  components: {
    SidebarItem
  }
})
export default class HeaderBar extends Vue {
  private model: SidebarPage = {
    varyWidth: 0,
    cacheCount: {}
  }
  private service: Service = new Service(this.model)

  get cobyStyle(): object {
    return this.service.cobyStyle()
  }
  get isCollapse(): boolean {
    return this.service.isCollapse()
  }
  get permissionRouters(): object[] {
    return this.service.getRouters()
  }
  private created(): void {
    this.service.operateStore(new OperateStore())
    this.service.setContext(this)
    this.service.setNavMaxWidth()
  }
  private handleOpen(key: string, keyPath: string[]) {
    this.service.handleOpen(key, keyPath)
  }
  private handleClose(key: string) {
    this.service.handleClose(key)
  }
}
</script>
