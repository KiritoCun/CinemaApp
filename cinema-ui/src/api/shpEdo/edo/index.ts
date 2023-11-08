import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { EdoMainVO, EdoMainQuery } from '@/api/shpEdo/edo/types';

/**
 * Query EDO main table list
 * @param query
 * @returns {*}
 */
export const listEdo = (query?: EdoMainQuery): AxiosPromise<EdoMainVO[]> => {
  return request({
    url: '/shpEdo/edo/list',
    method: 'get',
    params: query
  });
};

export const printPdf = (blNo?: string): Blob | MediaSource | AxiosPromise<Blob> => {
  return request({
    url: '/shpEdo/edo/print/blNo/' + blNo,
    method: 'get',
    responseType: 'blob'
  });
};

export const getMasterDataForEdo = () => {
  return request({
    url: '/shpEdo/edo/release/masterData',
    method: 'get'
  });
};
