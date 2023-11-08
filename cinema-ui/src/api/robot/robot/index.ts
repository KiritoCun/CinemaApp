import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { RobotVO, RobotForm, RobotQuery } from '@/api/robot/robot/types';

/**
 * Query Robot information table list
 * @param query
 * @returns {*}
 */

export const listRobot = (query?: RobotQuery): AxiosPromise<RobotVO[]> => {
  return request({
    url: '/robot/robot/list',
    method: 'get',
    params: query
  });
};

/**
 * Query detail of Robot information table
 * @param id
 */
export const getRobot = (id: string | number): AxiosPromise<RobotVO> => {
  return request({
    url: '/robot/robot/' + id,
    method: 'get'
  });
};

/**
 * Add Robot information table
 * @param data
 */
export const addRobot = (data: RobotForm) => {
  return request({
    url: '/robot/robot',
    method: 'post',
    data: data
  });
};

/**
 * Edit Robot information table
 * @param data
 */
export const updateRobot = (data: RobotForm) => {
  return request({
    url: '/robot/robot',
    method: 'put',
    data: data
  });
};

/**
 * Robot lock status Modification
 * @param id Robot ID
 * @param lockFlag Robot lock status
 */
export function changeRobotLockStatus(id: number | string, lockFlag: string) {
  const data = {
    id,
    lockFlag
  };
  return request({
    url: '/robot/robot/changeLockFlag',
    method: 'put',
    data: data
  });
}

/**
 * Delete Robot information table
 * @param id
 */
export const delRobot = (id: string | number | Array<string | number>) => {
  return request({
    url: '/robot/robot/' + id,
    method: 'delete'
  });
};
