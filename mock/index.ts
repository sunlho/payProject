import { MockMethod } from "vite-plugin-mock"

const flats = [
  {
    unit_id: "03861000001",
    floor: "G",
    unit: "01",
  },
  {
    unit_id: "03861000002",
    floor: "G",
    unit: "02",
  },
  {
    unit_id: "03861000006",
    floor: "G",
    unit: "06",
  },
  {
    unit_id: "03861000011",
    floor: "F",
    unit: "01",
  },
  {
    unit_id: "03861000012",
    floor: "F",
    unit: "02",
  },
]

const generateBills = () => {
  const unitArr = flats.map((item) => item.unit_id)
  return new Array(33).fill(0).map((_, index) => {
    return {
      flat_code: unitArr[Math.floor(Math.random() * unitArr.length)],
      bill_type: "管理費",
      trs_to: "2023/09",
      bill_dt: "2023-09-01",
      amount: `${Math.floor(Math.random() * 100000) / 100}`,
      bill_no: `0386100${Math.floor(Math.random() * 999999)}`,
      status: "PENDING",
      remark: "",
    }
  })
}

const bills = generateBills()

export default [
  {
    url: "/prod/v1/building-infos",
    method: "post",
    response: () => {
      return {
        buildname: "TAK WUN BUILDING",
        buildname_chi: "得運大廈",
        cli_name: "The Incorporated Owners of Tak Wun Building",
        cli_chi_name: "得運大廈業主立案法團",
        cli_addr: "12-16 Pak Kung Street, Kowloon",
        cli_chiadd: "九龍北拱街12-16號 得運大廈",
      }
    },
  },
  {
    url: "/prod/v1/building-flat-units",
    method: "post",
    response: () => {
      return {
        building_name: "得運商場",
        address: "xxxxxxxxxxxx",
        flats: flats,
      }
    },
  },
  {
    url: "/prod/v1/building-flat-unit-bills",
    method: "post",
    response: (item) => {
      const response = bills.filter((_) => {
        return _.flat_code === item.body.unit_id
      })
      return response
    },
  },
  {
    url: "/prod/v1/payment-service/payment-methods",
    method: "get",
    response: () => {
      return {
        payment_methods: [
          {
            method: "fps",
            name_chi: "轉數快",
            name_en: "FPS",
            service_charge: "0.00",
          },
          {
            method: "credit_card",
            name_chi: "信用卡",
            name_en: "Credit Card",
            service_charge: "0.027",
          },
          {
            method: "wechat_alipay",
            name_chi: "微信/支付寶",
            name_en: "WeChat/AliPay",
            service_charge: "0.01",
          },
          {
            method: "transfer",
            name_chi: "銀行轉帳",
            name_en: "Bank Transfer",
            service_charge: "0.00",
          },
          {
            method: "cheque",
            name_chi: "支票",
            name_en: "Cheque",
            service_charge: "0.00",
          },
          {
            method: "cash",
            name_chi: "現金",
            name_en: "Cheque",
            service_charge: "0.00",
          },
        ],
      }
    },
  },
  {
    url: "/prod/v1/payment-service/request",
    method: "post",
    response: () => {
      return {
        unsigned_field_names: "",
        amount: "100.00",
        profile_id: "c69919e1-3e24-4d3f-ac06-5f6f34fb6f90",
        access_key: "8bcefd2d-d983-46eb-9d36-f2aa399560df",
        currency: "HKD",
        transaction_uuid: "ce684e0e-a5a9-40a1-bbb6-c883cf5aec26",
        signed_field_names:
          "access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency",
        locale: "en",
        transaction_type: "authorization",
        reference_number: "pay_id_39bec922-3103-4587-99d6-55cde8b47d19",
        signed_date_time: "2023-11-14T15:54:15Z",
        signature: "DSfjs3//pZKNkSqvUvCWhsAaaniqaUAjS/fKd82gK3s=",
      }
    },
  },
  {
    url: "/prod/v1/payment-service/payment-status",
    method: "get",
    response: () => {
      return {
        status: "PENDING",
      }
    },
  },
  {
    url: "/payment_confirmation",
    method: "post",
  },
] as MockMethod[]
