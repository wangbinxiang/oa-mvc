import { Module } from 'vuex'
import { IRootState } from '@/pages/common/store/type'
import { AppState } from './state/types'

import { state } from './state'
import { getterTree } from './getters'
import { mutationTree } from './mutations'
import { actionTree } from './actions'

import { buildModuleHandlerCurried } from '../../utils'



export const app: Module<AppState, IRootState> = {
  namespaced: true,
  state,
  getters: getterTree,
  mutations: mutationTree,
  actions: actionTree
}


export const appModuleHandler = buildModuleHandlerCurried('app')
