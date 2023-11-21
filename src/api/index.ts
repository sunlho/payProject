import { instance } from "@/utils/request"

export const getUserInfoApi = (params: { uid: string }) => {
  return instance.request<defs.outsource.SubmitResponse>({
    url: "/api/outsourcing/audi-etron/userInfo",
    method: "get",
    params,
  })
}

export const getPrincipalApi = (params: {
  targetKey: string
  actId: string
  formCode?: string
}) => {
  return instance.request<defs.h5.Submit[]>({
    url: "/api/h5/v1/form/principal",
    method: "get",
    params,
  })
}

export const getTestDriveNumApi = () => {
  return instance.request<number>({
    url: "/api/outsourcing/audi-etron/testDriveNum",
    method: "get",
  })
}

export const getProvinceApi = () => {
  return instance.request<defs.outsource.GetProvinceRes[]>({
    url: "/api/outsourcing/audi-etron/province",
    method: "get",
  })
}

export const getCityApi = (params: { provinceId: string }) => {
  return instance.request<defs.outsource.GetProvinceRes[]>({
    url: "/api/outsourcing/audi-etron/city",
    method: "get",
    params: params,
  })
}

export const getDealerApi = (params: {
  city: string
  lat?: string
  lng?: string
}) => {
  return instance.request<defs.outsource.GetDealerRes[]>({
    url: "/api/outsourcing/audi-etron/dealer",
    method: "get",
    params: params,
  })
}

export const sendSmsApi = (data: defs.h5.SendFormSmsCode) => {
  return instance.request<boolean>({
    url: "/api/h5/v1/form/sendSms",
    method: "post",
    data,
  })
}

export const getSubmitApi = (params: {
  targetKey: string
  actId: string
  formCode?: string
}) => {
  return instance.request<any>({
    url: "/api/h5/v1/form",
    method: "get",
    params,
  })
}

export const saveApi = (data: defs.h5.SubmitContent) => {
  return instance.request<boolean>({
    url: "/api/h5/v1/form/save",
    method: "post",
    data,
  })
}

export const lotteryApi = (data: defs.h5.LotteryPlay) => {
  return instance.request<any>({
    url: "/api/outsourcing/audi-etron/lottery",
    method: "post",
    data,
  })
}

export const postAddress = (data: defs.h5.PrizeRecordAdress) => {
  return instance.request<any>({
    url: "/api/h5/v1/lottery/lotteryLog/adress",
    method: "post",
    data,
  })
}

export const getLotteryLogApi = (params: { targetKey: string }) => {
  return instance.request<BaseResponseWithArray<any>>({
    url: "/api/h5/v1/Lottery/LotteryLog",
    method: "get",
    params,
  })
}

export const getCacheIdApi = (params: any) => {
  return instance.request<string>({
    url: "/api/h5/v1/cacheID",
    method: "get",
    params,
  })
}
