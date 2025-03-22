import { request } from "@/utils/request"

export const getBuildingInfoApi = (id: string) => {
  return request.get<defs.swagger.buildingInfo>("/prod/v1/building-infos", {
    data: {
      blg_id: id
    }
  })
}

export const getBuildingFlatUnitApi = (id: string) => {
  return request.post<defs.swagger.flatUnit>("/prod/v1/building-flat-units", {
    blg_id: id
  })
}

export const getBuildingFlatUnitBillApi = (id: string) => {
  return request.post<defs.swagger.bill[]>("/prod/v1/building-flat-unit-bills", {
    unit_id: id
  })
}

export const getPaymentMethodApi = () => {
  return request.get<{ payment_methods: defs.swagger.paymentMethods[] }>("/prod/v1/payment-service/payment-methods")
}

export type paymentRequestData = {
  provider: string
  data: {
    bills: {
      bill_no: string
    }[]
    amount: string
    locale: string
  }
}
export const paymentRequestApi = (data: paymentRequestData) => {
  return request.post<defs.swagger.paymentRes>("/prod/v1/payment-service/request", data)
}

export const getPaymentStatusApi = (payment_id: string) => {
  return request.get<string>("/prod/v1/payment-service/payment-status", {
    params: {
      payment_id
    }
  })
}
