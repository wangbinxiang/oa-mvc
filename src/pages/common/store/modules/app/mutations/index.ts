import { MutationTree } from 'vuex'

import { AppState } from '../state/types'
import { appMutationTypes } from './types'

import {
  initModulesState,
  toggleSideBar,
  sidebarStatus,
  openSideBar,
  closeSideBar,
  toggleDevice,
  pageLoading,
  setLanguage,
  setTheme,
  setDesktopNavWidth,
  setVaryWidth
} from './mutations'

const {
  INIT_MODULES_STATE,
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
} = appMutationTypes

export const mutationTree: MutationTree<AppState> = {
  [INIT_MODULES_STATE]: initModulesState,
  [TOGGLE_SIDEBAR]: toggleSideBar,
  [SIDEBAR_STATUS]: sidebarStatus,
  [OPEN_SIDEBAR]: openSideBar,
  [CLOSE_SIDEBAR]: closeSideBar,
  [TOGGLE_DEVICE]: toggleDevice,
  [PAGE_LOADING]: pageLoading,
  [SET_LANGUAGE]: setLanguage,
  [SET_THEME]: setTheme,
  [SET_DESKTOP_NAV_WIDTH]: setDesktopNavWidth,
  [SET_VARY_WIDTH]: setVaryWidth
}
