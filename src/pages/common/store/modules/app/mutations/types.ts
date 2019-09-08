import { TypeTree } from '@/pages/common/store/type'
// eslint-disable-next-line no-unused-vars
import { Mutation } from 'vuex'
// eslint-disable-next-line no-unused-vars
import { AppState } from '../state/types'

export const appMutationTypes: TypeTree = {
  INIT_MODULES_STATE: 'INIT_MODULES_STATE',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SIDEBAR_STATUS: 'SIDEBAR_STATUS',
  OPEN_SIDEBAR: 'OPEN_SIDEBAR',
  CLOSE_SIDEBAR: 'CLOSE_SIDEBAR',
  TOGGLE_DEVICE: 'TOGGLE_DEVICE',
  PAGE_LOADING: 'PAGE_LOADING',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_THEME: 'SET_THEME',
  SET_DESKTOP_NAV_WIDTH: 'SET_DESKTOP_NAV_WIDTH',
  SET_DEVICE_NAV_WIDTH: 'SET_DEVICE_NAV_WIDTH',
  SET_VARY_WIDTH: 'SET_VARY_WIDTH'
}

export type MutationType = Mutation<AppState>

export interface CloseSideBarPayLoad {
  withoutAnimation: boolean;
}


export interface ToggleDevicePayload {
  device: string;
}

export interface SidebarStatusPayload {
  open: boolean;
}

export interface PageLoadingPayload {
  isLoading: boolean;
}

export interface SetLanguagePayload {
  language: string;
}

export interface SetThemePayload {
  theme: string;
}

export interface SetDesktopPayload {
  computeWidth: number;
}

export interface SetVaryWidthPayLoad {
  varyWidth: number;
}