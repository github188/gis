package com.scsvision.gis.core.controller;

import com.jfinal.core.Controller;

/**
 * 
 * BaseController
 * @author zhuanqi <p />
 * Create at 2013 10:24:30 AM
 */
public class BaseController extends Controller{
	// WFS代理中转请求地址
	public static String WFS_URL = "http://127.0.0.1:8080/geoserver/wfs";
}
