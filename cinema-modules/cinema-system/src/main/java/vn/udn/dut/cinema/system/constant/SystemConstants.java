package vn.udn.dut.cinema.system.constant;

/**
 * System Constant Information
 *
 * @author HoaLD
 */
public interface SystemConstants {

    /**
     * System type
     */
	public static final String SYSTEM_TYPE_SYSTEM = "system";
	public static final String SYSTEM_TYPE_LOGISTICS = "logistics";
	public static final String SYSTEM_TYPE_SHIPPING_LINE = "shippingline";
	
	/**
	 * Default dept id for logistics and shipping line user
	 */
	public static final Long SYSTEM_DEFAULT_DEPT_ID = 100L;
	
	/**
	 * Notice type
	 */
	public static final String NOTICE_TYPE_ALL = "4";
	public static final String NOTICE_TYPE_VICT = "3";
	public static final String NOTICE_TYPE_SHIPPINGLINE = "2";
	public static final String NOTICE_TYPE_LOGISTICS = "1";
	
	/**
	 * Notice status
	 */
	public static final String NOTICE_STATUS_ENABLE = "0";
	public static final String NOTICE_STATUS_DISABLE = "1";
	
	/**
	 * Document type
	 */
	public static final String DOCUMENT_TYPE_GUIDE = "guide";
	public static final String DOCUMENT_TYPE_VIDEO = "video";
	public static final String DOCUMENT_TYPE_DOCUMENT = "document";
	
	/**
	 * Document status
	 */
	public static final String DOCUMENT_STATUS_ENABLE = "0";
	public static final String DOCUMENT_STATUS_DISABLE = "1";
 }