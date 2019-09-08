<template>
  <div
    v-loading.fullscreen.lock="isLoading"
    :element-loading-text="$t('loading.loadingText')"
    element-loading-background="rgba(0, 0, 0, 0)"
    class="page-loading"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { namespace } from 'vuex-class'
// 命名空间
const counterModule = namespace('app')

@Component
export default class PageLoading extends Vue {
  @counterModule.State('isLoading') public isLoading: any
}
</script>
