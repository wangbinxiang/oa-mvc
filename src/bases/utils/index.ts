import * as elementUi from 'element-ui'

import { IArguments } from '@/bases/interface/utils'

import promptInfo from '@/bases/config/configPrompt'

/**
 * 操作框
 * @param
 * content: 内容
 * title: 标题
 * callback: 回调函数
 */
export function openConfirm(
  content: string,
  title: string,
  callback: () => any
): void {
  elementUi.MessageBox.confirm(content, title, {
    confirmButtonText: promptInfo.SUBMIT,
    confirmButtonClass: 'is-plain el-button--success el-button--medium',
    cancelButtonText: promptInfo.CANCEL,
    cancelButtonClass: 'is-plain el-button--medium',
    type: 'warning'
  })
    .then(() => {
      callback()
    })
    .catch(() => {
      elementUi.Message({
        type: 'info',
        message: promptInfo.CANCEL_OPERATION
      })
    })
}

/**
 * 对话框
 * @param
 * content: 内容
 * title: 标题
 * callback: 回调函数
 */
interface IOpenPrompt {
  content: string;
  title: string;
  text: string;
  callback: (value: string) => any;
}
export function openPrompt(obj: IOpenPrompt) {
  function validateInput(input: string) {
    if (!input) {
      return obj.text
    } else {
      return true
    }
  }
  elementUi.MessageBox.prompt(obj.content, obj.title, {
    inputType: 'textarea',
    confirmButtonText: promptInfo.SUBMIT,
    confirmButtonClass: 'is-plain el-button--success el-button--medium',
    cancelButtonText: promptInfo.CANCEL,
    cancelButtonClass: 'is-plain el-button--medium',
    // inputPattern: /\S/g,
    inputValidator: validateInput
    // inputErrorMessage: obj.text
  })
    .then(res => {
      obj.callback((<any>res).value)
    })
    .catch(() => {
      elementUi.Message({
        type: 'info',
        message: promptInfo.CANCEL_OPERATION
      })
    })
}

/**
 * 自定义驳回对话框
 * @param
 * content: 内容
 * title: 标题
 * callback: 回调函数
 */
export function openMsgbox(h: any, obj: IOpenPrompt) {
  let rejectReason = ''
  function validateInput(input: string) {
    if (!input) {
      elementUi.Message({
        type: 'error',
        message: obj.text
      })
      return true
    } else if (input.length > 100) {
      elementUi.Message({
        type: 'error',
        message: '驳回理由不能大于100个字符'
      })
      return true
    } else {
      return false
    }
  }
  elementUi
    .MessageBox({
      title: obj.title,
      message: h('div', null, [
        h(
          'p',
          {
            style: {
              marginBottom: '5px'
            }
          },
          obj.content
        ),
        h('textarea', {
          class: {
            'el-textarea__inner': true
          },
          style: {
            height: '120px',
            overflowY: 'hidden'
          },
          attrs: {
            placeholder: '请输入内容',
            maxlength: 100
          },
          on: {
            keydown: (event: any) => {
              if (event.keyCode === 13) {
                // event.returnValue = false
                event.preventDefault()
                return false
              }
            },
            input: function(e: any) {
              // console.log(e.target.value)
              rejectReason = e.target.value
            }
          },
          key: new Date().getTime()
        })
      ]),
      showCancelButton: true,
      confirmButtonText: promptInfo.SUBMIT,
      cancelButtonText: promptInfo.CANCEL,
      beforeClose: async (action: any, instance: any, done: any) => {
        if (action === 'confirm') {
          if (validateInput(rejectReason)) {
            return
          }
          instance.confirmButtonLoading = true
          instance.confirmButtonText = '驳回中...'
          await obj.callback(rejectReason)
          setTimeout(() => {
            instance.confirmButtonLoading = false
            done()
          }, 1000)
        } else {
          done()
        }
      }
    })
    .catch(() => {
      elementUi.Message({
        type: 'info',
        message: promptInfo.CANCEL_OPERATION
      })
    })
}


/**
 * 表单验证
 * @param argums type obj
 * @property
 * min: 最小长度
 * max: 最大长度
 * regExp: 正则
 * emptyError: 空值错误提醒
 * scopedError: 范围错误提醒
 * regExpError: 正则匹配错误提醒
 */
export function validateConstructor(
  argums: IArguments
): (rule: any, value: any, callback: any) => any {
  return (rule: any, value: any, callback: any) => {
    if (value === '' || value === null || value.length === 0) {
      callback(new Error(argums.emptyError))
    } else if (
      typeof argums.min !== 'undefined' &&
      typeof argums.max !== 'undefined' &&
      (value.length < argums.min || value.length > argums.max)
    ) {
      callback(new Error(argums.scopedError))
    } else if (
      typeof argums.regExp !== 'undefined' &&
      !argums.regExp.test(value)
    ) {
      callback(new Error(argums.regExpError))
    } else {
      callback()
    }
  }
}

/**
 * 获取文件后缀名成
 * @param file 文件
 */
export function getFileType(fileName: string): string {
  return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()
}

/**
 * 生成aliOss上传信息
 * @param data oss接口返回数据
 */
export class MakeAliOss {
  public key!: string
  public policy!: string
  public OSSAccessKeyId!: string
  public success_action_status!: string
  public callback!: string
  public signature!: string
  constructor(data: Ajax.AxiosResponse) {
    this._initOss(data)
  }
  public _initOss(response: Ajax.AxiosResponse) {
    this.key = response.data.dir
    this.policy = response.data.policy
    this.OSSAccessKeyId = response.data.accessid
    this.success_action_status = '200'
    this.callback = ''
    this.signature = response.data.signature
  }
}
/**
 * 过滤接口对象，转化为str
 * @param arr 接口字段数据
 */
function isImage(type: string): boolean {
  return type === 'image'
}
function isText(type: string): boolean {
  return type === 'text'
}
export function filterObjectStrToTag(
  arr: any[],
  domain: string,
  ossDirUrl: string
): string {
  let tpl = ''
  arr.forEach((item: any) => {
    if (isText(item.type)) {
      tpl += `<p style="text-indent: 2em;">${item.value}</p>`
    } else if (isImage(item.type)) {
      tpl += `<div style="text-align: center;"><img style="max-width: 100%;" src="${domain +
        ossDirUrl +
        item.value}"></div>`
    }
  })
  return tpl
}

// getSelection、createRange兼容
export function isSupportRange(): boolean {
  return (
    typeof document.createRange === 'function' ||
    typeof window.getSelection === 'function'
  )
}

// 获取光标位置
export function getCurrentRange() {
  let range: any
  let selection: any
  if (isSupportRange) {
    selection = document.getSelection()
    if (selection.getRangeAt && selection.rangeCount) {
      range = (document as any).getSelection().getRangeAt(0)
    }
  } else {
    range = (document as any).selection.createRange()
  }
  return range
}

// 插入内容
export function insertHtmlAfterRange(html: any) {
  let selection: any
  let range: any
  if (isSupportRange) {
    // IE > 9 and 其它浏览器
    selection = document.getSelection()
    if (selection.getRangeAt && selection.rangeCount) {
      let fragment
      let node
      let lastNode
      range = selection.getRangeAt(0)
      range.deleteContents()
      let el = document.createElement('span')
      el.innerHTML = html
      // 创建空文档对象,IE > 8支持documentFragment
      fragment = document.createDocumentFragment()

      while ((node = el.firstChild)) {
        lastNode = fragment.appendChild(node)
      }
      range.insertNode(fragment)

      if (lastNode) {
        range = range.cloneRange()
        range.setStartAfter(lastNode)
        range.collapse(true)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  } else if (
    (document as any).selection &&
    (document as any).selection.type !== 'Control'
  ) {
    // IE < 9
    (document as any).selection.createRange().pasteHTML(html)
  }
}

/**
 * 判断是否为js对象： {}
 * @param value 值
 */
export function isObject(value: any) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * 判断是否为json对象
 * @param value 值
 */
function isJsonString(str: any) {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true
    }
  } catch (e) {}
  return false
}

/**
 * 数据断层处理
 * @param origin  原始数据
 * @param ...arr  参数列表、目标数据的层级结构
 */
function proxy(origin: Ajax.AjaxResponse, ...arr: string[]) {
  let value = JSON.parse(JSON.stringify(origin))
  if (typeof origin === 'undefined' || origin === null) {
    return
  }
  arr.some(target => {
    if (!value.hasOwnProperty(target)) {
      console.warn('translator warning: no ' + arr[arr.length - 1] + ' field')
      value = ''
      return true
    }
    value = value[target]
    return false
  })
  return value
}

/*eslint complexity: ["error", 50]*/
/*eslint max-depth: ["error", 20]*/
export function transformData(data: Ajax.AjaxResponse, template: any) {
  const object: any = {}
  for (const key in template) {
    if (Object.prototype.hasOwnProperty.call(template, key)) {
      const value = template[key]
      // 原数据类型
      const originType = template[key].originType
      // 转换目标数据类型
      const targetType = template[key].targetType
      try {
        let originData
        if (targetType) {
          originData = proxy(data, ...Object.keys(value['key']))
        }
        if (targetType === 'Base') {
          // 层级基础类型赋值
          object[key] = originData
        } else if (targetType === 'Object') {
          // 单级、层级对象查询赋值（缺少层级对象赋值）
          // value['template'] 模板
          object[key] = transformData(originData, value['template'])
        } else if (targetType === 'Array') {
          object[key] = []
          // 查询操作
          if (originType === 'Object') {
            // 原始数据是对象形式 - 直接递归赋值
            object[key] = transformData(originData, value['template'])
          } else if (originType === 'Array') {
            // 单级、层级数组赋值
            // 原始数据是数组形式 - 循环递归赋值
            for (const item of originData) {
              // JSON转换原始对象
              let objItem: any = item
              if (isJsonString(item)) {
                objItem = JSON.parse(item)
              }
              object[key].push(transformData(objItem, value['template']))
            }
          }
        } else {
          // 单级基础类型赋值
          if (!data.hasOwnProperty(template[key])) {
            console.warn('translator warning: no ' + key + ' field')
          }
          object[key] = data[value]
        }
      } catch (error) {
        console.warn('translator warning: no ' + key + ' field')
        continue
      }
    }
  }
  return object
}
