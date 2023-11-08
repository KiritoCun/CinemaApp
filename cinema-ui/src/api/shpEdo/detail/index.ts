import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { EdoDetailVO, EdoDetailForm, EdoDetailQuery } from '@/api/shpEdo/detail/types';
import { formatDate } from '@/utils';

/**
 * Query EDO Detail table list
 * @param query
 * @returns {*}
 */
export const listContainer = (query?: EdoDetailQuery): AxiosPromise<EdoDetailVO[]> => {
  return request({
    url: '/shpEdo/edo/container/list',
    method: 'get',
    params: query
  });
};

/**
 * Add EDO Detail table
 * @param data
 */
export const addContainer = (data: EdoDetailForm) => {
  return request({
    url: '/shpEdo/edo/container',
    method: 'post',
    data: data
  });
};

// Query edo container details
export const getContainer = (id: string | number): AxiosPromise<EdoDetailVO> => {
  return request({
    url: '/shpEdo/edo/container/' + id,
    method: 'get'
  });
};

/**
 * Edit EDO Detail table
 * @param data
 */
export const updateContainer = (containerId: string | number | (string | number)[], data: EdoDetailForm) => {
  if (data.expiredDem) {
    data.expiredDem = formatDate(data.expiredDem);
  }
  return request({
    url: '/shpEdo/edo/container/' + containerId,
    method: 'put',
    data: data
  });
};

// DLU Container
export const dluContainerApi = (containerId: string | number | (string | number)[], lockFlag: string) => {
  return request({
    url: '/shpEdo/edo/container/' + containerId + '/lockFlag/' + lockFlag,
    method: 'put'
  });
};

// Release edo
export const releaseEdo = (edos: Array<EdoDetailForm>, releaseFlag: string) => {
  return request({
    url: '/shpEdo/edo/release/' + releaseFlag,
    method: 'post',
    data: edos
  });
};
