import { MutationTree, Module, ActionTree, GetterTree } from 'vuex'

import { cacheType } from '../mutation-types'
import { RootState, ICacheState, ISetCacheViewData } from '../type'

const { SET_CACHE_VIEW_DATA } = cacheType

const state: ICacheState = {
  cacheData: {}
}

export const mutations: MutationTree<ICacheState> = {
  'INIT_MODULES_STATE'(state) {
    state.cacheData = {}
  },
  [SET_CACHE_VIEW_DATA](state, payload: ISetCacheViewData) {
    if (state.cacheData[payload.viewName]) {
      state.cacheData[payload.viewName] = {
        [payload.viewType]: {
          ...state.cacheData[payload.viewName][payload.viewType],
          ...payload.cacheData
        }
      }
    } else {
      state.cacheData[payload.viewName] = {
        [payload.viewType]: payload.cacheData
      }
    }
  }
}

export const actions: ActionTree<ICacheState, RootState> = {
  SetCacheViewData(
    { commit },
    { viewName, viewType, cacheData }: ISetCacheViewData
  ) {
    commit({
      type: 'SET_CACHE_VIEW_DATA',
      cacheData,
      viewType,
      viewName
    })
  }
}

export const getters: GetterTree<ICacheState, RootState> = {
  cacheData: (state) => state.cacheData,
}

export const cache: Module<ICacheState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
