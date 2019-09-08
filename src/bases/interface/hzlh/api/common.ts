/**
 * @param
 * page 页码
 * size 条数
 * scene 场景
 * search 搜索关键字
 */
export interface IFetchList {
  page: number;
  size: number;
  scene?: string;
  search?: string[];
  name?: string;
}
