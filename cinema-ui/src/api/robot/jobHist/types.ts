export interface JobHistVO {
  /**
   * ID
   */
  id: string | number;

  /**
   *
   */
  jobId: string | number;

  /**
   *
   */
  stepOrder: number;

  /**
   *
   */
  result: string;

  /**
   *
   */
  imageUrl: string;

  /**
   *
   */
  finishFlag: string;

  /**
   *
   */
  msg: string;

  /**
   *
   */
  errMsg: string;

  /**
   * Remark
   */
  remark: string;
}

export interface JobHistForm extends BaseEntity {
  /**
   * Robot ID
   */
  id?: string | number;

  /**
   *
   */
  jobId?: string | number;

  /**
   *
   */
  stepOrder?: number;

  /**
   *
   */
  result?: string;

  /**
   *
   */
  imageUrl?: string;

  /**
   *
   */
  finishFlag?: string;

  /**
   *
   */
  msg?: string;

  /**
   *
   */
  errMsg?: string;

  /**
   * Remark
   */
  remark?: string;
}

export interface JobHistQuery extends PageQuery {
  /**
   *
   */
  jobId?: string | number;

  /**
   *
   */
  stepOrder?: number;

  /**
   *
   */
  result?: string;

  /**
   *
   */
  imageUrl?: string;

  /**
   *
   */
  finishFlag?: string;

  /**
   *
   */
  msg?: string;

  /**
   *
   */
  errMsg?: string;
}
