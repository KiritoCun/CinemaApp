package vn.udn.dut.cinema.customer.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import cn.dev33.satoken.annotation.SaIgnore;
import cn.hutool.core.util.ObjectUtil;
import lombok.RequiredArgsConstructor;
import vn.udn.dut.cinema.common.core.config.CinemaConfig;
import vn.udn.dut.cinema.common.core.domain.R;
import vn.udn.dut.cinema.common.core.domain.model.LoginUser;
import vn.udn.dut.cinema.common.core.utils.StringUtils;
import vn.udn.dut.cinema.common.satoken.utils.LoginHelper;
import vn.udn.dut.cinema.common.tenant.helper.TenantHelper;
import vn.udn.dut.cinema.system.constant.SystemConstants;
import vn.udn.dut.cinema.system.domain.SysMenu;
import vn.udn.dut.cinema.system.domain.vo.RouterVo;
import vn.udn.dut.cinema.system.domain.vo.SysDictDataVo;
import vn.udn.dut.cinema.system.domain.vo.SysUserVo;
import vn.udn.dut.cinema.system.domain.vo.UserInfoVo;
import vn.udn.dut.cinema.system.service.ISysDictTypeService;
import vn.udn.dut.cinema.system.service.ISysMenuService;
import vn.udn.dut.cinema.system.service.ISysUserService;

/**
 * Front page
 *
 * @author HoaLD
 */
@SaIgnore
@RequiredArgsConstructor
@RestController
public class IndexController {

	private final ISysUserService userService;
	private final ISysMenuService menuService;
	private final ISysDictTypeService dictTypeService;

	/**
	 * System basic configuration
	 */
	private final CinemaConfig cinemaConfig;

	/**
	 * Visit home page, prompt
	 */
	@GetMapping("/")
	public String index() {
		return StringUtils.format(
				"Welcome to {} Cinema Customer, current version: v{}, please visit through the front-end address.",
				cinemaConfig.getName(), cinemaConfig.getVersion());
	}

	/**
	 * Get user information
	 *
	 * @return User Info
	 */
	@GetMapping("/system/user/getInfo")
	public R<UserInfoVo> getInfo() {
		UserInfoVo userInfoVo = new UserInfoVo();
		LoginUser loginUser = LoginHelper.getLoginUser();
		if (TenantHelper.isEnable() && LoginHelper.isSuperAdmin()) {
			// Super administrators need to clear dynamic tenants if user information is
			// reloaded
			TenantHelper.clearDynamic();
		}
		SysUserVo user = userService.selectUserById(loginUser.getUserId());
		userInfoVo.setUser(user);
		userInfoVo.setPermissions(loginUser.getMenuPermission());
		userInfoVo.setRoles(loginUser.getRolePermission());
		return R.ok(userInfoVo);
	}

	/**
	 * Get routing information
	 *
	 * @return routing information
	 */
	@GetMapping("/system/menu/getRouters")
	public R<List<RouterVo>> getRouters() {
		List<SysMenu> menus = menuService.selectMenuTreeByUserId(LoginHelper.getUserId(),
				SystemConstants.SYSTEM_TYPE_LOGISTICS);
		return R.ok(menuService.buildMenus(menus));
	}

	/**
	 * Query dictionary data information according to dictionary type
	 *
	 * @param dictType dictionary type
	 */
	@GetMapping(value = "/system/dict/data/type/{dictType}")
	public R<List<SysDictDataVo>> dictType(@PathVariable String dictType) {
		List<SysDictDataVo> data = dictTypeService.selectDictDataByType(dictType);
		if (ObjectUtil.isNull(data)) {
			data = new ArrayList<>();
		}
		return R.ok(data);
	}

}
