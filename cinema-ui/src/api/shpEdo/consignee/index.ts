import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { EdoConsigneeVO, EdoConsigneeForm, EdoConsigneeQuery } from '@/api/shpEdo/consignee/types';

/**
 * Query Edo Consignee list
 * @param query
 * @returns {*}
 */
export const listEdoConsignee = (query?: EdoConsigneeQuery): AxiosPromise<EdoConsigneeVO[]> => {
  return request({
    url: '/shpEdo/consignee/list',
    method: 'get',
    params: query
  });
};

/**
 * Query detail of Edo Consignee
 * @param id
 */
export const getEdoConsignee = (id: string | number): AxiosPromise<EdoConsigneeVO> => {
  return request({
    url: '/shpEdo/consignee/' + id,
    method: 'get'
  });
};

/**
 * Add Edo Consignee
 * @param data
 */
export const addEdoConsignee = (data: EdoConsigneeForm) => {
  return request({
    url: '/shpEdo/consignee',
    method: 'post',
    data: data
  });
};

/**
 * Edit Edo Consignee
 * @param data
 */
export const updateEdoConsignee = (data: EdoConsigneeForm) => {
  return request({
    url: '/shpEdo/consignee',
    method: 'put',
    data: data
  });
};

/**
 * Delete Edo Consignee
 * @param id
 */
export const delEdoConsignee = (id: string | number | Array<string | number>) => {
  return request({
    url: '/shpEdo/consignee/' + id,
    method: 'delete'
  });
};
