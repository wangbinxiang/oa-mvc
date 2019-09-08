<template>
  <section
    class="app-main"
    style="min-height: 100%"
  >
    <transition
      name="fade"
      mode="out-in"
    >
      <keep-alive :include="cachedViews">
        <router-view :key="'key'" />
      </keep-alive>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { namespace } from 'vuex-class'
const counterModule = namespace('tagsView')
@Component
export default class AppMain extends Vue {
  @counterModule.State('visitedViews') public cachedViews!: any[]
  get key() {
    return typeof this.$route.name !== 'undefined'
      ? this.$route.name + Number(new Date())
      : Number(new Date())
  }
}
</script>
