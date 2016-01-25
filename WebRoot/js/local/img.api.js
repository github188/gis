/**
 * C#客户端调用WebGis客户端函数接口
 * 首字母大写，与本地函数区分
 */

/**
 * APIFunction:设置地图是否可编辑
 */
function EditorEnable(isEnable){
	if(isEnable){
		editorEnable = true;
		onoffControl(true);
	}else{
		editorEnable = false;
		onoffControl(false);
	}
	return editorEnable;
}

/**
 * APIFcuntion:初始化设备标注点
 * msg:设备列表json
 */
function InitialMarkers(msg){
	var markerObjs = evalStr(msg.toString());	
	$.each(markerObjs,function(index,node){	
		var marker = getFeature(node.x,node.y,node.type,node);
		if(Device.checkType(node.type)){
			VectorMap.get(node.type).addFeatures(marker);
		}
	});
} 

/**
 * APIFunction:添加标注点
 * msg:设备信息
 */
function AddMarker(msg){
	
	//添加标注点到地图上
	var markerObj = evalStr(msg.toString());
	var marker = getFeature(markerObj.x,markerObj.y,markerObj.type,markerObj);
	VectorMap.get(markerObj.type).addFeatures(marker);
	//返回标注点信息
	var lonlat = marker.geometry.getBounds().getCenterLonLat();
	markerObj.x = lonlat.lon;
	markerObj.y = lonlat.lat;
	var markerStr = JSON.stringify(markerObj); 
	return markerStr;
}

/**
 * APIFunction:删除标注点
 * sn:设备编号
 * type：设备类型
 */
function DeleteMarker(sn,type){
	for(i=0; i < VectorMap.get(type).features.length; i++){
		var msgStr = VectorMap.get(type).features[i].msg;
		var obj = evalStr(msgStr);
		if(sn == obj.sn && type == obj.type){
			VectorMap.get(type).removeFeatures(VectorMap.get(type).features[i]);
		}
	}
}

/**
 * APIFunction:清除所有标注点
 */
function DeleteAllMarkers(type){
	if(type){
		VectorMap.get(type).removeAllFeatures();
	}
}

/**
 * APIFunction:保存标注点
 */
function SaveMarkers(){
	editorEnable = false;
	var ary = new Array(); 
	var vectorArr = VectorMap.values();
	for(var i=0; i < vectorArr.length; i++){
		for(var j=0;j < vectorArr[i].features.length; j++){
			var feature = vectorArr[i].features[j];
			var msgStr = feature.msg;
			var obj= evalStr(msgStr);
			var lonlat = feature.geometry.getBounds().getCenterLonLat();
			obj.x = lonlat.lon;
			obj.y = lonlat.lat;
			ary.push(obj);
		}
	}
	var arystr = JSON.stringify(ary); 
	return arystr;
}

/**
 * APIFunction:根据设备编号及类型获取设备信息
 * sn:设备编号
 * type:设备类型
 */
function GetMarkerBySn(sn,type){
	var objStr = null;
	var vector = VectorMap.get(type);
	for(var i=0; i < vector.features.length; i++){
		var feature = vector.features[i];
		var msgStr = feature.msg;
		var obj= evalStr(msgStr);
		if(sn == obj.sn && type == obj.type){
			var lonlat = feature.geometry.getBounds().getCenterLonLat();
			obj.x = lonlat.lon;
			obj.y = lonlat.lat;
			objStr = JSON.stringify(obj); 
			break;				
		}
	}
	return objStr;
}

/**
 * APIFunction:获取当前视窗内的标注点
 * type:设备类型
 */
function GetMarkersInViewPort(type){
	var ary = new Array();
	if(type){
		var vector = VectorMap.get(type);
		for (var i = 0; i < vector.features.length; i++) { 
			var feature = vector.features[i];
	    	if (feature.geometry.getBounds().intersectsBounds(map.getExtent())) { 
				var msgStr = feature.msg;
				var obj = evalStr(msgStr);
				var lonlat = feature.geometry.getBounds().getCenterLonLat();
				obj.x = lonlat.lon;
				obj.y = lonlat.lat;
				ary.push(obj);
	    	} 
		}
		var arystr = JSON.stringify(ary); 
		return arystr;
	}else{
		return null;
	}
}

/**
 * APIFunction:设置标注点居中
 * sn:设备编号
 * type:设备类型
 */
function GotoMarker(sn,type){
	var vector = VectorMap.get(type);
	for(i=0; i < vector.features.length; i++){
		var msgstr = vector.features[i].msg;
		var obj = evalStr(msgstr);							
		if(sn == obj.sn && type == obj.type){		
			var lonlat =  vector.features[i].geometry.getBounds().getCenterLonLat();
			var point = new OpenLayers.LonLat(lonlat.lon, lonlat.lat);
			map.setCenter(lonlat.lon, lonlat.lat);
		}
	}
}
/**
 * APIFunction:坐标转换
 * screenX:屏幕X轴坐标
 * screenY:屏幕Y轴坐标
 * mapX:经度
 * mapY:维度
 * constants:0 经纬度转屏幕像素坐标,1 屏幕像素坐标转经纬度
 */
function ConvertCoordinate(screenX,screenY,mapX,mapY,constants){
	if(constants == 0){//经纬度转屏幕坐标
		var lonLat = new OpenLayers.LonLat(mapX, mapY);
		var pixel = map.getViewPortPxFromLonLat(lonLat);
		return (pixel.x + ":" + pixel.y);
	}else{//屏幕坐标转经纬度
		var pixel = new OpenLayers.Pixel(screenX,screenY);
		var lonLat = map.getLonLatFromViewPortPx(pixel);
		return (lonLat.lon + ":" + lonLat.lat);
	}
}

/**
 * APIFunction:图层切换
 * type:设备类型
 * isShow:true 显示;false 隐藏
 */
function LayerToggle(type,isShow){
	showLayer(type,isShow);
}

/**
 * APIFunction：获取图层显示状态
 */
function GetLayerDisplayStatus(type){
	return VectorMap.get(type).getVisibility();
}

/**
 * APIFunction:获取最后选择的Feature
 */
function GetLastSelectFeature(){
	if(lastFeature){
		var msgStr = JSON.stringify(lastFeature.msg);
		return msgStr;
	}else{
		return null;
	}
}

/**
 * APIFunction：选中标注点
 * type:设备类型
 * sn:设备编号
 */
function SelectFeatureByComparing(type,sn){
	var vector = VectorMap.get(type);
	if(vector){
		for (var i = 0; i < vector.features.length; i++) { 
			var feature = vector.features[i];
			var msgStr = feature.msg;
			var obj= evalStr(msgStr);
			if(sn == obj.sn && type == obj.type){
				selectControl.select(feature);	
				break;		
			}
		}
	}
} 

/**
 * APIFunction：获取地图支持设备图层类型
 */
function GetMapSupportType(){
	var array = VectorMap.keys();
	var msgStr = JSON.stringify(array);
	return msgStr;
}

/**
 * function:获取标注点对象
 * type:设备类型
 * sn:设备编号
 */
function GetFeatureBySn(type,sn){
	var vector = VectorMap.get(type);
	if(vector){
		for (var i = 0; i < vector.features.length; i++) { 
			var feature = vector.features[i];
			var msgStr = feature.msg;
			var obj= evalStr(msgStr);
			if(sn == obj.sn && type == obj.type){
				return feature;
			}
		}
	}else{
		return null;
	}
}

/**
 * APIFunction：刷新标注点状态
 * msg:设备信息
 * defaultIcon:未选中时使用的图标名称
 * selectIcon:选中时使用的图标名称
 */
function RefreshFeature(msg){
	var obj = evalStr(msg);
	var feature = GetFeatureBySn(obj.type,obj.sn);
	if(feature){
		feature.attributes.defaultIcon = obj.defaultIcon;
		feature.attributes.selectIcon = obj.selectIcon;
		feature.attributes.arg1 = obj.arg1;
		feature.attributes.arg2 = obj.arg2;
		feature.attributes.arg3 = obj.arg3;
		if (obj.color) {
			feature.attributes.favColor = obj.color;
		}
		feature.layer.drawFeature(feature, 'default'); 
	}
}