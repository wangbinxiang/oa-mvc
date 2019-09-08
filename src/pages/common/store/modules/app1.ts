import { MutationTree, Module, ActionTree, GetterTree } from 'vuex'
import Cookies from 'js-cookie'

import { appType } from '../mutation-types'
import { RootState, IAppState } from '../type'

const {
  TOGGLE_SIDEBAR,
  SIDEBAR_STATUS,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  TOGGLE_DEVICE,
  PAGE_LOADING,
  SET_LANGUAGE,
  SET_THEME,
  SET_DESKTOP_NAV_WIDTH,
  SET_VARY_WIDTH
} = appType

const state: IAppState = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') !== 'off',
    withoutAnimation: false
  },
  sidebarStatus: true,
  device: 'desktop',
  isLoading: false,
  language: Cookies.get('language') || 'zh',
  theme: Cookies.get('clientTheme') || 'bee',
  desktopNavWidth: 0,
  varyWidth: 0
}

export const mutations: MutationTree<IAppState> = {
  'INIT_MODULES_STATE'(state: IAppState) {
    state.desktopNavWidth = 0
    state.varyWidth = 0
  },
  [TOGGLE_SIDEBAR](state: IAppState) {
    if (state.sidebarStatus) {
      // 开启侧导航
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 'off') // on=开启 off=关闭
      } else {
        Cookies.set('sidebarStatus', 'on')
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    } else {
      Cookies.set('sidebarStatus', 'on')
    }
  },
  [SIDEBAR_STATUS](state: IAppState, payload: { open: boolean }) {
    state.sidebarStatus = payload.open
  },
  [OPEN_SIDEBAR](state: IAppState) {
    state.sidebar.opened = true
    state.sidebar.withoutAnimation = false
  },
  [CLOSE_SIDEBAR](state, payload: { withoutAnimation: boolean }) {
    Cookies.set('sidebarStatus', 'off')
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = payload.withoutAnimation
  },
  [TOGGLE_DEVICE](state, payload: { device: string }) {
    state.device = payload.device
  },
  [PAGE_LOADING](state, payload: { isLoading: boolean }) {
    state.isLoading = payload.isLoading
  },
  [SET_LANGUAGE](state, payload: { language: string }) {
    state.language = payload.language
    Cookies.set('language', payload.language)
  },
  [SET_THEME](state, payload: { theme: string }) {
    state.theme = payload.theme
    Cookies.set('clientTheme', payload.theme)
  },
  [SET_DESKTOP_NAV_WIDTH](state, payload) {
    state.desktopNavWidth = 180 + payload.computeWidth
  },
  [SET_VARY_WIDTH](state, payload: { varyWidth: number }) {
    state.varyWidth = payload.varyWidth
  }
}

export const actions: ActionTree<IAppState, RootState> = {
  toggleSideBar({ commit }): any {
    commit('TOGGLE_SIDEBAR')
  },
  sideBarStatus({ commit }, open: boolean) {
    commit({
      type: 'SIDEBAR_STATUS',
      open: open
    })
  },
  closeSideBar(
    { commit },
    withoutAnimation: boolean
  ) {
    commit({
      type: 'CLOSE_SIDEBAR',
      withoutAnimation: withoutAnimation
    })
  },
  openSideBar({ commit }) {
    commit('OPEN_SIDEBAR')
  },
  toggleDevice({ commit }, device: string) {
    commit({
      type: 'TOGGLE_DEVICE',
      device: device
    })
  },
  pageLoading({ commit }, isLoading: boolean) {
    commit({
      type: 'PAGE_LOADING',
      isLoading: isLoading
    })
  },
  setLanguage({ commit }, language: string) {
    commit({
      type: 'SET_LANGUAGE',
      language: language
    })
  },
  setTheme({ commit }, theme: string) {
    commit({
      type: 'SET_THEME',
      theme: theme
    })
  },
  setNavWidth({ commit }, computeWidth: number) {
    commit({
      type: 'SET_DESKTOP_NAV_WIDTH',
      computeWidth: computeWidth
    })
  },
  setVaryWidth({ commit }, varyWidth: number) {
    commit({
      type: 'SET_VARY_WIDTH',
      varyWidth: varyWidth
    })
  }
}

export const getters: GetterTree<IAppState, RootState> = {
  sidebar: (state) => state.sidebar,
  sidebarStatus: (state) => state.sidebarStatus,
  language: (state) => state.language,
  isLoading: (state) => state.isLoading,
  device: (state) => state.device,
  theme: (state) => state.theme,
  desktopNavWidth: (state) => state.desktopNavWidth,
  varyWidth: (state) => state.varyWidth
}

export const app: Module<IAppState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
