import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { BillHisToryVO } from './types';
import { CustomerVO } from '../customer/account/types';

export const getUserInfo = (): AxiosPromise<CustomerVO[]> => {
  return request({
    url: 'https://6577fbb8197926adf62f331d.mockapi.io/api/showtime/userInfo',
    method: 'get'
  });
};

export const getBillHistoryInfos = (): AxiosPromise<BillHisToryVO[]> => {
  return request({
    url: 'https://6577fbb8197926adf62f331d.mockapi.io/api/showtime/billHistoryInfo',
    method: 'get'
  });
};

