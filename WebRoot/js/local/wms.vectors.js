/* 阴影 Zindex*/
var SHADOW_Z_INDEX = 10;
/* 标注 Zindex */
var MARKER_Z_INDEX = 11;
/* Vector Map */
var VectorMap = new Map();
/* 存储已设置为显示的图层状态 */
var layerShowArr = new Map();
/* 最后选中标注点 */
var lastFeature;
/* Drag controls */
var DrawControls = new Map();
/* Select Controls */
var selectControl;

var vehicleRoads=new Array();

/**
 * function：设置默认图层的样式 defaultName:默认状态标注展示的图片名称 selectName:选中时标注展示的图片名称
 */
function createStyleMap(pointRadius) {
	var basePath = contextPath + "/img/map/";
	var backgroundGraphic = contextPath + "/img/feature_shadow.png";
	var myStyles = new OpenLayers.StyleMap({
		"default" : new OpenLayers.Style({
			externalGraphic : basePath + '${normalImage}',
			backgroundGraphic : backgroundGraphic,
			backgroundXOffset : 0,
			backgroundYOffset : -11,
			graphicZIndex : MARKER_Z_INDEX,
			backgroundGraphicZIndex : SHADOW_Z_INDEX,
			graphicWidth : 19,
			graphicHeight : 24
		},{context:styleContext}),
		"select" : new OpenLayers.Style({
			externalGraphic : basePath + '${selectedImage}',
			backgroundGraphic : backgroundGraphic,
			backgroundXOffset : 0,
			backgroundYOffset : -13,
			graphicZIndex : MARKER_Z_INDEX,
			backgroundGraphicZIndex : SHADOW_Z_INDEX,
			graphicWidth : 21,
			graphicHeight :28,
			title:'${name}',
			cursor : "pointer"
		},{context:styleContext})
	});
	return myStyles;
}

function createAreaStyleMap() {
	var myStyles = new OpenLayers.StyleMap({
		 "default":new OpenLayers.Style({
			 fillColor:"#FFFF79",
			 strokeColor:"#00a87a",
			 fillOpacity:0.9,
			 strokeWidth:"2"
		 }),
		 "select":new OpenLayers.Style({
			 fillColor:"#FFFF79",
			 strokeColor:"#00a87a",
			 fillOpacity:0.9,
			 strokeWidth:"4",
			 cursor : "pointer"
		 })
	});
	return myStyles;
}


function createStyleMapImprot(pointRadius) {
	var basePath = contextPath + "/img/map/";
	var backgroundGraphic = contextPath + "/img/feature_shadow.png";
	var myStyles = new OpenLayers.StyleMap({
		"default" : new OpenLayers.Style({
			externalGraphic : basePath + '${normalImage}',
			graphicZIndex : MARKER_Z_INDEX,
			graphicWidth : 40,
			graphicHeight : 40
		},{context:styleContext}),
		"select" : new OpenLayers.Style({
			externalGraphic : basePath + '${selectedImage}',
			graphicZIndex : MARKER_Z_INDEX,
			graphicWidth : 40,
			graphicHeight :40,
			title:'${name}',
			cursor : "pointer"
		},{context:styleContext})
	});
	return myStyles;
}

/**
 * 图层样式辅助对象
 */
var styleContext={
		normalImage:function(feature){
			if(feature.msg.type=="2"){
				switch(feature.msg.cameraType){
				case 'video_Ptz': return "marker-Channel-ptz.png";
				case 'video_Camera': return "marker-Channel-camera.png";
				case 'video_PtzCamera': return "marker-Channel-ptzCamera.png";
				default :return "marker-Channel-camera.png";
				}
			}
			
			var str=Device.getCodeType(feature.msg.type);
			return "marker-"+str+".png";
		},
        selectedImage:function(feature){
        	if(feature.msg.type=="2"){
        		switch(feature.msg.cameraType){
				case 'video_Ptz': return "marker-Channel-ptz-hover.png";
				case 'video_Camera': return "marker-Channel-camera-hover.png";
				case 'video_PtzCamera': return "marker-Channel-ptzCamera-hover.png";
				default :return "marker-Channel-camera-hover.png";
				}
			}
			
        	var str=Device.getCodeType(feature.msg.type);
        	//alert(str);
			return "marker-"+str+"-hover.png";
		}
		
		
};

/**
 * function:初始化各类型设备所属的图层
 */
function setVectors() {
	
	
	var commonLayerOptions={
			styleMap : createStyleMap(),
			maxResolution: map.resolutions[3]
	};
	
	var importantLayerOptions={
	  	 styleMap:createStyleMapImprot(),
		 maxResolution: map.resolutions[1]
	};
	// 设备图层
	var deviceVector = new OpenLayers.Layer.Vector("Device",commonLayerOptions);
	map.addLayer(deviceVector);
	VectorMap.put("Device", deviceVector);
	
	// 机构图层
	var organVector = new OpenLayers.Layer.Vector("Organ",importantLayerOptions);
	map.addLayer(organVector);
	VectorMap.put("Organ", organVector);
	
//	// 收费站
//	var tollStationVector = new OpenLayers.Layer.Vector("TollStation", importantLayerOptions);
//	map.addLayer(tollStationVector);
//	VectorMap.put(Device.getTypeCode('TollStation'), tollStationVector);
//	
//	// 隧道
//	var TunnelVector = new OpenLayers.Layer.Vector("Tunnel",importantLayerOptions);
//	map.addLayer(TunnelVector);
//	VectorMap.put(Device.getTypeCode('Tunnel'), TunnelVector);
//	
//	// 桥梁
//	var BridgeVector = new OpenLayers.Layer.Vector("Bridge",importantLayerOptions);
//	map.addLayer(BridgeVector);
//	VectorMap.put(Device.getTypeCode('Bridge'), BridgeVector);
//	
//	// 摄像头
//	var ChannelVector = new OpenLayers.Layer.Vector("Channel",commonLayerOptions);
//	map.addLayer(ChannelVector);
//	VectorMap.put(Device.getTypeCode('Channel'), ChannelVector);
//	
//
//	// 车检器
//	var VehicleDetectorVector = new OpenLayers.Layer.Vector("VehicleDetector", commonLayerOptions);
//	
//	map.addLayer(VehicleDetectorVector);
//	VectorMap.put(Device.getTypeCode('VehicleDetector'), VehicleDetectorVector);
//
//	// 气象检测器
//	var WeatherStatVector = new OpenLayers.Layer.Vector("WeatherStat",commonLayerOptions);
//	map.addLayer(WeatherStatVector);
//	VectorMap.put(Device.getTypeCode('WeatherStat'), WeatherStatVector);
//
//	// 门架式
//	var _InfoBoard = new OpenLayers.Layer.Vector("InfoBoard",commonLayerOptions);
//	map.addLayer(_InfoBoard);
//	VectorMap.put(Device.getTypeCode('InfoBoard'), _InfoBoard);
//	
//	// 立柱式
//	var _TrafficLight = new OpenLayers.Layer.Vector("TrafficLight",commonLayerOptions);
//	map.addLayer(_TrafficLight);
//	VectorMap.put(Device.getTypeCode('TrafficLight'), _TrafficLight);
//	
//	// 悬臂式
//	var _LaneLight = new OpenLayers.Layer.Vector("LaneLight", commonLayerOptions);
//	map.addLayer(_LaneLight);
//	VectorMap.put(Device.getTypeCode('LaneLight'), _LaneLight);	
//	 
//	// 电光诱导标志
//	var InductionSignVector = new OpenLayers.Layer.Vector("InductionSign",commonLayerOptions);
//	map.addLayer(InductionSignVector);
//	VectorMap.put(Device.getTypeCode('InductionSign'), InductionSignVector);
//
//	var storageVector = new OpenLayers.Layer.Vector("Storage",commonLayerOptions);
//	map.addLayer(storageVector);
//	VectorMap.put(Device.getTypeCode('Storage'), storageVector);
//	
//	// 能见度仪
//	var viDetectorVector = new OpenLayers.Layer.Vector("ViDetector",commonLayerOptions);
//	map.addLayer(viDetectorVector);
//	VectorMap.put(Device.getTypeCode('ViDetector'), viDetectorVector);
//	
//	// 路面检测器
//	var roadDetectorVector = new OpenLayers.Layer.Vector("RoadDetector",commonLayerOptions);
//	map.addLayer(roadDetectorVector);
//	VectorMap.put(Device.getTypeCode('RoadDetector'), roadDetectorVector);
//	
//	// 桥面检测器
//	var bridgeDetectorVector = new OpenLayers.Layer.Vector("BridgeDetector",commonLayerOptions);
//	map.addLayer(bridgeDetectorVector);
//	VectorMap.put(Device.getTypeCode('BridgeDetector'), bridgeDetectorVector);
	
	searchVector = new OpenLayers.Layer.Vector("searchVector", {
	   	 styleMap:createSearchMapStyle()
	    });
	map.addLayer(searchVector);
	
	// 添加Control.DragFeature
	createVectorDrag();
	
	
	// 添加Control.SelectFeature
	setFeatureSelect();
	
	// 初始化显示所有设备和机构图层
	for (var type in Device.getSupport()) {
		layerShowArr.put(Device.getSupport()[type], "1");
	}
}

/**
 * function:为图层增加Drag control
 */
function createVectorDrag() {
	var keys = VectorMap.keys();
	for ( var i = 0; i < keys.length; i++) {
		var vector = VectorMap.get(keys[i]);
		if (vector) {
			var Drag = new OpenLayers.Control.DragFeature(vector);
			Drag.onComplete=onDragComplete;
			//Drag.activate();
			map.addControl(Drag);
			
			DrawControls.put(keys[i], Drag);
			Drag.handlers['drag'].stopDown = false;
			Drag.handlers['drag'].stopUp = false;
			Drag.handlers['drag'].stopClick = false;
			Drag.handlers['feature'].stopDown = false;
			Drag.handlers['feature'].stopUp = false;
			Drag.handlers['feature'].stopClick = false;
			
		}
	}
}

/**
 * function:SelectFeature callback
 */
var callbacks = {
	click : function(currentFeature) {
//		if(currentFeature.layer==searchVector){
//			var temp={id:currentFeature.data.fid};
//			if(currentFeature.data.state=="selected"){
//				currentFeature.data.state="normal";
//				temp.state="0";
//			}
//			else {
//				currentFeature.data.state="selected";
//				temp.state="1";
//			}
//			
//			var id=currentFeature.data.gid;
//			currentFeature.msg&&(id||(id=currentFeature.msg.id));
//			currentFeature.msg&&(id||(id=currentFeature.msg.sn));
//			
//			doException(_eventSelectionChanged,id,temp.state );	
//			searchVector.drawFeature(currentFeature);
//			return;
//		}
					
		var feature = currentFeature;		

		if(feature.msg==null){
			
		}
//		else if(feature.msg.type=='100'||feature.msg.type=="124"||feature.msg.type=="121"||feature.msg.type=="110"){
//			var msgStr = JSON.stringify(feature.msg);
//			doException(_Click, msgStr);
//		}			
		else{			
			featurePopup(feature);	
		}
		
		return false;
	},
	onFeatureSelect : function(currentFeature) {
		if(currentFeature.msg==null) return;
		lastFeature = currentFeature;
	},
	onFeatureUnselect : function(currentFeature) {
		if(currentFeature.msg==null) return;
		if (currentFeature.popup) {
		//	map.removePopup(currentFeature.popup);
			currentFeature.popup = null;
		}
		lastFeature = null;
	}
};

/**
 * function: set SelectFeature
 */
function setFeatureSelect() {
	var temp=new Array();
	for(var i in VectorMap.values()){
		temp.push(VectorMap.values()[i]);
	}
			
	temp.push(searchVector);
	selectControl = new OpenLayers.Control.SelectFeature(temp, {
		hover : true,
		multiple : false,
		clickout : true,
		onSelect : callbacks.onFeatureSelect,
		onUnselect : callbacks.onFeatureUnselect,
		clickFeature : callbacks.click
	});
	
	map.addControl(selectControl);
	selectControl.activate();
}

/**
 * function:feature select popup close
 */
function onPopupClose(evt) {
	var feature = this.feature;
	if (feature.layer) { 
		// The feature is not destroyed
		selectControl.unselect(feature);
	} else { 
		// After "moveend" or "refresh" events on POIs layer all features have been destroyed by the Strategy.BBOX
		this.destroy();
	}
}

/**
 * function:feature unselect
 */
function onFeatureUnselect(evt) {
	feature = evt.feature;
	if (feature.popup) {
		popup.feature = null;
		map.removePopup(feature.popup);
		feature.popup.destroy();
		feature.popup = null;
	}
}

function onDragComplete(feature,pix){
	if(feature.msg.type=="10")
	{
	
		moveMarkerOnRoad(feature);
			
	}
}

function createSearchMapStyle() {
	
	var context={
			getImage:function(feature){
				var str="";
				var data=feature.data;
				data.type||(data=feature.msg);
				
				str="search_";
				if(data.type=="200")
				   str+="luzheng";
				else if (data.type=="201")
				   str+="charge";
				else if (data.type=="202")
					   str+="firefighting";
				else if (data.type=="203")
					   str+="hospitoal";
				else if (data.type=="124")
					   str+="storage";
				else if (data.type=="204")
					   str+="trafficPolice";
				else if(data.type=="17")
					   str+="infoBoard";
				
				if(data.state=="selected")
					str+="_selected";
				
				str+=".png";
				
				if(feature.data.type=="center")
					str="event.gif";
				
				return str;
			},
	        getTitle:function(feature){
	   
	        	var data=feature.data;
				data.name||(data=feature.msg);
				
				var str=null;
				if(feature.data!=null)
						str=feature.data.name;
				
				if(!str&&feature.msg)
					str=feature.msg.name;
					
				
				return str;
	        }
	};
	
	var basePath = contextPath + "/img/map/";
	var myStyles = new OpenLayers.StyleMap({
		"default" : new OpenLayers.Style({
			externalGraphic : basePath +  "${getImage}",
			graphicZIndex : MARKER_Z_INDEX,
			pointRadius :20,
			title:"${getTitle}",
			cursor : "pointer"
		},{context: context}),
		"select" : new OpenLayers.Style({
			externalGraphic : basePath +  "${getImage}",
			graphicZIndex : MARKER_Z_INDEX,
			pointRadius : 20,
			title:"${getTitle}",
			cursor : "pointer"
		},{context: context})
	});
	return myStyles;
}


var xiangxiAreaVector;

function initXiangxiArea(){
	
	xiangxiAreaVector = new OpenLayers.Layer.Vector("area",{
		styleMap : createAreaStyleMap()
//		minResolution: map.resolutions[0]
    });
	map.addLayer(xiangxiAreaVector);
		
	xiangXiSelectControl = new OpenLayers.Control.SelectFeature(xiangxiAreaVector, {
		hover : true,
		multiple : false,
		clickout : true,
		clickFeature : function(e){
			var bds= e.geometry.getBounds();
			map.setCenter(bds.getCenterLonLat(),4);
			xiangXiSelectControl.deactivate();
		}
	});
	
	map.addControl(xiangXiSelectControl);
	xiangXiSelectControl.activate();
	
	var gmlParse=new OpenLayers.Format.GML();
	var string=createXiangXiArea();
	var features=gmlParse.read(string);
	if(features&&features.length){
		xiangxiAreaVector.addFeatures(features[0].clone());
	}
	
	return;
}

function removeXiangxiArea() {
	map.removeLayer(xiangxiAreaVector);
}

function addXiangxiArea() {
	map.addLayer(xiangxiAreaVector);
}
