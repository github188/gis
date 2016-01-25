package com.scsvision.gis.core.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import org.springframework.util.Assert;

/**
 * 
 * StringUtils
 * @author zhuanqi <p />
 * Create at 2013 下午12:43:07
 */
public class StringUtils {
	
	/**
	 * 默认字符填充位为"0"
	 */
	public static final String FILL_BLANK = "0";
	
	/**
	 * 判断String是否为空 eg "" null --------- true
	 * 
	 * @param src
	 * @return
	 */
	public static boolean isBlank(String src) {
		boolean flag = false;
		if (src == null || "".equals(src) || "null".equals(src)) {
			flag = true;
		}
		return flag;
	}
	
	/**
	 * 字符串数组转换为给定间隔符分隔的字符串
	 * 
	 * @param array 字符串数组
	 * @param interval 间隔符
	 * @return 给定间隔符分隔的字符串
	 * @author huangbuji
	 *         <p />
	 *         Create at 2013-6-18 下午3:09:55
	 */
	public static String array2String(String[] array, String interval) {
		if (null == array || array.length == 0) {
			return "";
		}
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < array.length; i++) {
			sb.append(null == array[i] ? "" : array[i]);
			sb.append(interval);
		}
		return sb.substring(0,sb.length() - interval.length());
	}
	
	/**
	 * 判断字符串是否不为空 和isBlank相反 eg "" null ------------false
	 * 
	 * @param src
	 * @return
	 */
	public static boolean isNotBlank(String src) {
		return !isBlank(src);
	}
	

	public static int parseInt(String s, int def) {
		int i = def;
		try {
			i = Integer.parseInt(s);
		} catch (Exception e) {

		}
		return i;
	}

	public static int parseInt(String s) {
		return parseInt(s, 0);
	}

	public static long parseLong(String s, long def) {
		long i = def;
		try {
			i = Long.parseLong(s);
		} catch (Exception e) {

		}
		return i;
	}

	public static long parseLong(String s) {
		return parseLong(s, 0);
	}

	public static double parseDouble(String s, double def) {
		double d = def;
		try {
			d = Double.parseDouble(s);
		} catch (Exception e) {
		}
		return d;
	}

	public static double parseDouble(String s) {
		return parseDouble(s, 0.0);
	}

	/**
	 * 当输入的字符串为""或者为null的时候返回false
	 * 
	 * @param s
	 * @return
	 */
	public static boolean isNullOrNothing(String s) {
		String in = s;
		if ("".equals(in) || in == null)
			return false;
		return true;
	}

	/**
	 * @description 解析字符串,将以竖线分割的属性名称组装成list
	 * @param string
	 * @return List<String>
	 */
	@SuppressWarnings("unchecked")
	public static List parseVertical(String string) {
		List list = new ArrayList();
		StringTokenizer objTokenizer = new StringTokenizer(string, "|");
		while (objTokenizer.hasMoreTokens()) {
			list.add(objTokenizer.nextToken().trim());
		}
		return list;
	}

	/**
	 * 
	 */
	@SuppressWarnings("unchecked")
	public static Map getAttributes(String attribute) {
		Map attributeMap = new HashMap();
		if (attribute == null || attribute.length() == 0) {
			return attributeMap;
		}
		String strName = null;
		StringTokenizer objTokenizer = new StringTokenizer(attribute, ":");
		while (objTokenizer.hasMoreTokens()) {
			String strToken = objTokenizer.nextToken().trim();
			StringTokenizer objAttributeTokenizer = new StringTokenizer(
					strToken, "=");

			if (objAttributeTokenizer.hasMoreTokens())
				strName = objAttributeTokenizer.nextToken();

			String strExpression = strName;
			if (objAttributeTokenizer.hasMoreTokens())
				strExpression = objAttributeTokenizer.nextToken();

			attributeMap.put(strName, strExpression);
		}
		return attributeMap;
	}

	@SuppressWarnings("unchecked")
	public static String getColWidth(String tableColsWidth, String type, int col, int tablecols) {
		List list = new ArrayList();
		StringTokenizer objTokenizer = new StringTokenizer(tableColsWidth, ",");
		while (objTokenizer.hasMoreTokens()) {
			list.add(objTokenizer.nextToken().trim());
		}
		int i = col % tablecols;
		if (i == 0) {
			i = tablecols;
		}
		if (i > list.size()) {
			return null;
		}

		if (type.equals("thWidth")) {
			objTokenizer = new StringTokenizer((String) list.get(i - 1), ":");
			if (objTokenizer.hasMoreTokens()) {
				String th = objTokenizer.nextToken().trim();
				return th;
			}
			return null;
		}
		if (type.equals("tdWidth")) {
			objTokenizer = new StringTokenizer((String) list.get(i - 1), ":");
			objTokenizer.nextToken();
			return objTokenizer.nextToken().trim();
		}
		return null;
	}

	public static String getDefaultColWidth(String type, int tablecols) {
		if (type.equals("thWidth")) {
			int i = (int) (100 / tablecols * 0.35);
			return i + "%";
		}
		if (type.equals("tdWidth")) {
			int i = (int) (100 / tablecols * 0.65);
			return i + "%";
		}
		return null;
	}
	
	/**
	 * 
	 * 根据传入的数字和返回的字符串长度进行填充。如传入参数为 (22,4) 将返回'0022'
	 * @author zhuanqi <p />
	 * Create at 2013 下午12:43:31
	 * @param number
	 * @param length
	 * @return
	 */
	public static String convertIntToStringFillBlank(int number , int length){
		Assert.isTrue(number>=0 , "数字不能为负数");
		Assert.isTrue( (number+"").length()<=length , "传入的数字位数超过限制");
		String str = number+"";
		StringBuffer sb = new StringBuffer();
		for(int i=0;i<length-str.length();i++){
			sb.append(FILL_BLANK);
		}
		sb.append(str);
		return sb.toString();
	}
	
	/**
	 * 
	 * 将字符串数组拼装为单引号字符串，以逗号分隔,例：传入{"a","b"}，返回 'a','b' 
	 * @author zhuanqi <p />
	 * Create at 2013 下午12:43:52
	 * @param strs
	 * @return
	 */
	public static String convertStringArrayToString(String[] strs){
		Assert.notNull(strs , "数组不能为空");
		StringBuffer sb = new StringBuffer();
		for(int i = 0 ; i<strs.length ; i++){
			sb.append("'");
			sb.append(strs[i]);
			sb.append("'");
			if( i != (strs.length-1) ){
				sb.append(",");
			}
		}
		return sb.toString();
	}
	
	/**
	 * 
	 * 将字符串数组拼装为字符串，以逗号分隔,例：传入{"a","b"}，返回 a,b
	 * @author zhuanqi <p />
	 * Create at 2013 下午12:44:05
	 * @param strs
	 * @return
	 */
	public static String convertStringArrayToStringInteger(String[] strs){
		Assert.notNull(strs , "数组不能为空");
		StringBuffer sb = new StringBuffer();
		for(int i = 0 ; i<strs.length ; i++){
			sb.append(strs[i]);
			if( i != (strs.length-1) ){
				sb.append(",");
			}
		}
		return sb.toString();
	}
	
	/**
	 * 
	 * 将字符串的首字母大写
	 * @author zhuanqi <p />
	 * Create at 2013 下午12:44:19
	 * @param str
	 * @return
	 */
	public static String upperTheFirstLetter(String str){
		return str.substring(0 , 1).toUpperCase() + str.substring(1);
	}

}
