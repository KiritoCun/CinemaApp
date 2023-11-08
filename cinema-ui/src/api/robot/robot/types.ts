export interface RobotVO {
  /**
   * Robot ID
   */
  id: string | number;

  /**
   * Use for identify which topic r
   */
  robotName: string;

  /**
   *
   */
  ipAddress: string;

  /**
   * Status of robot: "0": Offline,
   */
  status: string;

  /**
   *
   */
  projectName: string;

  /**
   * Number of times that robot run
   */
  retryLimit: number;

  /**
   *
   */
  offCause: string;

  /**
   * Robot lock status
   */
  lockFlag: string;

  /**
   *
   */
  versionName: string;

  /**
   *
   */
  baseDir: string;

  /**
   *
   */
  endPoint: string;

  /**
   *
   */
  defaultUsername: string;

  /**
   *
   */
  defaultPassword: string;

  /**
   *
   */
  appDir: string;

  /**
   * Remark
   */
  remark: string;
}

export interface RobotForm extends BaseEntity {
  /**
   * Robot ID
   */
  id?: string | number;

  /**
   * Use for identify which topic r
   */
  robotName?: string;

  /**
   *
   */
  ipAddress?: string;

  /**
   * Status of robot: "0": Offline,
   */
  status?: string;

  /**
   *
   */
  projectName?: string;

  /**
   * Number of times that robot run
   */
  retryLimit?: number;

  /**
   *
   */
  offCause?: string;

  /**
   * Robot lock status
   */
  lockFlag?: string;

  /**
   *
   */
  versionName?: string;

  /**
   *
   */
  baseDir?: string;

  /**
   *
   */
  endPoint?: string;

  /**
   *
   */
  defaultUsername?: string;

  /**
   *
   */
  defaultPassword?: string;

  /**
   *
   */
  appDir?: string;

  /**
   * Remark
   */
  remark?: string;
}

export interface RobotQuery extends PageQuery {
  /**
   * Use for identify which topic r
   */
  robotName?: string;

  /**
   *
   */
  ipAddress?: string;

  /**
   * Status of robot: "0": Offline,
   */
  status?: string;

  /**
   *
   */
  projectName?: string;

  /**
   * Number of times that robot run
   */
  retryLimit?: number;

  /**
   *
   */
  offCause?: string;

  /**
   * Robot lock status
   */
  lockFlag?: string;

  /**
   *
   */
  versionName?: string;

  /**
   *
   */
  baseDir?: string;

  /**
   *
   */
  endPoint?: string;

  /**
   *
   */
  defaultUsername?: string;

  /**
   *
   */
  defaultPassword?: string;

  /**
   *
   */
  appDir?: string;
}
