import request from '@/bases/utils/request'

export interface OrderQuery {
  status?: number;
  orderno?: string;
  startTime?: string;
  endTime?: string;
  sellerEnterpriseId?: string;
  buyerEnterpriseId?: string;
  serviceCategory?: string;
  page: {number: number; size: number};
}

export function orderSearch(params: OrderQuery): Promise<any> {
  return request({
    url: '/order/search',
    method: 'GET',
    params
  })
}

export function orderDetail(id: string): Promise<any> {
  return request({
    url: `/order/${id}`,
    method: 'GET'
  })
}
