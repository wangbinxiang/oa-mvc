import request from '@/bases/utils/request'
import { IFetchList } from '@/bases/interface/hzlh/api/common'

export function fetchIdentifyPersonal(params: IFetchList): Promise<any> {
  return request({
    url: '/identify-personals',
    method: 'GET',
    params
  })
}

export function fetchIdentifyPersonalDetail(id: string): Promise<any> {
  return request({
    url: '/identify-personals/' + id,
    method: 'GET'
  })
}

export function identifyPersonalAuditApprove(id: string): Promise<any> {
  return request({
    url: '/identify-personals/' + id + '/approve',
    method: 'PATCH'
  })
}

export function identifyPersonalAuditReject(id: string, data: { reason: string }): Promise<any> {
  return request({
    url: '/identify-personals/' + id + '/reject',
    method: 'PATCH',
    data
  })
}
