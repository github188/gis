<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
    <title>智能视讯应急指挥调度系统</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="GIS,智能,监控">
	<meta http-equiv="description" content="GIS">
	
	<link rel="stylesheet" href="${pageContext.request.contextPath}/js/OpenLayers/theme/default/style.css" type="text/css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css" type="text/css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/legend/style.css" type="text/css">
    <style>
		/* General settings */
	    body {
	        font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
	        font-size: small;
	        margin: 0px;
	        padding: 0px;
	        border:1px solid #44978d"
	    }
    </style>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/image.boot.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			img_init();
			window.setTimeout(function(){
				_Loaded();
			},100);
		});
	</script>
</head>
	<body oncontextmenu="return false;" style="width:760px;height:376px;overflow:hidden">
		<input type="hidden" id="contextPath" name="contextPath" value="${pageContext.request.contextPath}"/>
		<input type="hidden" id="length" name="length" value="${length}">
		<input type="hidden" id="gisIp" name="gisIp" value="${gisIp}">
  		<input type="hidden" id="gisPort" name="gisPort" value="${gisPort}">
  		<input type="hidden" id="centerIp" name="centerIp" value="${centerIp}">
  		<input type="hidden" id="centerPort" name="centerPort" value="${centerPort}">
		<div id="map" class="olMap">
		</div>
	</body>
</html>