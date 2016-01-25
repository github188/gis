package com.scsvision.gis.core.interceptor;

import com.jfinal.aop.Interceptor;
import com.jfinal.core.ActionInvocation;

/**
 * 
 * @类功能说明：Controller层异常捕获
 * @作者：zaq
 * @创建时间：Apr 18, 2013 4:30:40 PM
 * @版本：V1.0
 */
public class ControllerExceptionInterceptor implements Interceptor {
	
	public void intercept(ActionInvocation ai) {
		try {
			ai.invoke();
		} catch (Throwable e) {
			e.printStackTrace();
			ai.getController().renderError(500, "error.html");
		}
	}
}
