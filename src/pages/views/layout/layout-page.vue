<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <header-bar />
    <page-loading />
    <div
      class="main-container"
      :style="`margin-left: ${generateWidth}px`"
    >
      <template>
        <tags-view :style="`left: ${generateWidth}px`" />
        <sidebar
          class="sidebar-container"
          :style="
            `width: ${generateWidth}px !important`
          "
        />
      </template>
      <template v-if="name !== 'dashboard'">
        <breadcrumb class="breadcrumb-container" />
        <app-main />
      </template>
      <template v-else>
        <app-main style="margin-top: 13px;" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Breadcrumb, PageLoading } from '@/modules/common'
import ResizeMixin from '../../common/mixin/resize-handler'
import LayoutPage from './model/layout-page'
import Service from './service/service'
import OperateStore from '@/pages/common/service/operate-store'

import configCode from '@/bases/config/configCode'
const { CLOSE_NAV_WIDTH, DEVICE_NAV_WIDTH } = configCode

import {
  HeaderBar,
  Sidebar,
  TagsView,
  AppMain
} from '@/modules/component'
@Component({
  components: {
    HeaderBar,
    Breadcrumb,
    Sidebar,
    TagsView,
    AppMain,
    PageLoading
  },
  mixins: [ResizeMixin]
})
export default class Layout extends Vue {
  private model: LayoutPage = {}
  private service: Service = new Service(this.model)

  private appState = this.$store.state.app

  private created() {
    this.service.operateStore(new OperateStore())
  }

  get varyWidth() {
    return this.$store.state.app.getVaryWidth
  }

  get classObj(): object {
    return {
      hideSidebar: !this.appState.sidebar.opened,
      withoutAnimation: this.appState.sidebar.withoutAnimation,
      mobile: this.appState.device === 'mobile'
    }
  }

  get name(): string | undefined {
    return this.$route.name
  }

  get generateWidth(): number {

    if (this.appState.device === 'mobile') {
      return this.appState.sidebar.opened ? DEVICE_NAV_WIDTH : CLOSE_NAV_WIDTH
    }
    return this.appState.sidebar.opened ? (this.appState.desktopNavWidth + this.appState.varyWidth) : CLOSE_NAV_WIDTH
  }

  get sidebar(): object {
    return this.appState.sidebar
  }

  get device(): string {
    return this.appState.device
  }

  private handleClickOutside(): void {
    return this.service.handleClickOutside()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/bases/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  min-height: 100%;
  width: 100%;
}

.breadcrumb-container {
  padding-left: 12px;
  height: 48px;
  line-height: 48px;
}
</style>
