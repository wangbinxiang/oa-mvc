import request from '@/bases/utils/request'

export function fetchAdminsID(): Promise<any> {
  return request({
    url: '/admins/1',
    method: 'GET'
  })
}