import request from '@/bases/utils/request'

export function getAliOSS(): Promise<any> {
  return request({
    url: '/oss',
    method: 'GET'
  })
}
