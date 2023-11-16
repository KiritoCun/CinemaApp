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
import vn.udn.dut.cinema.system.domain.bo.PromotionBo;
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

	@GetMapping("/documents")
	public R<Map<String, Object>> getDocuments() {
		Map<String, Object> result = new HashMap<String, Object>();
		PromotionBo bo = new PromotionBo();
		result.put("promotions", promotionService.queryList(bo));
		return R.ok(result);
	}
}
