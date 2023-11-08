export interface JobVO {
  /**
   * Robot ID
   */
  jobId: string | number;

  /**
   * Reference id to specific table
   */
  refId: string | number;

  /**
   *
   */
  robotName: string;

  /**
   *
   */
  ipAddress: string;

  /**
   * Status of robot data: "W": Wai
   */
  status: string;

  /**
   *
   */
  projectName: string;

  /**
   *
   */
  retryCount: number;

  /**
   *
   */
  imageUrl: string;

  /**
   *
   */
  reqJson: string;

  /**
   *
   */
  resJson: string;

  /**
   * Remark
   */
  remark: string;
}

export interface JobForm extends BaseEntity {
  /**
   * Robot ID
   */
  jobId?: string | number;

  /**
   * Reference id to specific table
   */
  refId?: string | number;

  /**
   *
   */
  robotName?: string;

  /**
   *
   */
  ipAddress?: string;

  /**
   * Status of robot data: "W": Wai
   */
  status?: string;

  /**
   *
   */
  projectName?: string;

  /**
   *
   */
  retryCount?: number;

  /**
   *
   */
  reqJson?: string;

  /**
   *
   */
  resJson?: string;

  /**
   * Remark
   */
  remark?: string;
}

export interface JobQuery extends PageQuery {
  /**
   * Reference id to specific table
   */
  refId?: string | number;

  /**
   *
   */
  robotName?: string;

  /**
   *
   */
  ipAddress?: string;

  /**
   * Status of robot data: "W": Wai
   */
  status?: string;

  /**
   *
   */
  projectName?: string;

  /**
   *
   */
  retryCount?: number;

  /**
   *
   */
  reqJson?: string;

  /**
   *
   */
  resJson?: string;
}
