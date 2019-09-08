import {
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
} from '@/bases/utils/storage'

import {
  triggerUpdateSessionStorage,
  triggerLogoutSessionStorage,
  triggerSetSessionStorage
} from '@/bases/utils/storage-event'

const LOGIN_TOKEN = 'TOKEN'

export function isLogin(): boolean {
  return !!getSessionStorage(LOGIN_TOKEN)
}

export function getLoginToken() {
  return getSessionStorage(LOGIN_TOKEN)
}

export function loginToken(data: any) {
  setSessionStorage(data)
}

export function login(token: any) {
  const data = {
    [LOGIN_TOKEN]: token
  }
  loginToken(data)
  triggerSetSessionStorage(data)
  triggerUpdateSessionStorage()
}

export function logout() {
  logoutToken()
  triggerLogoutSessionStorage()
}

export function logoutToken() {
  removeSessionStorage(LOGIN_TOKEN)
}
