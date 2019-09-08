import request from '@/bases/utils/request'

export interface IPolicyAnalyzingAdd {
  title: string;
  cover: {
    name: string;
    identify: string;
  };
  detail: any[];
  description: string;
  policyId: string;
}
export function policyAnalyzingAdd(data: IPolicyAnalyzingAdd): Promise<any> {
  return request({
    url: '/policy-interpretations',
    method: 'POST',
    data
  })
}

export function policyAnalyzingEdit(id: string, data: IPolicyAnalyzingAdd): Promise<any> {
  return request({
    url: '/policy-interpretations/' + id,
    method: 'PATCH',
    data
  })
}

export function policyAnalyzingDelete(id: string): Promise<any> {
  return request({
    url: '/policy-interpretations/' + id + '/delete',
    method: 'PATCH'
  })
}

export function fetchPolicyAnalyzing(params: { page: number; size: number }): Promise<any> {
  return request({
    url: '/policy-interpretations',
    method: 'GET',
    params
  })
}

export function fetchPolicyAnalyzingDetail(id: string): Promise<any> {
  return request({
    url: '/policy-interpretations/' + id,
    method: 'GET'
  })
}
