<template>
  <el-header
    class="header-bar"
    height="58px"
  >
    <!-- logo -->
    <router-link
      :title="$t('headerBar.logo')"
      to="/"
      class="logo"
    >
      {{ $t('headerBar.logo') }}
    </router-link>
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <div
      v-show="device !== 'mobile'"
      class="header-marquee"
    >
      <vue-seamless-scroll
        :data="marqueeData"
        :class-option="classOption"
        class="seamless-warp"
      >
        <ul class="item">
          <li
            v-for="(item, index) in marqueeData"
            :key="index"
          >
            <a href="javascript: void(0);"> {{ item.title }} </a>
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>
    <div class="right-menu">
      <!-- 用户信息 -->
      <el-dropdown
        class="avatar-container right-menu-item"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <el-badge
            v-if="total"
            :value="total"
            class="mark"
          />
          <img
            :src="showImg()"
            class="user-avatar"
          >
          <span class="login-user-info">
            {{ adminName }}
          </span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">
              {{ $t('headerBar.dashboard') }}
            </router-link>
          </el-dropdown-item>

          <el-dropdown-item>
            <a
              href="javascript:;"
              style="display:block;"
              class="signOut_el"
              @click="signOut"
            >
              {{ $t('headerBar.signOut') }}
            </a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 主题设置 -->
      <theme-select class="right-menu-item" />

      <!-- 更新缓存 -->
      <el-tooltip
        v-if="device !== 'mobile'"
        :content="$t('headerBar.refresh')"
        class="right-menu-item"
        effect="dark"
        placement="bottom"
      >
        <refresh class="refresh right-menu-item" />
      </el-tooltip>

      <!-- 全屏模式 -->
      <el-tooltip
        v-if="device !== 'mobile'"
        :content="$t('headerBar.screenfull')"
        class="right-menu-item"
        effect="dark"
        placement="bottom"
      >
        <screen-full class="screenfull right-menu-item" />
      </el-tooltip>
    </div>
  </el-header>
</template>

<script lang="ts">
import { Hamburger, ScreenFull, Refresh, ThemeSelect } from '@/modules/common'
import vueSeamlessScroll from 'vue-seamless-scroll'

import { Component, Vue } from 'vue-property-decorator'
import HeaderPage from './model/header-page'
import Service from './service/service'
import OperateStore from '@/pages/common/service/operate-store'

@Component({
  components: {
    Hamburger,
    ScreenFull,
    Refresh,
    ThemeSelect,
    vueSeamlessScroll
  }
})
export default class HeaderBar extends Vue {
  public model: HeaderPage = {}
  private total: number = 0
  private marqueeData: object[] = [
    {
      id: 'MA',
      title: '欢迎登陆后台管理系统'
    },
    {
      id: 'MA',
      title: '您有10条待办事项待处理'
    }
  ]
  private service: Service = new Service(this.model)

  private created(): void{
    this.service.operateStore(new OperateStore())
  }
  get device(): string {
    return this.service.getDevice()
  }
  get sidebar(): object {
    return this.service.getSidebar()
  }
  get adminName(): string {
    return this.service.getAdminName()
  }

  get classOption(): any {
    return this.service.classOption()
  }
  private showImg() {
    return this.service.showImg()

  }
  private signOut() {
    return this.service.SignOut()
  }
}
</script>
