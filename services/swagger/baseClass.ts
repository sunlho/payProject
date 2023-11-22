class bill {
  /** 賬單金額 */
  amount = '';

  /** 賬單期的第一天 */
  bill_dt = '';

  /** 賬單編號 */
  bill_no = '';

  /** 賬單種類 */
  bill_type = '';

  /** unique id for a unit/apartment */
  flat_code = '';

  /** 備註 */
  remark = '';

  /** 賬單狀態 */
  status = '';

  /** 賬單期，某一個時段內應收的賬單款項 */
  trs_to = '';
}

class buildingInfo {
  /** building name in english */
  buildname = '';

  /** building name in chinese */
  buildname_chi = '';

  /** building address in english */
  cli_addr = '';

  /** 法團中文名稱 */
  cli_chi_name = '';

  /** building address in chinese */
  cli_chiadd = '';

  /** 法團英文名稱 */
  cli_name = '';
}

class flatUnit {
  /** address name in chinese */
  address = '';

  /** building name in chinese */
  building_name = '';

  /** flats */
  flats = [];
}

class flats {
  /** 樓層 */
  floor = '';

  /** 房號 */
  unit = '';

  /** unique id for a unit/apartment */
  unit_id = '';
}

class paymentMethods {
  /** 付款方法 */
  method = '';

  /** 付款方法，中文，顯示於用戶介面 */
  name_chi = '';

  /** 付款方法，英文，顯示於用戶介面 */
  name_en = '';

  /** 服務費 */
  service_charge = '';
}

class paymentRes {
  /** access_key */
  access_key = '';

  /** money in string, 2 decimal places */
  amount = '';

  /** 貨幣 */
  currency = '';

  /** 語言, 支付服務顯示語言 */
  locale = '';

  /** profile_id */
  profile_id = '';

  /** reference_number */
  reference_number = '';

  /** signature */
  signature = '';

  /** signed_date_time */
  signed_date_time = '';

  /** signed_field_names */
  signed_field_names = '';

  /** transaction_type */
  transaction_type = '';

  /** transaction_uuid */
  transaction_uuid = '';

  /** unsigned_field_names */
  unsigned_field_names = '';
}

export const swagger = {
  bill,
  buildingInfo,
  flatUnit,
  flats,
  paymentMethods,
  paymentRes,
};
