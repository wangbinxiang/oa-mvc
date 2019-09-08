<template>
  <div>
    <i
      class="iconfont icon-refresh"
      @click="click"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Refresh extends Vue {
  private click() {
    location.reload()
  }
}
</script>
