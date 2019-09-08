import axios from 'axios'
import configCode from '@/bases/config/configCode'
import promptInfo from '@/bases/config/configPrompt'
import { Message } from 'element-ui'

import { setSessionStorage, getSessionStorage, removeSessionStorage } from './storage'
import { triggerSetSessionStorage } from './storage-event'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000
})

function isSignInPage(path: string): boolean {
  return path === 'signIn'
}

function messageDispatchError(error: Ajax.AjaxResponse): void { // 错误提示处理
  try {
    Message({
      message: error.response.data.detail,
      type: 'error'
    })
  } catch (error) {
    Message({
      message: promptInfo.ER_SERVER_INTERNAL,
      type: 'error'
    })
  }
}

function messageDataFormatError(error: Ajax.AjaxResponse): void { // 响应400数据格式错误处理
  try {
    const errObj: any[] = error.response.data.error.validateErrorsDetail
    const errMsg: any = Object.values(errObj[0].constraints)[0]
    Message({
      message: errMsg,
      type: 'error'
    })
  } catch (error) {
    Message({
      message: promptInfo.ER_DATA_FORMAT,
      type: 'error'
    })
  }
}

function loggingIn(error: any): boolean {
  try {
    return error.response.data.error.code === 'SIGN_IN_FAIL'
  } catch (error) {
    Message({
      message: promptInfo.ER_SERVER_INTERNAL_FORMAT,
      type: 'error'
    })
    return false
  }
}

service.interceptors.request.use(
  config => {
    if (!config.params) {
      config.params = {}
    }
    config.params.__hash__ = Math.random()

    let token = getSessionStorage('TOKEN')
    if (token != null) {
      config.headers.authorization = token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)
service.interceptors.response.use(
  async response => {  // token刷新
    let refreshToken = response.headers.authorization
    if (refreshToken) {
      setSessionStorage({ TOKEN: refreshToken })
      triggerSetSessionStorage(window.sessionStorage)
    }
    return response
  },
  error => {
    // error.response.status
    // error.response.headers
    const path = window.location.hash.split('/')[1]
    const status = parseInt(error.response.status, 10)
    if (status === configCode.HTTP_CODE_DATA_FORMAT_ERROR) { // 400
      messageDataFormatError(error)
    } else if (status === configCode.HTTP_CODE_SIGN_IN_FAIL_ERROR) { // 401
      // 接口 401 返回登录页, 清除session里无效token
      getSessionStorage('TOKEN') && removeSessionStorage('TOKEN')
      if (!isSignInPage(path)) {
        Message({
          message: promptInfo.ER_SIGN_IN_AGAIN,
          type: 'error'
        })
        location.href = '#/signIn'
        location.reload()

      } else {
        // signIn validate
        if (loggingIn(error)) {
          messageDispatchError(error)
        }
      }
    } else if (status === configCode.HTTP_CODE_NO_PERMISSION_ERROR) { // 403
      messageDispatchError(error)
    } else if (status === configCode.HTTP_CODE_OPERATIONAL_FAILURE_ERROR) { // 500
      Message({
        message: promptInfo.ER_SERVER_INTERNAL,
        type: 'error'
      })
    } else {
      Message({
        message: promptInfo.ER_REQUEST_TIMED_OUT,
        type: 'error'
      })
    }
    return Promise.reject(error)
  }
)

export default service
