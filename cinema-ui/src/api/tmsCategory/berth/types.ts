export interface BerthQuery {
  berthId: string;
  vesselCode: string;
  voyage: string;
  pageNum: number;
  pageSize: number;
}

export interface BerthVO extends BaseEntity {
  berthId: string;
  vesselCode: string;
  voyage: string;
}
