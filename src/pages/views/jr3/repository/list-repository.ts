import { translatorObjToClass } from '@/bases/utils/translate-to-class'
import { orderSearch } from '../../../common/api/order'
import  { OrderListItem } from '../model/list-page'

export default async function listDataClass(query: any): Promise<any> {
  let res = await orderSearch(query)
  let data = {
    list: res.data.data,
    total: res.data.meta.count
  }
  data.list = data.list.map((item: OrderListItem) => {
    return translatorObjToClass(item, OrderListItem)
  })
  return data
}