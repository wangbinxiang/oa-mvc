import { mutationTree as mutations } from '@/pages/common/store/modules/app/mutations'

describe('app module store测试', () => {
  it('setTheme切换主题测试', () => {
    const { SET_THEME } = mutations
    const state = {
      theme: 'gold'
    } as any
    const payload = {
      theme: 'rose'
    }
    SET_THEME(state, payload)
    expect(state.theme).toBe('rose')
  })
  it('toggleSideBar切换侧边栏', () => {
    const { TOGGLE_SIDEBAR } = mutations
    const state = {
      sidebarStatus: true,
      sidebar: {
        opened: true,
        withoutAnimation: true
      }
    } as any

    TOGGLE_SIDEBAR(state, {})
    expect(state.sidebar.opened).toBe(false)
    expect(state.sidebar.withoutAnimation).toBe(false)
  })
  it('toggleDevice切换设备类型', () => {
    const { TOGGLE_DEVICE } = mutations
    const state = {
      device: 'desktop'
    } as any

    TOGGLE_DEVICE(state, { device: 'mobile' })
    expect(state.device).toBe('mobile')
  })
  it('close-sidebar切换设备类型', () => {
    const { CLOSE_SIDEBAR } = mutations
    const state = {
      sidebar: {
        opened: true,
        withoutAnimation: true
      }
    } as any

    CLOSE_SIDEBAR(state, { withoutAnimation: false })
    expect(state.sidebar).toEqual({
      opened: false,
      withoutAnimation: false
    })
  })
  it('open-sidebar切换设备类型', () => {
    const { OPEN_SIDEBAR } = mutations
    const state = {
      sidebar: {
        opened: false,
        withoutAnimation: true
      }
    } as any

    OPEN_SIDEBAR(state, { withoutAnimation: false })
    expect(state.sidebar).toEqual({
      opened: true,
      withoutAnimation: false
    })
  })
  it('set-nav-width', () => {
    const { SET_DESKTOP_NAV_WIDTH } = mutations
    const state = {
      desktopNavWidth: 0
    } as any

    SET_DESKTOP_NAV_WIDTH(state, { computeWidth: 100 })
    expect(state.desktopNavWidth).toBe(280)
  })
  it('set-vary-width', () => {
    const { SET_VARY_WIDTH } = mutations
    const state = {
      varyWidth: 0
    } as any

    SET_VARY_WIDTH(state, { varyWidth: 100 })
    expect(state.varyWidth).toBe(100)
  })
  it('loading设置', () => {
    const { PAGE_LOADING } = mutations
    const state = {
      isLoading: true
    } as any

    PAGE_LOADING(state, { isLoading: false })
    expect(state.isLoading).toBe(false)
  })
  it('loading设置', () => {
    const { SET_LANGUAGE } = mutations
    const state = {
      language: 'zh'
    } as any

    SET_LANGUAGE(state, { language: 'en' })
    expect(state.language).toBe('en')
  })
})