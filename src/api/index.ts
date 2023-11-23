import { request } from "@/utils/request"

export const getBuildingInfoApi = (id: string) => {
  return request<defs.swagger.buildingInfo>({
    url: "/prod/v1/building-infos",
    method: "post",
    params: {
      blg_id: id,
    },
  })
}

export const getBuildingFlatUnitApi = (id: string) => {
  return request<defs.swagger.flatUnit>({
    url: "/prod/v1/building-flat-units",
    method: "post",
    params: {
      blg_id: id,
    },
  })
}

export const getBuildingFlatUnitBillApi = (id: string) => {
  return request<defs.swagger.bill[]>({
    url: "/prod/v1/building-flat-unit-bills",
    method: "post",
    params: {
      unit_id: id,
    },
  })
}

export const getPaymentMethodApi = () => {
  return request<{ payment_methods: defs.swagger.paymentMethods[] }>({
    url: "/prod/v1/payment-service/payment-methods",
    method: "get",
  })
}

export const paymentRequestApi = (data: {
  provider: string
  data: { amount: string; locale: string }
}) => {
  return request<defs.swagger.paymentRes>({
    url: "/prod/v1/payment-service/request",
    method: "post",
    data,
  })
}

export const getPaymentStatusApi = (payment_id: string) => {
  return request<string>({
    url: "/prod/v1/payment-service/payment-status",
    method: "get",
    params: {
      payment_id,
    },
  })
}
