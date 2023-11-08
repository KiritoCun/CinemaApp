import request from '@/utils/request';
import { PostpaidCustomerQuery, PostpaidCustomerVO } from './types';
import { AxiosPromise } from 'axios';

// Query the list of online users
export function list(query: PostpaidCustomerQuery): AxiosPromise<PostpaidCustomerVO[]> {
  return request({
    url: '/tmsCategory/postpaidCustomer',
    method: 'get',
    params: query
  });
}
