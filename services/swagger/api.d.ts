type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
  [key in Key]: Value;
};

declare namespace defs {
  export namespace swagger {
    export class bill {
      /** 賬單金額 */
      amount?: string;

      /** 賬單期的第一天 */
      bill_dt?: string;

      /** 賬單編號 */
      bill_no?: string;

      /** 賬單種類 */
      bill_type?: string;

      /** unique id for a unit/apartment */
      flat_code?: string;

      /** 備註 */
      remark?: string;

      /** 賬單狀態 */
      status?: string;

      /** 賬單期，某一個時段內應收的賬單款項 */
      trs_to?: string;
    }

    export class buildingInfo {
      /** building name in english */
      buildname?: string;

      /** building name in chinese */
      buildname_chi?: string;

      /** building address in english */
      cli_addr?: string;

      /** 法團中文名稱 */
      cli_chi_name?: string;

      /** building address in chinese */
      cli_chiadd?: string;

      /** 法團英文名稱 */
      cli_name?: string;
    }

    export class flatUnit {
      /** address name in chinese */
      address?: string;

      /** building name in chinese */
      building_name?: string;

      /** flats */
      flats?: Array<defs.swagger.flats>;
    }

    export class flats {
      /** 樓層 */
      floor?: string;

      /** 房號 */
      unit?: string;

      /** unique id for a unit/apartment */
      unit_id?: string;
    }

    export class paymentMethods {
      /** 付款方法 */
      method?: string;

      /** 付款方法，中文，顯示於用戶介面 */
      name_chi?: string;

      /** 付款方法，英文，顯示於用戶介面 */
      name_en?: string;

      /** 服務費 */
      service_charge?: string;
    }

    export class paymentRes {
      /** access_key */
      access_key?: string;

      /** money in string, 2 decimal places */
      amount?: string;

      /** 貨幣 */
      currency?: string;

      /** 語言, 支付服務顯示語言 */
      locale?: string;

      /** profile_id */
      profile_id?: string;

      /** reference_number */
      reference_number?: string;

      /** signature */
      signature?: string;

      /** signed_date_time */
      signed_date_time?: string;

      /** signed_field_names */
      signed_field_names?: string;

      /** transaction_type */
      transaction_type?: string;

      /** transaction_uuid */
      transaction_uuid?: string;

      /** unsigned_field_names */
      unsigned_field_names?: string;
    }
  }
}

declare namespace API {
  export namespace swagger {
    /**
     *
     */
    export namespace payment_apigw {
      /**
       * get up paid bill
       * /prod/v1/building-flat-unit-bills
       */
      export namespace postBuildingFlatUnitBills {}

      /**
       * get flat
       * /prod/v1/building-flat-units
       */
      export namespace postBuildingFlatUnits {}

      /**
       * get building info
       * /prod/v1/building-infos
       */
      export namespace postBuildingInfos {}

      /**
       * get payment method
       * /prod/v1/payment-service/payment-methods
       */
      export namespace getPaymentServicePaymentMethods {}

      /**
       * check payment status
       * /prod/v1/payment-service/payment-status
       */
      export namespace getPaymentServicePaymentStatus {}

      /**
       * handle-payment
       * /prod/v1/payment-service/request
       */
      export namespace postPaymentServiceRequest {}
    }
  }
}
