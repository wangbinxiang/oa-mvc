import {  ActionTree } from 'vuex'

import { AppState } from '../state/types'
import { RootState } from '@/pages/common/store/type'

import { appActionTypes } from './types'

import {
  toggleSideBar,
  sidebarStatus,
  closeSideBar,
  openSideBar,
  toggleDevice,
  pageLoading,
  setLanguage,
  setTheme,
  setNavWidth,
  setVaryWidth
} from './actions'

const {
  TOGGLE_SIDEBAR,
  SIDEBAR_STATUS,
  CLOSE_SIDEBAR,
  OPEN_SIDEBAR,
  TOGGLE_DEVICE,
  PAGE_LOADING,
  SET_LANGUAGE,
  SET_THEME,
  SET_NAV_WIDTH,
  SET_VARY_WIDTH
} = appActionTypes


export const actionTree: ActionTree<AppState, RootState> = {
  [TOGGLE_SIDEBAR]: toggleSideBar,
  [SIDEBAR_STATUS]: sidebarStatus,
  [CLOSE_SIDEBAR]: closeSideBar,
  [OPEN_SIDEBAR]: openSideBar,
  [TOGGLE_DEVICE]: toggleDevice,
  [PAGE_LOADING]: pageLoading,
  [SET_LANGUAGE]: setLanguage,
  [SET_THEME]: setTheme,
  [SET_NAV_WIDTH]: setNavWidth,
  [SET_VARY_WIDTH]: setVaryWidth
}