import request from '@/bases/utils/request'
import { ISignIn } from '@/bases/interface/hzlh/api/auth'

export function signIn(data: ISignIn): Promise<any> {
  return request({
    url: '/sign-in',
    method: 'POST',
    data
  })
}

export function signOut(): Promise<any> {
  return request({
    url: '/sign-out',
    method: 'GET'
  })
}

export function getAdmin(): Promise<any> {
  return request({
    url: '/admins',
    method: 'GET'
  })
}

export function fetchHash(): Promise<any> {
  return request({
    url: '/client/getHash',
    method: 'GET'
  })
}

export function fetchUserInfo(): Promise<any> {
  return request({
    url: '/viewer',
    method: 'GET'
  })
}

