import SignIn from '@/pages//views/auth/sign-in.vue'
import LayoutPage from '@/pages/views/layout/layout-page.vue'
import configRouteName from '@/bases/config/configRouteName'
const { signIn, page404, page401, dashboard } = configRouteName

import { DemoTable } from '@/modules/demo'

export default [
  {
    path: '/signIn',
    component: SignIn,
    name: signIn,
    hidden: true
  },
  {
    path: '/404',
    component: DemoTable,
    name: page404,
    hidden: true
  },
  {
    path: '/401',
    component: DemoTable,
    name: page401,
    hidden: true
  },

  // 首页
  {
    path: '',
    component: LayoutPage,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: DemoTable,
        name: dashboard,
        meta: { title: 'dashboard', icon: 'icon-dashboard', noCache: true }
      }
    ]
  }

]
