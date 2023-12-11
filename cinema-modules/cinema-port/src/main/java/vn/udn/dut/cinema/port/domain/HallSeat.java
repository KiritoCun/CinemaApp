package vn.udn.dut.cinema.port.domain;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.udn.dut.cinema.common.tenant.core.TenantEntity;

import java.io.Serial;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("hall_seat")
public class HallSeat extends TenantEntity {
    @Serial
    private static final long serialVersionUID = 1L;
    @TableId(value = "id")
    
    private Long id;
    
    private Long hallId;
    
    private String rowCode;
    
    private Integer columnCode;
}
