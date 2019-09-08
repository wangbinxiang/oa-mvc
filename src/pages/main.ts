import '@/bases/hooks'
import Vue from 'vue'
import App from './App.vue'
import router from '@/bases/router'
import i18n from '@/bases/lang'
import store from '@/pages/common/store/index'

import 'element-ui/lib/theme-chalk/index.css'
import '@/bases/styles/index.scss'
import '@/bases/system/permission'

import * as filters from '@/bases/filters' // global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, (<any>filters)[key])
})


import Element from 'element-ui'
Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key: string, value: any) => i18n.t(key, value)
})

import '@/bases/directive/superScroll'

Vue.config.productionTip = false


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
