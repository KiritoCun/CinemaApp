package vn.udn.dut.cinema.system.domain.bo;

import io.github.linpeilie.annotations.AutoMapper;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.udn.dut.cinema.common.core.validate.EditGroup;
import vn.udn.dut.cinema.common.tenant.core.TenantEntity;
import vn.udn.dut.cinema.system.domain.Slide;

@Data
@EqualsAndHashCode(callSuper = true)
@AutoMapper(target = Slide.class, reverseConvertGenerate = false)
public class SlideBo extends TenantEntity {
    private static final long serialVersionUID = -2323039814896662171L;

    @NotNull(message = "Id cannot be empty", groups = { EditGroup.class })
    private Long id;

    private String slideUrl;
    private String remark;
}
