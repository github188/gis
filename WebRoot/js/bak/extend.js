var filter = new OpenLayers.Filter.Logical({
		type: OpenLayers.Filter.Logical.AND,		
		filters: [
			new OpenLayers.Filter.Spatial({
				 type: OpenLayers.Filter.Spatial.INTERSECTS, //INTERSECTS, //相交OK
				 value: gemetry,
				 projection: "EPSG:4326"
			}),
			new OpenLayers.Filter.Comparison({//比较操作符
				 type: OpenLayers.Filter.Comparison.LIKE,
				 property: "cite:TDZL",
				 value: "*"+str+"*"
			})
		]
});

var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0(); 
var xml = new OpenLayers.Format.XML(); 
var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
			+ "<wfs:GetFeature service='WFS' version='1.0.0' "
			+ "xmlns:wfs='http://www.opengis.net/wfs' "
			+ "xmlns:gml='http://www.opengis.net/gml' "
			+ "xmlns:ogc='http://www.opengis.net/ogc' "
			+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
			+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
			+ "<wfs:Query typeName='cite:tz_zd_WGS84' srsName='EPSG:4326' >"
            + "<wfs:PropertyName>cite:TDZL</wfs:PropertyName>"
			+ xml.write(filter_1_0.write(filter))
            + "</wfs:Query>"
			+ "</wfs:GetFeature>";

var request = OpenLayers.Request.POST( {
		url : "http://localhost:8080/geoserver/wfs?",
		data : xmlPara,			
		callback : handler
});
				
function handler(req){
	var xmlDoc = req.responseXML;
	str = text.value;
	theNodes = xmlDoc.getElementsByTagName("cite:TDZL");
	fid = xmlDoc.getElementsByTagName("cite:tz_zd_WGS84");
	if(theNodes[0] == null){
		alert("未查到信息");
	}  
	for (i=0;i < theNodes.length; i++ ){  
			var fullName=theNodes[i].childNodes[0].nodeValue;
			if (fullName.indexOf(str) > -1 ){				
					var x = fid[i].attributes;
					var gml = "http://localhost:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cite:tz_zd_WGS84&featureid=" +x.getNamedItem("fid").nodeValue;
					OpenLayers.loadURL(gml,'', this, caller);
					selectArea = new OpenLayers.Layer.GML("GML",gml,{style:{fillColor: "green"}});
					map.addLayer(selectArea);		
			}
	}
}
		    
function caller(data){
	g =  new OpenLayers.Format.GML();
	features = g.read(data.responseText);
	var result;
	result ="<br>"
	result += "<ul><li><b>公司名: <\/b>"+features[0].attributes.QLR+"<\/li><\/ul>";
	result +="<ul><li><b>地名: <\/b>"+features[0].attributes.TDZL+"<\/li><\/ul>";
	result +="<ul><li><b>用地类型: <\/b>"+features[0].attributes.BZ+"<\/li><\/ul>";
	result +="<ul><li><b>面积: <\/b>"+features[0].attributes.SHAPE_Area+"<\/li><\/ul>";;
	document.getElementById("result").innerHTML = result;
	point = features[0].geometry.getCentroid()
	map.setCenter(new OpenLayers.LonLat(point.x, point.y),15);
}