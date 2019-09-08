import { AppState } from '../state/types'
import Cookies from 'js-cookie'

import {
  MutationType,
  CloseSideBarPayLoad,
  ToggleDevicePayload,
  SidebarStatusPayload,
  PageLoadingPayload,
  SetLanguagePayload,
  SetThemePayload,
  SetDesktopPayload,
  SetVaryWidthPayLoad
} from './types'

export const initModulesState: MutationType = (state: AppState): void => {
  state.desktopNavWidth = 0
  state.varyWidth = 0
}

export const toggleSideBar: MutationType = (state: AppState): void => {
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
}

export const sidebarStatus: MutationType = (
  state: AppState,
  payload: SidebarStatusPayload
): void => {
  state.sidebarStatus = payload.open
}

export const openSideBar: MutationType = (state: AppState): void => {
  state.sidebar.opened = true
  state.sidebar.withoutAnimation = false
}

export const closeSideBar: MutationType = (
  state: AppState,
  payload: CloseSideBarPayLoad
): void => {
  Cookies.set('sidebarStatus', 'off')
  state.sidebar.opened = false
  state.sidebar.withoutAnimation = payload.withoutAnimation
}

export const toggleDevice: MutationType = (
  state: AppState,
  payload: ToggleDevicePayload
): void => {
  state.device = payload.device
}

export const pageLoading: MutationType = (
  state: AppState,
  payload: PageLoadingPayload
): void => {
  state.isLoading = payload.isLoading
}

export const setLanguage: MutationType = (
  state: AppState,
  payload: SetLanguagePayload
): void => {
  state.language = payload.language
  Cookies.set('language', payload.language)
}

export const setTheme: MutationType = (
  state: AppState,
  payload: SetThemePayload
): void => {
  state.theme = payload.theme
  Cookies.set('clientTheme', payload.theme)
}

export const setDesktopNavWidth: MutationType = (
  state: AppState,
  payload: SetDesktopPayload
): void => {
  state.desktopNavWidth = 180 + payload.computeWidth
}

export const setVaryWidth: MutationType = (
  state: AppState,
  payload: SetVaryWidthPayLoad
): void => {
  state.varyWidth = payload.varyWidth
}
