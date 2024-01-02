import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MovieVO } from '@/api/portCustomer/movieManagement/types';
import { PromotionVO } from '@/api/portCustomer/promotionManagement/types';
import { InvoiceInfoVO } from '@/api/homepage/type';

export const getDocuments = (): AxiosPromise<any> => {
  return request({
    url: 'https://eb13-2001-ee0-4b4e-3a10-d9bc-9de-3bba-e8b4.ngrok-free.app/dev-api/customer/homepage/search/documents',
    headers: {
      isToken: false,
      'ngrok-skip-browser-warning': 'any'
    },
    method: 'get'
  });
};

export const getPromotions = (): AxiosPromise<PromotionVO[]> => {
  return request({
    // url: '/homepage/search/promotions',
    url: 'https://eb13-2001-ee0-4b4e-3a10-d9bc-9de-3bba-e8b4.ngrok-free.app/dev-api/customer/homepage/search/promotions',
    headers: {
      isToken: false,
      'ngrok-skip-browser-warning': 'any'
    },
    method: 'get'
  });
};

export const getNowplayingmovies = (): AxiosPromise<MovieVO[]> => {
  return request({
    // url: '/homepage/search/nowplayingmovies',
    url: 'https://eb13-2001-ee0-4b4e-3a10-d9bc-9de-3bba-e8b4.ngrok-free.app/dev-api/customer/homepage/search/nowplayingmovies',
    headers: {
      isToken: false,
      'ngrok-skip-browser-warning': 'any'
    },
    method: 'get'
  });
};

export const getUpcommingmovies = (): AxiosPromise<MovieVO[]> => {
  return request({
    url: 'https://eb13-2001-ee0-4b4e-3a10-d9bc-9de-3bba-e8b4.ngrok-free.app/dev-api/customer/homepage/search/upcommingmovies',
    headers: {
      isToken: false,
      'ngrok-skip-browser-warning': 'any'
    },
    method: 'get'
  });
};

export const getShowtimeInfos = (movieId?: string | number): AxiosPromise<any[]> => {
  return request({
    url: 'https://eb13-2001-ee0-4b4e-3a10-d9bc-9de-3bba-e8b4.ngrok-free.app/dev-api/customer/homepage/search/showtimeInfoList/' + movieId,
    headers: {
      isToken: false,
      'ngrok-skip-browser-warning': 'any'
    },
    method: 'get'
  });
};

export const getSeatOrders = (showtimeId?: string | number): AxiosPromise<any[]> => {
  return request({
    // url: '/homepage/search/showtime/seatOrderList/' + showtimeId,
    url: 'https://eb13-2001-ee0-4b4e-3a10-d9bc-9de-3bba-e8b4.ngrok-free.app/dev-api/customer/homepage/search/showtime/seatOrderList/' + showtimeId,
    headers: {
      isToken: false,
      'ngrok-skip-browser-warning': 'any'
    },
    method: 'get'
  });
};

/**
 *
 */
export const getVnpayUrl = (seatId: string | number | (string | number)[], promotionId: string | number) => {
  return request({
    url: 'https://eb13-2001-ee0-4b4e-3a10-d9bc-9de-3bba-e8b4.ngrok-free.app/dev-api/customer/booking/vnpay/url/' + seatId + '/' + promotionId,
    headers: {
      isToken: false,
      'ngrok-skip-browser-warning': 'any'
    },
    method: 'get'
  });
};

/**
 *
 */
export const handleBookingTicket = (transactionId: string) => {
  return request({
    url: 'https://eb13-2001-ee0-4b4e-3a10-d9bc-9de-3bba-e8b4.ngrok-free.app/dev-api/customer/booking/' + transactionId,
    headers: {
      isToken: false,
      'ngrok-skip-browser-warning': 'any'
    },
    method: 'get'
  });
};
