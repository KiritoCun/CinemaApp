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
import vn.udn.dut.cinema.port.domain.HallSeat;
import vn.udn.dut.cinema.port.domain.bo.HallSeatBo;
import vn.udn.dut.cinema.port.domain.vo.HallSeatVo;
import vn.udn.dut.cinema.port.mapper.HallSeatMapper;
import vn.udn.dut.cinema.port.service.IHallSeatService;

/**
 * HallSeatService business layer processing
 *
 * @author HoaLD
 * @date 2023-08-23
 */
@RequiredArgsConstructor
@Service
public class HallSeatServiceImpl implements IHallSeatService {

	private final HallSeatMapper baseMapper;

	/**
	 * Query HallSeat
	 */
	@Override
	public HallSeatVo queryById(Long id) {
		return baseMapper.selectVoById(id);
	}

	/**
	 * Query HallSeat list
	 */
	@Override
	public TableDataInfo<HallSeatVo> queryPageList(HallSeatBo bo, PageQuery pageQuery) {
		LambdaQueryWrapper<HallSeat> lqw = buildQueryWrapper(bo);
		Page<HallSeatVo> result = baseMapper.selectVoPage(pageQuery.build(), lqw);
		return TableDataInfo.build(result);
	}

	/**
	 * Query HallSeat list
	 */
	@Override
	public List<HallSeatVo> queryList(HallSeatBo bo) {
		LambdaQueryWrapper<HallSeat> lqw = buildQueryWrapper(bo);
		return baseMapper.selectVoList(lqw);
	}

	private LambdaQueryWrapper<HallSeat> buildQueryWrapper(HallSeatBo bo) {
//        Map<String, Object> params = bo.getParams();
		LambdaQueryWrapper<HallSeat> lqw = Wrappers.lambdaQuery();
		return lqw;
	}

	/**
	 * Add HallSeat
	 */
	@Override
	public Boolean insertByBo(HallSeatBo bo) {
		HallSeat add = MapstructUtils.convert(bo, HallSeat.class);
		validEntityBeforeSave(add);
		boolean flag = baseMapper.insert(add) > 0;
		if (flag) {
			bo.setId(add.getId());
		}
		return flag;
	}

	/**
	 * Edit HallSeat
	 */
	@Override
	public Boolean updateByBo(HallSeatBo bo) {
		HallSeat update = MapstructUtils.convert(bo, HallSeat.class);
		validEntityBeforeSave(update);
		return baseMapper.updateById(update) > 0;
	}

	/**
	 * Data verification before saving
	 */
	private void validEntityBeforeSave(HallSeat entity) {
		// TODO Do some data validation, such as unique constraints
	}

	/**
	 * Batch delete HallSeat
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
