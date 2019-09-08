import { Getter } from 'vuex'

import { AppState, SideBar } from '../state/types'
import { RootState } from '@/pages/common/store/type'


export const sidebar: Getter<AppState, RootState> = (state: AppState): SideBar => state.sidebar

export const sidebarStatus: Getter<AppState, RootState> = (state: AppState): boolean => state.sidebarStatus

export const language: Getter<AppState, RootState> = (state: AppState): string => state.language

export const isLoading: Getter<AppState, RootState> = (state: AppState): boolean => state.isLoading

export const device: Getter<AppState, RootState> = (state: AppState): string => state.device

export const theme: Getter<AppState, RootState> = (state: AppState): string => state.theme

export const desktopNavWidth: Getter<AppState, RootState> = (state: AppState): number => state.desktopNavWidth

export const varyWidth: Getter<AppState, RootState> = (state: AppState): number => state.varyWidth