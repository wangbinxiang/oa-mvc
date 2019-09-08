<template>
  <div
    ref="scrollContainer"
    class="scroll-container"
    @wheel.prevent="handleScroll"
  >
    <div
      ref="scrollWrapper"
      :style="{ left: left + 'px' }"
      class="scroll-wrapper"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const padding = 15 // tag's padding

@Component
export default class ScrollPane extends Vue {
    private left!: number
    private data() {
      return {
        left: 0
      }
    }
    private handleScroll(e: any) {
      const eventDelta: number = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.scrollContainer as HTMLElement
      const $containerWidth: number = $container.offsetWidth
      const $wrapper: any = this.$refs.scrollWrapper as HTMLElement
      const $wrapperWidth: number = $wrapper.offsetWidth
      if (eventDelta > 0) {
        this.left = Math.min(0, this.left + eventDelta)
      } else {
        this.eventDeltaElse(eventDelta, $containerWidth, $wrapperWidth)
      }
    }
    private eventDeltaElse(
      eventDelta: number,
      $containerWidth: number,
      $wrapperWidth: number
    ) {
      if ($containerWidth - padding < $wrapperWidth) {
        this.judgeWrapperWidthAndSetLeft(
          eventDelta,
          $containerWidth,
          $wrapperWidth
        )
      } else {
        this.left = 0
      }
    }
    private judgeWrapperWidthAndSetLeft(
      eventDelta: number,
      $containerWidth: number,
      $wrapperWidth: number
    ) {
      if (this.left < -($wrapperWidth - $containerWidth + padding)) {
        this.left = this.left
      } else {
        this.left = Math.max(
          this.left + eventDelta,
          $containerWidth - $wrapperWidth - padding
        )
      }
    }
    private moveToTarget($target: any) {
      const $container = this.$refs.scrollContainer as HTMLElement
      const $containerWidth = $container.offsetWidth
      const $targetLeft = $target.offsetLeft
      const $targetWidth = $target.offsetWidth
      this.setTagLeft($targetLeft, $targetWidth, $containerWidth)
    }
    private setTagLeft(
      $targetLeft: number,
      $targetWidth: number,
      $containerWidth: number
    ) {
      if ($targetLeft < -this.left) {
        // tag in the left
        this.left = -$targetLeft + padding
      } else if (
        $targetLeft + padding > -this.left &&
      $targetLeft + $targetWidth < -this.left + $containerWidth - padding
      ) {
        // tag in the current view
      } else {
        // tag in the right
        this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding)
      }
    }
}
</script>
