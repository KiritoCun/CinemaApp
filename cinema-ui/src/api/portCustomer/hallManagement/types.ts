export interface HallVO {
  /**
   * Hall id
   */
  id: string | number;

  /**
   * Cinema id
   */
  cinemaId: string | number;

  /**
   *
   */
  hallName: string;

  /**
   *
   */
  capacity: Boolean;

  /**
   *
   */
  seatNumber: string;

  /**
   * Remark
   */
  remark: string;
}

export interface HallForm extends BaseEntity {
  /**
   * Hall id
   */
  id?: string | number;

  /**
   * Cinema id
   */
  cinemaId?: string | number;

  /**
   *
   */
  hallName?: string;

  /**
   *
   */
  capacity?: Boolean;

  /**
   *
   */
  seatNumber?: string;

  /**
   * Remark
   */
  remark?: string;
}

export interface HallQuery extends PageQuery {
  /**
   *
   */
  hallName: string;

  /**
   *
   */
  capacity: Boolean;

  /**
   *
   */
  seatNumber: string;
}
