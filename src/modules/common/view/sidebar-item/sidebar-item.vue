<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <template v-if="!item.hidden && item.children">
        <router-link
          v-if="
            hasOneShowingChildren(item.children) &&
              !item.children[0].children &&
              !item.alwaysShow
          "
          :key="item.children[0].name"
          :to="item.path + '/' + item.children[0].path"
        >
          <el-menu-item
            :index="item.path + '/' + item.children[0].path"
            :class="{ 'submenu-title-noDropdown': !isNest }"
          >
            <i
              v-if="item.children[0].meta && item.children[0].meta.icon"
              :class="item.children[0].meta.icon"
              class="iconfont"
            />
            <span
              v-if="item.children[0].meta && item.children[0].meta.title"
              slot="title"
            >
              {{ generateTitle(item.children[0].meta.title) }}
            </span>
          </el-menu-item>
        </router-link>

        <el-submenu
          v-else
          :key="item.name"
          :index="item.name || item.path"
        >
          <template slot="title">
            <i
              v-if="item.meta && item.meta.icon"
              :class="item.meta.icon"
              class="iconfont"
            />
            <span
              v-if="item.meta && item.meta.title"
              slot="title"
            >
              {{ generateTitle(item.meta.title) }}
            </span>
          </template>

          <template v-for="child in item.children">
            <template v-if="!child.hidden">
              <sidebar-item
                v-if="child.children && child.children.length > 0"
                :key="child.path"
                :routes="[child]"
                :is-nest="true"
                class="nest-menu"
              />

              <router-link
                v-else
                :key="child.name"
                :to="item.path + '/' + child.path"
              >
                <el-menu-item :index="item.path + '/' + child.path">
                  <i
                    v-if="child.meta && child.meta.icon"
                    :class="child.meta.icon"
                    class="iconfont"
                  />
                  <span
                    v-if="child.meta && child.meta.title"
                    slot="title"
                  >
                    {{ generateTitle(child.meta.title) }}
                  </span>
                </el-menu-item>
              </router-link>
            </template>
          </template>
        </el-submenu>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { generateTitle } from '@/bases/utils/i18n'
import { Component, Prop, Vue } from 'vue-property-decorator'
import SideItemPage from './model/sidebar-item'
import Service from './service/service'
  @Component({
    name: 'SidebarItem'
  })
export default class AppMain extends Vue {
    @Prop({
      type: Array,
      default: () => {
        return []
      }
    })
    routes!: object
    @Prop({ type: Boolean, default: false }) isNest!: boolean
    private model: SideItemPage = {}
    private service: Service = new Service(this.model)
    private generateTitle: (title: string) => string = generateTitle
    private hasOneShowingChildren(children: any[]): boolean {
      return this.service.hasOneShowingChildren(children)
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import '~@/bases/styles/mixin';
  .menu-wrapper {
    user-select: none;
    .el-badge {
      position: absolute;
      top: -10px;
      z-index: 100;
      margin-left: -8px;
      $an1: (
        opacity: 0,
        transform: scale3d(0.1, 0.1, 0.1)
      );
      $an2: (
        opacity: 1,
        transform: scale3d(1, 1, 1)
      );
      $an3: (
        opacity: 0,
        transform: scale3d(0.1, 0.1, 0.1)
      );
      $demo: (
        0%: $an1,
        50%: $an2,
        100%: $an3
      );
      @include keyframes(zoomInOut, $demo);
      @include animation(zoomInOut 2s ease-in-out infinite);
      animation-delay: 0.5s;
    }
  }
  .img-size-50 {
    position: absolute;
    top: 4px;
    left: 3px;
    width: 38px;
    height: 38px;
    vertical-align: middle;
  }
</style>

<style rel="stylesheet/scss" lang="scss">
  .select-item {
    position: relative;
    margin-right: 10px;
    width: 150px;
    float: left;
    .el-input--suffix .el-input__inner {
      padding-left: 50px !important;
      border: none;
    }
  }
</style>
