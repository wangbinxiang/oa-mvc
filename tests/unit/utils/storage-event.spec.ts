import {
  triggerUpdateSessionStorage,
  triggerLogoutSessionStorage,
  triggerGetSessionStorage,
  triggerSetSessionStorage,
  setEventSessionStorage
} from '@/bases/utils/storage-event'

jest.mock('@/bases/utils/storage')
import {
  setSessionStorage,
  setLocalStorage,
  removeLocalStorage,
} from '@/bases/utils/storage'

describe('storageEvent事件方法触发测试', () => {
  it('triggerLogoutSessionStorage测试', () => {
    triggerLogoutSessionStorage()
    expect(setLocalStorage).toHaveBeenCalled()
    expect(removeLocalStorage).toHaveBeenCalled()
  })
  it('triggerSetSessionStorage测试', () => {
    triggerSetSessionStorage({ name: 'xxx' })
    expect(setLocalStorage).toHaveBeenCalled()
    expect(removeLocalStorage).toHaveBeenCalled()
  })
  it('triggerGetSessionStorage测试', () => {
    triggerGetSessionStorage()
    expect(setLocalStorage).toHaveBeenCalled()
    expect(removeLocalStorage).toHaveBeenCalled()
  })
  it('triggerUpdateSessionStorage', () => {
    triggerUpdateSessionStorage()
    expect(setLocalStorage).toHaveBeenCalled()
    expect(removeLocalStorage).toHaveBeenCalled()
  })
  it('setEventSessionStorage设置session测试', () => {
    setEventSessionStorage({ newValue: '{ "name": "xxx"}' })
    expect(setSessionStorage).toBeCalled()
  })
})