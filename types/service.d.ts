declare interface BaseQuery {
  page: number
  limit: number
}

declare interface BaseResponseWithArray<T> extends BaseResponse {
  result: {
    count: number
    rows: T[]
  }
}
declare interface BaseResponseWithData<T> extends BaseResponse {
  result: T
}
declare type BaseResponse = {
  message: string
  code: number
}
