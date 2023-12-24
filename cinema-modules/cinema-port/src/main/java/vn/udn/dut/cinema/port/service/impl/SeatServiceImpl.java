package vn.udn.dut.cinema.port.service.impl;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import lombok.RequiredArgsConstructor;
import vn.udn.dut.cinema.common.core.utils.MapstructUtils;
import vn.udn.dut.cinema.common.mybatis.core.page.PageQuery;
import vn.udn.dut.cinema.common.mybatis.core.page.TableDataInfo;
import vn.udn.dut.cinema.port.domain.Seat;
import vn.udn.dut.cinema.port.domain.bo.SeatBo;
import vn.udn.dut.cinema.port.domain.vo.SeatVo;
import vn.udn.dut.cinema.port.mapper.SeatMapper;
import vn.udn.dut.cinema.port.service.ISeatService;

/**
 * SeatService business layer processing
 *
 * @author HoaLD
 * @date 2023-08-23
 */
@RequiredArgsConstructor
@Service
public class SeatServiceImpl implements ISeatService {

	private final SeatMapper baseMapper;

	/**
	 * Query Seat
	 */
	@Override
	public SeatVo queryById(Long id) {
		return baseMapper.selectVoById(id);
	}

	/**
	 * Query Seat list
	 */
	@Override
	public TableDataInfo<SeatVo> queryPageList(SeatBo bo, PageQuery pageQuery) {
		Page<SeatVo> page = baseMapper.selectPageSeatList(pageQuery.build(), this.buildQueryWrapper(bo));
		return TableDataInfo.build(page);
	}

	/**
	 * Query Seat list
	 */
	@Override
	public List<SeatVo> queryList(SeatBo bo) {
		return baseMapper.selectSeatList(this.buildQueryWrapper(bo));
	}

	private Wrapper<Seat> buildQueryWrapper(SeatBo bo) {
		QueryWrapper<Seat> wrapper = Wrappers.query();
		wrapper.eq(bo.getShowtimeId() != null, "s.showtime_id", bo.getShowtimeId()).eq(bo.getId() != null, "s.id",
				bo.getId());
		return wrapper;
	}

	/**
	 * Add Seat
	 */
	@Override
	public Boolean insertByBo(SeatBo bo) {
		Seat add = MapstructUtils.convert(bo, Seat.class);
		validEntityBeforeSave(add);
		add.setCreateTime(new Date());
		boolean flag = baseMapper.insert(add) > 0;
		if (flag) {
			bo.setId(add.getId());
		}
		return flag;
	}

	/**
	 * Edit Seat
	 */
	@Override
	public Boolean updateByBo(SeatBo bo) {
		Seat update = MapstructUtils.convert(bo, Seat.class);
		validEntityBeforeSave(update);
		return baseMapper.updateById(update) > 0;
	}

	/**
	 * Data verification before saving
	 */
	private void validEntityBeforeSave(Seat entity) {
		// TODO Do some data validation, such as unique constraints
	}

	/**
	 * Batch delete Seat
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
