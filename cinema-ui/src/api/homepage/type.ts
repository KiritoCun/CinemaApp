export interface EdoSearchParam {
  containerNo: string;
  blNo: string;
  pageNum: number;
  pageSize: number;
}

export interface Edo {
  containerNo: string;
  blNo: string;
  opr: string;
  inDate: string;
  outDate: string;
  expiredDay: string;
  detentionDay: number;
  emptyReturnPlace: string;
  status: string;
  location: string;
  remark: string;
}

export interface VesselScheduleSearchParam {
  fromDate: string;
  toDate: string;
  pageNum: number;
  pageSize: number;
}

export interface VesselSchedule {
  fullName: string;
  voyage: string;
  description: string;
  etb: string;
  etu: string;
  vesselRoute: string;
  country: string;
}

export interface ContainerInfo {
  containerId: string;
  containerNo: string;
  activityNo: string;
  vessel: string;
  location: string;
  sealNo: string;
  weight: string;
  plugin: string;
  activityDate: string;
  condition: string;
  importExport: string;
  description: string;
  vdate: string;
  customDescription: string;
}
