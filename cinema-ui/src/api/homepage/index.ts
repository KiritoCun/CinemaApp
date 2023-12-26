import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MovieVO } from '@/api/portCustomer/movieManagement/types';
import { PromotionVO } from '@/api/portCustomer/promotionManagement/types';
import { Booking } from '@/api/homepage/type';

export const getDocuments = (): AxiosPromise<any> => {
  return request({
    url: '/homepage/search/documents',
    headers: {
      isToken: false
    },
    method: 'get'
  });
};

export const getPromotions = (): AxiosPromise<PromotionVO[]> => {
  return request({
    url: '/homepage/search/promotions',
    headers: {
      isToken: false
    },
    method: 'get'
  });
};

export const getNowplayingmovies = (): AxiosPromise<MovieVO[]> => {
  return request({
    url: '/homepage/search/nowplayingmovies',
    headers: {
      isToken: false
    },
    method: 'get'
  });
};

export const getUpcommingmovies = (): AxiosPromise<MovieVO[]> => {
  return request({
    url: '/homepage/search/upcommingmovies',
    headers: {
      isToken: false
    },
    method: 'get'
  });
};

export const getShowtimeInfos = (movieId? : string | number): AxiosPromise<any[]> => {
  return request({
    url: '/homepage/search/showtimeInfoList/' + movieId,
    headers: {
      isToken: false
    },
    method: 'get'
  });
};

export const getSeatOrders = (showtimeId? : string | number): AxiosPromise<any[]> => {
  return request({
    url: '/homepage/search/showtime/seatOrderList/' + showtimeId,
    headers: {
      isToken: false
    },
    method: 'get'
  });
};

/**
 *
 */
export const getVnpayUrl = (booking: Booking) => {
  return request({
    url: '/booking/vnpay/url',
    method: 'post'
  });
};
