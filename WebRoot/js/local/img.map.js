/*Map对象*/
var map;
/*全局路径*/
var contextPath;
/*地图编辑开关*/
var editorEnable = false;
/*wms地址*/
var wmsUrl;

/**
 * function:图片地图初始化
 */
function img_init() {
	//全局路径初始化
	contextPath = $("#contextPath").val();
	//隧道长度
	var length = $("#length").val();
	wmsUrl = "http://" + $("#gisIp").val() + ":" + $("#gisPort").val() + "/geoserver/hn_postgis/wms";
	wfsUrl = "http://" + $("#gisIp").val() + ":" + $("#gisPort").val() + "/geoserver/wfs";
	//背景图路径
	var baseImage = contextPath + "/img/tunnel/bg"+length+".png";
	//拖动地图控制
	var naviControl = new OpenLayers.Control.Navigation();
	
	//全局Map对象
	map = new OpenLayers.Map("map",
					{
						controls:[
							naviControl,
            				new OpenLayers.Control.ArgParser(),
            				new OpenLayers.Control.Attribution()
						],
						restrictedExtent : [0,376,length,0]
					}
	);
	
	//拖动地图通知上层中心坐标
	addMapDragListener(naviControl.dragPan, length);
	
	//绑定界限
	var bounds = new OpenLayers.Bounds();
	bounds.extend(new OpenLayers.LonLat(0,0));//left、bottom
	bounds.extend(new OpenLayers.LonLat(length,376));//right、top
	bounds.toBBOX();
	//设置图片参数
	var size = new OpenLayers.Size(length, 376);
	var options = {isBaseLayer:true,singleTile: true , numZoomLevels:1};
	//创建Image Layer
	var graphic = new OpenLayers.Layer.Image("Tunnel", baseImage, bounds, size, options);
	
	//
	graphic.events.on({loadstart:function () {
			//console.log("loadstart");
	}, loadend:function () {
			//console.log("loadend");
	}});
	map.addLayer(graphic);
	map.zoomToMaxExtent();
		map.pan=function(a, b, c) {
		c = OpenLayers.Util.applyDefaults(c, {
			animate: !0,
			dragging: !1
		});
			var d = this.getViewPortPxFromLonLat(this.getCachedCenter());
			a = d.add(a, b);
			if (this.dragging || !a.equals(d)) d = this.getLonLatFromViewPortPx(a),
			c.animate ? this.panTo(d) : (this.moveTo(d), this.dragging && (this.dragging = !1, this.events.triggerEvent("moveend")));
	};
	//创建图层
	setVectors();
	
	//alert(3);
	// test
//	testAddCms();
//	testAddCamera();
//	testAddFd();
//	testAddFan();
//	testAddCms6();
//	testAddRd();
//	testAddRail();
//	testAddIs();
var str= '{"arg1":"","favColor":"123","runState":"2","sn":"111111000000000001ff80808147ccc1b40147ccd005930032","standerNum":"111111000000000001","name":"CMSK1500+200","organName":"第二隧道","x":"797","y":"109.5","type":"17","stakeNumber":"K1500+200","defaultIcon":"CMS_2.png","selectIcon":"CMS_2-hover.png","workState":"2","signalState":"2","time":"2014-08-14 09:35:50","facturer":""}';
	
	//AddMarker(str);
}



/**
 * function：组装添加入Vector中的feature
 * lon:经度
 * lat:维度
 * type:设备类型
 * msg:设备信息obj
 */
function getFeature(lon,lat,type,msg){
	if(Device.checkType(type)){
    	var feature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(lon, lat));
    	feature.msg = msg;
    	feature.attributes = 
			{
				defaultIcon: msg.defaultIcon,
				selectIcon: msg.selectIcon,
			align: 'lcb',
			arg1:function(feature){
				var temp="";
			   if(feature.msg.arg1)
			       return feature.msg.arg1;
			   
				return "";
			},
			xOffset: -50,
			yOffset: -10
 		};    	    	
    	
      
      	
      	if(msg.arg2)
    		feature.attributes.favColor=msg.arg2;
      	
      	if(msg.arg3)
    		feature.attributes.arg3=msg.arg3;
    	
    	if(msg.favColor)
    		feature.attributes.favColor=msg.favColor;
    	
    	return feature;
    }else{
    	return null;
    }
}

/**
 * function:根据图层勾选情况控制marker显示或隐藏
 * type:图层类型
 */
function showLayer(type,isShow){
	if(Device.checkType(type) && VectorMap.get(type)) {
		if(typeof(isShow) == "boolean"){
			if(isShow){
				VectorMap.get(type).setVisibility(true);
			}else{
				VectorMap.get(type).setVisibility(false);
			}
		} else if(typeof(isShow) == "string" && isShow == "true"){
			VectorMap.get(type).setVisibility(true);
		} else{
			VectorMap.get(type).setVisibility(false);
		}
	}
}

/**
 * function:激活 control
 * controlKey:control's key
 */
function toggleControl(controlKey) {
	var control = DrawControls.get(controlKey);
	if (control) {
		control.activate();
	} else {
		control.deactivate();
	}
}
/**
 * function：control开关控制
 */
function onoffControl(isEnable){
	var keys = DrawControls.keys();
	if(isEnable){
		for(var i=0; i < keys.length ; i++){
			var control = DrawControls.get(keys[i]);
			if(control){
				control.activate();
			}
		} 
	}else{
		for(var i=0; i < keys.length ; i++){
			var control = DrawControls.get(keys[i]);
			if(control){
				control.deactivate();
			}
		} 
	}
	//control[control.active ? "deactivate" : "activate"]();
}

/**
 * 拖动地图通知上层中心坐标
 * @param dragPan 构建Navigation的dragPan对象
 * @param length 隧道长度
 */
function addMapDragListener(dragPan, length) {
	dragPan.handler.callbacks.done = function() {
		dragPan.panMapDone({documentDrag:dragPan.documentDrag, interval:dragPan.interval});
	    var lonlat = map.getCenter();
	    if (length > 760) {
	    	if (lonlat.lon < length /2) {
	    		var unit = (length/2) / (length/2 - 380);
	    		var ratio = (lonlat.lon - 380) * unit / (length /2) / 2;
	    		doException(_DragZoom(ratio));
	    	}
	    	else if (lonlat.lon == length /2) {
	    		doException(_DragZoom(0.5));
	    	}
	    	else {
	    		var unit = (length/2) / (length/2 - 380);
	    		var ratio = (lonlat.lon - length/2) * unit / (length / 2) /2 + 0.5;
	    		doException(_DragZoom(ratio));
	    	}
	    } else {
	    	doException(_DragZoom(0.5));
	    }
	};
}
