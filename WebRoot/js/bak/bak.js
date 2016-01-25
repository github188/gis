OpenLayers.Control.PanZoomBar.prototype.draw = function(px) { 
        // initialize our internal div 
        OpenLayers.Control.prototype.draw.apply(this, arguments); 
        px = this.position.clone(); 

        // place the controls 
        this.buttons = []; 

        var sz = new OpenLayers.Size(18,18); 
        var centered = new OpenLayers.Pixel(px.x+sz.w/2, px.y); 
        var wposition = sz.w; 

        if (this.zoomWorldIcon) { 
            centered = new OpenLayers.Pixel(px.x+sz.w, px.y); 
        } 

        //this._addButton("panup", "north-mini.png", centered, sz); 
        px.y = centered.y+sz.h; 
        //this._addButton("panleft", "west-mini.png", px, sz); 
        if (this.zoomWorldIcon) { 
            this._addButton("zoomworld", "zoom-world-mini.png", px.add(sz.w, 0), sz); 

            wposition *= 2; 
        } 
        //this._addButton("panright", "east-mini.png", px.add(wposition, 0), sz); 
        //this._addButton("pandown", "south-mini.png", centered.add(0, sz.h*2), sz); 
        this._addButton("zoomin", "zoom-plus-mini.png", centered.add(0, sz.h*3+5), sz); 
        centered = this._addZoomBar(centered.add(0, sz.h*4 + 5)); 
        this._addButton("zoomout", "zoom-minus-mini.png", centered, sz); 
        return this.div; 
} 


function imageInit() {
	//全局路径初始化
	contextPath = $("#contextPath").val();
	//背景图路径
	var baseImage = contextPath + "/img/Tunnel_bg.jpg";
	//全局Map对象
	map = new OpenLayers.Map("map");
	//绑定界限
	var bounds = new OpenLayers.Bounds();
	bounds.extend(new OpenLayers.LonLat(0,0));//left、bottom
	bounds.extend(new OpenLayers.LonLat(1920,1080));//right、top
	bounds.toBBOX();
	//
	var size = new OpenLayers.Size(1920, 1080);
	var options = {isBaseLayer:true, numZoomLevels:3};
	//
	var graphic = new OpenLayers.Layer.Image("Tunnel", baseImage, bounds, size, options);
	graphic.events.on({loadstart:function () {
			//console.log("loadstart");
	}, loadend:function () {
			//console.log("loadend");
	}});
	map.addLayer(graphic);
	// add Control
	map.addControl(new OpenLayers.Control.LayerSwitcher({}));
	map.addControl(new OpenLayers.Control.PanZoomBar({
		position:new OpenLayers.Pixel(2,15)
	}));
	map.zoomToMaxExtent();
	//
	setVectors();
	/*
	var backgroundGraphic = contextPath + "/img/Cms_bg.png";
	vectorLayer1 = new OpenLayers.Layer.Vector("Simple Geometry", {
                styleMap: new OpenLayers.StyleMap({
                	'default':{
                		externalGraphic: backgroundGraphic,
            			graphicZIndex: 10,
            			pointRadius: 40,
            			fillOpacity: 0.5,
                 		pointerEvents: "visiblePainted",
                    	// label with \n linebreaks
                    	label : "${type}",
                    	fontColor: "${favColor}",
                    	fontSize: "12px",
                    	fontFamily: "Courier New, monospace",
                    	fontWeight: "bold",
                    	labelAlign: "${align}",
                    	labelXOffset: "${xOffset}",
                    	labelYOffset: "${yOffset}"
                	},
                	'select':{
                		externalGraphic: backgroundGraphic,
            			graphicZIndex: 10,
            			pointRadius: 40,
            			fillOpacity: 0.5,
                 		pointerEvents: "visiblePainted",
                    	// label with \n linebreaks
                    	label : "${type}",
                    	fontColor: "${favColor}",
                    	fontSize: "12px",
                    	fontFamily: "Courier New, monospace",
                    	fontWeight: "bold",
                    	labelAlign: "${align}",
                    	labelXOffset: "${xOffset}",
                    	labelYOffset: "${yOffset}"
                	}
                })
            });
            
	 var point = new OpenLayers.Geometry.Point(200, 600);
     var pointFeature = new OpenLayers.Feature.Vector(point);
     pointFeature.attributes = {
     		type:"雨天路滑\r\n注意缓行",
          	favColor: 'red',
          	align: "cm"
      };
            
	map.addLayer(vectorLayer1);
    vectorLayer1.addFeatures([pointFeature]);
    var channelDrag = new OpenLayers.Control.DragFeature(vectorLayer1);
	map.addControl(channelDrag);
	channelDrag.activate();
	
	
	var style = new OpenLayers.Style({label:"${type}",fontColor:"#FF0000", fontFamily:"sans-serif", fontWeight:"bold", fontSize:15});
	var point = new OpenLayers.Geometry.Point(200, 300);
	vectorLayer = new OpenLayers.Layer.Vector("labelLayer", {styleMap:new OpenLayers.StyleMap(style)});
	var feature = new OpenLayers.Feature.Vector(point);
	feature.attributes = {type:"雨天路滑\r\n注意缓行hahahaha", fontColor:"#FF0000"};
	var feature = [feature];
	map.addLayer(vectorLayer);
	vectorLayer.addFeatures(feature);
	
	setFeatureSelect();*/
}

/**
 * function:测试添加标注
 */
function drawFeatures(num,vector) {
	var DIAMETER = 200;
	var NUMBER_OF_FEATURES = num;
	vector.removeFeatures(vector.features);
    // Create features at random around the center.
    var center = map.getViewPortPxFromLonLat(map.getCenter());
    // Add the ordering features. These are the gold ones that all have the same z-index
    var features = [];
    for (var index = 0; index < NUMBER_OF_FEATURES; index++) {
        	// features negative.
			var x = (parseInt(Math.random() * DIAMETER)) - (DIAMETER / 2);
        	var y = (parseInt(Math.random() * DIAMETER)) - (DIAMETER / 2);
          
          	var pixel = new OpenLayers.Pixel(center.x + x, center.y + y);
          
          	var lonLat = map.getLonLatFromPixel(pixel);
          	var feature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(lonLat.lon, lonLat.lat));
            feature.msg = '{id:"'+index+'", sn:"'+index+'", x:"'+lonLat.lon+'", y:"'+lonLat.lat+'", type:"test"}';
          	features.push(feature);
      }
      vector.addFeatures(features);
}