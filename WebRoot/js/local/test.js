// 测试方法
function testAddCms() {
	// EditorEnable(true);

	var cmsMarker1 = {};
	cmsMarker1.id = "1111111";
	cmsMarker1.name = "情报板";
	cmsMarker1.sn = "1229232323211";
	cmsMarker1.x = 300;
	cmsMarker1.y = 100;
	cmsMarker1.type = "17_5";
	cmsMarker1.arg1 = "雨天路滑";
	cmsMarker1.color = "red";
	cmsMarker1.defaultIcon = "CMS_5.png";
	cmsMarker1.selectIcon = "CMS_5-hover.png";
	AddMarker(JSON.stringify(cmsMarker1));

	var cmsMarker2 = {};
	cmsMarker2.id = "1111112";
	cmsMarker2.name = "情报板";
	cmsMarker2.sn = "1229232323212";
	cmsMarker2.x = 700;
	cmsMarker2.y = 280;
	cmsMarker2.type = "17_5";
	cmsMarker2.arg1 = "雨天路滑";
	cmsMarker2.color = "red";
	cmsMarker2.defaultIcon = "CMS_5.png";
	cmsMarker2.selectIcon = "CMS_5-hover.png";
	AddMarker(JSON.stringify(cmsMarker2));

	var cmsMarker3 = {};
	cmsMarker3.id = "111115612";
	cmsMarker3.name = "情报板";
	cmsMarker3.sn = "122956232323212";
	cmsMarker3.x = 1200;
	cmsMarker3.y = 280;
	cmsMarker3.type = "17_4";
	cmsMarker3.defaultIcon = "CMS_4.png";
	cmsMarker3.selectIcon = "CMS_4-hover.png";
	AddMarker(JSON.stringify(cmsMarker3));
}

function testAddOutCms() {
	var cmsMarker1 = {};
	cmsMarker1.id = "1111111";
	cmsMarker1.name = "情报板";
	cmsMarker1.sn = "11111111229232323211";
	cmsMarker1.x = 12482397.83106;
	cmsMarker1.y = 3114308.80225;
	cmsMarker1.type = "17";
	cmsMarker1.arg1 = "雨天路滑";
	cmsMarker1.color = "red";
	cmsMarker1.defaultIcon = "marker-InfoBoard.png";
	cmsMarker1.selectIcon = "marker-InfoBoard-hover.png";
	AddMarker(JSON.stringify(cmsMarker1));

	var cmsMarker3 = {};
	cmsMarker3.id = "111115612";
	cmsMarker3.name = "情报板";
	cmsMarker3.sn = "111115612122956232323212";
	cmsMarker3.x = 12582497.83106;
	cmsMarker3.y = 3124408.80225;
	cmsMarker3.type = "17";
	cmsMarker3.defaultIcon = "marker-InfoBoard.png";
	cmsMarker3.selectIcon = "marker-InfoBoard-hover.png";
	AddMarker(JSON.stringify(cmsMarker3));

	var cmsMarker2 = {};
	cmsMarker2.id = "11111325612";
	cmsMarker2.name = "情报板";
	cmsMarker2.sn = "111113256121229546232323212";
	cmsMarker2.x = 12572497.83106;
	cmsMarker2.y = 3122408.80225;
	cmsMarker2.type = "17";
	cmsMarker2.defaultIcon = "marker-InfoBoard.png";
	cmsMarker2.selectIcon = "marker-InfoBoard-hover.png";
	AddMarker(JSON.stringify(cmsMarker2));

	var camera = {};
	camera.id = "1211232";
	camera.name = "Camera";
	camera.sn = "121123212193211";
	camera.type = "2";
	camera.defaultIcon = "marker-Channel-camera.png";
	camera.selectIcon = "marker-Channel-camera-hover.png";
	camera.x = 12652497.83106;
	camera.y = 3122408.80225;
	camera.stakeNumber = "K1720+300";
	AddMarker(JSON.stringify(camera));
	
//	GetMarkerBySn("111115612122956232323212", "17_4");
}

function testAddIs() {
	var is = {};
	is.id = "121134726632";
	is.name = "RD";
	is.sn = "1212169376211";
	is.type = "23";
	is.defaultIcon = "InductionSign.png";
	is.selectIcon = "InductionSign-hover.png";
	is.x = 1100;
	is.y = 260;
	is.stakeNumber = "K1720+300";
	AddMarker(JSON.stringify(is));
}

function testAddWp() {
	var wp = {};
	wp.id = "12113472632";
	wp.name = "WP";
	wp.sn = "121216937632211";
	wp.type = "21";
	wp.defaultIcon = "WaterPump.png";
	wp.selectIcon = "WaterPump-hover.png";
	wp.x = 1150;
	wp.y = 260;
	wp.stakeNumber = "K1720+300";
	AddMarker(JSON.stringify(wp));
}

function testAddPb() {
	var pb = {};
	pb.id = "12113422372632";
	pb.name = "PB";
	pb.sn = "12121623937632211";
	pb.type = "24";
	pb.defaultIcon = "PushButton.png";
	pb.selectIcon = "PushButton-hover.png";
	pb.x = 1180;
	pb.y = 260;
	pb.stakeNumber = "K1720+300";
	AddMarker(JSON.stringify(pb));
}

function testAddRail() {
	var rd = {};
	rd.id = "12113426632";
	rd.name = "RD";
	rd.sn = "121219376211";
	rd.type = "22";
	rd.defaultIcon = "Rail.png";
	rd.selectIcon = "Rail-hover.png";
	rd.x = 1100;
	rd.y = 190;
	rd.stakeNumber = "K1720+300";
	AddMarker(JSON.stringify(rd));

	var rd1 = {};
	rd1.id = "121134632";
	rd1.name = "RD-1";
	rd1.sn = "12121937611";
	rd1.type = "22";
	rd1.defaultIcon = "Rail-close.png";
	rd1.selectIcon = "Rail-close-hover.png";
	rd1.x = 1300;
	rd1.y = 190;
	rd1.stakeNumber = "K1720+300";
	AddMarker(JSON.stringify(rd1));
}

function testAddCms6() {
	// EditorEnable(true);

	var cmsMarker1 = {};
	cmsMarker1.id = "111111";
	cmsMarker1.name = "CMS6-1";
	cmsMarker1.sn = "1229223211";
	cmsMarker1.x = 400;
	cmsMarker1.y = 50;
	cmsMarker1.type = "17_6";
	cmsMarker1.arg1 = "雨天路滑";
	cmsMarker1.color = "red";
	cmsMarker1.defaultIcon = "CMS_6-green.png";
	cmsMarker1.selectIcon = "CMS_6-green-hover.png";
	AddMarker(JSON.stringify(cmsMarker1));

	var cmsMarker2 = {};
	cmsMarker2.id = "111112";
	cmsMarker2.name = "CMS6-2";
	cmsMarker2.sn = "12232323212";
	cmsMarker2.x = 400;
	cmsMarker2.y = 110;
	cmsMarker2.type = "17_6";
	cmsMarker2.arg1 = "雨天路滑";
	cmsMarker2.color = "red";
	cmsMarker2.defaultIcon = "CMS_6-green.png";
	cmsMarker2.selectIcon = "CMS_6-green-hover.png";
	AddMarker(JSON.stringify(cmsMarker2));

	var cmsMarker3 = {};
	cmsMarker3.id = "11119012";
	cmsMarker3.name = "CMS6-3";
	cmsMarker3.sn = "1223233212";
	cmsMarker3.x = 400;
	cmsMarker3.y = 270;
	cmsMarker3.type = "17_6";
	cmsMarker3.arg1 = "雨天路滑";
	cmsMarker3.color = "red";
	cmsMarker3.defaultIcon = "CMS_6-green.png";
	cmsMarker3.selectIcon = "CMS_6-green-hover.png";
	AddMarker(JSON.stringify(cmsMarker3));

	var cmsMarker4 = {};
	cmsMarker4.id = "11113212";
	cmsMarker4.name = "CMS6-4";
	cmsMarker4.sn = "12212";
	cmsMarker4.x = 400;
	cmsMarker4.y = 320;
	cmsMarker4.type = "17_6";
	cmsMarker4.arg1 = "雨天路滑";
	cmsMarker4.color = "red";
	cmsMarker4.defaultIcon = "CMS_6-red.png";
	cmsMarker4.selectIcon = "CMS_6-red-hover.png";
	AddMarker(JSON.stringify(cmsMarker4));
}

function testAddRd() {
	var rd = {};
	rd.id = "121126632";
	rd.name = "RD";
	rd.sn = "1219376211";
	rd.type = "20";
	rd.defaultIcon = "RollingDoor.png";
	rd.selectIcon = "RollingDoor-hover.png";
	rd.x = 900;
	rd.y = 190;
	rd.stakeNumber = "K1720+300";
	AddMarker(JSON.stringify(rd));
}

function testAddCamera() {
	for ( var i = 0; i < 25; i++) {
		var camera = {};
		camera.id = "1211232" + i;
		camera.name = "Camera" + i;
		camera.sn = "12193211" + i;
		camera.type = "2";
		camera.defaultIcon = "Channel.png";
		camera.selectIcon = "Channel-hover.png";
		camera.x = i * 79 + 40;
		camera.y = 362;
		camera.stakeNumber = "K1720+300";
		AddMarker(JSON.stringify(camera));
	}

	for ( var i = 0; i < 25; i++) {
		var camera = {};
		camera.id = "1211232" + i;
		camera.name = "Camera" + i;
		camera.sn = "12193211" + i;
		camera.type = "2";
		camera.defaultIcon = "Channel.png";
		camera.selectIcon = "Channel-hover.png";
		camera.x = i * 79 + 40;
		camera.y = 14;
		camera.stakeNumber = "K1720+300";
		AddMarker(JSON.stringify(camera));
	}
}

function testAddFan() {
	var fan = {};
	fan.id = "121232";
	fan.name = "Fan";
	fan.sn = "1219311";
	fan.type = "18";
	fan.defaultIcon = "Fan.png";
	fan.selectIcon = "Fan-hover.png";
	fan.x = 1000;
	fan.y = 270;
	fan.stakeNumber = "K1720+300";
	AddMarker(JSON.stringify(fan));

	var fan1 = {};
	fan1.id = "12129325";
	fan1.name = "Fan1";
	fan1.sn = "12919311";
	fan1.type = "18";
	fan1.defaultIcon = "Fan.png";
	fan1.selectIcon = "Fan-hover.png";
	fan1.x = 1000;
	fan1.y = 320;
	fan1.stakeNumber = "K1720+300";
	AddMarker(JSON.stringify(fan1));

	var fan2 = {};
	fan2.id = "1251232";
	fan2.name = "Fan";
	fan2.sn = "12519311";
	fan2.type = "18";
	fan2.defaultIcon = "Fan.png";
	fan2.selectIcon = "Fan-hover.png";
	fan2.x = 1000;
	fan2.y = 60;
	fan2.stakeNumber = "K1720+300";
	AddMarker(JSON.stringify(fan2));

	var fan11 = {};
	fan11.id = "121239325";
	fan11.name = "Fan11";
	fan11.sn = "129319311";
	fan11.type = "18";
	fan11.defaultIcon = "Fan.png";
	fan11.selectIcon = "Fan-hover.png";
	fan11.x = 1000;
	fan11.y = 110;
	fan11.stakeNumber = "K1720+300";
	AddMarker(JSON.stringify(fan11));
}

function testAddFd() {
	for ( var i = 0; i < 25; i++) {
		var fd = {};
		fd.id = "121132" + i;
		fd.name = "FD" + i;
		fd.sn = "1293211" + i;
		fd.type = "14";
		if (i == 12) {
			fd.defaultIcon = "FireDetector-danger.png";
			fd.selectIcon = "FireDetector-danger-hover.png";
		} else {
			fd.defaultIcon = "FireDetector-safe.png";
			fd.selectIcon = "FireDetector-safe-hover.png";
		}
		fd.x = i * 79 + 80;
		fd.y = 362;
		fd.stakeNumber = "K1720+300";
		AddMarker(JSON.stringify(fd));
	}
	for ( var i = 0; i < 25; i++) {
		var fd = {};
		fd.id = "121132" + i;
		fd.name = "FD" + i;
		fd.sn = "1293211" + i;
		fd.type = "14";
		if (i == 12) {
			fd.defaultIcon = "FireDetector-danger.png";
			fd.selectIcon = "FireDetector-danger-hover.png";
		} else {
			fd.defaultIcon = "FireDetector-safe.png";
			fd.selectIcon = "FireDetector-safe-hover.png";
		}
		fd.x = i * 79 + 80;
		fd.y = 14;
		fd.stakeNumber = "K1720+300";
		AddMarker(JSON.stringify(fd));
	}
}

function testAddVdMarker() {
	var vdMarker = {};
	vdMarker.id = "1211";
	vdMarker.name = "VD";
	vdMarker.sn = "12111";
	vdMarker.type = "10";
	vdMarker.defaultIcon = "VehicleDetector.png";
	vdMarker.selectIcon = "VehicleDetector-hover.png";
	vdMarker.x = "12536322.40479";
	vdMarker.y = "3168835.46773";
	vdMarker.stakeNumber = "K1720+300";
	AddMarker(JSON.stringify(vdMarker));

	// SelectFeatureByComparing("10", "12111");
	return vdMarker;
}

// -------------
// 字体设置
var symbolizerText = OpenLayers.Symbolizer.Text({
	label : "name",
	fontFamily : "@宋体",
	fontSize : "12",
	fontWeight : "1"
});
// 绿色边线
var symbolizerLineGreen = new OpenLayers.Symbolizer.Line({
	strokeColor : "#00ff00",
	strokeOpacity : 1,
	strokeWidth : 5,
	strokeLinecap : "round",
	strokeDashstyle : "solid"
});
// 道路畅通规则
var roadRuleGreen = [ new OpenLayers.Rule({
	id : "road_rule_green_1",
	// symbolizers : [ symbolizerText, symbolizerLineGreen ]
	// symbolizers : [ symbolizerLineGreen ]
	symbolizer : symbolizerLineGreen
}) ];
// 道路畅通样式
var roadStyleGreen = new OpenLayers.Style({
	id : "road_style_green",
	layerName : "overrideLayer",
	isDefault : false,
	rules : roadRuleGreen
});

var greenStyle = OpenLayers.Util.extend({},
		OpenLayers.Feature.Vector.style['default']);
greenStyle.strokeColor = "#00ff00";
greenStyle.strokeWidth = 1;
greenStyle.strokeLinecap = "round";
// greenStyle.rules = roadRuleGreen;

function testDynamicStyle() {
	// 查询指定ID的路
	xmlPara = "<wfs:GetFeature service='WFS' version='1.1.0' outputFormat='GML2' "
			+ "xmlns:wfs='http://www.opengis.net/wfs' "
			+ "xmlns:ogc='http://www.opengis.net/ogc' "
			+ "xmlns:gml='http://www.opengis.net/gml' "
			+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
			+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd'> "
			+ "<wfs:Query typeName='hn_postgis:db_motorway_line' srsName='EPSG:900913'> "
			+ "<ogc:Filter> "
			+ "<ogc:FeatureId fid='5'/> "
			+ "</ogc:Filter> "
			+ "</wfs:Query> " + "</wfs:GetFeature> ";

	var request = new OpenLayers.Request.POST({
		url : contextPath + "/wfs",
		data : xmlPara,
		callback : callbackGetFeature
	});

	// 选中圆型区域
	var reqBody = "<wfs:GetFeature service='WFS' version='1.1.0' outputFormat='GML2' "
			+ "xmlns:wfs='http://www.opengis.net/wfs' "
			+ "xmlns:ogc='http://www.opengis.net/ogc' "
			+ "xmlns:gml='http://www.opengis.net/gml' "
			+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
			+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd'> "
			+ "<wfs:Query typeName='hn_postgis:db_hospital_point' srsName='EPSG:900913'> "
			+ "<ogc:Filter> "
			+ "<ogc:FeatureId fid='10'/> "
			+ "</ogc:Filter> "
			+ "</wfs:Query> " + "</wfs:GetFeature> ";

	var request1 = new OpenLayers.Request.POST({
		url : contextPath + "/wfs",
		data : reqBody,
		callback : callbackSelectArea
	});

}

function callbackGetFeature(req) {
	var overrideLayer = new OpenLayers.Layer.Vector({
		name : "overrideLayer"
	});
	map.addLayer(overrideLayer);
	var gml = new OpenLayers.Format.GML();
	var features = gml.read(req.responseText);
	overrideLayer.addFeatures(features);
	for ( var i = 0; i < features.length; i++) {
		features[i].style = greenStyle;
	}
}

function callbackSelectArea(req) {
	var drawLayer = new OpenLayers.Layer.Vector({
		name : "drawLayer"
	});
	var circleStyle = OpenLayers.Util.extend({},
			OpenLayers.Feature.Vector.style['default']);
	circleStyle.fillColor = "#ff0000";
	circleStyle.fillOpacity = 0.1;
	drawLayer.style = circleStyle;
	map.addLayer(drawLayer);
	var gml = new OpenLayers.Format.GML();
	var features = gml.read(req.responseText);
	if (features.length > 0) {
		// 创建一个1000m半径的圆圈
		var circle = new OpenLayers.Feature.Vector(
				new OpenLayers.Geometry.Polygon.createRegularPolygon(
						features[0].geometry, 10000, 80, 0));
		drawLayer.addFeatures(circle);
		var lonlat = features[0].geometry.getBounds().getCenterLonLat();
		alert(JSON.stringify(lonlat));
		// 突出显示该医院点
		var marker = new OpenLayers.Feature.Vector(
				new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat));
		var hospitalStyle = OpenLayers.Util.extend({},
				OpenLayers.Feature.Vector.style['default']);
		hospitalStyle.externalGraphic = contextPath + "/img/map/hospitoal.png";
		hospitalStyle.pointRadius = 17;
		marker.style = hospitalStyle;
		drawLayer.addFeatures(marker);
		map.setCenter(lonlat, 3);

	}
}

var myLayer, recLayer;
var myDrawControl;
var pointList = new Array();
var x1, y1, x2, y2;

function myMouseClick() {
	myLayer = new OpenLayers.Layer.Vector();
	recLayer = new OpenLayers.Layer.Vector();

	map.addLayers([ myLayer, recLayer ]);

	var clickHandler = OpenLayers.Handler.Point;

	myDrawControl = new OpenLayers.Control.DrawFeature(myLayer, clickHandler);
	map.addControl(myDrawControl);
	myDrawControl.activate();

	myLayer.events
			.on({
				beforefeatureadded : function(event) {
					var points = myLayer.features;
					if (points.length > 1) {
						x1 = points[0].geometry.x;
						y1 = points[0].geometry.y;
						x2 = points[1].geometry.x;
						y2 = points[1].geometry.y;
						myLayer.removeAllFeatures();
						recLayer.removeAllFeatures();
						// alert(x1 + "," + y1 + " " + x2 + "," + y2);
						constructBound(10000);
						drawRec();

						xmlPara = "<wfs:GetFeature service='WFS' version='1.1.0' outputFormat='GML2' "
								+ "xmlns:wfs='http://www.opengis.net/wfs' "
								+ "xmlns:ogc='http://www.opengis.net/ogc' "
								+ "xmlns:gml='http://www.opengis.net/gml' "
								+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
								+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd'> "
								+ "<wfs:Query typeName='hn_postgis:db_motorway_line' srsName='EPSG:900913'> "
								+ "<ogc:Filter> "
								+ "<ogc:BBOX> "
								+ "<ogc:PropertyName>geom</ogc:PropertyName> "
								+ "<gml:Envelope srsName=\"EPSG:900913\"> "
								+ "<gml:lowerCorner>"
								+ x1
								+ " "
								+ y1
								+ "</gml:lowerCorner>"
								+ "<gml:upperCorner>"
								+ x2
								+ " "
								+ y2
								+ "</gml:upperCorner>"
								+ "</gml:Envelope>"
								+ "</ogc:BBOX>"
								+ "</ogc:Filter> "
								+ "</wfs:Query> "
								+ "</wfs:GetFeature> ";

						var request = new OpenLayers.Request.POST({
							url : contextPath + "/wfs",
							data : xmlPara,
							callback : callbackSelectRoad
						});

					}
				}
			});
}

// 根据x0,y0 x1,y1两个点，按照给定的偏移量，构建一个矩形区域
function constructBound(offset) {
	var offsetX, offsetY;
	offsetX = x1 - x2;
	if (offsetX < 0) {
		offsetX = -offsetX;
	}

	offsetY = y1 - y2;
	if (offsetY < 0) {
		offsetY = -offsetY;
	}

	// 按照y偏移量来构建矩形
	if (offsetX > offsetY) {
		if (y1 > y2) {
			y1 += offset;
			y2 -= offset;
		} else {
			y1 -= offset;
			y2 += offset;
		}
	}
	// 按照x偏移量来构建
	else {
		if (x1 > x2) {
			x1 += offset;
			x2 -= offset;
		} else {
			x1 -= offset;
			x2 += offset;
		}
	}
}

var rect;
function drawRec() {
	var bound = new OpenLayers.Bounds();
	bound.extend(new OpenLayers.LonLat(x1, y1));
	bound.extend(new OpenLayers.LonLat(x2, y2));

	rect = bound.toGeometry();
	var rectStyle = OpenLayers.Util.extend({},
			OpenLayers.Feature.Vector.style['default']);
	rectStyle.fillColor = "#ff0000";
	rectStyle.fillOpacity = 0.1;
	var rectFeature = new OpenLayers.Feature.Vector(rect);
	rectFeature.style = rectStyle;
	recLayer.addFeatures(rectFeature);
}
// 
function callbackSelectRoad(req) {
	var gml = new OpenLayers.Format.GML();
	var features = gml.read(req.responseText);
	var lineStringArray = new Array();
	if (features.length > 0) {
		for ( var i in features) {
			lineStringArray.push(features[i].geometry.components[0]);
		}
		var selectRoad = new OpenLayers.Geometry.MultiLineString(
				lineStringArray);
		var selectRoadFeature = new OpenLayers.Feature.Vector(selectRoad);
		selectRoadFeature.style = greenStyle;
		recLayer.addFeatures(selectRoadFeature);

	}
}

function popWindow() {
	testAddVdMarker();

	popup = new OpenLayers.Popup("chicken", new OpenLayers.LonLat(
			12536322.40479, 3168835.46773), new OpenLayers.Size(344, 325),
			"example popup", true);

	// popup = OpenLayers.Popup.Anchored("chicken",
	// new OpenLayers.LonLat(12536322.40479,3168835.46773),
	// new OpenLayers.Size(344,325),
	// "example popup",
	// null,
	// true);
	popup.panMapIfOutOfView = true;

	map.addPopup(popup, true);

	// popup.div.style.backgroundColor = "red";
	// popup.div.style.opacity = 0.2;
	popup.div.style.backgroundImage = "url('../js/OpenLayers/img/popup.png')";

}

function measureDistance() {
	measureStart();
}

function displayRs() {
	map.addLayer(roadStatusLayers);
	map.removeLayer(tiled);
	//	
	// map.addLayer(tiled);
	// map.removeLayer(roadStatusLayers);
}

var myRoad;
var points = new Array();

/**
 * 选择初始点
 */
function selectStartPoint() {
	var drawLayer = new OpenLayers.Layer.Vector({
		name : "drawLayer"
	});
	var circleStyle = OpenLayers.Util.extend({},
			OpenLayers.Feature.Vector.style['default']);
	circleStyle.fillColor = "#ff0000";
	circleStyle.fillOpacity = 0.1;
	drawLayer.style = circleStyle;
	map.addLayer(drawLayer);

	xmlPara = "<wfs:GetFeature service='WFS' version='1.1.0' outputFormat='GML2' "
			+ "xmlns:wfs='http://www.opengis.net/wfs' "
			+ "xmlns:ogc='http://www.opengis.net/ogc' "
			+ "xmlns:gml='http://www.opengis.net/gml' "
			+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
			+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd'> "
			+ "<wfs:Query typeName='hn_postgis:changtanroads_line' srsName='EPSG:900913'> "
			+ "</wfs:Query> " + "</wfs:GetFeature> ";

	var request = new OpenLayers.Request.POST({
		url : contextPath + "/wfs",
		data : xmlPara,
		callback : initMyRoad
	});

	var clickFun = function(evt) {
		if (points.length >= 31) {
			alert(points.toString());
		}
		
		var lonlat = map.getLonLatFromPixel({
			x : evt.clientX,
			y : evt.clientY
		});

		var radius = 1100;
		var point = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
		// 创建一个1000m半径的圆圈
		var circle = new OpenLayers.Feature.Vector(
				new OpenLayers.Geometry.Polygon.createRegularPolygon(point,
						radius, 40, 0));
		drawLayer.addFeatures(circle);
		points.push(point);
		
//		lastPoint = point;
//
//		var geometrys = myRoad.getVertices();
//
//		for ( var j = 0; j < 50; j++) {
//
//			for ( var i in geometrys) {
//				var dis = lastPoint.distanceTo(geometrys[i]);
//				if ((dis <= radius + 200) && (dis > radius - 200)) {
//					if ((geometrys[i].y - lastPoint.y) > 50) {
//						// 创建一个1000m半径的圆圈
//						var cir = new OpenLayers.Feature.Vector(
//								new OpenLayers.Geometry.Polygon.createRegularPolygon(
//										geometrys[i], radius, 40, 0));
//						drawLayer.addFeatures(cir);
//						lastPoint = geometrys[i];
//						break;
//					}
//				}
//			}
//		}
	};

	map.events.register('click', null, clickFun);
}

function initMyRoad(req) {
	var gml = new OpenLayers.Format.GML();
	var features = gml.read(req.responseText);
	var lineStringArray = new Array();
	if (features.length > 0) {
		for ( var i in features) {
			lineStringArray.push(features[i].geometry.components[0]);
		}
		myRoad = new OpenLayers.Geometry.MultiLineString(lineStringArray);

	}
}
