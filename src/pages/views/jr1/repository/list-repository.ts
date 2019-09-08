import { translatorObjToClass } from '@/bases/utils/translate-to-class'
import  { ListItem } from '../model/list-page'
import { mockListData } from '../api/mock'

export default async function listDataClass(): Promise<any> {
  let res = mockListData
  let data = {
    list: res.data,
    total: res.meta.count
  }
  data.list = data.list.map((item: ListItem) => {
    return translatorObjToClass(item, ListItem)
  })
  return data
}