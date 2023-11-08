import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { JobVO, JobForm, JobQuery } from '@/api/robot/job/types';

/**
 * Query Robot job data table list
 * @param query
 * @returns {*}
 */

export const listJob = (query?: JobQuery): AxiosPromise<JobVO[]> => {
  return request({
    url: '/robot/job/list',
    method: 'get',
    params: query
  });
};

/**
 * Query detail of Robot job data table
 * @param jobId
 */
export const getJob = (jobId: string | number): AxiosPromise<JobVO> => {
  return request({
    url: '/robot/job/' + jobId,
    method: 'get'
  });
};

/**
 * Add Robot job data table
 * @param data
 */
export const addJob = (data: JobForm) => {
  return request({
    url: '/robot/job',
    method: 'post',
    data: data
  });
};

/**
 * Edit Robot job data table
 * @param data
 */
export const updateJob = (data: JobForm) => {
  return request({
    url: '/robot/job',
    method: 'put',
    data: data
  });
};

/**
 * Delete Robot job data table
 * @param jobId
 */
export const delJob = (jobId: string | number | Array<string | number>) => {
  return request({
    url: '/robot/job/' + jobId,
    method: 'delete'
  });
};
