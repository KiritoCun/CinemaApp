export interface DemoVO {
  /**
   * primary key
   */
  id: string | number;

  /**
   * department id
   */
  deptId: string | number;

  /**
   * user id
   */
  userId: string | number;

  /**
   * Order number
   */
  orderNum: number;

  /**
   * key
   */
  testKey: string;

  /**
   * value
   */
  value: string;
}

export interface DemoForm extends BaseEntity {
  /**
   * primary key
   */
  id?: string | number;

  /**
   * department id
   */
  deptId?: string | number;

  /**
   * user id
   */
  userId?: string | number;

  /**
   * Order number
   */
  orderNum?: number;

  /**
   * Key
   */
  testKey?: string;

  /**
   * Value
   */
  value?: string;
}

export interface DemoQuery extends PageQuery {
  /**
   * department id
   */
  deptId?: string | number;

  /**
   * user id
   */
  userId?: string | number;

  /**
   * Order number
   */
  orderNum?: number;

  /**
   * Key
   */
  testKey?: string;

  /**
   * Value
   */
  value?: string;
}
