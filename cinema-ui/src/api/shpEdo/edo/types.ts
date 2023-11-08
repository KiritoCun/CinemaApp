export interface EdoMainVO {
  /**
   *Edo ID
   */
  id: string | number;

  /**
   *
   */
  shippinglineId: string | number;

  /**
   *
   */
  oprCode: string;

  /**
   *
   */
  blNo: string;

  /**
   *
   */
  containerAmount: number;

  /**
   *
   */
  releaseDate: string;

  /**
   *
   */
  vesselName: string;

  /**
   *
   */
  veselNo: string;

  /**
   *
   */
  voyNo: string;

  /**
   *
   */
  createSource: string;

  /**
   *
   */
  pol: string;

  /**
   *
   */
  pod: string;

  /**
   *
   */
  shippinglinePayment: string;

  /**
   *
   */
  shippinglinePaymentExpiredDate: string;

  /**
   *
   */
  releaseFlag: string;

  /**
   *
   */
  containerNo: string;

  /**
   *
   */
  consignee: string;

  /**
   *Remark
   */
  remark: string;
}

export interface EdoMainForm extends BaseEntity {
  /**
   *Edo ID
   */
  id?: string | number;

  /**
   *
   */
  shippinglineId?: string | number;

  /**
   *
   */
  oprCode?: string;

  /**
   *
   */
  blNo?: string;

  /**
   *
   */
  containerAmount?: number;

  /**
   *
   */
  releaseDate?: string;

  /**
   *
   */
  vesselName?: string;

  /**
   *
   */
  veselNo?: string;

  /**
   *
   */
  voyNo?: string;

  /**
   *
   */
  createSource?: string;

  /**
   *
   */
  pol?: string;

  /**
   *
   */
  pod?: string;

  /**
   *
   */
  shippinglinePayment?: string;

  /**
   *
   */
  shippinglinePaymentExpiredDate?: string;

  /**
   *
   */
  releaseFlag?: string;

  /**
   *Remark
   */
  remark?: string;
}

export interface EdoMainQuery extends PageQuery {
  /**
   *
   */
  shippinglineId?: string | number;

  /**
   *
   */
  oprCode?: string;

  /**
   *
   */
  blNo?: string;

  /**
   *
   */
  containerAmount?: number;

  /**
   *
   */
  releaseDate?: string;

  /**
   *
   */
  vesselName?: string;

  /**
   *
   */
  veselNo?: string;

  /**
   *
   */
  voyNo?: string;

  /**
   *
   */
  createSource?: string;

  /**
   *
   */
  pol?: string;

  /**
   *
   */
  pod?: string;

  /**
   *
   */
  shippinglinePayment?: string;

  /**
   *
   */
  shippinglinePaymentExpiredDate?: string;

  /**
   *
   */
  orderFlag?: string;

  /**
   *
   */
  containerNo?: string;

  /**
   *
   */
  consignee?: string;
}
