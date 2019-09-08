jest.mock('@/bases/utils/storage-event')
import {
  isLogin,
  login,
  logout,
  getLoginToken
} from '@/bases/utils/auth'

import {
  triggerLogoutSessionStorage,
  triggerSetSessionStorage,
  triggerUpdateSessionStorage
} from '@/bases/utils/storage-event'


import {
  setSessionStorage,
  removeSessionStorage,
} from '@/bases/utils/storage'


describe('auth操作方法测试', () => {
  it('isLogon登录状态测试', () => {
    setSessionStorage({ 'TOKEN': 'xxx' })
    expect(isLogin()).toBe(true)
    removeSessionStorage('TOKEN')
    expect(isLogin()).toBe(false)
  })
  it('login登录方法调用测试', () => {
    login('xxx')
    expect(triggerSetSessionStorage).toHaveBeenCalled()
    expect(triggerUpdateSessionStorage).toHaveBeenCalled()
  })

  it('logout登录方法调用测试', () => {
    logout()
    expect(triggerLogoutSessionStorage).toHaveBeenCalled()
  })
  it('getLoginToken方法测试', () => {
    setSessionStorage({ TOKEN: 'xxx' })
    expect(getLoginToken()).toBe('xxx')
  })
})
