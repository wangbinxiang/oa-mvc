/* eslint-disable no-unused-vars */
import { TypeTree, RootState } from '@/pages/common/store/type'
import { Action, ActionContext } from 'vuex'
import { AppState } from '../state/types'


export const appActionTypes = {
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SIDEBAR_STATUS: 'SIDEBAR_STATUS',
  CLOSE_SIDEBAR: 'CLOSE_SIDEBAR',
  OPEN_SIDEBAR: 'OPEN_SIDEBAR',
  TOGGLE_DEVICE: 'TOGGLE_DEVICE',
  PAGE_LOADING: 'PAGE_LOADING',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_THEME: 'SET_THEME',
  SET_NAV_WIDTH: 'SET_NAV_WIDTH',
  SET_VARY_WIDTH: 'SET_VARY_WIDTH'
}

export type ActionType = Action<AppState, RootState>
export type ActionContextType = ActionContext<AppState, RootState>

export interface SidebarStatusPayload {
  open: boolean;
}

export interface CloseSideBarPayLoad {
  withoutAnimation: boolean;
}

export interface ToggleDevicePayload {
  device: string;
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

export interface SetNavWidth {
  computeWidth: number;
}

export interface SetVaryWidthPayLoad {
  varyWidth: number;
}