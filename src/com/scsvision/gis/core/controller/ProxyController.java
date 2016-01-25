package com.scsvision.gis.core.controller;

import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.SimpleHttpConnectionManager;
import org.apache.commons.httpclient.methods.InputStreamRequestEntity;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.commons.httpclient.params.HttpClientParams;

import com.scsvision.gis.core.common.ContextConfig;

/**
 * JS跨域请求代理
 * 
 * @author huangbuji
 *         <p />
 *         Create at 2014-4-22 上午10:49:47
 */
public class ProxyController extends BaseController {
	public void index() throws Exception {
		// 获取js请求信息
		HttpServletRequest request = getRequest();
		String method = request.getMethod();
		String contentType = request.getContentType();
		int contentLength = request.getContentLength();
		InputStream in = request.getInputStream();

		// 发起HTTP请求
		HttpClient client = new HttpClient(new HttpClientParams(),
				new SimpleHttpConnectionManager(true));
		// POST方法
		if ("POST".equals(method)) {
			PostMethod postMethod = new PostMethod(BaseController.WFS_URL);
			RequestEntity entity;
			if (contentLength >= 0) {
				entity = new InputStreamRequestEntity(in, contentLength,
						contentType);
			} else {
				entity = new InputStreamRequestEntity(in, contentType);
			}
			postMethod.setRequestEntity(entity);
			client.executeMethod(postMethod);

			Header[] headers = postMethod.getResponseHeaders();
			InputStream answer = postMethod.getResponseBodyAsStream();

			HttpServletResponse response = getResponse();
			for (Header header : headers) {
				response.setHeader(header.getName(), header.getValue());
			}
			byte[] buffer = new byte[4096];
			int count = 0;
			while ((count = answer.read(buffer)) > 0) {
				response.getOutputStream().write(buffer, 0, count);
			}
			response.getOutputStream().flush();
//			response.getOutputStream().close();
			postMethod.releaseConnection();
		}
		renderNull();
	}
}
