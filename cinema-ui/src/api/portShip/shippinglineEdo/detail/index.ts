import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { EdoDetailVO, EdoDetailForm, EdoDetailQuery } from '@/api/portShip/shippinglineEdo/detail/types';
import { formatDate } from '@/utils';

/**
 * Query EDO Detail table list
 * @param query
 * @returns {*}
 */
export const listContainer = (query?: EdoDetailQuery): AxiosPromise<EdoDetailVO[]> => {
  return request({
    url: '/portShip/shippinglineEdo/container/list',
    method: 'get',
    params: query
  });
};

// Query edo container details
export function getContainer(id: string | number): AxiosPromise<EdoDetailVO> {
  return request({
    url: '/portShip/shippinglineEdo/container/' + id,
    method: 'get'
  });
}

/**
 * Edit EDO Detail table
 * @param data
 */
export const updateContainer = (containerId: string | number | (string | number)[], data: EdoDetailForm) => {
  if (data.expiredDem) {
    data.expiredDem = formatDate(data.expiredDem);
  }
  return request({
    url: '/portShip/shippinglineEdo/container/' + containerId,
    method: 'put',
    data: data
  });
};
