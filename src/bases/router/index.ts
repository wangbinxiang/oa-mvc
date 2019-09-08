import jr from '@/pages/common/router/jr-router'

import Vue from 'vue'
import Router from 'vue-router'
import constantRouter from '@/pages/common/router/constant-router'

Vue.use(Router)
export const asyncRouterMap = [jr]
export const constantRouterMap = constantRouter

export default new Router({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: constantRouter
})
