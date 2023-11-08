export interface EdoDetailVO {
  /**
   * Edo detail ID
   */
  id: string | number;

  /**
   *
   */
  shippinglineId: string | number;

  /**
   *
   */
  edoMainId: string | number;

  /**
   *
   */
  oprCode: string;

  /**
   *
   */
  businessUnit: string;

  /**
   *
   */
  orderNumber: string;

  /**
   *
   */
  blNo: string;

  /**
   *
   */
  consignee: string;

  /**
   *
   */
  consigneeTaxCode: string;

  /**
   *
   */
  containerNo: string;

  /**
   *
   */
  expiredDem: string;

  /**
   *
   */
  emptyContainerDepot: string;

  /**
   *
   */
  detFreeTime: string;

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
  sztp: string;

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
  lockFlag: string;

  /**
   *
   */
  releaseFlag: string;

  /**
   *
   */
  finishFlag: string;

  /**
   *
   */
  orderFlag: string;

  /**
   *
   */
  houseBillNo: string;

  /**
   *
   */
  releaseNo: string;

  /**
   * Remark
   */
  remark: string;
}

export interface EdoDetailForm extends BaseEntity {
  /**
   * Edo detail ID
   */
  id?: string | number;

  /**
   *
   */
  shippinglineId?: string | number;

  /**
   *
   */
  edoMainId?: string | number;

  /**
   *
   */
  oprCode?: string;

  /**
   *
   */
  businessUnit?: string;

  /**
   *
   */
  orderNumber?: string;

  /**
   *
   */
  blNo?: string;

  /**
   *
   */
  consignee?: string;

  /**
   *
   */
  consigneeTaxCode?: string;

  /**
   *
   */
  containerNo?: string;

  /**
   *
   */
  expiredDem?: string;

  /**
   *
   */
  emptyContainerDepot?: string;

  /**
   *
   */
  detFreeTime?: string;

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
  sztp?: string;

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
  lockFlag?: string;

  /**
   *
   */
  releaseFlag?: string;

  /**
   *
   */
  finishFlag?: string;

  /**
   *
   */
  orderFlag?: string;

  /**
   *
   */
  houseBillNo?: string;

  /**
   *
   */
  releaseNo?: string;

  /**
   * Remark
   */
  remark?: string;
}

export interface EdoDetailQuery extends PageQuery {
  /**
   *
   */
  shippinglineId?: string | number;

  /**
   *
   */
  edoMainId?: string | number;

  /**
   *
   */
  oprCode?: string;

  /**
   *
   */
  businessUnit?: string;

  /**
   *
   */
  orderNumber?: string;

  /**
   *
   */
  blNo?: string;

  /**
   *
   */
  consignee?: string;

  /**
   *
   */
  consigneeTaxCode?: string;

  /**
   *
   */
  containerNo?: string;

  /**
   *
   */
  expiredDem?: string;

  /**
   *
   */
  emptyContainerDepot?: string;

  /**
   *
   */
  detFreeTime?: string;

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
  sztp?: string;

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
  lockFlag?: string;

  /**
   *
   */
  releaseFlag?: string;

  /**
   *
   */
  finishFlag?: string;

  /**
   *
   */
  orderFlag?: string;

  /**
   *
   */
  houseBillNo?: string;

  /**
   *
   */
  releaseNo?: string;
}
