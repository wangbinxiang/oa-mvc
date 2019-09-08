export interface IAliOss {
    key: string;
    policy: string;
    OSSAccessKeyId: string;
    success_action_status: string;
    callback: string;
    signature: string;
}

export interface ITabOptions {
    id: string;
    name: string;
}

export interface ITransDataTag {
    applicableObject: {
      [propName: string]: any;
    };
    dispatchDepartment: {
      [propName: string]: any;
    };
    applicableIndustries: {
      [propName: string]: any;
    };
    classify: {
      [propName: string]: any;
    };
    serviceModes: {
      [propName: string]: any;
    };
  }

export interface IArguments {
    min?: number;
    max?: number;
    regExp?: RegExp;
    emptyError?: string;
    scopedError?: string;
    regExpError?: string;
}

export interface IOrigin{
    [propName: string]: any;
}