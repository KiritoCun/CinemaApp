import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { EdoMainVO, EdoMainQuery } from '@/api/shpEdo/edo/types';
import { EdoDetailVO, EdoDetailForm, EdoDetailQuery } from '@/api/shpEdo/detail/types';

/**
 * Query EDO main table list
 * @param query
 * @returns {*}
 */
export const listEdoDraft = (query?: EdoMainQuery): AxiosPromise<EdoMainVO[]> => {
  return request({
    url: '/shpEdo/edoDraft/list',
    method: 'get',
    params: query
  });
};

/**
 * Query EDO Detail table list
 * @param query
 * @returns {*}
 */
export const listContainerDraft = (query?: EdoDetailQuery): AxiosPromise<EdoDetailVO[]> => {
  return request({
    url: '/shpEdo/edoDraft/container/list',
    method: 'get',
    params: query
  });
};

// Edit edo draft
export const updateEdoDraft = (edos: Array<EdoDetailForm>, blNo: string | undefined) => {
  return request({
    url: '/shpEdo/edoDraft/blNo/' + blNo,
    method: 'put',
    data: edos
  });
};

// delete edo draft
export function delEdoDraft(edoIds: string | number | (string | number)[]) {
  return request({
    url: '/shpEdo/edoDraft/' + edoIds,
    method: 'delete'
  });
}

// Release edo draft
export function releaseEdoDraft(edoIds: string | number | (string | number)[]) {
  return request({
    url: '/shpEdo/edoDraft/' + edoIds + '/release',
    method: 'put'
  });
}
