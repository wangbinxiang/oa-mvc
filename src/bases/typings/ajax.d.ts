// eslint-disable-next-line no-unused-vars
declare namespace Ajax {
  export interface AxiosResponse {
    data: AjaxResponse;
  }

  export interface AjaxResponse {
    [propName: string]: any;
  }
}
