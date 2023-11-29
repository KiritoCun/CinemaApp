package vn.udn.dut.cinema.port.domain;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.udn.dut.cinema.common.tenant.core.TenantEntity;

import java.io.Serial;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("slide")
public class Slide extends TenantEntity {
    @Serial
    private static final long serialVersionUID = 1L;
    @TableId(value = "id")
    private Long id;
    private String slideUrl;
    private String remark;
}
