package vn.udn.dut.cinema.publicapi.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import vn.udn.dut.cinema.common.core.domain.R;
import vn.udn.dut.cinema.common.web.core.BaseController;
import vn.udn.dut.cinema.system.domain.bo.MovieBo;
import vn.udn.dut.cinema.system.domain.bo.PromotionBo;
import vn.udn.dut.cinema.system.service.IMovieService;
import vn.udn.dut.cinema.system.service.IPromotionService;

/**
 * Homepage api
 *
 * @author HOALD
 * @date 2023-11-11
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/homepage/search")
public class HomepageSearchController extends BaseController {

	private final IPromotionService promotionService;
	private final IMovieService movieService;

	@GetMapping("/documents")
	public R<Map<String, Object>> getDocuments() {
		Map<String, Object> result = new HashMap<String, Object>();
		PromotionBo bo1 = new PromotionBo();
		result.put("promotions", promotionService.queryList(bo1));
		MovieBo bo2 = new MovieBo();
		result.put("movies", movieService.queryList(bo2));
		return R.ok(result);
	}
}
