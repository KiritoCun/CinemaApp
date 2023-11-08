export interface PostpaidCustomerQuery {
  accountNo: string;
  fullName: string;
  address: string;
  pageNum: number;
  pageSize: number;
}

export interface PostpaidCustomerVO extends BaseEntity {
  accountNo: string;
  fullName: string;
  address: string;
}
