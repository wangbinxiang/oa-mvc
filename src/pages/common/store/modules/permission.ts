import { MutationTree, Module, ActionTree, GetterTree } from 'vuex'
import { asyncRouterMap, constantRouterMap } from '@/bases/router'

import configCode from '@/bases/config/configCode'
const { permissionMap } = configCode.hzlh

import { permissionType } from '../mutation-types'
import { RootState, IPermissionState, IPermission } from '../type'
const { SET_PERMISSION_CACHE, SET_PERMISSION, SET_ROUTERS } = permissionType

function filterAsyncRouter(
  asyncRouterMap: any[],
  _modelPermissionId: number[]
) {
  return asyncRouterMap.filter(route => {
    if (route.roleId === 0 || _modelPermissionId.indexOf(route.roleId) > -1) {
      return true
    } else {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, _modelPermissionId)
        if (route.children.length) {
          return true
        }
        return false
      }
      return false
    }
  })
}

function generatePermission(data: any[]) {
  const obj: IPermission = {
    modelPermission: [],
    modelOperationPermission: {}
  }
  data.forEach(item => {
    obj.modelPermission.push(item.id)
    if (
      (<any>permissionMap)[item.id] &&
      Array.isArray(item.child) &&
      item.child.length
    ) {
      obj.modelOperationPermission[
        (<any>permissionMap)[item.id]
      ] = item.child.map((ele: any) => ele.webname)
    }
  })
  return obj
}

const state: IPermissionState = {
  hasCachePermission: false,
  permission: {
    modelPermission: [],
    modelOperationPermission: {}
  },
  routers: constantRouterMap
}

const mutations: MutationTree<IPermissionState> = {
  'INIT_MODULES_STATE'(state) {
    state.hasCachePermission = false
    state.permission = {
      modelPermission: [],
      modelOperationPermission: {}
    }
    state.routers = constantRouterMap
  },
  [SET_PERMISSION_CACHE]: (
    state,
    payload: { hasCachePermission: boolean }
  ) => {
    state.hasCachePermission = payload.hasCachePermission
  },
  [SET_PERMISSION]: (
    state,
    payload: { permission: IPermission }
  ) => {
    state.permission = payload.permission
  },
  [SET_ROUTERS]: (state, payload: { routers: any[] }) => {
    state.routers = constantRouterMap.concat(payload.routers)
  }
}

const actions: ActionTree<IPermissionState, RootState> = {
  GetPermission({ commit }) {
    return new Promise(resolve => {
      const permission: IPermission = generatePermission([])
      commit({
        type: 'SET_PERMISSION_CACHE',
        hasCachePermission: true
      })
      commit({
        type: 'SET_PERMISSION',
        permission: permission
      })
      resolve(permission)
    })
  },
  GenerateRoutes(
    { commit },
    { _permission }: { _permission: IPermission }
  ) {
    let accessedRouters = null
    return new Promise(resolve => {
      accessedRouters = filterAsyncRouter(
        asyncRouterMap,
        _permission.modelPermission
      )
      commit({
        type: 'SET_ROUTERS',
        routers: accessedRouters
      })
      resolve(accessedRouters)
    })
  }
}

const getters: GetterTree<IPermissionState, RootState> = {
  hasCachePermission: (state) => state.hasCachePermission,
  permission: (state) => state.permission,
  permissionRouters: (state) => state.routers
}

export const permission: Module<IPermissionState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
