import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { EdoMainVO, EdoMainQuery } from '@/api/portShip/shippinglineEdo/edo/types';

/**
 * Query EDO main table list
 * @param query
 * @returns {*}
 */

export const listEdo = (query?: EdoMainQuery): AxiosPromise<EdoMainVO[]> => {
  return request({
    url: '/portShip/shippinglineEdo/list',
    method: 'get',
    params: query
  });
};

export const printPdf = (blNo?: string): Blob | MediaSource | AxiosPromise<Blob> => {
  return request({
    url: '/portShip/shippinglineEdo/print/blNo/' + blNo,
    method: 'get',
    responseType: 'blob'
  });
};
