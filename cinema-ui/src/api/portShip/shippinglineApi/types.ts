import { ShippinglineVO } from '@/api/portShip/shippinglineList/types';
import { UserVO } from '@/api/system/user/types';

export interface ShippinglineApiVO {
  /**
   * Shipping line api id
   */
  id: string | number;

  /**
   *
   */
  shippinglineId: string | number;

  /**
   * Shipping line child opr code
   */
  oprCode: string;

  /**
   * Block flag
   */
  blockFlag: string;

  /**
   * Api public key
   */
  apiPublicKey: string;

  /**
   * Api private key
   */
  apiPrivateKey: string;

  /**
   *
   */
  operatorCode: string;

  /**
   *
   */
  operatorName: string;

  /**
   * Remark
   */
  remark: string;
}

export interface ShippinglineApiForm extends BaseEntity {
  /**
   * Shipping line api id
   */
  id?: string | number;

  /**
   *
   */
  shippinglineId?: string | number;

  /**
   * Shipping line child opr code
   */
  oprCode?: string;

  /**
   * Block flag
   */
  blockFlag?: string;

   /**
   * Username of the representative receiving the eDO api info
   */
  userId?: number;

  /**
   * Dept id of Username representative receiving the eDO api info
   */
  deptId?: number;

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

export interface ShippinglineApiQuery extends PageQuery {
  /**
   *
   */
  shippinglineId?: string | number;

  /**
   * Shipping line child opr code
   */
  oprCode?: string;

  /**
   * Block flag
   */
  blockFlag?: string;

  /**
   * Api public key
   */
  apiPublicKey?: string;

  /**
   *
   */
  operatorCode?: string;

  /**
   *
   */
  operatorName?: string;

  /**
   * Api private key
   */
  apiPrivateKey?: string;
}

export interface ShippinglineApiInfoVO {
  shippinglineApi: ShippinglineApiVO;
  shippinglines: ShippinglineVO[];
}
