<template>
  <div class="tags-view-container">
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
    >
      <router-link
        ref="dashboard"
        :class="isDashboard() ? 'active' : ''"
        to="/"
        class="tags-view-item"
      >
        <i class="iconfont icon-dashboard" />
        {{ $t('route.dashboard') }}
      </router-link>
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="transTag(tag)"
        class="tags-view-item"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        <i
          :class="tag.icon"
          class="iconfont"
        />
        {{ generateTitle(tag.title) }}
        <span
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="closeSelectedTag(selectedTag)">
        {{ $t('tagsView.close') }}
      </li>
      <li @click="closeOthersTags">
        {{ $t('tagsView.closeOthers') }}
      </li>
      <li @click="closeAllTags">
        {{ $t('tagsView.closeAll') }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ScrollPane } from '@/modules/common/index'
import Service from './service/service'
import TagsPage from './model/tags-page'

import { generateTitle } from '@/bases/utils/i18n'
import OperateStore from '@/pages/common/service/operate-store'

import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const counterModule = namespace('tagsView')

import configCode from '@/bases/config/configCode'

const { CACHE_MARK } = configCode

@Component({
  components: {
    ScrollPane
  }
})
export default class TagsView extends Vue {
  @counterModule.Action public addVisitedViews!: (data: any) => void
  @counterModule.Action public delVisitedViews!: (data: any) => any
  @counterModule.Action public delAllViews!: () => void
  @counterModule.State('visitedViews') public visitedV!: any[]
  private model: TagsPage = {
    visible: false,
    top: 0,
    left: 0,
    selectedTag: {}
  }
  private service: Service = new Service(this.model)

  private visible!: boolean
  private top!: number
  private left!: number
  private selectedTag!: any
  private generateTitle: (title: string) => string = generateTitle
  private data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    }
  }

  get visitedViews(): any[] {
    return this.service.getVisitedViews()
  }
  private created() {
    this.service.operateStore(new OperateStore())
  }

  private mounted() {
    this.service.initDataOnMounted()
  }

  @Watch('$route')
  private OnRouteChange() {
    this.addViewTags()
    this.moveToCurrentTag()
  }

  @Watch('visible')
  private watchVisible(value: any) {
    if (value) {
      document.body.addEventListener('click', this.closeMenu)
    } else {
      document.body.removeEventListener('click', this.closeMenu)
    }
  }

  private generateRoute() {
    if (this.$route.name) {
      return this.$route
    }
    return false
  }
  private isActive(route: any) {
    return this.service.isActive(route)
  }
  private isDashboard() {
    this.service.Store.refreshRoute(this.$route)
    return this.service.isDashboard()
  }

  private addViewTags() {
    const route = this.generateRoute()
    if (!route) {
      return false
    }
    this.addVisitedViews(route)
  }
  private moveToCurrentTag() {
    const tags: any = this.$refs.tag
    const scrollP: any = this.$refs.scrollPane
    if (!tags) return
    this.$nextTick(() => {
      for (const tag of tags) {
        if (tag.to.path === this.$route.path) {
          scrollP.moveToTarget(tag.$el)
          break
        }
      }
    })
  }
  private closeSelectedTag(view: any) {
    this.delVisitedViews(view).then((views: any) => {
      if (this.isActive(view)) {
        const latestView = views.slice(-1)[0]
        if (latestView) {
          this.$router.push(latestView)
        } else {
          this.$router.push('/')
        }
      }
    })
  }
  private closeOthersTags() {
    this.$router.push(this.selectedTag)
    this.delVisitedViews(this.selectedTag).then(() => {
      this.moveToCurrentTag()
    })
  }
  private closeAllTags() {
    this.delAllViews()
    this.$router.push('/')
  }
  private openMenu(tag: any, e: any) {
    this.visible = true
    this.selectedTag = tag
    const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
    this.left = e.clientX - offsetLeft + 15 // 15: margin right
    this.top = e.clientY
  }
  private closeMenu() {
    this.visible = false
  }
  private transTag(tag: any) {
    tag.hash = CACHE_MARK
    // console.log(tag)
    return tag
  }
}
</script>

