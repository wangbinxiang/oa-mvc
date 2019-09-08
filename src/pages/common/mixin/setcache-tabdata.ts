import { Component, Vue } from 'vue-property-decorator'
import { Getter, namespace } from 'vuex-class'
const counterModule = namespace('cache')

import { ISetCacheViewData } from '@/pages/common/store/type'
import { IFetchList } from '@/bases/interface/hzlh/api/common'

const QUERY = 'query'
const TOTAL = 'total'
@Component
export default class SetCacheTabData extends Vue {
  @Getter('cacheData', { namespace: 'cache' }) public getCacheData!: { [propName: string]: any; }
  @counterModule.Action public SetCacheViewData!: (
    data: ISetCacheViewData
  ) => void
  private viewType: string = 'list'
  private activeName!: string
  private total!: number
  private query!: IFetchList
  get routeHash() {
    return this.$route.hash
  }
  get routeName(): any {
    return this.$route.name
  }
  get cacheData() {
    return this.getCacheData
  }
  created() {
    this.assignCacheData()
  }
  private assignCacheData() {
    if (this.isCacheViewAndHasCacheData()) {
      const query = this.getProp(this.cacheData, QUERY)
      const total = this.getProp(this.cacheData, TOTAL)
      this[QUERY] = query ? query : this[QUERY]
      this[TOTAL] = total ? total : this[TOTAL]
    }
  }
  private getProp(targetData: { [propName: string]: any; }, prop: string) {
    const val = targetData[this.routeName][this.viewType][prop]
    if (!val) {
      return false
    }
    return val
  }
  private isCacheViewAndHasCacheData() {
    return (
      this.routeName &&
      this.routeHash &&
      this.cacheData[this.routeName] &&
      this.cacheData[this.routeName][this.viewType]
    )
  }
  private cacheViewData() {
    if (this.routeName) {
      const params = {
        viewName: this.routeName,
        viewType: this.viewType,
        cacheData: {
          [TOTAL]: this[TOTAL],
          [QUERY]: this[QUERY]
        }
      }
      this.SetCacheViewData(params)
    }
  }
}
