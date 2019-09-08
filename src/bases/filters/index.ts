import config from '@/bases/lang/zh'
const _ = config.filters

const statusTagObj: { [propName: string]: any } = {
  ableStatus: {
    // 启用禁用
    '0': 'danger',
    '1': 'success'
  },
  hzlhAuditStatus: {
    '2': 'info',
    '4': 'success',
    '-4': 'danger'
  },
  zjAuthenticationsAuditStatus: {
    '0': 'info',
    '2': 'success',
    '-2': 'danger'
  },
  zjServicesAuditStatus: {
    '0': 'info',
    '2': 'success',
    '-2': 'danger',
    '-4': 'danger'
  },
  jrOrganizationsAuditStatus: {
    '2': 'info',
    '4': 'success',
    '-4': 'danger'
  },
  jrProductsAuditStatus: {
    '2': 'info',
    '4': 'success',
    '-4': 'danger'
  },
  readStatus: {
    '0': 'danger',
    '1': 'success'
  }
}
const statusDataObj: { [propName: string]: any } = {
  sex: {
    '0': _.unKnow,
    '1': _.male,
    '2': _.female
  },
  ableStatus: {
    '0': _.disable,
    '1': _.enable
  },
  hzlhAuditStatus: {
    '2': _.padding,
    '4': _.approve,
    '-4': _.reject
  },
  zjAuthenticationsAuditStatus: {
    '0': _.padding,
    '2': _.approve,
    '-2': _.reject
  },
  zjServicesAuditStatus: {
    '0': _.padding,
    '2': _.shelf,
    '-2': _.obtained,
    '-4': _.reject
  },
  jrOrganizationsAuditStatus: {
    '2': _.padding,
    '4': _.approve,
    '-4': _.reject
  },
  jrProductsAuditStatus: {
    '2': _.padding,
    '4': _.approve,
    '-4': _.reject
  },
  level: {
    // 政策级别
    '1': _.country,
    '2': _.province,
    '3': _.city,
    '4': _.region,
    '5': _.other
  },
  isQualification: {
    // 是否需要资质认证
    '0': _.no,
    '2': _.yes
  },
  null: {
    '0': _.fewerParameters,
    '1': _.fewerParameters
  }
}

export function statusFilterByTag(status: string | number, type: string = '') {
  if (
    type === null ||
    typeof status === 'undefined' ||
    status === '' ||
    status === null
  ) {
    return
  }
  return statusTagObj[type][status]
}

export function statusFilterConverter(
  status: string | number,
  type: string = ''
) {
  if (
    type === null ||
    typeof status === 'undefined' ||
    status === '' ||
    status === null
  ) {
    return
  }
  return statusDataObj[type][status]
}

export function filterSystemLabelName(
  id: string,
  obj: { [propName: string]: any }
): string {
  return obj[id]
}

export function parseTime(time: number, cFormat: any) {
  let timer
  if (arguments.length === 0) {
    return null
  }

  if (String(time).length === 10) {
    timer = Number(time) * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof timer === 'object') {
    date = timer
  } else {
    date = new Date(time)
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(
    /{(y|m|d|h|i|s|a)+}/g,
    (result: any, key: any) => {
      let value = formatObj[key]
      if (key === 'a') {
        return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    }
  )
  return time_str
}

export function formatTime(time: number, option: any) {
  // time = +time * 1000
  const timer = Number(time) * 1000
  const d: any = new Date(timer)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getFullYear() +
      '年' +
      (d.getMonth() + 1) +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function timestampToTime(timestamp: number, type: string) {
  if (!timestamp) return ''
  const date: any = new Date(
    String(timestamp).length === 10 ? timestamp * 1000 : timestamp
  ) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear() + '-'
  const M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  const h =
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  const m =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  switch (type) {
    case 'YMDhms':
      return Y + M + D + h + m + s
    case 'YMD':
      return Y + M + D
    default:
      break
  }
}

export function timeToTimestamp(time: number) {
  return new Date(time).getTime() / 1000
}
