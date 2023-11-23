package vn.udn.dut.cinema.system.domain.vo;

import com.alibaba.excel.annotation.ExcelIgnoreUnannotated;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import vn.udn.dut.cinema.system.domain.Slide;

@Data
@ExcelIgnoreUnannotated
@AutoMapper(target = Slide.class)
public class SlideVo implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private Long id;
    private String slideUrl;
    private String remark;
}
