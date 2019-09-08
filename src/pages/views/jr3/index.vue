<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
  @Component({
    name: 'productsManagement'
  })
export default class ProductsManagement extends Vue {}
</script>