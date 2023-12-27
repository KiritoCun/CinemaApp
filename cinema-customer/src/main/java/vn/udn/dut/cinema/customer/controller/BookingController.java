package vn.udn.dut.cinema.customer.controller;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import vn.udn.dut.cinema.common.core.domain.R;
import vn.udn.dut.cinema.common.core.utils.StringUtils;
import vn.udn.dut.cinema.customer.service.VnpayPaymentService;
import vn.udn.dut.cinema.port.domain.bo.BookingBo;
import vn.udn.dut.cinema.port.domain.bo.BookingDetailBo;
import vn.udn.dut.cinema.port.domain.bo.SeatBo;
import vn.udn.dut.cinema.port.domain.bo.VnpHistoryBo;
import vn.udn.dut.cinema.port.domain.vo.PromotionVo;
import vn.udn.dut.cinema.port.domain.vo.SeatVo;
import vn.udn.dut.cinema.port.domain.vo.ShowtimeVo;
import vn.udn.dut.cinema.port.domain.vo.VnpHistoryVo;
import vn.udn.dut.cinema.port.service.IBookingDetailService;
import vn.udn.dut.cinema.port.service.IBookingService;
import vn.udn.dut.cinema.port.service.IPromotionService;
import vn.udn.dut.cinema.port.service.ISeatService;
import vn.udn.dut.cinema.port.service.IShowtimeService;
import vn.udn.dut.cinema.port.service.IVnpHistoryService;

/**
 * Booking controller
 *
 * @author HoaLD
 */
@Slf4j
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/booking")
public class BookingController {

	private final VnpayPaymentService vnpayService;
	private final ISeatService seatService;
	private final IPromotionService promotionService;
	private final IVnpHistoryService vnpHistoryService;
	private final IBookingService bookingService;
	private final IBookingDetailService bookingDetailService;
	private final IShowtimeService showtimeService;

	/**
	 * Payment info
	 */
	@GetMapping("/vnpay/url/{seatIds}/{promotionId}")
	public R<String> getVnpayUrl(@PathVariable Long[] seatIds, @PathVariable Long promotionId) {
		String seatIdsStr = StringUtils.join(seatIds, ',');
		List<SeatVo> seats = seatService.queryByIds(seatIds);
		PromotionVo promotion = null;
		if (promotionId != null && promotionId != 0) {
			promotion = promotionService.queryById(promotionId);
		}
		String url = "";
		try {
			vnpayService.validBeforePayment(seats);
		} catch (Exception e) {
			return R.warn(e.getMessage());
		}
		try {
			for (SeatVo seat : seats) {
				SeatBo seatUpdate = new SeatBo();
				seatUpdate.setId(seat.getId());
				seatUpdate.setStatus("P");
				Date currentDate = new Date();
				// Tạo đối tượng Calendar và thiết lập thời gian hiện tại
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(currentDate);
				// Thêm 30 giây vào thời gian hiện tại
				calendar.add(Calendar.SECOND, 30);
				// Lấy thời gian sau khi thêm 30 giây
				Date delayedDate = calendar.getTime();
				seatUpdate.setUpdateTime(delayedDate);
				seatService.updateByBo(seatUpdate);
			}
			url = vnpayService.getPaymentUrl(seats, seatIdsStr, promotion);
		} catch (Exception e) {
			log.error("EXCEPTION WHEN GET VNPAY URL: {}", e);
			return R.warn("Có lỗi xảy ra khi kết nối đến VNPAY!", url);
		}
		return R.ok("", url);
	}

	/**
	 * Handle payment successfully
	 */
	@GetMapping("/{transactionId}")
	public R<?> handleBookingTicket(@PathVariable String transactionId) {
		VnpHistoryBo vnpHistoryParam = new VnpHistoryBo();
		vnpHistoryParam.setVnpTransactionId(transactionId);
		VnpHistoryVo vnpHistory = vnpHistoryService.queryList(vnpHistoryParam).get(0);
		String seatIdsStr = vnpHistory.getTransactionId();
		String[] seatIds = seatIdsStr.split(",");
		SeatVo seat = seatService.queryById(Long.parseLong(seatIds[0]));
		ShowtimeVo showtime = showtimeService.queryById(seat.getShowtimeId());
		BookingBo booking = new BookingBo();
		booking.setCinemaId(showtime.getCinemaId());
		booking.setCustomerId(vnpHistory.getCreateBy());
		booking.setPaymentFlag("Y");
		booking.setNumTicket((long) seatIds.length);
		if (!"00".equals(transactionId.split("_")[1])) {
			Long promotionId = Long.parseLong(transactionId.split("_")[1]);
			booking.setPromotionId(promotionId);
		}
		booking.setShowtimeId(showtime.getId());
		booking.setTotalPrice(vnpHistory.getAmount());
		bookingService.insertByBo(booking);
		for (String seatIdStr : seatIds) {
			Long seatId = Long.parseLong(seatIdStr);
			BookingDetailBo bookingDetail = new BookingDetailBo();
			bookingDetail.setBookingId(booking.getId());
			bookingDetail.setSeatId(seatId);
			bookingDetail.setCinemaId(showtime.getCinemaId());
			bookingDetailService.insertByBo(bookingDetail);
			SeatBo seatUpdate = new SeatBo();
			seatUpdate.setStatus("Y");
			seatUpdate.setId(seatId);
			seatService.updateByBo(seatUpdate);
		}
		return R.ok();
	}

}
