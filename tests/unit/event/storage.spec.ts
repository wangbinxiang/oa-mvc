import { routerNext, generateRoutes } from '@/bases/system/permission'
jest.mock('@/bases/utils/storage-event')
import {
  triggerGetSessionStorage
} from '@/bases/utils/storage-event'

jest.mock('@/bases/utils/auth')
import { isLogin } from '@/bases/utils/auth'

let from = {} as any
let to = {} as any
let next = jest.fn()
describe('xx', () => {


  it('路由守卫调用测试', () => {
    routerNext(from, to, next)
    expect(isLogin).toHaveBeenCalled()
    expect(isLogin()).toBeFalsy()
    expect(triggerGetSessionStorage).toHaveBeenCalled()
  })

  it('路由守卫跳转测试1', async () => {
    to = {
      path: '/signIn'
    } as any
    await generateRoutes(next, to)
    expect(next).toHaveBeenCalledWith({
      path: '/'
    })
  })

  it('路由守卫跳转测试2', async () => {
    to = {
      path: '/'
    } as any
    await generateRoutes(next, to)
    expect(next).toHaveBeenCalledWith({
      path: '/'
    })
  })
})