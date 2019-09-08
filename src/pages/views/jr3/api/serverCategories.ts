import request from '@/bases/utils/request'

export interface IParentCategoriesAdd {
  name: string;
}

export interface IServerCategoriesAdd {
  parentId: string;
  name: string;
  qualificationName: string;
  isQualification: number;
}

// 创建父级服务分类
export function parentCategoriesAdd(data: IParentCategoriesAdd): Promise<any> {
  return request({
    url: '/parent-categories',
    method: 'POST',
    data
  })
}

// 编辑父级服务分类
export function parentCategoriesEdit(id: string, data: any): Promise<any> {
  return request({
    url: '/parent-categories/' + id,
    method: 'PATCH',
    data
  })
}

// 获取多个父级服务分类
export function fetchParentCategories(params: { page: number; size: number }): Promise<any> {
  return request({
    url: '/parent-categories',
    method: 'GET',
    params
  })
}

// 获取单个父级服务分类
export function fetchParentCategoriesDetail(id: string): Promise<any> {
  return request({
    url: '/parent-categories/' + id,
    method: 'GET'
  })
}

// 创建服务分类
export function serverCategoriesAdd(data: IServerCategoriesAdd): Promise<any> {
  return request({
    url: '/service-categories',
    method: 'POST',
    data
  })
}

// 编辑服务分类
export function serverCategoriesEdit(id: string, data: any): Promise<any> {
  return request({
    url: '/service-categories/' + id,
    method: 'PATCH',
    data
  })
}

// 获取多个服务分类
export function fetchServerCategories(params: any): Promise<any> {
  return request({
    url: '/service-categories',
    method: 'GET',
    params
  })
}

// 获取单个服务分类
export function fetchServerCategoriesDetail(id: string): Promise<any> {
  return request({
    url: '/service-categories/' + id,
    method: 'GET'
  })
}

// 禁用分类
export function disableServerCategory(id: string): Promise<any> {
  return request({
    url: `/service-categories/${id}/disable`,
    method: 'PATCH'
  })
}

// 启用分类
export function enableServerCategory(id: string): Promise<any> {
  return request({
    url: `/service-categories/${id}/enable`,
    method: 'PATCH'
  })
}

// 获取所有父子分类
export function fetchParentCategoriesAndServiceCategories(): Promise<any> {
  return request({
    url: `service-categories/all`,
    method: 'GET'
  })
}
