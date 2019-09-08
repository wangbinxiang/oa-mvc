import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const counterModule = namespace('app')
import { appActionTypes } from '@/pages/common/store/modules/app/actions/types'

// declare module 'vue/types/vue' {
//   interface Vue {
//     methodFromMixins(value: number | string): void // 记得声明一下，要不然会报错 Property 'methodFromMixins' does not exist on type 'App'.
//   }
// }

const { body } = document
const WIDTH = 1024
const RATIO = 3

@Component
export default class Mixins extends Vue {
  @counterModule.State('sidebar')
  public aSidebar!: any
  @counterModule.State('device')
  public sDevice!: any
  @counterModule.Action(appActionTypes.CLOSE_SIDEBAR)
  public closeSideBar!: (data: {
      withoutAnimation: boolean;
  }) => void
  @counterModule.Action(appActionTypes.TOGGLE_SIDEBAR)
  public toggleDevice!: (data: string) => void
  get device() {
    return this.sDevice
  }
  get sidebar() {
    return this.aSidebar
  }
  @Watch('$route')
  private OnRouteChange() {
    if (this.device === 'mobile' && this.sidebar.opened) {
      this.closeSideBar({ withoutAnimation: false })
    }
  }
  private beforeMount(): void {
    window.addEventListener('resize', this.resizeHandler)
  }
  private mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      this.toggleDevice('mobile')
      this.closeSideBar({ withoutAnimation: true })
    }
  }
  private isMobile(): boolean {
    const rect = body.getBoundingClientRect()
    return rect.width - RATIO < WIDTH
  }
  private resizeHandler(): void {
    if (!document.hidden) {
      const isMobile = this.isMobile()
      this.toggleDevice(isMobile ? 'mobile' : 'desktop')
      if (isMobile) {
        this.closeSideBar({ withoutAnimation: true })
      }
    }
  }
}
