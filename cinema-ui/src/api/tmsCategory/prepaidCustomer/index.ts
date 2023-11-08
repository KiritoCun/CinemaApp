import request from '@/utils/request';
import { PrepaidCustomerQuery, PrepaidCustomerVO } from './types';
import { AxiosPromise } from 'axios';

// Query the list of online users
export function list(query: PrepaidCustomerQuery): AxiosPromise<PrepaidCustomerVO[]> {
  return request({
    url: '/tmsCategory/prepaidCustomer',
    method: 'get',
    params: query
  });
}
