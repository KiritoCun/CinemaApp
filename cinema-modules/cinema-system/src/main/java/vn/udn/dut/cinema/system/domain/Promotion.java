package vn.udn.dut.cinema.system.domain;

import java.util.Date;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import lombok.Data;

/**
 * Promotion object promotion
 *
 * @author HoaLD
 * @date 2023-11-07
 */
@Data
@TableName("promotion")
public class Promotion {

	/**
	 * Promotion id
	 */
	@TableId(value = "id")
	private Long id;

	/**
	 * 
	 */
	private String title;

	/**
	 * 
	 */
	private String promotionDescription;

	/**
	 * 
	 */
	private Long discount;

	/**
	 * 
	 */
	private Date fromDate;

	/**
	 * 
	 */
	private Date toDate;
}
