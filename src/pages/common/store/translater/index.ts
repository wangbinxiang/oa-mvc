export function generateUserTpl() {
  return {
    id: 'id',
    realName: 'realName',
    avatar: {
      key: {
        avatar: 'Object',
        identify: 'String'
      },
      originType: 'String',
      targetType: 'Base'
    }
  }
}

export class UserSuccessModel {
  public id!: string
  public realName!: string
  public avatar!: string
  constructor() {
    this._initData()
  }
  public _initData() {
    this.id = ''
    this.realName = ''
    this.avatar = ''
  }
  public setData(data: UserSuccessModel): void {
    if (data) {
      for (let e in this) {
        if ((<Object>data).hasOwnProperty(e)) {
          this[e] = (<any>data)[e]
        }
      }
    }
  }
}

export function generateOssTpl() {
  return {
    accessid: 'accessid',
    dir: 'dir',
    expire: 'expire',
    host: 'host',
    policy: 'policy',
    signature: 'signature'
  }
}

export class OssModel {
  public accessid!: string
  public dir!: string
  public expire!: string
  public host!: string
  public policy!: string
  public signature!: string
  constructor() {
    this._initData()
  }
  public _initData() {
    this.accessid = ''
    this.dir = ''
    this.expire = ''
    this.host = ''
    this.policy = ''
    this.signature = ''
  }
  public setData(data: UserSuccessModel): void {
    if (data) {
      for (let e in this) {
        if ((<Object>data).hasOwnProperty(e)) {
          this[e] = (<any>data)[e]
        }
      }
    }
  }
}
