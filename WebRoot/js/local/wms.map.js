/*全局路径*/
var contextPath;
/*地图全局对象*/
var map;
/*wms地址*/
var wmsUrl = "http://localhost:8080/geoserver/hu_nan/wms";
/*动态样式路径*/
var sldUrl;
/*地图编辑开关*/
var editorEnable = false;
/*自定义图层*/
var untiled,tiled,roadStatusLayers;
/*4326投影坐标系*/
//var epsg4326 = new OpenLayers.Projection("EPSG:4326");

var projectionStr="EPSG:900913";
/*道路选中图层*/
var selectLayer,drawings,draw,searchVector;
/*测距工具*/
var measureControl;
/*道路实时路况展示图层*/
var overrideLayer;

var defaultSearchR=10000;
/**
 * 隐藏的Feature
 */
var hideFeatures = new Array();
 
/**/
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
/**/
//OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;
OpenLayers.DOTS_PER_INCH = 90.71428571428572;
OpenLayers.Util.onImageLoadErrorColor = 'transparent';
//OpenLayers.ProxyHost= "proxy.cgi?url=";

var selectedStyle=new OpenLayers.StyleMap({
	 "default":new OpenLayers.Style({
		 pointRadius:"${type}",
		 fillColor:"#FF0000",
		 strokeColor:"#e80404",
		 strokeWidth:"6"
	 }),
	 "select":new OpenLayers.Style({
		 fillColor:"#FF0000",
		 strokeColor:"#FF0000"
	 })
});

var drawingStyle=new OpenLayers.StyleMap({
	 "default":new OpenLayers.Style({
		 fillColor:"#ffccd8",
		 fillOpacity:"0.4",
		 fillRule:"evenodd",
		 strokeColor:"#e80404",		
		 strokeOpacity:"0.2",
		 strokeWidth:"1"
	 })
});

/**
 * function：使用google map显示地图
 */
function gm_init() {
	var bounds = null;
	contextPath = $("#contextPath").val();
	map = new OpenLayers.Map({
        div: "map",
        controls:[
        			new OpenLayers.Control.Navigation({documentDrag: true}),
                  	new OpenLayers.Control.ArgParser(),
                  	new OpenLayers.Control.Attribution()
                 ],
        projection: "EPSG:900913",
        displayProjection: "EPSG:4326",
        zoomDuration: 10,
        numZoomLevels: 13
    });
	var gsat = new OpenLayers.Layer.Google(
        "Google Satellite",
        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
    );
    var gphy = new OpenLayers.Layer.Google(
        "Google Physical",
        {type: google.maps.MapTypeId.TERRAIN, visibility: false}
    );
    var gmap = new OpenLayers.Layer.Google(
        "Google Streets", // the default
        {numZoomLevels: 20, visibility: false}
    );
    var ghyb = new OpenLayers.Layer.Google(
        "Google Hybrid",
        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 22, visibility: false}
    );
    map.addLayers([gmap, gsat, gphy, ghyb]);
    
	//add controls
	map.addControl(new OpenLayers.Control.ScaleLine());
	map.addControl(new OpenLayers.Control.Navigation());
	map.addControl(new OpenLayers.Control.OverviewMap({}));
    map.addControl(new OpenLayers.Control.MousePosition());
    //add pan zoom bar
    var panZoomBar = new OpenLayers.Control.PanZoomBar({
		panIcons: true,
		zoomWorldIcon: false,
		position:new OpenLayers.Pixel(5,10)
	});
	map.addControl(panZoomBar);
	
	// Google.v3 uses EPSG:900913 as projection, so we have to transform our coordinates
    map.setCenter(new OpenLayers.LonLat(12571104.544085, 3277657.7724119),11);
   
	if (!map.getCenter()) {
    	map.zoomToMaxExtent();
	}
	
	//添加设备层Vector
	setVectors();
	//注册地图监听事件
	registerMapEvent();

}
      


/**
 * function:wms地图初始化
 */
function wms_init(){
//	var format = "image/png";
	var format = "image/jpeg";
	contextPath = $("#contextPath").val();
	wmsUrl = "http://" + $("#gisIp").val() + ":" + $("#gisPort").val() + "/geoserver/hn_postgis/gwc/service/wms";
	sldUrl = "http://" + $("#centerIp").val() + ":" + $("#centerPort").val() + "/cms/road_status.xml";
    var bounds = new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34);
    var hunanBounds = new OpenLayers.Bounds(12107029.0,2828066.2499999986,12721966.0,3523596.499999998);
	var options = {
			controls:[
        			//new OpenLayers.Control.Navigation({documentDrag: true}),
                  	//new OpenLayers.Control.ArgParser(),
                  	//new OpenLayers.Control.Attribution()
            ],
            maxExtent: bounds,
            projection:new OpenLayers.Projection('EPSG:900913'), 
            units:"m",
            zoomDuration: 0,
            restrictedExtent: [11107029.0,2428066.2499999986,13921966.0,3923596.499999998],
            resolutions: [1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135]
    };
	map = new OpenLayers.Map("map", options);
	
   	// setup tiled layer
	tiled = new OpenLayers.Layer.WMS(
    	"Geoserver layers - Tiled", 
    	wmsUrl,
    	{
        	LAYERS: 'postgis_hn_layers',
            format: format,
            tiled: true,
            gridSet: 'EPSG:900913'
		},
        {
//              buffer: 0,
//              isBaseLayer: true,
              tileSize: new OpenLayers.Size(256,256)
        } 
	 );
     
    roadStatusLayers = new OpenLayers.Layer.WMS(
        	"Geoserver layers - Status", 
        	wmsUrl,
        	{
        		LAYERS: 'postgis_hn_layers',
        		format: format
    		},
            {
    			buffer: 0,
                isBaseLayer: true
//    			tileOptions: {maxGetUrlLength: 2048}, 
//    			transitionEffect: 'resize'
            } 
    	 );
    roadStatusLayers.mergeNewParams({SLD : sldUrl, STYLES : null }); 
     
    map.addLayer(tiled);
    
    map.zoomToExtent(hunanBounds);
	//add controls
//	map.addControl(new OpenLayers.Control.ScaleLine());
	map.addControl(new OpenLayers.Control.Navigation({documentDrag:true}));
//    map.addControl(new OpenLayers.Control.MousePosition());
    //add pan zoom bar
    var panZoomBar = new OpenLayers.Control.PanZoomBar({
		panIcons: true,
		zoomWorldIcon: false,
		position:new OpenLayers.Pixel(5,10)
	});
    
	map.addControl(panZoomBar);
	
	overridePanZoomBar(panZoomBar);	
	panZoomBar.redraw();
    
	var overviewControl = new OpenLayers.Control.OverviewMap({
	    minRatio: 20, 
	    maxRatio: 20,
	    autoPan: true
	    
	});
	map.addControl(overviewControl);   
	
//	initPointSelect();

	//添加设备层Vector
	setVectors();

//	//注册地图监听事件
//	registerMapEvent();
	
//	measureDistance();	
	//alert(3);
	//SetMapCenter(12590568.69142,3255955.3513584,6);	
	// test
//	displayRoadStatus();
//	displayRs();
//	var str= '{"cameraType":"video_PtzCamera","sn":"251000000103000313297edff84917eb4b014921cd2342012c","standerNum":"251000000103000313","name":"殷家坳互通	","organName":"长潭段","x":"12582845.480953","y":"3240788.6866254","type":"2","stakeNumber":"","defaultIcon":"Channel.png","selectIcon":"Channel-hover.png","workState":"0","signalState":"0","time":"2014-12-21 14:27:32","facturer":""}';
	
	//AddMarker(str);
//	initXiangxiArea(createXiangXiArea);
//	wfsChangtanRequest();
	// 窗口大小变化后重新渲染
	$(window).resize(function() {
		  map.baseLayer.redraw();
		});
}  

/**
 * function：注册地图监听事件
 */
function registerMapEvent(){
	if(map){
		// 监听zoomstart
		map.events.register("zoomstart", map, function(e){	
		 	//console.log("zoomstart");			
		});
		
		// 监听zoomend
		map.events.register("zoomend", map, function(e){	
		 	//console.log("zoomend");			
		});
		
		// 监听movestart
		map.events.register("movestart", map, function(e){
			//console.log("movestart");
			if(!lastFeature){//移动地图时，隐藏图标，移动标注时，不隐藏
				//layerMoveStartEvent();
			}
		});
		
		// 监听move
		map.events.register("move", map, function(e){
			//console.log("move");
		});
		
		// 监听moveend
		map.events.register("moveend", map, function(e){	
		 	//console.log("moveend");		
		 	//layerMoveEndEvent();
		});
	}
}

/**
 * function:读缓存开关
 */
function toggleRead() {
	cacheRead[cacheRead.active ? "deactivate" : "activate"]();
}

/**
 * function:写缓存开关
 */
function toggleWrite() {
    cacheWrite[cacheWrite.active ? "deactivate" : "activate"]();
}   

/**
 * function：清空缓存
 */
function clearCache() {
    OpenLayers.Control.CacheWrite.clearCache();
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

	if(isEnable)
		$(".editeDiv").show();
	else
		$(".editeDiv").hide();
	
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
   		    name: msg.name,
  			defaultIcon: msg.defaultIcon,
  			selectIcon: msg.selectIcon
    	};
    	return feature;
    }else{
    	return null;
    }
}

/**
 * function:组装标注点
 * lon:经度
 * lat:纬度
 * w:宽度
 * h:高度
 * statusImg:图片路径
 */
function getMarker(lon,lat,w,h,statusImg){
	var size = new OpenLayers.Size(w,h);
	var offset = new OpenLayers.Pixel(-(size.w/2),-size.h);
	var icon = new OpenLayers.Icon(statusImg,size,offset);
	return new OpenLayers.Marker(new OpenLayers.LonLat(lon,lat),icon);

}

/**
 * function:根据图层勾选情况控制marker显示或隐藏
 * type:图层类型
 */
function showLayer(type,isShow){
	var layer = VectorMap.get(Device.findLayer(type));
	
	if(Device.checkType(type)) {
		var show = false;
		if(typeof(isShow) == "boolean"){
			show = isShow;
		} else if(typeof(isShow) == "string" && isShow == "true"){
			show = true;
		} else{
			show = false;
		}
		
		//更新已显示图层数组
		if(show){
			layerShowArr.put(type, "1");
			// 显示从hideFeatures中加入到layer中
			for (var i = 0; i < hideFeatures.length; i++) {
				var feature = hideFeatures[i];
				if (feature) {
					var obj = evalStr(feature.msg);
					if (type == obj.type) {
						layer.addFeatures(feature);
					}
					feature = null;
				}
			}
		}else{
			layerShowArr.put(type, "0");
			// 隐藏从layer中destory()
			for (var i = 0;i<layer.features.length;i++) {
				var feature = layer.features[i];
				var obj = evalStr(feature.msg);
				if (type == obj.type) {
					hideFeatures.push(feature);
					layer.removeFeatures(feature);
					// 移除循环变量减一
					i--;
				}
			}
		}
	}
}

/**
 * function:地图移动之前，隐藏全部图层
 */
function layerMoveStartEvent(){
	var vectorArr = VectorMap.values();
	for(var i=0; i < vectorArr.length; i++){
		vectorArr[i].setVisibility(false);
	}
}

/**
 * function:地图移动之后，显示图层
 */
function layerMoveEndEvent(){
	var vectorArr = VectorMap.values();
	for(var i=0; i < vectorArr.length; i++){
		vectorArr[i].setVisibility(true);
	}
}

/**
 *初始化道路选择 
 */
function initPointSelect()
{     	
	selectLayer = new OpenLayers.Layer.Vector("Selection", {
    	 styleMap:selectedStyle
     });
    
     map.addLayers([selectLayer]);
     
    drawings = new OpenLayers.Layer.Vector("drawings",{styleMap:drawingStyle});
 	map.addLayer(drawings);
 	draw = new OpenLayers.Control.DrawFeature(drawings, OpenLayers.Handler.Point);
 	map.addControl(draw);
 	draw.deactivate();
}


/**
 * 绘画完成回调
 * @param event
 * @returns {Boolean}
 */
function onDrawComplete(event)
{
	drawings.removeAllFeatures();
	selectLayer.removeAllFeatures();
	
	getFeatureByWFS(event.feature.geometry);
	
	
	return true;
}

/**
 * 请求指定区域内的地图要素 （图层：db_motorway_line）
 * @param geometry （OpenLayers.Geometry.Polygon） 指定区域
 */
function getFeatureByWFS(geometry )
{			
	var points=geometry.components[0].components;
	var gmlStr="";
	for (var p in points)
		{
		 gmlStr+=points[p].x +' '+points[p].y+' ';
		 
		}
	
	var XML;
    XML = '<wfs:GetFeature service="WFS" version="1.1.0" outputFormat="GML2"';
    XML += '  xmlns:topp="http://www.openplans.org/topp"';
    XML += '  xmlns:wfs="http://www.opengis.net/wfs"' ;
    XML += '  xmlns:ogc="http://www.opengis.net/ogc"' ;
    XML += '  xmlns:gml="http://www.opengis.net/gml"' ;
    XML += '  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';
    XML += '  xsi:schemaLocation="http://www.opengis.net/wfs';
    XML += '                      http://schemas.opengis.net/wfs/1.1.0/WFS-basic.xsd">';
    XML+=' <wfs:Query xmlns:feature="http://192.168.1.104:8080/hn_postgis" typeName="feature:db_motorway_line" srsName="EPSG:900913">';
    XML+=' <ogc:Filter>';
    XML+=' <ogc:Intersects>';
    XML+=' <ogc:PropertyName>geom</ogc:PropertyName>';
    XML+=' <gml:Polygon srsName='+projectionStr+'>';
    XML+=' <gml:exterior>';
    XML+=' <gml:LinearRing>';
    XML+=' <gml:posList>';
    XML+=gmlStr;
    XML+=' </gml:posList>';
    XML+=' </gml:LinearRing>';
    XML+=' </gml:exterior>';
    XML+=' </gml:Polygon>';
    XML+=' </ogc:Intersects>';
    XML+=' <ogc:BBOX>';
    XML+=' <ogc:PropertyName>geom</ogc:PropertyName>';
    XML+=' <gml:Envelope srsName='+projectionStr+'>';
    XML+=' <gml:lowerCorner>12543419 2959745</gml:lowerCorner>';
    XML+=' <gml:upperCorner>12613199 2892756</gml:upperCorner>';
    XML+=' </gml:Envelope>';
    XML+=' </ogc:BBOX>';
    XML+=' </ogc:Filter>';
    XML+=' </wfs:Query>';
    XML+=' </wfs:GetFeature>';
    
    var request=OpenLayers.Request.POST({
    	url:contextPath + '/wfs',
        data:XML,
        callback:onGetFeatureComplete
    });
    request.geometry=geometry;
}
     
    
    /**
     * WFS 请求回调
     * @param event
     */
    function onGetFeatureComplete(event){	
    	var gmlParse=new OpenLayers.Format.GML();
    	var features=gmlParse.read(event.responseText);
    	var feature;
    	var tobeAddFeatrue=[];
    	
        var requestGeometry=event.geometry;
    	var spiltGemetry=new OpenLayers.Geometry.LineString(requestGeometry.components[0].components);
        	
        for(var feat in features){
        	feature =features[feat];
        	
        	var polygon=feature.clone();
        	tobeAddFeatrue[feat]=polygon;           
        	
        	var splitGemetres=spiltGemetry.split(feature.geometry); //切割路段
        	if (splitGemetres!=null){
        		for (var temp in splitGemetres ){ 
        			 if(CheckContain(requestGeometry,splitGemetres[temp])){//判断子路段是否被包含在区域内
        				  var splitFeature = new OpenLayers.Feature.Vector(splitGemetres[temp]);
        			      selectLayer.addFeatures(splitFeature);
        			 }
        			}       		
        		}
        	else
        		{
        		selectLayer.addFeatures(polygon);
        		
        		}       	
        }
    }
    
    
   
   /**
    *  检查geometry A 是否包含geometry B
 * @param gemoA
 * @param gemoB
 * @returns A 包含 B 返回true
 */
function CheckContain(gemoA,gemoB)
   {
	   if(gemoA==null||gemoB==null)
		return false;
	   
	   var points=gemoB.components[0].components;
	   
	   var di=gemoA.distanceTo(gemoB,{edge:false,details:true});
	   
	   var num=0;
	   for(var p in points){
		  di=gemoA.distanceTo(points[p],{edge:false});
		  if(di>0)
			  num++;
	   }
	   
	   if(num>=2)	   
	   return false;
	   else
		   return true;
   }

/**
 * 获取在道路上离point最近的一个点
 * return OpenLayers.geomerty.point
 */
function getRoadPoint(point,features){
	
	var result=null;
	var options={
			details:true,
			edge:true
	};
	for(var g in features){
		var o= features[g].geometry.distanceTo(point,options);
		
		if(result==null||o.distance<result.distance){
			result={};
			result.distance=o.distance;
			result.point=new OpenLayers.Geometry.Point(o.x0,o.y0);
			result.feature=features[g];
			//var dt=features[g].geometry.distanceTo(result.point);
		}
	}
	
	return result;
}

function getFeatureByVehicle(vehicleA,vehicleB,road){
	
	var tempx=(vehicleA.geometry.x+vehicleB.geometry.x)/2;
	var tempy=(vehicleA.geometry.y+vehicleB.geometry.y)/2;
	var centerP=new OpenLayers.Geometry.Point(tempx,tempy);
	
	var distance=vehicleA.geometry.distanceTo(vehicleB.geometry);
	if(distance>50000)
		return;
		
    var body=CreateXMLForCircleFeature(centerP.x,centerP.y,distance);
	OpenLayers.Console.info(distance);	
    
    var request=OpenLayers.Request.POST({
    	url:contextPath + '/wfs',
        data:body,
        callback:OngetCircleFeature
    });
    
 
    
    request.vehicleA=vehicleA;
    request.vehicleB=vehicleB;
    request.road=road;
}

/**
 * 创建 WFS 请求XML
 * @param 圆心
 * @param 半径
 * @returns XML String
 */
function CreateXMLForCircleFeature(lon,lat,radius){
	
	var gmlStr=lon+','+lat;
	var body = "<wfs:GetFeature service=\"WFS\" version=\"1.1.0\" outputFormat=\"GML2\"";
	body += "  xmlns:wfs=\"http://www.opengis.net/wfs\"";
	body += "  xmlns:ogc=\"http://www.opengis.net/ogc\"";
	body += "  xmlns:gml=\"http://www.opengis.net/gml\"";
	body += "  xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"";
	body += "  xsi:schemaLocation=\"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd\">";
	body += "<wfs:Query typeName=\"hn_postgis:db_motorway_line\" srsName=\"" +projectionStr+"\">";
	body += "<ogc:Filter>";	
	body += "   <ogc:DWithin>"; 
	body += "     <ogc:PropertyName>geom</ogc:PropertyName>"; 
	body += "     <gml:Point srsName=\"" +projectionStr+"\">";
	body += "       <gml:coordinates>" ;
	body +=		gmlStr ;
	body += " </gml:coordinates>";
	body += "     </gml:Point>"; 
	body += "     <ogc:Distance unit=\"meter\">" ;
	body += 		radius ;
	body += 		"</ogc:Distance>"; 
	body += "   </ogc:DWithin>"; 
	body += "</ogc:Filter>";
	body += "</wfs:Query>";
	body += "</wfs:GetFeature>";
	
	return body;
}

function OngetCircleFeature(rep){
	
	var gmlParse=new OpenLayers.Format.GML();
	var features=gmlParse.read(rep.responseText);
	//drawings.removeAllFeatures();
	if(features.length==0)
		return;
	
	OpenLayers.Console.info(features.length);
	var poA= getRoadPoint(rep.vehicleA.geometry,features);
	var pointA=poA.point;
	
    var poB= getRoadPoint(rep.vehicleB.geometry,features);
    var pointB=poB.point;
    
    var geometres=null;
    if(poA.feature.fid==poB.feature.fid){//当两点同处一条geometry上时  
    	geometres=[poA.feature.geometry];
    }else{
    	var pointAarry= poB.feature.geometry.components[0].components;
    	var curPoints=[];  //优先从最近的点计算
    	if(pointAarry[0].distanceTo(pointA)>pointAarry[pointAarry.length-1].distanceTo(pointA)){
    		curPoints[0]=pointAarry[pointAarry.length-1];
    		curPoints[1]=pointAarry[0];
    	}else{
    		curPoints[0]=pointAarry[0];
    		curPoints[1]=pointAarry[pointAarry.length-1];
    	}
    	
    	for (var cur in curPoints){
    	    geometres=roadProgram(poB.feature,curPoints[cur],poA.feature.geometry,features,[]);
    	    if(geometres!=null)
    	    	break;	   		
    	}
    }
    
	if(geometres==null||geometres.length==0) //无法连接两点
		return;
	
	rep.road.features=[];
	for (var g in geometres){								
		feature=new OpenLayers.Feature.Vector(geometres[g].clone());		
		rep.road.features.push(feature);
	}			
	selectLayer.addFeatures(rep.road.features);

}

function roadProgram(curFeature,curPoint,disgeo,features,fids){
	
	var roads=[];
	
	for (var index in features){
		if(curFeature.fid==features[index].fid)
			continue;
		
		var find=false;
		for(var fid in fids ){
			if(fids[fid]==features[index].fid){
				find=true;
				break;
			}
			   
		}			
		if(find)
			continue;
				
		var tempGeo=features[index].geometry;
		var dis=curPoint.distanceTo(tempGeo);		
		if(dis!=0)
			continue;
					
		dis=tempGeo.distanceTo(disgeo,{edge:false});
		if(dis==0)
		{
			roads.unshift([curFeature.geometry,tempGeo,disgeo]);
			return [curFeature.geometry,tempGeo,disgeo];
		}
		
		var pointArray=tempGeo.components[0].components;
		
		var tempPoint=pointArray[0];
		dis =tempPoint.distanceTo(curPoint);
		if(dis==0)
			tempPoint=pointArray[pointArray.length-1];
		
		fids.unshift(curFeature.fid);
	
		var geometres=roadProgram(features[index],tempPoint,disgeo,features,fids);
		fids.shift(curFeature.fid);
		if(geometres!=null){
			geometres.unshift(curFeature.geometry);
			roads.unshift(geometres);
			return geometres;
		}	
	}
	
	var min=-1;
	var road=null;
	for(var r in roads){
		var lenght=0;
		for (var ml in roads[r]){
			lenght+=roads[r][ml].getLength();
		}
		
		if(road==null||min>lenght){
			min=lenght;
			road=roads[r];
		}
			
	}
	
	return road;
}

function markerOnRoad(marker){
	var body=CreateXMLForCircleFeature(marker.x,marker.y,5000);
    var request=OpenLayers.Request.POST({
    	url:contextPath + '/wfs',
        data:body,
        callback:function(rep){
        	var gmlParse=new OpenLayers.Format.GML();
        	var features=gmlParse.read(rep.responseText);       	       	
            	var marker=null;
            	if(features.length!=0){
            		var point=new OpenLayers.Geometry.Point(rep.marker.x,rep.marker.y);
                	var po= getRoadPoint(point,features);
                	rep.marker.x=po.point.x;
                	rep.marker.y=po.point.y;
            	}        		
            	//alert(JSON.stringify(rep.marker));        
                marker = getFeature(rep.marker.x, rep.marker.y, rep.marker.type, rep.marker);
                VectorMap.get(Device.findLayer(rep.marker.type)).addFeatures(marker);
            	var msgStr = JSON.stringify(marker.msg);
                doException(_AddMarker, msgStr);
        	
        }
    });
    request.marker=marker;
 
  
}

function moveMarkerOnRoad(marker){	
	var body=CreateXMLForCircleFeature(marker.geometry.x,marker.geometry.y,5000);
    var request=OpenLayers.Request.POST({
    	url:contextPath + '/wfs',
        data:body,
        callback:function(rep){
        	var gmlParse=new OpenLayers.Format.GML();       
        	var features=gmlParse.read(rep.responseText);             
            	if(features.length!=0){
            		var point=new OpenLayers.Geometry.Point(rep.marker.geometry.x,rep.marker.geometry.y);
                	var po= getRoadPoint(point,features);
                	rep.marker.geometry.x=po.point.x;
                	rep.marker.geometry.y=po.point.y;
            	}            	
            	
            	for (var i in vehicleRoads){
            		if(vehicleRoads[i].vehicleA.msg.sn==rep.marker.msg.sn||vehicleRoads[i].vehicleB.msg.sn==rep.marker.msg.sn){
            			if(vehicleRoads[i].features!=null)
            			selectLayer.removeFeatures(vehicleRoads[i].features);
            			vehicleRoads[i].features=null;
            			
            			if(features.length!=0)
            			   getFeatureByVehicle(vehicleRoads[i].vehicleA,vehicleRoads[i].vehicleB,vehicleRoads[i]);
            		}
            	}
        	
        }
    });
    request.marker=marker;
}

function searchFeatureInCircle(type,radius,point){
	
	!radius&&(radius=defaultSearchR);
	var addCenter=true;
	point.x||(point=null);
	if(point==null){
		point=map.getCenter();
		point={x:point.lon,y:point.lat};
		addCenter=false;
	}
	
	var typename=getGisLayerName(type);
	if(typename==null)
		return;
	
	searchVector.removeAllFeatures();
	drawings.removeAllFeatures();
	var center=new OpenLayers.Geometry.Point(point.x,point.y);
	
	var circle = new OpenLayers.Feature.Vector(
			new OpenLayers.Geometry.Polygon.createRegularPolygon(
					center, radius, 80, 0));
	
	//移动到视野中心  调整放大比例		
	map.setCenter(point);
	var bds= circle.geometry.getBounds();
	bds=bds.scale(2);
	map.zoomToExtent(bds,true);

	var gmlStr=point.x+','+point.y;
	var body = "<wfs:GetFeature service=\"WFS\" version=\"1.1.0\" outputFormat=\"GML2\"";
	body += "  xmlns:wfs=\"http://www.opengis.net/wfs\"";
	body += "  xmlns:ogc=\"http://www.opengis.net/ogc\"";
	body += "  xmlns:gml=\"http://www.opengis.net/gml\"";
	body += "  xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"";
	body += "  xsi:schemaLocation=\"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd\">";
	body += "<wfs:Query typeName=\"" +typename+"\" srsName=\"" +projectionStr+"\">";

	body += "<ogc:Filter>";	
	body += " <ogc:And>";
	body += "   <ogc:DWithin>"; 
	body += "     <ogc:PropertyName>geom</ogc:PropertyName>"; 
	body += "     <gml:Point srsName=\"" +projectionStr+"\">";
	body += "       <gml:coordinates>" ;
	body +=		gmlStr ;
	body += " </gml:coordinates>";
	body += "     </gml:Point>"; 
	body += "     <ogc:Distance unit=\"meter\">" ;
	body += 		radius ;
	body += 		"</ogc:Distance>"; 
	body += "   </ogc:DWithin>";
	
	if(type=="203"){
		body += "   <ogc:PropertyIsEqualTo>";
	    body += "      <ogc:PropertyName>kind</ogc:PropertyName>";
	    body += "      <ogc:Literal>7200</ogc:Literal>";
		body += "   </ogc:PropertyIsEqualTo>";
	}

	body += "</ogc:And>";
	body += "</ogc:Filter>";
	body += "</wfs:Query>";
	body += "</wfs:GetFeature>";
	
	doException(_clientConsole,body);
	if(addCenter){
		var centerFeature=new OpenLayers.Feature.Vector(center);
	    centerFeature.data.type="center";
		searchVector.addFeatures(centerFeature);
	}
	drawings.addFeatures(circle);
	
	if(typename==null){
		var array=new Array();
		var layer=VectorMap.get(Device.findLayer(type));
		for(var i in layer.features){
		    if(layer.features[i].geometry.distanceTo(center)<radius){
		    	array.push(layer.features[i].msg);
		    	
		    	var temp= layer.features[i].clone();
        	    temp.data.type=type;
        	    temp.data.state="normal";
        	    temp.data.gid=layer.features[i].msg.sn;
        	    temp.msg=layer.features[i].msg;
        		searchVector.addFeatures(temp);	  
		    }
		    	
		}		
		doException(_eventSearchCompleted, type,JSON.stringify(array),point.id);
		return;
	}
			
	 var request=OpenLayers.Request.POST({
	    	url:contextPath + '/wfs',
	        data:body,
	        callback:function(rep){
	        	//alert(rep.responseText);
	        	var gmlParse=new OpenLayers.Format.GML();
	        	var features=gmlParse.read(rep.responseText);
	        	var result=new Array();
	        	for(var f in features ){
	        		var temp= features [f].clone();
	        	    temp.data.type=rep.featureType;
	        	    temp.data.state="normal";
	        	    var distanse=rep.center.distanceTo(temp.geometry);	        	   
	        	    var o={id:temp.data.gid,name:temp.data.name,phone:temp.data.telephone,distanse:distanse};
	        	    result.push(o);
	        		searchVector.addFeatures(temp);	        		
	        	}
	        	doException(_eventSearchCompleted, type,JSON.stringify(result),request.point.id);
	        	return;
	        }
	    });
	 
	 request.featureType=type;
	 request.center=center;
	 request.point=point;
}

//获取GIS图层名称
function getGisLayerName(code){
	switch(code){
	case "200":return "hn_postgis:db_luzhen_point";
	//case "201":return "hn_postgis:tollstation_point";
	case "202":return "hn_postgis:firefighting_point";
	case "203":return "hn_postgis:db_hospital_point";
	case "204":return "hn_postgis:trafficpolice_point";
	
	}
	return null;
}  

//取消编辑点击
function consleRequest(event){
    doException(_concelEdite);
}    
   
 //保存按钮点击
function saveRequest(event){
    doException(_SaveMarkers);
}   

//重写PanZoomBar方法
function overridePanZoomBar(panZoomBar) {
	var bg;
	panZoomBar._addZoomBar = function(a) {
        var b = OpenLayers.Util.getImageLocation("slider.png"),
        c = this.id + "_" + this.map.id,
        d = this.map.getMinZoom(),
        e = this.map.getNumZoomLevels() - 1 - this.map.getZoom(),
        e = OpenLayers.Util.createAlphaImageDiv(c, a.add( 0, e * this.zoomStopHeight), {
            w: 18,
            h: 9
        },
        b, "absolute");
        e.style.cursor = "move";
        this.slider = e;
        this.sliderEvents = new OpenLayers.Events(this, e, null, !0, {
            includeXY: !0
        });
        this.sliderEvents.on({
            touchstart: this.zoomBarDown,
            touchmove: this.zoomBarDrag,
            touchend: this.zoomBarUp,
            mousedown: this.zoomBarDown,
            mousemove: this.zoomBarDrag,
            mouseup: this.zoomBarUp
        });
        var f = {
            w: 6,
            h: this.zoomStopHeight * (this.map.getNumZoomLevels() - d)
        },
        b = OpenLayers.Util.getImageLocation("zoombar.png"),
        c = null;
        OpenLayers.Util.alphaHack() ? (c = this.id + "_" + this.map.id, c = OpenLayers.Util.createAlphaImageDiv(c, a, {
            w: f.w,
            h: this.zoomStopHeight
        },
        b, "absolute", null, "crop"), c.style.height = f.h + "px") : c = OpenLayers.Util.createDiv("OpenLayers_Control_PanZoomBar_Zoombar" + this.map.id, a.add(6,0), f, b);
        c.style.cursor = "pointer";
        c.className = "olButton";
        this.zoombarDiv = c;
        this.div.appendChild(c);
        this.startTop = parseInt(c.style.top);
        this.div.appendChild(e);
        this.map.events.register("zoomend", this, this.moveZoomBar);
        return a = a.add(0, this.zoomStopHeight * (this.map.getNumZoomLevels() - d));
    };
	
	panZoomBar.draw = function(a) {
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        a = this.position.clone();
        this.buttons = [];
        var b = {w:15,h:15};
        var bz = {w:16,h:16};
        if (this.panIcons) {
        	if (!bg) {
        		bg = OpenLayers.Util.createAlphaImageDiv(this.id + "_pan_bg", a, {
        			w: 45,
        			h: 45
        		},
        		OpenLayers.Util.getImageLocation("bg.png"), "absolute");
        		this.div.appendChild(bg);
        	}
        	
            var c = new OpenLayers.Pixel(a.x + 15, a.y);
//            this.zoomWorldIcon && (c = new OpenLayers.Pixel(a.x + b.w, a.y));
            this._addButton("panup", "north-mini.png", c, b);
            a.y = a.y + b.h;
            a.x = a.x;
            this._addButton("panleft", "west-mini.png", a, b);
//            this.zoomWorldIcon && (this._addButton("zoomworld", "zoom-world-mini.png", a.add(b.w, 0), b), d *= 2);
            this._addButton("panright", "east-mini.png", a.add(30, 0), b);
            this._addButton("pandown", "south-mini.png", c.add(0, 30), b);
            this._addButton("zoomin", "zoom-plus-mini.png", c.add(-1, 50), bz);
            c = this._addZoomBar(c.add(-2, 66));
            this._addButton("zoomout", "zoom-minus-mini.png", c.add(1, 0), bz);
        } else this._addButton("zoomin", "zoom-plus-mini.png", a, bz),
        c = this._addZoomBar(a.add(0, b.h)),
        this._addButton("zoomout", "zoom-minus-mini.png", c, bz),
        this.zoomWorldIcon && (c = c.add(0, b.h + 3), this._addButton("zoomworld", "zoom-world-mini.png", c, b));
        return this.div;
    };
}   
    

var btns = ["hospital","trafficPolice","fireFighting","luZheng","infoBoard","tollStation","trafficControl","resourceScheduling","msgSend"];


function onPanelBtnClick(name){	
	var temp= document.getElementById('btn_'+name);		
	var code=Device.getTypeCode(name);
	if(name=="resourceScheduling")
		code="124";
	//eventSearch("hospital", "5000", '');
	var id=null;
	temp.msg&&(id=temp.msg.id);
	doException(_eventSearchCompleted, name,"click",id);
	/*	
	if(getGisLayerName(code)||code=="124"){		
		var r=null,p=null;
		if(temp&&temp.msg){
			r=temp.msg.searchR;
			p=temp.msg;
		}
		searchFeatureInCircle(code,r,p);
	}
	else{
		var id=null;
		temp.msg&&(id=temp.msg.id);
		doException(_eventSearchCompleted, name,null,id);
	}*/
}  

function buttonMouseOver(button) {
	button.className = button.id + '_hover';
}

function buttonMouseOut(button) {
	button.className = button.id;
}
    
function setBtnActivate(name,activate,msg){
	var temp= document.getElementById('div_'+name);
	if(activate&&activate!="0"){
	    temp.className="panelSpanActivate";
	    temp.msg=msg;
	}	
	else{
		temp.className= "panelSpan";
		temp.msg=null;
	}
}
    
function topBtnClick(){
	var temp= document.getElementById('btnPanel');
	var image=document.getElementById('imgTopVisable');
	if(temp.style.display=='block'){
		temp.style.display='none';
		image.src="../css/legend/img/toppanel_visable.png";
		image.title="展开";
	}
	else{
		temp.style.display='block';
		image.src="../css/legend/img/toppanel_hide.png";
		image.title="隐藏";
	}		
}

// 获取长潭区域元素
function wfsChangtanRequest() {
	var XML;
    XML = '<wfs:GetFeature service="WFS" version="1.1.0" outputFormat="GML2"';
    XML += '  xmlns:topp="http://www.openplans.org/topp"';
    XML += '  xmlns:wfs="http://www.opengis.net/wfs"' ;
    XML += '  xmlns:ogc="http://www.opengis.net/ogc"' ;
    XML += '  xmlns:gml="http://www.opengis.net/gml"' ;
    XML += '  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';
    XML += '  xsi:schemaLocation="http://www.opengis.net/wfs';
    XML += '                      http://schemas.opengis.net/wfs/1.1.0/WFS-basic.xsd">';
    XML+=' <wfs:Query xmlns:feature="http://192.168.1.101:8181/hn_postgis" typeName="hn_postgis:changtan_region" srsName="EPSG:900913">';
    XML+=' </wfs:Query>';
    XML+=' </wfs:GetFeature>';
    
    OpenLayers.Request.POST({
    	url:contextPath + '/wfs',
        data:XML,
        callback:onChangtanRegionComplete
    });
}

// 添加长潭区域选中事件
function onChangtanRegionComplete(res) {
	var areaVector = new OpenLayers.Layer.Vector("area",{
		styleMap : createAreaStyleMap(),
		minResolution: map.resolutions[0,1]
    });
	map.addLayer(areaVector);
		
	var selectControl = new OpenLayers.Control.SelectFeature(areaVector, {
		hover : true,
		multiple : false,
		clickout : true,
		clickFeature : function(e){
			var bds= e.geometry.getBounds();
			bds=bds.scale(1.2);
			map.zoomToExtent(bds,true);
		}
	});
	
	map.addControl(selectControl);
	selectControl.activate();
	
	var gmlParse=new OpenLayers.Format.GML();
	var features=gmlParse.read(res.responseText);
	if(features&&features.length){
		areaVector.addFeatures(features[0].clone());
	}
	
	return;
}
    
    
    
    
    
   