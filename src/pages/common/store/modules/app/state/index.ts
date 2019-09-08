import Cookies from 'js-cookie'
import { AppState } from './types'


export const state: AppState = {
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