import request from '@/bases/utils/request'
import { IFetchList } from '@/bases/interface/hzlh/api/common'

export function fetchIdentifyCompany(params: IFetchList): Promise<any> {
  return request({
    url: '/identify-companies',
    method: 'GET',
    params
  })
}

export function fetchIdentifyCompanyDetail(id: string): Promise<any> {
  return request({
    url: '/identify-companies/' + id,
    method: 'GET'
  })
}

export function identifyCompanyAuditApprove(id: string): Promise<any> {
  return request({
    url: '/identify-companies/' + id + '/approve',
    method: 'PATCH'
  })
}

export function identifyCompanyAuditReject(id: string, data: { reason: string }): Promise<any> {
  return request({
    url: '/identify-companies/' + id + '/reject',
    method: 'PATCH',
    data
  })
}
