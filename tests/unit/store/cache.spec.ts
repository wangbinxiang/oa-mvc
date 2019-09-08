import { mutations } from '@/pages/common/store/modules/cache'

describe('cache模块vuex测试', () => {
  it('SetCacheViewData测试', () => {
    const { SET_CACHE_VIEW_DATA } = mutations
    const state = {
      cacheData: {}
    }
    SET_CACHE_VIEW_DATA(state, {
      viewName: 'xxx',
      viewType: 'edit',
      cacheData: '1111111'
    })
    expect(state.cacheData).toEqual({
      xxx: {
        edit: '1111111'
      }
    })
  })
})