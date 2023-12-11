package vn.udn.dut.cinema.port.domain.bo;

import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.udn.dut.cinema.common.tenant.core.TenantEntity;
import vn.udn.dut.cinema.port.domain.HallSeat;

@Data
@EqualsAndHashCode(callSuper = true)
@AutoMapper(target = HallSeat.class, reverseConvertGenerate = false)
public class HallSeatBo extends TenantEntity {

	private static final long serialVersionUID = -2323039814896662171L;

	private Long id;

	private Long hallId;

	private String rowCode;

	private Integer columnCode;
}
