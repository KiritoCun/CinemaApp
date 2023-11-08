export interface PrepaidCustomerQuery {
  taxCode: string;
  fullName: string;
  address: string;
  pageNum: number;
  pageSize: number;
}

export interface PrepaidCustomerVO extends BaseEntity {
  taxCode: string;
  fullName: string;
  address: string;
}
