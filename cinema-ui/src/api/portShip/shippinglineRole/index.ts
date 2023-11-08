import { UserVO, UserQuery } from '@/api/portShip/shippinglineUser/types';
import { AxiosPromise } from 'axios';
import { RoleQuery, RoleVO, RoleDeptTree } from './types';
import request from '@/utils/request';

export const listRole = (query: RoleQuery): AxiosPromise<RoleVO[]> => {
  return request({
    url: '/portShip/shippinglineRole/list',
    method: 'get',
    params: query
  });
};

/**
 * Query role details
 */
export const getRole = (roleId: string | number): AxiosPromise<RoleVO> => {
  return request({
    url: '/portShip/shippinglineRole/' + roleId,
    method: 'get'
  });
};

/**
 * new role
 */
export const addRole = (data: any) => {
  return request({
    url: '/portShip/shippinglineRole',
    method: 'post',
    data: data
  });
};

/**
 * modify role
 * @param data
 */
export const updateRole = (data: any) => {
  return request({
    url: '/portShip/shippinglineRole',
    method: 'put',
    data: data
  });
};

/**
 * Role Data Permissions
 */
export const dataScope = (data: any) => {
  return request({
    url: '/portShip/shippinglineRole/dataScope',
    method: 'put',
    data: data
  });
};

/**
 * Character Status Modification
 */
export const changeRoleStatus = (roleId: string | number, status: string) => {
  const data = {
    roleId,
    status
  };
  return request({
    url: '/portShip/shippinglineRole/changeStatus',
    method: 'put',
    data: data
  });
};

/**
 * delete role
 */
export const delRole = (roleId: Array<string | number> | string | number) => {
  return request({
    url: '/portShip/shippinglineRole/' + roleId,
    method: 'delete'
  });
};

/**
 * Query the list of authorized users for a role
 */
export const allocatedUserList = (query: UserQuery): AxiosPromise<UserVO[]> => {
  return request({
    url: '/portShip/shippinglineRole/authUser/allocatedList',
    method: 'get',
    params: query
  });
};

/**
 * Query the list of unauthorized users for a role
 */
export const unallocatedUserList = (query: UserQuery): AxiosPromise<UserVO[]> => {
  return request({
    url: '/portShip/shippinglineRole/authUser/unallocatedList',
    method: 'get',
    params: query
  });
};

/**
 * Cancel user authorization role
 */
export const authUserCancel = (data: any) => {
  return request({
    url: '/portShip/shippinglineRole/authUser/cancel',
    method: 'put',
    data: data
  });
};

/**
 * Cancel user authorization roles in batches
 */
export const authUserCancelAll = (data: any) => {
  return request({
    url: '/portShip/shippinglineRole/authUser/cancelAll',
    method: 'put',
    params: data
  });
};

/**
 * Authorized user to choose
 */
export const authUserSelectAll = (data: any) => {
  return request({
    url: '/portShip/shippinglineRole/authUser/selectAll',
    method: 'put',
    params: data
  });
};
// Query the department tree structure according to the role ID
export const deptTreeSelect = (roleId: string | number): AxiosPromise<RoleDeptTree> => {
  return request({
    url: '/portShip/shippinglineRole/deptTree/' + roleId,
    method: 'get'
  });
};
