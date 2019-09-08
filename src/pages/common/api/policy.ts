import request from '@/bases/utils/request'

export interface IPolicyAdd {
  title: string;
  applicableObject: number[];
  dispatchDepartment: number[];
  applicableIndustries: number[];
  level: string;
  classify: number[];
  detail: any[];
  description: string;
}

export function policyAdd(data: IPolicyAdd): Promise<any> {
  return request({
    url: '/policies',
    method: 'POST',
    data
  })
}

export function policyEdit(id: string, data: IPolicyAdd): Promise<any> {
  return request({
    url: '/policies/' + id,
    method: 'PATCH',
    data
  })
}

export function policyDelete(id: string): Promise<any> {
  return request({
    url: '/policies/' + id + '/delete',
    method: 'PATCH'
  })
}

export function fetchPolicy(params: { page: number; size: number }): Promise<any> {
  return request({
    url: '/policies',
    method: 'GET',
    params
  })
}

export function fetchPolicyDetail(id: string, params: { page: number; size: number }): Promise<any> {
  return request({
    url: '/policies/' + id,
    method: 'GET',
    params
  })
}
