import {
  GET_SESSION_STORAGE,
  SET_SESSION_STORAGE,
  LOGOUT_EVENT_SESSION,
  UPDATE_EVENT_SESSION,
  triggerSetSessionStorage,
  setEventSessionStorage,
  logoutEventSession,
  updateEventSession
} from '@/bases/utils/storage-event'

window.addEventListener('storage', function (event) {
  if (event.key === GET_SESSION_STORAGE) {
    triggerSetSessionStorage(window.sessionStorage)
  } else if (event.key === SET_SESSION_STORAGE) {
    setEventSessionStorage(event)
  } else if (event.key === LOGOUT_EVENT_SESSION) {
    logoutEventSession()
  } else if (event.key === UPDATE_EVENT_SESSION) {
    updateEventSession()
  }
})