import Layout from '@/pages/views/layout/layout-page.vue'

import configCode from '@/bases/config/configCode'
const { ROUTER_PERMISSION_MARK } = configCode.jr

import configRouteName from '@/bases/config/configRouteName'
const { jr, hzlh } = configRouteName

// meta 配置sidebar的icon和文字
export default {
  path: '/jr-resource-management',
  component: Layout,
  meta: { title: 'jr.resourceManagement', icon: 'icon-ziyuanguanli' },
  children: [
    {
      path: '/jrResourceManagement/menu1-1',
      redirect: '/jrResourceManagement/menu1-1',
      component: () =>
        import('@/pages/views/jr1/index.vue'),
      roleId: ROUTER_PERMISSION_MARK.resourceManagement.productsManagement,
      meta: { title: 'jr.productsManagement.index', icon: 'icon-jinrongchanpin' },
      children: [
        {
          path: 'list',
          component: () =>
            import('@/pages/views/jr1/view/list.vue'),
          name: jr.productsManagementList,
          meta: { title: 'jr.productsManagement.index', icon: 'icon-jinrongchanpin' }
        },
        {
          path: 'edit/:id',
          hidden: true,
          component: () =>
            import('@/pages/views/jr1/view/edit.vue'),
          name: hzlh.policyEdit,
          meta: { title: 'hzlh.policy.edit', icon: 'icon-zhengceguanli' }
        }
      ]
    },
    {
      path: 'menu1-2',
      name: jr.loadRequirementList,
      component: () =>
        import('@/pages/views/jr2/index.vue'),
      roleId: ROUTER_PERMISSION_MARK.resourceManagement.loadRequirementsManagement,
      meta: { title: 'jr.loadRequirement.index', icon: 'icon-jinrongchanpin' }
    },

    {
      path: '/jr-resource-management/menu1-3',
      redirect: '/jr-resource-management/menu1-3/list',
      component: () =>
        import('@/pages/views/jr3/index.vue'),
      roleId: ROUTER_PERMISSION_MARK.resourceManagement.productsManagement,
      meta: { title: 'jr.orderManagement.index', icon: 'icon-jinrongchanpin' },
      children: [
        {
          path: 'list',
          component: () =>
            import('@/pages/views/jr3/view/list.vue'),
          name: jr.orderManagement,
          meta: { title: 'jr.orderManagement.index', icon: 'icon-jinrongchanpin' }
        }
      ]
    },
  ]
}
