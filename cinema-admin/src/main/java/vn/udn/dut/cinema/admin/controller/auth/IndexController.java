package vn.udn.dut.cinema.admin.controller.auth;

import cn.dev33.satoken.annotation.SaIgnore;
import lombok.RequiredArgsConstructor;
import vn.udn.dut.cinema.common.core.config.CinemaConfig;
import vn.udn.dut.cinema.common.core.utils.StringUtils;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Front page
 *
 * @author HoaLD
 */
@SaIgnore
@RequiredArgsConstructor
@RestController
public class IndexController {

    /**
     * System basic configuration
     */
    private final CinemaConfig cinemaConfig;

    /**
     * Visit home page, prompt
     */
    @GetMapping("/")
    public String index() {
        return StringUtils.format("Welcome to {} Eport Vict Admin, current version: v{}, please visit through the front-end address.", cinemaConfig.getName(), cinemaConfig.getVersion());
    }
}
