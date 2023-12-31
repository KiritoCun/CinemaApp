package vn.udn.dut.cinema.port.service.impl;

import java.util.Collection;
import java.util.List;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import lombok.RequiredArgsConstructor;
import vn.udn.dut.cinema.common.core.utils.MapstructUtils;
import vn.udn.dut.cinema.common.mybatis.core.page.PageQuery;
import vn.udn.dut.cinema.common.mybatis.core.page.TableDataInfo;
import vn.udn.dut.cinema.port.domain.Booking;
import vn.udn.dut.cinema.port.domain.bo.BookingBo;
import vn.udn.dut.cinema.port.domain.vo.BookingVo;
import vn.udn.dut.cinema.port.mapper.BookingMapper;
import vn.udn.dut.cinema.port.service.IBookingService;

/**
 * BookingService business layer processing
 *
 * @author HoaLD
 * @date 2023-08-23
 */
@RequiredArgsConstructor
@Service
public class BookingServiceImpl implements IBookingService {

	private final BookingMapper baseMapper;

	/**
	 * Query Booking
	 */
	@Override
	public BookingVo queryById(Long id) {
		return baseMapper.selectVoById(id);
	}

	/**
	 * Query Booking list
	 */
	@Override
	public TableDataInfo<BookingVo> queryPageList(BookingBo bo, PageQuery pageQuery) {
		LambdaQueryWrapper<Booking> lqw = buildQueryWrapper(bo);
		Page<BookingVo> result = baseMapper.selectVoPage(pageQuery.build(), lqw);
		return TableDataInfo.build(result);
	}

	/**
	 * Query Booking list
	 */
	@Override
	public List<BookingVo> queryList(BookingBo bo) {
		LambdaQueryWrapper<Booking> lqw = buildQueryWrapper(bo);
		return baseMapper.selectVoList(lqw);
	}

	private LambdaQueryWrapper<Booking> buildQueryWrapper(BookingBo bo) {
//        Map<String, Object> params = bo.getParams();
		LambdaQueryWrapper<Booking> lqw = Wrappers.lambdaQuery();
		lqw.eq(bo.getCinemaId() != null, Booking::getCinemaId, bo.getCinemaId());
		lqw.eq(bo.getCustomerId() != null, Booking::getCustomerId, bo.getCustomerId());
		lqw.eq(bo.getPromotionId() != null, Booking::getPromotionId, bo.getPromotionId());
		lqw.eq(bo.getShowtimeId() != null, Booking::getShowtimeId, bo.getShowtimeId());
		lqw.orderByDesc(Booking::getCreateTime);
		return lqw;
	}

	/**
	 * Add Booking
	 */
	@Override
	public Boolean insertByBo(BookingBo bo) {
		Booking add = MapstructUtils.convert(bo, Booking.class);
		validEntityBeforeSave(add);
		boolean flag = baseMapper.insert(add) > 0;
		if (flag) {
			bo.setId(add.getId());
		}
		return flag;
	}

	/**
	 * Edit Booking
	 */
	@Override
	public Boolean updateByBo(BookingBo bo) {
		Booking update = MapstructUtils.convert(bo, Booking.class);
		validEntityBeforeSave(update);
		return baseMapper.updateById(update) > 0;
	}

	/**
	 * Data verification before saving
	 */
	private void validEntityBeforeSave(Booking entity) {
		// TODO Do some data validation, such as unique constraints
	}

	/**
	 * Batch delete Booking
	 */
	@Override
	public Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid) {
		if (isValid) {
			// TODO Do some business verification to determine whether verification is
			// required
		}
		return baseMapper.deleteBatchIds(ids) > 0;
	}
}
