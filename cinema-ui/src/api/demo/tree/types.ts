export interface TreeVO {
  /**
   * primary key
   */
  id: string | number;

  /**
   * parent id
   */
  parentId: string | number;

  /**
   * department id
   */
  deptId: string | number;

  /**
   * user id
   */
  userId: string | number;

  /**
   * value
   */
  treeName: string;

  /**
   * child object
   */
  children: TreeVO[];
}

export interface TreeForm extends BaseEntity {
  /**
   * primary key
   */
  id?: string | number;

  /**
   * parent id
   */
  parentId?: string | number;

  /**
   * department id
   */
  deptId?: string | number;

  /**
   * user id
   */
  userId?: string | number;

  /**
   * value
   */
  treeName?: string;
}

export interface TreeQuery {
  /**
   * parent id
   */
  parentId?: string | number;

  /**
   * department id
   */
  deptId?: string | number;

  /**
   * user id
   */
  userId?: string | number;

  /**
   * value
   */
  treeName?: string;
}
