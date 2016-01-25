/**
 * WebGis调用C#客户端函数接口
 */
var errorCode_cs = "-1";

/**
 * APIFunction:Loaded 地图加载完毕后通知
 */
function _Loaded() {
	window.external.Loaded();
}

/**
 * APIFunction：添加标注点-回调 msg：标注点信息
 */
function _AddMarker(msg) {
	window.external.AddMarker(msg);
}

/**
 * APIFunction:标注点左键单击事件 msg:标注点信息
 */
function _Click(msg) {
	window.external.Click(msg);
}

/**
 * APIFunction:隧道拖拽完成后通知当前位置事件 msg:标志比列0-1之间的值
 */
function _DragZoom(msg) {
	
	window.external.DragZoom(msg);
}

/**
 * APIFunction:FullScreen 全屏|退出全屏 isFull:true 全屏,false 退出全屏
 */
function _FullScreen(isFull) {
	if (isFull) {
		window.external.FullScreen(true);
	} else {
		window.external.FullScreen(false);
	}
}

/**
 * APIFunction：返回地图中心点坐标-回调
 */
function _GetMapCenter(lon, lat, zoom) {
	window.external.GetMapCenter(lon, lat, zoom);// 回调
}

/**
 * APIFunction：保存标注点信息-回调
 */
function _SaveMarkers(arystr) {
	window.external.SaveMarkers(arystr);
}

/**
 * APIFunction：取消
 */
function _concelEdite(arystr) {
	window.external.ConcelEdite();
}

/**
 * APIFunction:窗口上下|左右拉伸
 */
function _LayoutChange(expand) {
	window.external.LayoutChange(expand);
}

/**
 * function:图例隐藏
 */
function hiddenIcon() {
	$(".icon").hide();
	$(".icon_mini").show();
}
/**
 * function:图例显示
 */
function openIcon() {
	$(".icon").show();
	$(".icon_mini").hide();
}
/**
 * function:面板隐藏->下
 */
function toDown() {
	$(".down").hide();
	$(".up").show();
	doException(_LayoutChange, "bottomUnExpand");
}
/**
 * function:面板显示->上
 */
function toUp() {
	$(".down").show();
	$(".up").hide();
	doException(_LayoutChange, "bottomExpand");
}
/**
 * function:面板显示->左
 */
function toLeft() {
	$(".left").hide();
	$(".right").show();
	doException(_LayoutChange, "rightExpand");
}
/**
 * function:面板隐藏->右
 */
function toRight() {
	$(".left").show();
	$(".right").hide();
	doException(_LayoutChange, "rightUnExpand");
}

/**
 * 测距工具开启
 */
function measureStart() {
	if (!measureControl) {
		measureControl = new OpenLayers.Control.Measure(
				OpenLayers.Handler.Path, {
					persist : true
				});
		map.addControl(measureControl);

		measureControl.events.on({
			measure : function(measure) {
				alert(measure.measure.toFixed(3) + "公里");
				measureEnd();
			}
		});
	}
	measureControl.activate();
}

/**
 * 测距工具关闭
 */
function measureEnd() {
	if (measureControl) {
		measureControl.cancel();
		measureControl.deactivate();
	}
}

/**
 * 展示实时路况
 */
function displayRoadStatus() {
	map.addLayer(roadStatusLayers);
	map.removeLayer(tiled);
}

/**
 * 关闭实时路况展示
 */
function hideRoadStatus() {
	map.addLayer(tiled);
	map.removeLayer(roadStatusLayers);
}

/**
 * 关闭实时路况展示
 */
function _eventSearchCompleted(type,result,r){
	window.external.eventSearchCompleted(result,type,r);
}

/**
 * 关闭实时路况展示
 */
function _eventSelectionChanged(id,state){
	
	window.external.eventSelectionChanged(id,state);	
}

/**
 * 客户端端打印输出
 */
function _clientConsole(info){
	window.external.Console(info);
}

/**
 * 设备控制响应
 */
function _deviceControl(device){
	window.external.DeviceControl(device);
}

/**
 * 流量统计请求
 */
function _transparentNotify(a,b,c){


	window.external.TransparentNotify(a,b,c);
	// test();
}

function test(){

}
