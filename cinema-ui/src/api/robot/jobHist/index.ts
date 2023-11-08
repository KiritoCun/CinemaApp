import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { JobHistVO, JobHistQuery } from '@/api/robot/jobHist/types';

/**
 * Query Robot job history table list
 * @param query
 * @returns {*}
 */

export const listJobHist = (query?: JobHistQuery): AxiosPromise<JobHistVO[]> => {
  return request({
    url: '/robot/jobHist/list',
    method: 'get',
    params: query
  });
};
