package vn.udn.dut.cinema.system.domain.bo;

import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import vn.udn.dut.cinema.system.domain.BookingDetail;

/**
 * Booking detail business object
 *
 * @author HoaLD
 * @date 2023-11-07
 */
@Data
@AutoMapper(target = BookingDetail.class, reverseConvertGenerate = false)
public class BookingDetailBo {

	private String tenantId;

	private Long id;

	private Long cinema_id;

	private Long bookingId;

	private Long seatId;
}
