import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MenuQuery, MenuVO, MenuForm, MenuTreeOption, RoleMenuTree } from './types';

// Query menu list
export const listMenu = (query?: MenuQuery): AxiosPromise<MenuVO[]> => {
  return request({
    url: '/portShip/shippinglineMenu/list',
    method: 'get',
    params: query
  });
};

// Query menu details
export const getMenu = (menuId: string | number): AxiosPromise<MenuVO> => {
  return request({
    url: '/portShip/shippinglineMenu/' + menuId,
    method: 'get'
  });
};

// Query menu drop-down tree structure
export const treeselect = (): AxiosPromise<MenuTreeOption[]> => {
  return request({
    url: '/portShip/shippinglineMenu/treeselect',
    method: 'get'
  });
};

// Query the menu drop-down tree structure according to the role ID
export const roleMenuTreeselect = (roleId: string | number): AxiosPromise<RoleMenuTree> => {
  return request({
    url: '/portShip/shippinglineMenu/roleMenuTreeselect/' + roleId,
    method: 'get'
  });
};

// Query the menu drop-down tree structure according to the role ID
export const tenantPackageMenuTreeselect = (packageId: string | number): AxiosPromise<RoleMenuTree> => {
  return request({
    url: '/portShip/shippinglineMenu/tenantPackageMenuTreeselect/' + packageId,
    method: 'get'
  });
};

// new menu
export const addMenu = (data: MenuForm) => {
  return request({
    url: '/portShip/shippinglineMenu',
    method: 'post',
    data: data
  });
};

// edit menu
export const updateMenu = (data: MenuForm) => {
  return request({
    url: '/portShip/shippinglineMenu',
    method: 'put',
    data: data
  });
};

// delete menu
export const delMenu = (menuId: string | number) => {
  return request({
    url: '/portShip/shippinglineMenu/' + menuId,
    method: 'delete'
  });
};
