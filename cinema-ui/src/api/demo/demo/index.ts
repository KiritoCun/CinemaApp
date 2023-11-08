import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DemoVO, DemoForm, DemoQuery } from '@/api/demo/demo/types';

/**
 * Query the list of test orders
 * @param query
 * @returns {*}
 */
export const listDemo = (query?: DemoQuery): AxiosPromise<DemoVO[]> => {
  return request({
    url: '/demo/demo/list',
    method: 'get',
    params: query
  });
};

/**
 * Query the details of the test sheet
 * @param id
 */
export const getDemo = (id: string | number): AxiosPromise<DemoVO> => {
  return request({
    url: '/demo/demo/' + id,
    method: 'get'
  });
};

/**
 * Add a test sheet
 * @param data
 */
export const addDemo = (data: DemoForm) => {
  return request({
    url: '/demo/demo',
    method: 'post',
    data: data
  });
};

/**
 * Modify the test sheet
 * @param data
 */
export const updateDemo = (data: DemoForm) => {
  return request({
    url: '/demo/demo',
    method: 'put',
    data: data
  });
};

/**
 * delete test sheet
 * @param id
 */
export const delDemo = (id: string | number | Array<string | number>) => {
  return request({
    url: '/demo/demo/' + id,
    method: 'delete'
  });
};
