import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ShippinglineApiVO, ShippinglineApiForm, ShippinglineApiQuery, ShippinglineApiInfoVO } from '@/api/portShip/shippinglineApi/types';
import { UserVO } from '@/api/system/user/types';
import { parseStrEmpty } from '@/utils/eportvict';

/**
 * Query Shipping line api list
 * @param query
 * @returns {*}
 */

export const listShippinglineApi = (query?: ShippinglineApiQuery): AxiosPromise<ShippinglineApiVO[]> => {
  return request({
    url: '/portShip/shippinglineApi/list',
    method: 'get',
    params: query
  });
};

/**
 * Query detail of Shipping line api
 * @param id
 */
export const getShippinglineApi = (id?: string | number): AxiosPromise<ShippinglineApiInfoVO> => {
  return request({
    url: '/portShip/shippinglineApi/' + parseStrEmpty(id),
    method: 'get'
  });
};

/**
 * Query shippingline user mapping opr and business unit
 * @param id
 */
export const getShippinglineUserList = (opr?: string, businessUnit?: string): AxiosPromise<UserVO[]> => {
  return request({
    url: '/portShip/shippinglineApi/shippingLineUserList' + "?opr=" + parseStrEmpty(opr) + '&businessUnit=' + parseStrEmpty(businessUnit),
    method: 'get'
  });
};

/**
 * Add Shipping line api
 * @param data
 */
export const addShippinglineApi = (data: ShippinglineApiForm) => {
  return request({
    url: '/portShip/shippinglineApi',
    method: 'post',
    data: data
  });
};

/**
 * Edit Shipping line api
 * @param data
 */
export const updateShippinglineApi = (data: ShippinglineApiForm) => {
  return request({
    url: '/portShip/shippinglineApi',
    method: 'put',
    data: data
  });
};

/**
 * Delete Shipping line api
 * @param id
 */
export const delShippinglineApi = (id: string | number | Array<string | number>) => {
  return request({
    url: '/portShip/shippinglineApi/' + id,
    method: 'delete'
  });
};

/**
 * Delete Shipping line api
 * @param id
 */
export const refreshShippinglineApiKey = (id: string | number) => {
  return request({
    url: '/portShip/shippinglineApi/' + id,
    method: 'put'
  });
};
