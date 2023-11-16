package vn.udn.dut.cinema.system.domain.vo;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

import com.alibaba.excel.annotation.ExcelIgnoreUnannotated;

import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import vn.udn.dut.cinema.system.domain.Booking;

/**
 * Booking view object
 *
 * @author HoaLD
 * @date 2023-11-07
 */
@Data
@ExcelIgnoreUnannotated
@AutoMapper(target = Booking.class)
public class BookingVo implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	private String tenantId;

	private Long id;

	private Long cinema_id;

	private Long customerId;

	private Long numTicket;

	private Long promotionId;

	private Long totalPrice;

	private String paymentFlag;

	private Long showtimeId;

	private Date createTime;
}
