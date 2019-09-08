import { GetterTree } from 'vuex'
import { AppState } from '../state/types'
import { RootState } from '@/pages/common/store/type'

import { sidebar, sidebarStatus, language, isLoading, device, theme, desktopNavWidth, varyWidth } from './getters'

export const getterTree: GetterTree<AppState, RootState> = {
  sidebar,
  sidebarStatus,
  language,
  isLoading,
  device,
  theme,
  desktopNavWidth,
  varyWidth
}