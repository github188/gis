package com.scsvision.gis.core.common;

import java.util.Properties;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.render.ViewType;
import com.scsvision.gis.core.controller.MapController;
import com.scsvision.gis.core.controller.ProxyController;
import com.scsvision.gis.core.interceptor.ControllerExceptionInterceptor;

/**
 * 
 * @类功能说明：JFinal全局配置
 * @作者：zaq
 * @创建时间：Apr 18, 2013 3:25:03 PM
 * @版本：V1.0
 */
public class ContextConfig extends JFinalConfig {
	/**
	 * 配置文件Properties
	 */
	public static Properties conf;

	@Override
	public void configConstant(Constants me) {
		conf = loadPropertyFile("config.properties");
		me.setDevMode(false);
		me.setBaseViewPath("/page");
		me.setViewType(ViewType.JSP);
	}

	@Override
	public void configHandler(Handlers me) {
	}

	@Override
	public void configInterceptor(Interceptors me) {
		me.add(new ControllerExceptionInterceptor());
	}

	@Override
	public void configPlugin(Plugins me) {

	}

	@Override
	public void configRoute(Routes me) {
		// URL映射
		me.add("/map", MapController.class);
		me.add("/wfs", ProxyController.class);
	}

	public void afterJFinalStart() {
		// TaskStarter starter = new TaskStarter();
		// starter.setUserSchedule(new ServerMonitorScheduled());
	}

}
