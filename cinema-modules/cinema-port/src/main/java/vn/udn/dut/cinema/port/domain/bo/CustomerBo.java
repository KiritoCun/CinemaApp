package vn.udn.dut.cinema.port.domain.bo;

import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.udn.dut.cinema.common.tenant.core.TenantEntity;
import vn.udn.dut.cinema.port.domain.Customer;

/**
 * Customer business object
 *
 * @author HoaLD
 * @date 2023-11-07
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AutoMapper(target = Customer.class, reverseConvertGenerate = false)
public class CustomerBo extends TenantEntity {

	private static final long serialVersionUID = -2323039814896662171L;

	/**
	 * User ID
	 */
	private Long userId;

	private String userName;

	private String nickName;

	private String customerType;

	private String email;

	private String phonenumber;

	private String sex;

	private Long avatar;

	private String password;

	private String status;

	private String remark;
}
