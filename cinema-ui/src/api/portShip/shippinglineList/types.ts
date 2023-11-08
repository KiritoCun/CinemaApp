export interface ShippinglineVO {
  /**
   * Shipping line id
   */
  id: string | number;

  /**
   * Shipping line operator code
   */
  operatorCode: string;

  /**
   * Shipping line operator name
   */
  operatorName: string;

  /**
   * OPR list
   */
  oprList: string;

  /**
   * Shipping line email
   */
  email: string;

  /**
   * Shipping line contact number
   */
  phonenumber: string;

  /**
   * Shipping line taxcode
   */
  taxcode: string;

  /**
   * Domestic flag
   */
  domesticFlag: string;

  /**
   * Api flag
   */
  apiFlag: string;

  /**
   * Api public key
   */
  apiPublicKey: string;

  /**
   * Api private key
   */
  apiPrivateKey: string;

  /**
   * Remark
   */
  remark: string;
}

export interface ShippinglineForm extends BaseEntity {
  /**
   * Shipping line id
   */
  id?: string | number;

  /**
   * Shipping line operator code
   */
  operatorCode?: string;

  /**
   * Shipping line operator name
   */
  operatorName?: string;

  /**
   * OPR list
   */
  oprList?: string;

  /**
   * Shipping line email
   */
  email?: string;

  /**
   * Shipping line contact number
   */
  phonenumber?: string;

  /**
   * Shipping line taxcode
   */
  taxcode?: string;

  /**
   * Domestic flag
   */
  domesticFlag?: string;

  /**
   * Api flag
   */
  apiFlag?: string;

  /**
   * Api public key
   */
  apiPublicKey?: string;

  /**
   * Api private key
   */
  apiPrivateKey?: string;

  /**
   * Remark
   */
  remark?: string;
}

export interface ShippinglineQuery extends PageQuery {
  /**
   * Shipping line operator code
   */
  operatorCode?: string;

  /**
   * Shipping line operator name
   */
  operatorName?: string;

  /**
   * OPR list
   */
  oprList?: string;

  /**
   * Shipping line email
   */
  email?: string;

  /**
   * Shipping line contact number
   */
  phonenumber?: string;

  /**
   * Shipping line taxcode
   */
  taxcode?: string;

  /**
   * Domestic flag
   */
  domesticFlag?: string;

  /**
   * Api flag
   */
  apiFlag?: string;

  /**
   * Api public key
   */
  apiPublicKey?: string;

  /**
   * Api private key
   */
  apiPrivateKey?: string;
}
