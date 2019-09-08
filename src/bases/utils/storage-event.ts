import { logoutToken } from '@/bases/utils/auth'
import {
  setLocalStorage,
  removeLocalStorage,
  setSessionStorage
} from '@/bases/utils/storage'

export const GET_SESSION_STORAGE = 'GET_SESSION_STORAGE'
export const SET_SESSION_STORAGE = 'SET_SESSION_STORAGE'
export const LOGOUT_EVENT_SESSION = 'LOGOUT_EVENT_SESSION'
export const UPDATE_EVENT_SESSION = 'UPDATE_EVENT_SESSION'

export function logoutEventSession() {
  logoutToken()
  window.location.href = '/'
  // 退出页面
  // 删除 token
}

export function setEventSessionStorage(event: any) {
  if (event.newValue !== null) {
    const data = JSON.parse(event.newValue)
    setSessionStorage(data)
  }
}

export function updateEventSession() {
  //  刷新页面
  setTimeout(function () {
    window.location.reload()
  }, 200)
}

export function triggerUpdateSessionStorage() {
  setLocalStorage(UPDATE_EVENT_SESSION, UPDATE_EVENT_SESSION)
  removeLocalStorage(UPDATE_EVENT_SESSION)
}

export function triggerSetSessionStorage(data: any) {
  setLocalStorage(SET_SESSION_STORAGE, JSON.stringify(data))
  removeLocalStorage(SET_SESSION_STORAGE)
}

export function triggerGetSessionStorage() {
  setLocalStorage(GET_SESSION_STORAGE, Date.now())
  removeLocalStorage(GET_SESSION_STORAGE)
}

export function triggerLogoutSessionStorage() {
  setLocalStorage(LOGOUT_EVENT_SESSION, LOGOUT_EVENT_SESSION)
  removeLocalStorage(LOGOUT_EVENT_SESSION)
}
