import request from '@/bases/utils/request'

export function fetchAdminsEditID(): Promise<any> {
  return request({
    url: '/admins/edit/1',
    method: 'GET'
  })
}