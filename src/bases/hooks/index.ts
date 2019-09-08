import Component from 'vue-class-component'

Component.registerHooks([
  'beforeRouteEnter', // 进入路由之前
  'beforeRouteLeave', // 离开路由之前
  'beforeRouteUpdate'
])
