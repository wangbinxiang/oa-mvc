<template>
  <div>
    <i
      class="iconfont icon-screenfull"
      @click="click"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import screenfull from 'screenfull'

import Service from './service/service'
import ScreenPage from './model/screen-page'

@Component
export default class ScreenFull extends Vue {
    private screenf!: any
    private model: ScreenPage ={
      screenf: screenfull
    }
    private service: Service = new Service(this.model)

    private click(): boolean | undefined {
      return this.service.toggleScreenFull(this.$message)
    }
}
</script>
