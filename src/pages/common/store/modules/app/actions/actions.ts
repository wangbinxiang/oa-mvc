import {
  ActionType,
  ActionContextType,
  SidebarStatusPayload,
  CloseSideBarPayLoad,
  ToggleDevicePayload,
  PageLoadingPayload,
  SetLanguagePayload,
  SetThemePayload,
  SetNavWidth,
  SetVaryWidthPayLoad
} from './types'
import {
  appMutationTypes,
  SidebarStatusPayload as MutationSidebarStatusPayload,
  CloseSideBarPayLoad as MutationCloseSideBarPayLoad,
  ToggleDevicePayload as MutationToggleDevicePayload,
  PageLoadingPayload as MutationPageLoadingPayload,
  SetLanguagePayload as MutationSetLanguagePayload,
  SetThemePayload as MutationSetThemePayload,
  SetDesktopPayload as MutationSetDesktopPayload,
  SetVaryWidthPayLoad as MutationSetVaryWidthPayLoad
} from '../mutations/types'

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
} = appMutationTypes

export const toggleSideBar: ActionType = ({
  commit
}: ActionContextType): void => {
  commit(TOGGLE_SIDEBAR)
}

export const sidebarStatus: ActionType = (
  { commit }: ActionContextType,
  payload: SidebarStatusPayload
): void => {
  const mutationSidebarStatusPayload: MutationSidebarStatusPayload = {
    open: payload.open
  }
  commit(SIDEBAR_STATUS, mutationSidebarStatusPayload)
}

export const closeSideBar: ActionType = (
  { commit }: ActionContextType,
  payload: CloseSideBarPayLoad
): void => {
  const mutationCloseSideBarPayLoad: MutationCloseSideBarPayLoad = {
    withoutAnimation: payload.withoutAnimation
  }
  commit(CLOSE_SIDEBAR, mutationCloseSideBarPayLoad)
}

export const openSideBar: ActionType = ({
  commit
}: ActionContextType): void => {
  commit(OPEN_SIDEBAR)
}

export const toggleDevice: ActionType = (
  { commit }: ActionContextType,
  payload: ToggleDevicePayload
): void => {
  const mutationToggleDevicePayload: MutationToggleDevicePayload = {
    device: payload.device
  }
  commit(TOGGLE_DEVICE, mutationToggleDevicePayload)
}

export const pageLoading: ActionType = (
  { commit }: ActionContextType,
  payload: PageLoadingPayload
): void => {
  const mutationPageLoadingPayload: MutationPageLoadingPayload = {
    isLoading: payload.isLoading
  }
  commit(PAGE_LOADING, mutationPageLoadingPayload)
}


export const setLanguage: ActionType = (
  { commit }: ActionContextType,
  payload: SetLanguagePayload
): void => {
  const mutationSetLanguagePayload: MutationSetLanguagePayload = {
    language: payload.language
  }
  commit(SET_LANGUAGE, mutationSetLanguagePayload)
}


export const setTheme: ActionType = (
  { commit }: ActionContextType,
  payload: SetThemePayload
): void => {
  const mutationSetThemePayload: MutationSetThemePayload = {
    theme: payload.theme
  }
  commit(SET_THEME, mutationSetThemePayload)
}

export const setNavWidth: ActionType = (
  { commit }: ActionContextType,
  payload: SetNavWidth
): void => {
  const mutationSetDesktopPayload: MutationSetDesktopPayload = {
    computeWidth: payload.computeWidth
  }
  commit(SET_DESKTOP_NAV_WIDTH, mutationSetDesktopPayload)
}

export const setVaryWidth: ActionType = (
  { commit }: ActionContextType,
  payload: SetVaryWidthPayLoad
): void => {
  const mutationSetVaryWidthPayLoad: MutationSetVaryWidthPayLoad = {
    varyWidth: payload.varyWidth
  }
  commit(SET_VARY_WIDTH, mutationSetVaryWidthPayLoad)
}