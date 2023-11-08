import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ShippinglineVO, ShippinglineForm, ShippinglineQuery } from '@/api/portShip/shippinglineList/types';

/**
 * Query Shipping line information list
 * @param query
 * @returns {*}
 */

export const listShippingline = (query?: ShippinglineQuery): AxiosPromise<ShippinglineVO[]> => {
  return request({
    url: '/portShip/shippinglineList/list',
    method: 'get',
    params: query
  });
};

/**
 * Query detail of Shipping line information
 * @param id
 */
export const getShippingline = (id: string | number): AxiosPromise<ShippinglineVO> => {
  return request({
    url: '/portShip/shippinglineList/' + id,
    method: 'get'
  });
};

/**
 * Add Shipping line information
 * @param data
 */
export const addShippingline = (data: ShippinglineForm) => {
  return request({
    url: '/portShip/shippinglineList',
    method: 'post',
    data: data
  });
};

/**
 * Edit Shipping line information
 * @param data
 */
export const updateShippingline = (data: ShippinglineForm) => {
  return request({
    url: '/portShip/shippinglineList',
    method: 'put',
    data: data
  });
};

/**
 * Delete Shipping line information
 * @param id
 */
export const delShippingline = (id: string | number | Array<string | number>) => {
  return request({
    url: '/portShip/shippinglineList/' + id,
    method: 'delete'
  });
};
