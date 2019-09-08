import { MutationTree, Module, ActionTree, GetterTree } from 'vuex'
import { signOut } from '@/pages/common/api/auth'
import { userMock } from '../translater/mock'

import { userType } from '../mutation-types'
import { RootState, IUserState } from '../type'
import configCode from '@/bases/config/configCode'

const { HTTP_RESPONSE_STATUS_SUCCESS } = configCode

const { SET_ADMIN_ID, SET_ADMIN_AVATAR, SET_ADMIN_NAME } = userType

const state: IUserState = {
  adminId: '',
  adminName: '',
  adminAvatar: ''
}

const mutations: MutationTree<IUserState> = {
  'INIT_MODULES_STATE'(state) {
    state.adminId = ''
    state.adminName = ''
    state.adminAvatar = ''
  },
  [SET_ADMIN_ID](state, payload: { adminId: string }) {
    state.adminId = payload.adminId
  },
  [SET_ADMIN_AVATAR](state, payload: { adminAvatar: string }) {
    state.adminAvatar = payload.adminAvatar
  },
  [SET_ADMIN_NAME](state, payload: { adminName: string }) {
    state.adminName = payload.adminName
  }
}

const actions: ActionTree<IUserState, RootState> = {
  GetUserInfo({ commit }) {
    return new Promise(resolve => {
      const data = userMock
      commit({
        type: 'SET_ADMIN_ID',
        adminId: data.id
      })
      commit({
        type: 'SET_ADMIN_NAME',
        adminName: data.realName
      })
      commit({
        type: 'SET_ADMIN_AVATAR',
        adminAvatar: data.avatar
      })
      return resolve(userMock)
    })
  },

  SignOut() {
    return new Promise((resolve, reject) => {
      signOut().then(
        (response: any) => {
          const status = parseInt(response.data.status as string, 10)
          if (status === HTTP_RESPONSE_STATUS_SUCCESS) {
            resolve()
          }
          resolve()
        },
        (error: any) => {
          reject(error)
        }
      )
    })
  },

  ClearVuexCache({ commit }) {
    return new Promise((resolve, reject) => {
      commit('app/INIT_MODULES_STATE', {}, { root: true })
      commit('cache/INIT_MODULES_STATE', {}, { root: true })
      commit('errorLog/INIT_MODULES_STATE', {}, { root: true })
      commit('oss/INIT_MODULES_STATE', {}, { root: true })
      // commit('permission/INIT_MODULES_STATE', {}, { root: true })
      commit('tagsView/INIT_MODULES_STATE', {}, { root: true })
      commit('INIT_MODULES_STATE')
    })
  }
}


const getters: GetterTree<IUserState, RootState> = {
  adminId: (state) => state.adminId,
  adminAvatar: (state) => state.adminAvatar,
  adminName: (state) => state.adminName,
}
export const user: Module<IUserState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
