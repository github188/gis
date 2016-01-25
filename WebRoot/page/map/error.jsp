<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html><head>
		<title>出错啦！</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<style type="text/css">
		BODY {
			FONT-SIZE: 12px;
			FONT-FAMILY: Tahoma
		}
		
		TD {
			FONT-SIZE: 12px;
			FONT-FAMILY: Tahoma
		}
		
		A:link {
			COLOR: #636363;
			TEXT-DECORATION: none
		}
		
		A:visited {
			COLOR: #838383;
			TEXT-DECORATION: none
		}
		
		A:hover {
			COLOR: #a3a3a3;
			TEXT-DECORATION: underline
		}
		
		BODY {
			BACKGROUND-COLOR: #cccccc
		}
		</style>
	</head>
	<body style="TABLE-LAYOUT: fixed; WORD-BREAK: break-all" topmargin="10" marginwidth="10" marginheight="10">
		<table height="95%" cellspacing="0" cellpadding="0" width="100%" align="center" border="0">
			<tbody>
				<tr valign="center" align="middle">
					<td>
						<table cellspacing="0" cellpadding="0" width="468" bgcolor="#ffffff" border="0">
							<tbody>
								<tr>
									<td width="20" background="${pageContext.request.contextPath}/img/error/rbox_1.gif" height="20"></td>
									<td width="108" background="${pageContext.request.contextPath}/img/error/rbox_2.gif" height="20"></td>
									<td width="56">
										<img height="20" src="${pageContext.request.contextPath}/img/error/rbox_ring.gif" width="56">
									</td>
									<td width="100" background="${pageContext.request.contextPath}/img/error/rbox_2.gif"></td>
									<td width="56">
										<img height="20" src="${pageContext.request.contextPath}/img/error/rbox_ring.gif" width="56">
									</td>
									<td width="108" background="${pageContext.request.contextPath}/img/error/rbox_2.gif"></td>
									<td width="20" background="${pageContext.request.contextPath}/img/error/rbox_3.gif" height="20"></td>
								</tr>
								<tr>
									<td align="left" background="${pageContext.request.contextPath}/img/error/rbox_4.gif" rowspan="2"></td>
									<td align="middle" bgcolor="#eeeeee" colspan="5" height="50">
										<p>
											<strong>出错啦！ <br> <br> </strong>
										</p>
									</td>
									<td align="left" background="${pageContext.request.contextPath}/img/error/rbox_6.gif" rowspan="2"></td>
								</tr>
								<tr>
									<td align="left" colspan="5" height="80">
									<p align="center">
            						</p><p id="LID2">请求的页面不存在或地址错误！</p>
            						<ul>
              							<li id="list1">请访问<a href="#">首页</a><br>
              							</li><li id="list3">单击<a href="javascript:history.back(1)">后退</a>按钮，尝试其他链接。 </li></ul>
									</td>
								</tr>
								<tr>
									<td align="left" background="${pageContext.request.contextPath}/img/error/rbox_7.gif" height="20"></td>
									<td align="left" background="${pageContext.request.contextPath}/img/error/rbox_8.gif" colspan="5" height="20"></td>
									<td align="left" background="${pageContext.request.contextPath}/img/error/rbox_9.gif" height="20"></td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
	</body>
</html>