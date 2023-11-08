export interface EdoConsigneeVO {
  /**
   * Edo Consignee ID
   */
  id: string | number;

  /**
   *
   */
  shippinglineId: string | number;

  /**
   *
   */
  consigneeName: string;

  /**
   *
   */
  taxCode: string;

  /**
   *
   */
  address: string;

  /**
   *
   */
  createTime: string;

  /**
   * Remark
   */
  remark: string;
}

export interface EdoConsigneeForm extends BaseEntity {
  /**
   * Edo Consignee ID
   */
  id?: string | number;

  /**
   *
   */
  shippinglineId?: string | number;

  /**
   *
   */
  consigneeName?: string;

  /**
   *
   */
  taxCode?: string;

  /**
   *
   */
  address?: string;

  /**
   * Remark
   */
  remark?: string;
}

export interface EdoConsigneeQuery extends PageQuery {
  /**
   *
   */
  shippinglineId?: string | number;

  /**
   *
   */
  consigneeName?: string;

  /**
   *
   */
  taxCode?: string;

  /**
   *
   */
  address?: string;
}
