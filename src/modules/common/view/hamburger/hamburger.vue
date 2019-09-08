<template>
  <div class="hamburger-drag">
    <div
      :class="{ 'is-active': isActive }"
      class="hamburger"
    >
      <i
        class="iconfont icon-hamburger"
        @click="toggleSideBar"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Service from './service/service'
import HamburgerPage from './model/hamburger-page'
import OperateStore from '@/pages/common/service/operate-store'

@Component
export default class Hamburger extends Vue {
  @Prop({ type: Boolean, default: false }) isActive!: boolean
  private model: HamburgerPage ={ }
  private service: Service = new Service(this.model)
  private toggleSideBar() {
    return this.service.toggleSideBar()
  }
  private created(): void {
    this.service.operateStore(new OperateStore())
  }
}
</script>
