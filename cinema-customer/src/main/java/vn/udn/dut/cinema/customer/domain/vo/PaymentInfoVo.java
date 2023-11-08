package vn.udn.dut.cinema.customer.domain.vo;

import lombok.Data;

@Data
public class PaymentInfoVo {
	
	private Long shipmentId;
	
	private String serviceType;
	
	private String orderInfo;
	
	private Long amount;
	
	private String transactionId;
}
