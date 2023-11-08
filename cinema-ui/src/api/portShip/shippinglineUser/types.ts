import { DeptVO } from '@/api/system/dept/types';
import { RoleVO } from '@/api/portShip/shippinglineRole/types';
import { ShippinglineVO } from '@/api/portShip/shippinglineList/types';

/**
 * User Info
 */
export interface UserInfo {
  user: UserVO;
  roles: string[];
  permissions: string[];
}

/**
 * User Query Object Type
 */
export interface UserQuery extends PageQuery {
  userName?: string;
  phonenumber?: string;
  status?: string;
  deptId?: string | number;
  roleId?: string | number;
  operatorName?: string;
}

/**
 * user return object
 */
export interface UserVO extends BaseEntity {
  userId: string | number;
  deptId: number;
  userName: string;
  nickName: string;
  userType: string;
  email: string;
  phonenumber: string;
  sex: string;
  avatar: string;
  status: string;
  delFlag: string;
  loginIp: string;
  loginDate: string;
  remark: string;
  dept: DeptVO;
  roles: RoleVO[];
  roleIds: any;
  postIds: any;
  roleId: any;
  admin: boolean;
  deptName: string;
  operatorCode: string;
  operatorName: string;
}

/**
 * user form type
 */
export interface UserForm {
  id?: string;
  userId?: string;
  deptId?: number;
  userName: string;
  nickName?: string;
  password: string;
  phonenumber?: string;
  email?: string;
  sex?: string;
  status: string;
  remark?: string;
  roleIds: string[];
  oprList: string;
  shippinglineOprs: string[];
  shippinglineId?: number;
}

export interface UserInfoVO {
  user: UserVO;
  roles: RoleVO[];
  roleIds: string[];
  roleGroup: string;
  shippinglines: ShippinglineVO[];
}

export interface ResetPwdForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
