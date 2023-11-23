package vn.udn.dut.cinema.system.service.impl;

import java.util.Collection;
import java.util.List;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import lombok.RequiredArgsConstructor;
import vn.udn.dut.cinema.common.core.utils.MapstructUtils;
import vn.udn.dut.cinema.common.core.utils.StringUtils;
import vn.udn.dut.cinema.common.mybatis.core.page.PageQuery;
import vn.udn.dut.cinema.common.mybatis.core.page.TableDataInfo;
import vn.udn.dut.cinema.system.domain.Movie;
import vn.udn.dut.cinema.system.domain.bo.MovieBo;
import vn.udn.dut.cinema.system.domain.vo.MovieVo;
import vn.udn.dut.cinema.system.mapper.MovieMapper;
import vn.udn.dut.cinema.system.service.IMovieService;

/**
 * MovieService business layer processing
 *
 * @author HoaLD
 * @date 2023-08-23
 */
@RequiredArgsConstructor
@Service
public class MovieServiceImpl implements IMovieService {

	private final MovieMapper baseMapper;

	/**
	 * Query Movie
	 */
	@Override
	public MovieVo queryById(Long id) {
		return baseMapper.selectVoById(id);
	}

	/**
	 * Query Movie list
	 */
	@Override
	public TableDataInfo<MovieVo> queryPageList(MovieBo bo, PageQuery pageQuery) {
		LambdaQueryWrapper<Movie> lqw = buildQueryWrapper(bo);
		Page<MovieVo> result = baseMapper.selectVoPage(pageQuery.build(), lqw);
		return TableDataInfo.build(result);
	}

	/**
	 * Query Movie list
	 */
	@Override
	public List<MovieVo> queryList(MovieBo bo) {
		LambdaQueryWrapper<Movie> lqw = buildQueryWrapper(bo);
		return baseMapper.selectVoList(lqw);
	}

	private LambdaQueryWrapper<Movie> buildQueryWrapper(MovieBo bo) {
//        Map<String, Object> params = bo.getParams();
		LambdaQueryWrapper<Movie> lqw = Wrappers.lambdaQuery();
		lqw.eq(StringUtils.isNotBlank(bo.getTitle()), Movie::getTitle, bo.getTitle());
		lqw.like(StringUtils.isNotBlank(bo.getMovieDescription()), Movie::getMovieDescription,
				bo.getMovieDescription());
		return lqw;
	}

	/**
	 * Add Movie
	 */
	@Override
	public Boolean insertByBo(MovieBo bo) {
		Movie add = MapstructUtils.convert(bo, Movie.class);
		validEntityBeforeSave(add);
		boolean flag = baseMapper.insert(add) > 0;
		if (flag) {
			bo.setId(add.getId());
		}
		return flag;
	}

	/**
	 * Edit Movie
	 */
	@Override
	public Boolean updateByBo(MovieBo bo) {
		Movie update = MapstructUtils.convert(bo, Movie.class);
		validEntityBeforeSave(update);
		return baseMapper.updateById(update) > 0;
	}

	/**
	 * Data verification before saving
	 */
	private void validEntityBeforeSave(Movie entity) {
		// TODO Do some data validation, such as unique constraints
	}

	/**
	 * Batch delete Movie
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
