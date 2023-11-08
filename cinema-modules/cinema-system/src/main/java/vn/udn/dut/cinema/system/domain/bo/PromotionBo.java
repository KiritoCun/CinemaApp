package vn.udn.dut.cinema.system.domain.bo;

import java.util.Date;

import io.github.linpeilie.annotations.AutoMapper;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import vn.udn.dut.cinema.common.core.validate.AddGroup;
import vn.udn.dut.cinema.common.core.validate.EditGroup;
import vn.udn.dut.cinema.system.domain.Promotion;

/**
 * Promotion business object promotion
 *
 * @author HoaLD
 * @date 2023-11-07
 */
@Data
@AutoMapper(target = Promotion.class, reverseConvertGenerate = false)
public class PromotionBo {

	/**
	 * Promotion id
	 */
	@NotNull(message = "Id cannot be empty", groups = { EditGroup.class })
	private Long id;

	/**
	 * 
	 */
	@NotBlank(message = "Title cannot be empty", groups = { AddGroup.class, EditGroup.class })
	private String title;

	/**
	 * 
	 */
	@NotBlank(message = "Promotion description cannot be empty", groups = { AddGroup.class, EditGroup.class })
	private String promotionDescription;

	/**
	 * 
	 */
	private Long discount;

	/**
	 * 
	 */
	@NotNull(message = "From date can be null", groups = { EditGroup.class })
	private Date fromDate;

	/**
	 * 
	 */
	@NotNull(message = "To date can be null", groups = { EditGroup.class })
	private Date toDate;

}
