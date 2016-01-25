package com.scsvision.gis.core.controller;

import com.scsvision.gis.core.utils.StringUtils;

/**
 * 
 * MapController
 * 
 * @author zhuanqi
 *         <p />
 *         Create at 2013 10:25:23 AM
 */
public class MapController extends BaseController {

	public void index() {
		String gisIp = getPara("gisIp");
		String gisPort = getPara("gisPort");
		String centerIp = getPara("centerIp");
		String centerPort = getPara("centerPort");
		String type = getPara("type");
		if (StringUtils.isBlank(gisIp) || StringUtils.isBlank(gisPort)
				|| StringUtils.isBlank(centerIp)
				|| StringUtils.isBlank(centerPort) || StringUtils.isBlank(type)) {
			render("error.jsp");
		} else {
			// 设置全局WFS请求地址
			BaseController.WFS_URL = "http://" + gisIp + ":" + gisPort
					+ "/geoserver/wfs";
			if ("wms".equals(type)) {
				redirect("/map/wms", true);
			} else if ("image".equals(type)) {
				redirect("/map/image", true);
			} else {
				render("error.jsp");
			}
		}
	}

	public void image() {
		String gisIp = getPara("gisIp");
		String gisPort = getPara("gisPort");
		String centerIp = getPara("centerIp");
		String centerPort = getPara("centerPort");
		if (StringUtils.isBlank(gisIp) || StringUtils.isBlank(gisPort)
				|| StringUtils.isBlank(centerIp)
				|| StringUtils.isBlank(centerPort)) {
			render("error.jsp");
		} else {
			// 设置全局WFS请求地址
			BaseController.WFS_URL = "http://" + gisIp + ":" + gisPort
					+ "/geoserver/wfs";
			setAttr("gisIp", gisIp);
			setAttr("gisPort", gisPort);
			setAttr("centerIp", centerIp);
			setAttr("centerPort", centerPort);
			Integer length = getParaToInt("length", Integer.valueOf(760));
			if (length.intValue() < 760) {
				length = Integer.valueOf(760);
			} else if (length.intValue() <= 2000) {
				length = Integer.valueOf(1500);
			} else if (length.intValue() <= 3000) {
				length = Integer.valueOf(2500);
			} else if (length.intValue() <= 4000) {
				length = Integer.valueOf(3500);
			} else {
				length = Integer.valueOf(4500);
			}

			setAttr("length", length);
			render("image.jsp");
		}
	}

	public void wms() {
		String gisIp = getPara("gisIp");
		String gisPort = getPara("gisPort");
		String centerIp = getPara("centerIp");
		String centerPort = getPara("centerPort");
		if (StringUtils.isBlank(gisIp) || StringUtils.isBlank(gisPort)
				|| StringUtils.isBlank(centerIp)
				|| StringUtils.isBlank(centerPort)) {
			render("error.jsp");
		} else {
			// 设置全局WFS请求地址
			BaseController.WFS_URL = "http://" + gisIp + ":" + gisPort
					+ "/geoserver/wfs";
			setAttr("gisIp", gisIp);
			setAttr("gisPort", gisPort);
			setAttr("centerIp", centerIp);
			setAttr("centerPort", centerPort);
			render("wms.jsp");
		}
	}
}
