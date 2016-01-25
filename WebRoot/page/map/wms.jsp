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
   		.olControlOverviewMapElement {
			background-color: #737373;
		}
    </style>
   <!--   <script src="http://maps.google.com/maps/api/js?v=3.2&amp;sensor=false"></script>  -->
    <script src="${pageContext.request.contextPath}/js/wms.boot.js"  type="text/javascript"></script>
    <script>OpenLayers.Console = window.console || OpenLayers.Console;</script>
	<script defer="defer" type="text/javascript">
		$(document).ready(function(){
			//gm_init();
			wms_init();
			//AddMarker('{"id":"10000","sn":"10000","x":"112.98870","y":"28.19372","type":"100","defaultIcon":"Tunnel.png","selectIcon":"Tunnel-hover.png"}');
			window.setTimeout(function(){
				doException(_Loaded);
			},100);
		});
	</script>
	
	<script language="javascript">
	<!--
	/*屏蔽F1-F12*/
	function DisableF(){   
	   with (event){   
	     if (event.keyCode==113 || 
	     	 event.keyCode==114 || 
	     	 event.keyCode==115 || 
	     	 event.keyCode==116 || 
	     	 (ctrlKey && keyCode==82) || 
	     	 event.keyCode==117 ||
	     	 event.keyCode==118 || 
	     	 event.keyCode==119 || 
	     	 event.keyCode==120 || 
	     	 event.keyCode==121 || 
	     	 event.keyCode==122 || 
	     	 event.keyCode==123){ 
	       		event.keyCode = 0;   
	       		event.cancelBubble = true;   
	       		return false;   
	     }
	   }   
	}   
	-->
	</script>
  </head>
  
  <body oncontextmenu="return false;" style="overflow:hidden">
  		<input type="hidden" id="contextPath" name="contextPath" value="${pageContext.request.contextPath}"/>
  		<input type="hidden" id="gisIp" name="gisIp" value="${gisIp}">
  		<input type="hidden" id="gisPort" name="gisPort" value="${gisPort}">
  		<input type="hidden" id="centerIp" name="centerIp" value="${centerIp}">
  		<input type="hidden" id="centerPort" name="centerPort" value="${centerPort}">
    	<div id="map" class="olMap">
    		<div class="icon">
				<div class="hide_button">
					<img src="${pageContext.request.contextPath}/css/legend/img/hide_icon.png" style="cursor:pointer" onclick="hiddenIcon();">
				</div>
				<div class="icon_body">
				</div>
			</div>
			<div class="icon_mini" style="display:none">
				<img src="${pageContext.request.contextPath}/css/legend/img/open_icon.png" style="cursor:pointer" onclick="openIcon();">
			</div>
			<!--  
			<div class="top_function_switch" >			 
			   <img id='imgTopVisable' title="隐藏" src="${pageContext.request.contextPath}/css/legend/img/toppanel_visable.png" style="cursor:pointer" onclick="topBtnClick();">
			</div>
			<div id="btnPanel" class="btnPanel">
				<div class="top_function">
					<div id="div_hospital" class="panelSpan">
						<input id="btn_hospital" class="btn_hospital" type="button" onclick="onPanelBtnClick('hospital');" onmouseover="buttonMouseOver(this)" onmouseout="buttonMouseOut(this)" />
					</div>
					<div style="text-align: center;">医院</div>
				</div>
				<div class="top_function">
					<div id="div_trafficPolice" class="panelSpan">
						<input id="btn_trafficPolice" class="btn_trafficPolice" type="button" onclick="onPanelBtnClick('trafficPolice');" onmouseover="buttonMouseOver(this)" onmouseout="buttonMouseOut(this)"/>
					</div>
					<div style="text-align: center;">交警</div>
				</div>
				<div class="top_function">
					<div id="div_fireFighting" class="panelSpan">
						<input id="btn_fireFighting" class="btn_fireFighting" type="button" onclick="onPanelBtnClick('fireFighting');" onmouseover="buttonMouseOver(this)" onmouseout="buttonMouseOut(this)"/>
					</div>
					<div style="text-align: center;">消防</div>
				</div>
				<div class="top_function">
					<div id="div_luZheng" class="panelSpan">
						<input id="btn_luZheng" class="btn_luZheng" type="button" onclick="onPanelBtnClick('luZheng');" onmouseover="buttonMouseOver(this)" onmouseout="buttonMouseOut(this)"/>
					</div>
					<div style="text-align: center;">路政</div>
				</div>
				<div class="top_function">
					<div id="div_infoBoard" class="panelSpan">
						<input id="btn_infoBoard" class="btn_infoBoard" type="button" onclick="onPanelBtnClick('infoBoard');" onmouseover="buttonMouseOver(this)" onmouseout="buttonMouseOut(this)"/>
					</div>
					<div style="text-align: center;">情报板</div>
				</div>
				<div class="top_function">
					<div id="div_tollStation" class="panelSpan">
						<input id="btn_tollStation" class="btn_tollStation" type="button" onclick="onPanelBtnClick('tollStation');" onmouseover="buttonMouseOver(this)" onmouseout="buttonMouseOut(this)"/>
					</div>
					<div style="text-align: center;">收费站</div>
				</div>
				<div class="top_function">
					<div id="div_trafficControl" class="panelSpan">
						<input id="btn_trafficControl" class="btn_trafficControl" type="button" onclick="onPanelBtnClick('trafficControl');" onmouseover="buttonMouseOver(this)" onmouseout="buttonMouseOut(this)"/>
					</div>
					<div style="text-align: center;">交通控制</div>
				</div>
				<div class="top_function">
					<div id="div_resourceScheduling" class="panelSpan">
						<input id="btn_resourceScheduling" class="btn_resourceScheduling" type="button" onclick="onPanelBtnClick('resourceScheduling');" onmouseover="buttonMouseOver(this)" onmouseout="buttonMouseOut(this)"/>
					</div>
					<div style="text-align: center;">资源调度</div>
				</div>
				<div class="top_function">
					<div id="div_msgSend" class="panelSpan">
						<input id="btn_msgSend" class="btn_msgSend" type="button" onclick="onPanelBtnClick('msgSend');" onmouseover="buttonMouseOver(this)" onmouseout="buttonMouseOut(this)"/>
					</div>
					<div style="text-align: center;">短消息</div>
				</div>
				<div class="top_function">
					<div id="div_liuliang" class="panelSpan">
						<input id="btn_liuliang" class="btn_liuliang" type="button" onclick="doException(_transparentNotify('flowStatistical'));" onmouseover="buttonMouseOver(this)" onmouseout="buttonMouseOut(this)"/>
					</div>
					<div style="text-align: center;">流量监控</div>
				</div>
			</div>
			-->

		<!-- 	<span class="flowSpan" onclick="testAddVdMarker();">流量统计</span> -->
			<div class="editeDiv" style="display:none">
			   <img src="${pageContext.request.contextPath}/img/save.png" style="margin-top: 8px; margin-left: 15px; float: left; cursor: pointer;" onclick="saveRequest()">
			   <img src="${pageContext.request.contextPath}/img/consel.png" style="margin-top: 8px; margin-right: 22px; cursor: pointer; " onclick="consleRequest()">
			</div>
    	</div>
  </body>
</html>
