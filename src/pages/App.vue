<template>
  <div
    id="app"
    :class="theme"
  >
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class App extends Vue {
  @Getter('theme', { namespace: 'app' }) public theme!: string
}
</script>
