import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage
} from '@/bases/utils/storage'

describe('storage方法测试', () => {
  it('localStorage测试', () => {
    setLocalStorage('name', 'xxx')
    expect(getLocalStorage('name')).toBe('xxx')
    removeLocalStorage('name')
    expect(getLocalStorage('name')).toBeNull()
  })

  it('sessionStorage测试', () => {
    setSessionStorage({ name: 'xxx' })
    expect(getSessionStorage('name')).toBe('xxx')
    removeSessionStorage('name')
    expect(getSessionStorage('name')).toBeNull()
  })
})
