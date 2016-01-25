/**
 * C#客户端调用WebGis客户端函数接口
 * 首字母大写，与本地函数区分
 */

/**
 * @requires wms.map.js
 */
 
/**
 * APIFunction:窗口获取焦点
 */
function SetFocus() {
	window.self.focus();
}
/**
 * APIFunction:客户端初始化地图中心点及缩放级别
 * mapX:经度
 * mapY:维度
 * level:缩放级别
 */
function SetMapCenter(mapX, mapY, level) {
	//alert(mapX+"-"+mapY+"-"+level);
	map.setCenter(new OpenLayers.LonLat(mapX, mapY), level);
}
/**
 * APIFunction:客户端获取地图中心点及缩放级别
 * mapX:经度
 * mapY:维度
 * level:缩放级别
 */
function GetMapCenter() {
	var zoom = map.getZoom();
	var center = map.getCenter();
	var mapCenterObj = {};
	mapCenterObj.lon = center.lon;
	mapCenterObj.lat = center.lat;
	mapCenterObj.zoom = zoom;
	return JSON.stringify(mapCenterObj);
}
/**
 * APIFunction:设置地图是否可编辑
 */
function EditorEnable(isEnable) {
	
	if (isEnable) {
		editorEnable = true;
		onoffControl(true);
	} else {
		editorEnable = false;
		onoffControl(false);
	}
	return editorEnable;
}
/**
 * APIFcuntion:初始化设备标注点
 * msg:设备列表json
 */
function InitialMarkers(msg) {
	var markerObjs = evalStr(msg.toString());
	$.each(markerObjs, function (index, node) {
		var marker = getFeature(node.x, node.y, node.type, node);
		if (Device.checkType(node.type)) {
			VectorMap.get(Device.findLayer(node.type)).addFeatures(marker);
		}
		//vectors.addFeatures(marker);
	});
}
/**
 * APIFunction:添加标注点
 * msg:设备信息及坐标信息
 */
function AddMarker(msg) {
	//添加标注点到地图上
	var markerObj = evalStr(msg.toString());
	
	//if(markerObj.type=="10")
	//{
	//	markerOnRoad(markerObj);
	//	return;
	//}
	var marker = getFeature(markerObj.x, markerObj.y, markerObj.type, markerObj);
	//vectors.addFeatures(marker);
//	markerObj.type||alert(msg);
	VectorMap.get(Device.findLayer(markerObj.type)).addFeatures(marker);
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
function DeleteMarker(sn, type) {
	var layer = VectorMap.get(Device.findLayer(type));
	for (i = 0; i < layer.features.length; i++) {
		var feature = layer.features[i];
		var obj = evalStr(feature.msg);
		if (sn == obj.sn && type == obj.type) {
			//vectors.removeFeatures(vectors.features[i]);
			// 首先移除弹出的定位窗体
			selectControl.unselect(feature);
			layer.removeFeatures(feature);
		}
	}
}
/**
 * APIFunction:清除所有标注点
 */
function DeleteAllMarkers(type) {
	if (type) {
		// 如果最后选中的标注属于移除的类型，首先unselect最后选中的标注
		if (lastFeature && lastFeature.type == type) {
			selectControl.unselect(lastFeature);
		}
		
		var layer = VectorMap.get(Device.findLayer(type));
		for (i = 0; i < layer.features.length; i++) {
			var feature = layer.features[i];
			var obj = evalStr(feature.msg);
			if (type == obj.type) {
				layer.removeFeatures(feature);
			}
		}
	}
}
/**
 * APIFunction:保存标注点
 */
function SaveMarkers() {
	editorEnable = false;
	var ary = new Array();
	var vectorArr = VectorMap.values();
	for (var i = 0; i < vectorArr.length; i++) {
		for (var j = 0; j < vectorArr[i].features.length; j++) {
			var feature = vectorArr[i].features[j];
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
}
/**
 * APIFunction:根据设备编号及类型获取设备信息
 * sn:设备编号
 * type:设备类型
 */
function GetMarkerBySn(sn, type) {
	var objStr = null;
	var vector = VectorMap.get(Device.findLayer(type));
	for (var i = 0; i < vector.features.length; i++) {
		var feature = vector.features[i];
		var obj = feature.msg;
		if (sn == obj.sn && type == obj.type) {
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
function GetMarkersInViewPort(type) {
	var ary = new Array();
	if (type) {
		var vector = VectorMap.get(Device.findLayer(type));
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
	} else {
		return null;
	}
}
/**
 * APIFunction:设置标注点居中
 * sn:设备编号
 * type:设备类型
 */
function GotoMarker(sn, type) {
//	alert(1);
//	var vector = VectorMap.get(Device.findLayer(type));
//	for (i = 0; i < vector.features.length; i++) {
//		var msgstr = vector.features[i].msg;
//		var obj = evalStr(msgstr);
//		if (sn == obj.sn && type == obj.type) {
//			var lonlat = vector.features[i].geometry.getBounds().getCenterLonLat();
//			var point = new OpenLayers.LonLat(lonlat.lon, lonlat.lat);
//			map.setCenter(point);
//		}
//	}
}
/**
 * APIFunction:坐标转换
 * screenX:屏幕X轴坐标
 * screenY:屏幕Y轴坐标
 * mapX:经度
 * mapY:维度
 * constants:0,1
 */
function ConvertCoordinate(screenX, screenY, mapX, mapY, constants) {
	if (constants == 0) {
		//经纬度转屏幕坐标
		var lonLat = new OpenLayers.LonLat(mapX, mapY);
		var pixel = map.getViewPortPxFromLonLat(lonLat);
		return (pixel.x + ":" + pixel.y);
	} else {
		//屏幕坐标转经纬度
		var pixel = new OpenLayers.Pixel(screenX, screenY);
		var lonLat = map.getLonLatFromViewPortPx(pixel);
		return (lonLat.lon + ":" + lonLat.lat);
	}
}
/**
 * APIFunction:图层切换
 * type:设备类型
 * isShow:true 显示;false 隐藏
 */
function LayerToggle(type, isShow) {
	showLayer(type, isShow);
	// 移除定位弹窗
	if (lastFeature) {
		selectControl.unselect(lastFeature);
	}
}
/**
 * APIFunction：获取图层显示状态
 * type:设备类型
 */
function GetLayerDisplayStatus(type) {
	return layerShowArr.get(type) == "1";
}
/**
 * APIFunction:获取最后选择的Feature
 */
function GetLastSelectFeature() {
	if (lastFeature) {
		var msgStr = JSON.stringify(lastFeature.msg);
		return msgStr;
	} else {
		return null;
	}
}
/**
 * APIFunction：选中标注点
 * type:设备类型
 * sn:设备编号
 */
function SelectFeatureByComparing(type, sn) {
	var vector = VectorMap.get(Device.findLayer(type));
	// 如果图层被隐藏，不做任何操作
	var showFlag = layerShowArr.get(type) == "1";
	if (!showFlag) {
		return;
	}
	if (vector) {
		for (var i = 0; i < vector.features.length; i++) {
			var feature = vector.features[i];
			var msgStr = feature.msg;
			var obj = evalStr(msgStr);
			if (sn == obj.sn && type == obj.type) {
				var lonlat = feature.geometry.getBounds().getCenterLonLat();
				var point = new OpenLayers.LonLat(lonlat.lon, lonlat.lat);
				// 如果当前放大程度不够，自动zoom到map.resolutions[3]
				if (map.getZoom() < 3) {
					map.setCenter(point, 3);
				} else {
					map.setCenter(point);
				}
				if (lastFeature) {
					selectControl.unselect(lastFeature);
				}
				
				//select
				selectControl.select(feature);
//				if(feature.msg.type=='100'||feature.msg.type=="124"||feature.msg.type=="121"||feature.msg.type=="110") break;
				
				if(map.getResolution()>map.resolutions[3]){
                  map.zoomTo(map.getZoomForResolution(map.resolutions[3]));
				}
				
				featurePopup(feature);
				break;
			}
		}
	}
}

/**
 * APIFunction：事件定位
 */
function  EventPoint(point){	
	searchVector.removeAllFeatures();
	var p= evalStr(point);
	if(p&&p.x&&p.y){
		SetMapCenter(p.x,p.y);
		var center=new OpenLayers.Geometry.Point(p.x,p.y);
		var centerFeature=new OpenLayers.Feature.Vector(center);
	    centerFeature.data.type="center";
	    centerFeature.msg=p;
	    searchVector.addFeatures(centerFeature);
	}
}

/**
 * APIFunction：获取地图支持设备图层类型
 */
function GetMapSupportType() {
	var array = Device.getSupport();
	var msgStr = JSON.stringify(array);
	return msgStr;
}
/**
 * function:获取标注点对象
 * type:设备类型
 * sn:设备编号
 */
function GetFeatureBySn(type, sn) {
	var vector = VectorMap.get(Device.findLayer(type));
	if (vector) {
		for (var i = 0; i < vector.features.length; i++) {
			var feature = vector.features[i];
			var msgStr = feature.msg;
			var obj = evalStr(msgStr);
			if (sn == obj.sn && type == obj.type) {
				return feature;
			}
		}
	} else {
		return null;
	}
}
/**
 * APIFunction：刷新标注点状态
 * msg:设备信息
 * defaultIcon:未选中时使用的图标名称
 * selectIcon:选中时使用的图标名称
 */
function RefreshFeature(msg) {
	var obj = evalStr(msg);
	var feature = GetFeatureBySn(obj.type, obj.sn);
	if (feature) {
		feature.attributes.defaultIcon = obj.defaultIcon;
		feature.attributes.selectIcon = obj.selectIcon;
		feature.msg = obj;
		feature.layer.drawFeature(feature, "default");
		
		if(map.popups){
			for (var len in map.popups){
				map.popups[len].upDate();
				
			}
		}
	}
}

/**
 * 在指定Feature上弹出一个定位窗体
 * 
 * @param feature
 */
function featurePopup(feature) {
	lastFeature = feature;
	closeAllPopups();

	var content = "名称：" + feature.msg.name + "<br/>";
	content += "桩号：";
	if (typeof feature.msg.stakeNumber !== "undefined") {
		content += feature.msg.stakeNumber;
	}


	 popup = new OpenLayers.Popup.TabPopup("selectPopup", feature);
	 // popup.closeOnMove = false;
	    popup.panMapIfOutOfView = true;
	    popup.keepInMap = false;

	feature.popup = popup;
	map.addPopup(popup, true);
}

function closeAllPopups(){
	if(map.popups){
		while(map.popups.length){
			if( map.popups[0].feature){
				map.popups[0].feature.popup=null;
				map.popups[0].feature=null;
			}
			
			map.popups[0].destroy();
			
		}
	}
}


/**
 * 开始标记路段
 */
function startRoadMark()
{
	selectLayer.removeAllFeatures();
	drawings.removeAllFeatures();
	draw.activate();
}

/**
 * 结束路段标记
 * 返回路段标记信息
 */
function endRoadMark()
{	
	
	draw.deactivate();

	if (drawings.features==null||drawings.features.length==0)
	    return;
	
	var feature=drawings.features[0];
	var points=feature.geometry.components[0].components;
	var pointsToSave=[];
	for (var p in points)
		{
		 var tempP={x:points[p].x,y:points[p].y};
		 pointsToSave[p]=tempP;	
		}
	
	var bounds=feature.geometry.getBounds();
	var lonat=bounds.getCenterLonLat();
	var result={
			data:pointsToSave,
			zoom:map.getZoom(),
			lon:lonat.lon,
			lat:lonat.lat
	};
	
	drawings.removeAllFeatures();	
	return JSON.stringify(result);
	
}

/**
 * 选中路段
 * road 路段信息
 */
function selectRoad(road)
{
	selectLayer.removeAllFeatures();
	
	if (road==null||road.length==0)
		return;
	
	var temp=evalStr(road.toString());
	var points=[];
	
	for(var p in temp.data)
		{
		   var tempPoint=new OpenLayers.Geometry.Point(temp.data[p].x,temp.data[p].y);
		  points[p]=tempPoint;
		}
	var linearRing=new OpenLayers.Geometry.LinearRing(points);
	var geometry=new OpenLayers.Geometry.Polygon([linearRing]);
	getFeatureByWFS(geometry);
	map.setCenter(new OpenLayers.LonLat(temp.lon, temp.lat), temp.zoom);

}

/**
 * 添加路段
 * @param road
 */
function addVehicleRoad(road){
	var roadObj = evalStr(road.toString());
	roadObj.features=null;

	var VehicleDetectorVector=map.getLayersByName('VehicleDetector')[0];
	var vehicleA=vehicleB=null;
	
	for (var i = 0; i < VehicleDetectorVector.features.length; i++) {
		var feature = VehicleDetectorVector.features[i];
		var msgStr = feature.msg;
		var obj = evalStr(msgStr);
		if (obj.sn == roadObj.vehicleA) 
			vehicleA=feature;
		
		if(obj.sn==roadObj.vehicleB)
			vehicleB=feature;
	}
	
	if(vehicleA==null||vehicleB==null)
		return;
	
	roadObj.vehicleA=vehicleA;
	roadObj.vehicleB=vehicleB;
	
	vehicleRoads.push(roadObj);
	getFeatureByVehicle(vehicleA,vehicleB,roadObj);
}

/**
 * 移除路段
 * @param road
 */
function removeVehicleRoad(road){
	for (var i in vehicleRoads){
		if(vehicleRoads[i].sn==road){
			if(vehicleRoads[i].features)
			selectLayer.removeFeatures(vehicleRoads[i].features);
			
			vehicleRoads.splice(i,1);
		}
	}
}

/**
 * 事件搜索
 * @param type （200:路政 201:收费站 202:消防 203:医院）
 * @param r 半径
 * @param point 中心点位置
 */
function eventSearch(type,r,point){  	
	type=="luZheng"&&(type="200");
	type=="tollStation"&&(type="201");
	type=="fireFighting"&&(type="202");
	type=="hospital"&&(type="203");
	type=="trafficPolice"&&(type="204");
	type=="resourceScheduling"&&(type="124");

	point==""||(point=evalStr(point));
	//var p=evalStr(point);
	searchFeatureInCircle(type,r,  point);
}

/**
 * 结束事件搜索
 * return 搜索选中结果
 */
function endEventSearch(){
	var result=[];

	for (var i in searchVector.features){
		if(searchVector.features[i].data==null||searchVector.features[i].data.type==null) continue;
		
		var temp={
			id:searchVector.features[i].data.fid,
			name:searchVector.features[i].data.name
		};
		result.push(temp);
	}
	
	drawings.removeAllFeatures();
	searchVector.removeAllFeatures();
	return JSON.stringify(result);
}

function eventSelectionChanged(id,state){
	for (var i in searchVector.features){
		var data=searchVector.features[i].data;
		data||data.type!=null||(data=searchVector.features[i].msg);
		
		if( data.type==null) continue;
	    var gid=data.gid;
	    gid||(gid=data.sn);
	    if(gid==id){
	         data.state=state?"selected":"normal";
	    	searchVector.drawFeature(searchVector.features[i]);
	    	break;
	    }
	    	
	}
}

/**
 * 填充事件
 * {"id":"1233","x":"121.32","y":"35.2","action":[{"name":"hospital","searchR":"5000","activate":"1"},
 * {"name":"trafficPolice","searchR":"5000","activate":"1"},{"name":"fireFighting","searchR":"5000","activate":"1"},
 * {"name":"luZheng","searchR":"5000","activate":"1"},{"name":"hospital","searchR":"5000","activate":"1"},
 * {"name":"infoBoard","searchR":"5000","activate":"1"},{"name":"tollStation","searchR":"5000","activate":"1"},
 * {"name":"trafficControl","searchR":"5000","activate":"1"},{"name":"resourceScheduling","searchR":"5000","activate":"1"},
 * {"name":"msgSend","searchR":"5000","activate":"1"}]}
 * return 搜索选中结果
 */
function fillEvent(event){
	var obj=event;	
	typeof event=="string"&&( obj= evalStr(event));
	
	if( obj.name){
		setBtnActivate(obj.name,obj.activate,obj);
		return;
	}
	
	for(var i in obj.action){
		obj.action[i].id=obj.id;
		obj.action[i].x=obj.x;
		obj.action[i].y=obj.y;
		
		fillEvent(obj.action[i]);
	}
	
}

function fillSearchMarker(markers){
	var obj=markers;
	if(typeof markers =='string'){
		obj= evalStr(markers.toString());
	}	
		
	if(obj.x){
		obj.sn||(obj.id=obj.sn);
		
		var feature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(obj.x, obj.y));
    	feature.msg = obj;
		searchVector.addFeatures(feature);
		return;
	}
	
   if(	obj.length){
	   for (var i in obj) fillSearchMarker(obj[i]);
   }
}

