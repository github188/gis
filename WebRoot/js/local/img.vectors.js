/* 标注 Zindex*/
var MARKER_Z_INDEX = 11;
/* Vector Map*/  
var VectorMap = new Map(); 
/* Vector Drag Controls*/
var DrawControls = new Map();
/* SelectFeature Controls*/
var selectControl;
/* 最后选中的标注点*/
var lastFeature; 

/**
 * function：设置情报板图层的样式
 */
function createCmsStyleMap(pointRadius){
	var basePath = contextPath + "/img/tunnel/";
 	var myStyles = new OpenLayers.StyleMap({
          	'default':new OpenLayers.Style({
                		externalGraphic: basePath + '${defaultIcon}',
            			graphicZIndex: 10,
            			pointRadius: pointRadius,
            			fillOpacity: 1.0,
                 		pointerEvents: "visiblePainted",
                    	// label with \n linebreaks
                    	label : '${arg1}',
                    	fontColor: '${favColor}',
                    	fontSize: "12px",
                    	fontFamily: "Courier New, monospace",
                    	fontWeight: "bold",
//                    	graphicWidth : 100,
//                    	graphicHeight : 60,
                    	stroke : false,
                    	labelSelect : true
                	}),
			'select':new OpenLayers.Style({
                		externalGraphic: basePath + '${selectIcon}',
            			graphicZIndex: 10,
            			pointRadius: pointRadius,
            			fillOpacity: 1.0,
                 		pointerEvents: "visiblePainted",
                    	// label with \n linebreaks favColor
                    	label : "${arg1}",
                    	fontColor: '${favColor}',
                    	fontSize: "12px",
                    	fontFamily: "Courier New, monospace",
                    	fontWeight: "bold",
                    	cursor: "pointer",
//                    	graphicWidth : 110,
//                    	graphicHeight : 66,
                    	stroke : false,
                    	labelSelect : true
					})
	});
	return myStyles;
}

/**
 * function：设置CoVi等图层样式
 */
function createPanelStyleMap(pointRadius,label){
	var basePath = contextPath + "/img/tunnel/";
 	var myStyles = new OpenLayers.StyleMap({
          	'default':{
                		externalGraphic: basePath + '${defaultIcon}',
            			graphicZIndex: 10,
            			pointRadius: pointRadius,
            			fillOpacity: 0.9,
                 		pointerEvents: "visiblePainted",
                    	// label with \n linebreaks
                    	label : label,
                    	//fontColor: "${favColor}",
                    	fontSize: "12px",
                    	fontFamily: "Courier New, monospace",
                    	fontWeight: "normal",
                    	labelAlign: "${align}",
                    	labelXOffset: "${xOffset}",
                    	labelYOffset: "${yOffset}",
                    	labelSelect : true
                	},
			'select':{
              			externalGraphic: basePath + '${selectIcon}',
            			graphicZIndex: 10,
            			pointRadius: pointRadius,
            			fillOpacity: 0.9,
                 		pointerEvents: "visiblePainted",
                    	// label with \n linebreaks
                    	label : label,
                    	//fontColor: "${favColor}",
                    	fontSize: "12px",
                    	fontFamily: "Courier New, monospace",
                    	fontWeight: "bold",
                    	labelAlign: "${align}",
                    	labelXOffset: "${xOffset}",
                    	labelYOffset: "${yOffset}",
                    	cursor: "pointer",
                    	labelSelect : true
					}
	});
	return myStyles;
}

/**
 * function：创建手动报警按钮
 */
function createStyleMapWH(w,h){
	var basePath = contextPath + "/img/tunnel/";
 	var myStyles = new OpenLayers.StyleMap({
                "default": new OpenLayers.Style({
                	externalGraphic: basePath + '${defaultIcon}',
            		graphicZIndex: MARKER_Z_INDEX,
            		graphicWidth : w,
        			graphicHeight : h
                }),
                "select": new OpenLayers.Style({
                    externalGraphic: basePath + '${selectIcon}',
					cursor: "pointer"						
                })
	});
	return myStyles;
}

/**
 * function：设置默认样式
 */
function createStyleMap(pointRadius){
	var basePath = contextPath + "/img/tunnel/";
 	var myStyles = new OpenLayers.StyleMap({
                "default": new OpenLayers.Style({
                	externalGraphic: basePath + '${defaultIcon}',
            		graphicZIndex: MARKER_Z_INDEX,
            		pointRadius: pointRadius
                }),
                "select": new OpenLayers.Style({
                    externalGraphic: basePath + '${selectIcon}',
					graphicZIndex: MARKER_Z_INDEX,
					pointRadius: pointRadius,
					cursor: "pointer"
                })
	});
	return myStyles;
}



/**
 * function:创建图层
 */
function setVectors(){
	//门架式可变信息标志
	var _1CMSVector = new OpenLayers.Layer.Vector("InfoBoard",{styleMap: createCmsStyleMap(40)});
	map.addLayer(_1CMSVector);
	VectorMap.put(Device.getTypeCode('InfoBoard'),_1CMSVector);
	//交通信号灯
	var _4CMSVector = new OpenLayers.Layer.Vector("TrafficLight",{styleMap: createStyleMap(30)});
	map.addLayer(_4CMSVector);
	VectorMap.put(Device.getTypeCode('TrafficLight'),_4CMSVector);
	//车道指示灯
	var _6CMSVector = new OpenLayers.Layer.Vector("LaneLight",{styleMap:createStyleMapWH(43,22)});
	map.addLayer(_6CMSVector);
	VectorMap.put(Device.getTypeCode('LaneLight'),_6CMSVector); 
	//风机
	var FanVector = new OpenLayers.Layer.Vector("Fan",{styleMap: createStyleMap(10)});  
	map.addLayer(FanVector);
	VectorMap.put(Device.getTypeCode('Fan'),FanVector);  
	//卷帘门
	var RollingDoorVector = new OpenLayers.Layer.Vector("RollingDoor",{styleMap: createStyleMap(63)});  
	map.addLayer(RollingDoorVector);
	VectorMap.put(Device.getTypeCode('RollingDoor'),RollingDoorVector);  
	//照明设施
	var LightVector = new OpenLayers.Layer.Vector("Light",{styleMap:createStyleMap(10)}); 
	map.addLayer(LightVector);
	VectorMap.put(Device.getTypeCode('Light'),LightVector);  
	//一氧化碳|能见度检测器
	var CoViVector = new OpenLayers.Layer.Vector("CoVi",{styleMap:createPanelStyleMap(59,"一氧化碳浓度:\n${arg1}\n\能见度:\n${arg2}")}); 
	map.addLayer(CoViVector);
	VectorMap.put(Device.getTypeCode('CoVi'),CoViVector);
	//水泵
	var WaterPumpVector = new OpenLayers.Layer.Vector("WaterPump",{styleMap:createStyleMap(14)});
	map.addLayer(WaterPumpVector);
	VectorMap.put(Device.getTypeCode('WaterPump'),WaterPumpVector);
	//光强检测器
	var LoLiVector = new OpenLayers.Layer.Vector("LoLi",{styleMap:createPanelStyleMap(59,"洞外照度:\n${arg1}\n\洞内照度:\n${arg2}")});
	map.addLayer(LoLiVector);
	VectorMap.put(Device.getTypeCode('LoLi'),LoLiVector);
	//火灾检测器
	var FireDetectorVector = new OpenLayers.Layer.Vector("FireDetector",{styleMap:createStyleMapWH(48,8)});
	map.addLayer(FireDetectorVector);
	VectorMap.put(Device.getTypeCode('FireDetector'),FireDetectorVector);
	//氮氧化物检测器
	var NoDetectorVector = new OpenLayers.Layer.Vector("NoDetector",{styleMap:createPanelStyleMap(59,"一氧化氮浓度:\n${arg1}\n\二氧化氮浓度:\n${arg2}")});
	map.addLayer(NoDetectorVector);
	VectorMap.put(Device.getTypeCode('NoDetector'),NoDetectorVector);
	//车检器
	var VehicleDetectorVector = new OpenLayers.Layer.Vector("VehicleDetector",{styleMap:createPanelStyleMap(59,"交通量:${arg1}\n\占有率:${arg2}\n速度:${arg3}")});
	map.addLayer(VehicleDetectorVector);
	VectorMap.put(Device.getTypeCode('VehicleDetector'),VehicleDetectorVector);
	//摄像头
	var ChannelVector = new	OpenLayers.Layer.Vector("Channel",{styleMap:createStyleMap(10)});
	map.addLayer(ChannelVector);
	VectorMap.put(Device.getTypeCode('Channel'),ChannelVector);
	//手动报警按钮
	var PushButtonVector = new OpenLayers.Layer.Vector("PushButton",{styleMap:createStyleMapWH(16,16)});
	map.addLayer(PushButtonVector);
	VectorMap.put(Device.getTypeCode('PushButton'),PushButtonVector); 	
	//电光诱导标志
	var InductionSignVector = new OpenLayers.Layer.Vector("InductionSign",{styleMap:createStyleMap(20)});
	map.addLayer(InductionSignVector);
	VectorMap.put(Device.getTypeCode('InductionSign'),InductionSignVector); 
	//气象检测器
	var WeatherStatVector = new OpenLayers.Layer.Vector("WeatherStat",{styleMap:createStyleMap(10)});
	map.addLayer(WeatherStatVector);
	VectorMap.put(Device.getTypeCode('WeatherStat'),WeatherStatVector); 
	//风速风向
	var WindSpeedVector = new OpenLayers.Layer.Vector("WindSpeed",{styleMap:createPanelStyleMap(59,"风速:\n${arg1}\n\风向:\n${arg2}")});
	map.addLayer(WindSpeedVector);
	VectorMap.put(Device.getTypeCode('WindSpeed'),WindSpeedVector);
	//栏杆机
	var RailVector = new OpenLayers.Layer.Vector("Rail",{styleMap:createStyleMap(63)});
	map.addLayer(RailVector);
	VectorMap.put(Device.getTypeCode('Rail'),RailVector);
	
	//设置拖拽及选中   
	createVectorDrag();
	setFeatureSelect(); 
}

/**
 * function:为图层增加Drag control
 */
function createVectorDrag(){
	var keys = VectorMap.keys();
	for(var i=0; i < keys.length ; i++){
		var vector = VectorMap.get(keys[i]);
		if(vector){
			//vector.renderer.setExtent(map.baseLayer.extent);
			var Drag = new OpenLayers.Control.DragFeature(vector);
			map.addControl(Drag);
			DrawControls.put(keys[i],Drag);
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
     click:function(currentFeature){
     	var feature = currentFeature;
        var msgStr = JSON.stringify(feature.msg);
        var pixel = map.getViewPortPxFromLonLat(new OpenLayers.LonLat(feature.geometry.x,feature.geometry.y));
        doException(_Click,msgStr);
        return false;
     },
     onFeatureSelect:function(currentFeature){
     	lastFeature = currentFeature;
     	//alert("onFeatureSelect:"+JSON.stringify(lastFeature.msg));
     },
     onFeatureUnselect:function(currentFeature){
     	lastFeature = null;
     }
};

/**
 * function: set SelectFeature
 */
function setFeatureSelect(){
	selectControl = new OpenLayers.Control.SelectFeature(VectorMap.values(),
            	{
            		hover:true,
            		multiple: false,
    				clickout: true,
			 		onSelect: callbacks.onFeatureSelect,
            		onUnselect: callbacks.onFeatureUnselect,
            		clickFeature:callbacks.click
            	}
            );
	map.addControl(selectControl);
	selectControl.activate();
}