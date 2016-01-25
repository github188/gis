com.bct.map.EncoderMarkerStyle = {  
    'bigEncoder':{  
        graphicWidth:24,  
        graphicHeight : 24,  
        graphicXOffset : -12,  
        graphicYOffset : -24,  
        externalGraphic : "scripts/map/img/channel2.png"  
    },  
    'smallEncoder':{  
        graphicWidth:16,  
        graphicHeight : 16,  
        graphicXOffset : -8,  
        graphicYOffset : -16,  
        externalGraphic : "scripts/map/img/channel.gif"  
    },  
    'selectStyle':{  
        pointerEvents: "visiblePainted",  
        border:"border:25 outset #ff88ff",  
        cursor: "pointer",  
        graphicWidth:24,  
        graphicHeight : 24,  
        graphicXOffset : -12,  
        graphicYOffset : -24,  
        externalGraphic : "scripts/map/img/channel2.png"      
    },  
    styleMap: new OpenLayers.StyleMap({  
                    "select": new OpenLayers.Style({pointRadius: 24})  
    })  
};  

com.bct.map.MarkerVectorLayer = OpenLayers.Class(OpenLayers.Layer.Vector,{   
    /**  
     * parameters  
     * attribute filer对象  
     */  
    getFeatureByAttribute :function(attributes){   
        var feature = null;   
        for(var i=0;i<this.features.length; ++i){   
            var attri = this.features[i].attributes;   
            var find = false;   
            for(var j in attributes){   
                if(attributes[j] == attri[j]){   
                    find = true;   
                }   
            }   
            if(find){   
                return this.features[i];    
            }              
        }   
       
    },   
    //添加Feature，是point显示为图片   
    addEncorderFeature:function(encNode,location){   
        if(encNode && this.repetitiveCheck(encNode.id)){   
            return;   
        }   
        var attributes = OpenLayers.Util.extend({}, encNode.attributes);   
        var enc_point = new OpenLayers.Geometry.Point(location.lon,location.lat);   
        var enc_Feature = new OpenLayers.Feature.Vector(enc_point,attributes,com.bct.map.EncoderMarkerStyle['smallEncoder']);   
        this.addFeatures([enc_Feature]);   
        if(encNode.attributes['lon']&&encNode.attributes['lat']&&encNode.attributes['lon'].length>0){   
            return;   
        }   
        this.updateChannel(encNode.id,location.lon,location.lat);   
    },   
    repetitiveCheck:function(entity_id){   
        if(this.getFeatureByAttribute({id:entity_id})){   
            return true;   
        }   
        return false;   
    },   
    updateChannel:function(channel_id,lon,lat){   
        Ext.Ajax.request({   
             url: 'deviceVideoEncoder.do?method=updateLonlat&id='+channel_id+"&lon="+lon+"&lat="+lat   
        });   
    },   
    channelMarkerClick:function() {   
        var features = this.selectedFeatures;   
        if(features.length >=0&&features[0]) {   
            feature = features[0];               
            var treeNodeAttribute = feature.attributes;   
            //显示信息         
        }   
    },   
    cartoonFeature :function(feature){   
        this.drawFeature(feature,com.bct.map.EncoderMarkerStyle['bigEncoder']);   
        var runner = new Ext.util.TaskRunner(1000);   
        var task = {   
            run:this.drawFeature,   
            scope:this,   
            args:[feature,com.bct.map.EncoderMarkerStyle['smallEncoder']],   
            interval: 1000  
        }   
        runner.start(task);   
    },   
    removeSelectFeature:function(){   
        var features = this.selectedFeatures;   
        for(var i=features.length-1; i>=0; i--) {   
            feature = features[i];   
            this.updateChannel(feature.attributes['id'],"","");   
        }   
        this.destroyFeatures(this.selectedFeatures);   
    },   
    monitorSelectFeature:function(){           
        var features = this.selectedFeatures;   
        if(features.length >=0&&features[0]) {   
            feature = features[0];               
            var treeNodeAttribute = feature.attributes;   
            var objId="mapAVShow"+treeNodeAttribute['id'];   
            //弹出窗口   
        }   
    }   
}); 

OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
				defaultHandlerOptions: {
                    'single': true,
                    'double': false,
                    'pixelTolerance': 0,
                    'stopSingle': false,
                    'stopDouble': false
                },

                initialize: function(options) {
                    this.handlerOptions = OpenLayers.Util.extend({}, 
                    		this.defaultHandlerOptions
                    );
                    OpenLayers.Control.prototype.initialize.apply(
                        this, arguments
                    ); 
                    this.handler = new OpenLayers.Handler.Click(
                        this, {
                            'click': this.trigger
                        }, this.handlerOptions
                    );
                }, 

                trigger: function(e) {
                    var lonlat = map.getLonLatFromPixel(e.xy);
                    alert("You clicked near " + lonlat.lat + " N, " + lonlat.lon + " E");
                }
			}
); 