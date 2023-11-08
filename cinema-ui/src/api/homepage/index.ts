import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { Edo, EdoSearchParam, ContainerInfo, VesselSchedule, VesselScheduleSearchParam } from './type';

export function searchEdo(data: EdoSearchParam): AxiosPromise<Edo[]> {
  const param = {
    params: {
      containerNo: data.containerNo,
      blNo: data.blNo
    },
    pageNum: data.pageNum,
    pageSize: data.pageSize
  };
  return request({
    url: '/homepage/search/edo',
    headers: {
      isToken: false
    },
    method: 'get',
    params: param
  });
}

export function searchVesselSchedule(data: VesselScheduleSearchParam): AxiosPromise<VesselSchedule[]> {
  const param = {
    params: {
      fromDate: data.fromDate,
      toDate: data.toDate
    },
    pageNum: data.pageNum,
    pageSize: data.pageSize
  };
  return request({
    url: '/homepage/search/vesselSchedules',
    headers: {
      isToken: false
    },
    method: 'get',
    params: param
  });
}

export function searchContainerInfo(containerNo: string): AxiosPromise<ContainerInfo> {
  return request({
    url: '/homepage/search/container/' + containerNo,
    headers: {
      isToken: false
    },
    method: 'get'
  });
}

export const getDocuments = (): AxiosPromise<any> => {
  return request({
    url: '/homepage/search/documents',
    headers: {
      isToken: false
    },
    method: 'get'
  });
};
