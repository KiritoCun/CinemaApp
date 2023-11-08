import request from '@/utils/request';
import { DbTableQuery, DbTableVO, TableQuery, TableVO, GenTableVO, DbTableForm } from './types';
import { AxiosPromise } from 'axios';

// query generated table data
export const listTable = (query: TableQuery): AxiosPromise<TableVO[]> => {
  return request({
    url: '/tool/gen/list',
    method: 'get',
    params: query
  });
};
// Query the list of db databases
export const listDbTable = (query: DbTableQuery): AxiosPromise<DbTableVO[]> => {
  return request({
    url: '/tool/gen/db/list',
    method: 'get',
    params: query
  });
};

// Query Table Details
export const getGenTable = (tableId: string | number): AxiosPromise<GenTableVO> => {
  return request({
    url: '/tool/gen/' + tableId,
    method: 'get'
  });
};

// Modify code generation information
export const updateGenTable = (data: DbTableForm) => {
  return request({
    url: '/tool/gen',
    method: 'put',
    data: data
  });
};

// import table
export const importTable = (data: { tables: string; dataName: string }) => {
  return request({
    url: '/tool/gen/importTable',
    method: 'post',
    params: data
  });
};

// Preview generated code
export const previewTable = (tableId: string | number) => {
  return request({
    url: '/tool/gen/preview/' + tableId,
    method: 'get'
  });
};

// delete table data
export const delTable = (tableId: string | number | Array<string | number>) => {
  return request({
    url: '/tool/gen/' + tableId,
    method: 'delete'
  });
};

// Generate code (custom path)
export const genCode = (tableId: string | number) => {
  return request({
    url: '/tool/gen/genCode/' + tableId,
    method: 'get'
  });
};

// sync database
export const synchDb = (tableId: string | number) => {
  return request({
    url: '/tool/gen/synchDb/' + tableId,
    method: 'get'
  });
};

// Get the data source name
export const getDataNames = () => {
  return request({
    url: '/tool/gen/getDataNames',
    method: 'get'
  });
};
