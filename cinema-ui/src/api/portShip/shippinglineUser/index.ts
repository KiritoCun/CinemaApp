import { DeptVO } from '@/api/system/dept/types';
import { RoleVO } from '@/api/portShip/shippinglineRole/types';
import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { UserForm, UserQuery, UserVO, UserInfoVO } from './types';
import { parseStrEmpty } from '@/utils/eportvict';

/**
 * Query user list
 * @param query
 */
export function listUser(query: UserQuery): AxiosPromise<UserVO[]> {
  return request({
    url: '/portShip/shippinglineUser/list',
    method: 'get',
    params: query
  });
}

/**
 * Get user details
 * @param userId
 */
export function getUser(userId?: string | number): AxiosPromise<UserInfoVO> {
  return request({
    url: '/portShip/shippinglineUser/' + parseStrEmpty(userId),
    method: 'get'
  });
}

/**
 * New users
 */
export function addUser(data: UserForm) {
  return request({
    url: '/portShip/shippinglineUser',
    method: 'post',
    data: data
  });
}

/**
 * modify user
 */
export function updateUser(data: UserForm) {
  if (data.phonenumber?.includes('*')) {
    data.phonenumber = undefined;
  }
  if (data.email?.includes('*')) {
    data.email = undefined;
  }
  return request({
    url: '/portShip/shippinglineUser',
    method: 'put',
    data: data
  });
}

/**
 * delete users
 * @param userId User ID
 */
export function delUser(userId: Array<string | number> | string | number) {
  return request({
    url: '/portShip/shippinglineUser/' + userId,
    method: 'delete'
  });
}

/**
 * User password reset
 * @param userId User ID
 * @param password password
 */
export function resetUserPwd(userId: string | number, password: string) {
  const data = {
    userId,
    password
  };
  return request({
    url: '/portShip/shippinglineUser/resetPwd',
    method: 'put',
    data: data
  });
}

/**
 * User Status Modification
 * @param userId User ID
 * @param status user status
 */
export function changeUserStatus(userId: number | string, status: string) {
  const data = {
    userId,
    status
  };
  return request({
    url: '/portShip/shippinglineUser/changeStatus',
    method: 'put',
    data: data
  });
}

/**
 * Query user personal information
 */
export function getUserProfile(): AxiosPromise<UserInfoVO> {
  return request({
    url: '/portShip/shippinglineUser/profile',
    method: 'get'
  });
}

/**
 * Modify user personal information
 * @param data User Info
 */
export function updateUserProfile(data: UserForm) {
  return request({
    url: '/portShip/shippinglineUser/profile',
    method: 'put',
    data: data
  });
}

/**
 * User password reset
 * @param oldPassword Old Password
 * @param newPassword New Password
 */
export function updateUserPwd(oldPassword: string, newPassword: string) {
  const data = {
    oldPassword,
    newPassword
  };
  return request({
    url: '/portShip/shippinglineUser/profile/updatePwd',
    method: 'put',
    params: data
  });
}

/**
 * User Avatar Upload
 * @param data avatar file
 */
export function uploadAvatar(data: FormData) {
  return request({
    url: '/portShip/shippinglineUser/profile/avatar',
    method: 'post',
    data: data
  });
}

/**
 * Query authorized roles
 * @param userId User ID
 */
export function getAuthRole(userId: string | number): AxiosPromise<{ user: UserVO; roles: RoleVO[] }> {
  return request({
    url: '/portShip/shippinglineUser/authRole/' + userId,
    method: 'get'
  });
}

/**
 * Save authorization roles
 * @param data User ID
 */
export function updateAuthRole(data: { userId: string; roleIds: string }) {
  return request({
    url: '/portShip/shippinglineUser/authRole',
    method: 'put',
    params: data
  });
}

/**
 * Query the department drop-down tree structure
 */
export function deptTreeSelect(): AxiosPromise<DeptVO[]> {
  return request({
    url: '/portShip/shippinglineUser/deptTree',
    method: 'get'
  });
}
