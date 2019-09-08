export function setLocalStorage(key: string, value: any) {
  window.localStorage.setItem(key, value)
}

export function getLocalStorage(key: string): any {
  return window.localStorage.getItem(key)
}

export function removeLocalStorage(key: string): void {
  window.localStorage.removeItem(key)
}

export function getSessionStorage(key: string): any {
  return window.sessionStorage.getItem(key)
}

export function setSessionStorage(data: {[key: string]: string}) {
  for (let key in data) {
    if (data[key] !== null) {
      window.sessionStorage.setItem(key, data[key])
    }
  }
}
export function removeSessionStorage(key: string): void {
  window.sessionStorage.removeItem(key)
}

