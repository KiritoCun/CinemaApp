import request from '@/utils/request';
import { BerthQuery, BerthVO } from './types';
import { AxiosPromise } from 'axios';

// Query the list of online users
export function list(query: BerthQuery): AxiosPromise<BerthVO[]> {
  return request({
    url: '/tmsCategory/berth',
    method: 'get',
    params: query
  });
}
