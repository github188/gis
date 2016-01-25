OpenLayers.Popup.FramedWindow = OpenLayers.Class(OpenLayers.Popup.Framed, {
	autoSize : true,
	panMapIfOutOfView : true,
	contentClassName:"olwidgetPopupContent",
	fixedRelativePosition : false,

	positionBlocks : {
		"tl" : {
			'offset' : new OpenLayers.Pixel(14, 0),
			'padding' : new OpenLayers.Bounds(5, 14, 25, 5),
			'blocks' : [ {
				className : 'olwidgetPopupStemTL',
				size : new OpenLayers.Size(40, 16),
				anchor : new OpenLayers.Bounds(null, 4, 32, null),
				position : new OpenLayers.Pixel(0, -28)
			} ]
		}

	},

	initialize : function(id, lonlat, contentSize, contentHTML, anchor,
			closeBox, closeBoxCallback, relativePosition, separator) {
		if (relativePosition && relativePosition != 'auto') {
			this.fixedRelativePosition = true;
			this.relativePosition = relativePosition;
		}
		if (separator === undefined) {
			this.separator = ' of ';
		} else {
			this.separator = separator;
		}

		this.olwidgetCloseBox = closeBox;
		this.olwidgetCloseBoxCallback = closeBoxCallback;
		this.page = 0;
		OpenLayers.Popup.Framed.prototype.initialize.apply(this, [ id, lonlat,
				contentSize, contentHTML, anchor, false, null ]);
	},

	/*
	 * 构造popup内部容器。
	 */
	setContentHTML : function(contentHTML) {
		if (contentHTML !== null && contentHTML !== undefined) {
			this.contentHTML = contentHTML;
		}

		if (this.contentDiv !== null) {
			var popup = this;

			// 清空旧数据
			this.contentDiv.innerHTML = "";

			// 创建内部容器
			var containerDiv = document.createElement("div");
			containerDiv.innerHTML = this.contentHTML;
			containerDiv.className = this.contentClassName;
			this.contentDiv.appendChild(containerDiv);
			// this.contentDiv.style.zIndex=2;
			// 创建关闭按钮

			this.olwidgetCloseBox
					&& this.addCloseBox(this.olwidgetCloseBoxCallback,
							containerDiv);
			if (this.autoSize) {
				this.registerImageListeners();
				var temp = this.updateSize();
				temp = null;
			}
		}
	},

	/*
	 * 重写createBlocks：使用CSS样式而不是特定的img图片
	 */
	createBlocks : function() {
		this.blocks = [];

		var firstPosition = null;
		for ( var key in this.positionBlocks) {
			firstPosition = key;
			break;
		}

		var position = this.positionBlocks[firstPosition];
		for ( var i = 0; i < position.blocks.length; i++) {
			// var tempSize = getSafeContentSize();
			var block = {};
			this.blocks.push(block);

			var divId = this.id + '_FrameDecorationDiv_' + i;
			block.div = OpenLayers.Util.createDiv(divId, null, null, null,
					"absolute", null, "hidden", null);
			this.groupDiv.appendChild(block.div);
		}
	},

	/*
	 * 重写updateBlocks
	 */
	updateBlocks : function() {
		if (!this.blocks) {
			this.createBlocks();
		}
		if (this.size && this.relativePosition) {
			var tmpheight= $(".olPopupContent").height();
			
			$("#selectPopup").height(tmpheight+19);
			
			var position = this.positionBlocks[this.relativePosition];
			for ( var i = 0; i < position.blocks.length; i++) {

				var positionBlock = position.blocks[i];
				var block = this.blocks[i];

				// adjust sizes
				var l = positionBlock.anchor.left;
				var b = positionBlock.anchor.bottom;
				var r = positionBlock.anchor.right;
				var t = positionBlock.anchor.top;

				// note that we use the isNaN() test here because if the
				// size object is initialized with a "auto" parameter, the
				// size constructor calls parseFloat() on the string,
				// which will turn it into NaN
				//
				var w = (isNaN(positionBlock.size.w)) ? this.size.w - (r + l)
						: positionBlock.size.w;

				var h = (isNaN(positionBlock.size.h)) ? this.size.h - (b + t)
						: positionBlock.size.h;

				block.div.style.width = (w < 0 ? 0 : w) + 'px';
				block.div.style.height = (h < 0 ? 0 : h) + 'px';

				block.div.style.left = (l !== null) ? l + 'px' : '';
				block.div.style.bottom = (b !== null) ? b + 'px' : '';
				block.div.style.right = (r !== null) ? r + 'px' : '';
				block.div.style.top = (t !== null) ? t + 'px' : '';

				block.div.className = positionBlock.className;
			}

			this.contentDiv.style.left = this.padding.left + "px";
			this.contentDiv.style.top = this.padding.top + "px";
		}
	},

	calculateNewPx : function(a) {
		var b = OpenLayers.Popup.Anchored.prototype.calculateNewPx.apply(this,
				arguments);

		if (this.size) {
			var firstPosition = null;
			for ( var key in this.positionBlocks) {
				firstPosition = key;
				break;
			}

			var position = this.positionBlocks[firstPosition];
			var block = position.blocks[0];
			block.anchor.right = this.size.w / 2;
			position.offset.x = this.size.w / 2 + 22;
		}

		return b = b.offset(this.positionBlocks[this.relativePosition].offset);
	},

	updateSize : function() {

		var curSize = OpenLayers.Popup.prototype.updateSize.apply(this,
				arguments);

		return curSize;

	},

	/*
	 * 重写addCloseBox
	 */
	addCloseBox : function(a, containerDiv) {
		this.closeDiv = OpenLayers.Util.createDiv(this.id + "_close", null, {
			w : 17,
			h : 17
		});
		this.closeDiv.className = "olwidgetPopupCloseBox";
		var b = this.getContentDivPadding();
		// this.closeDiv.style.right = -9 + "px";
		// this.closeDiv.style.top =-9 + "px";
		this.contentDiv.appendChild(this.closeDiv);
		a = a || function(a) {

			this.hide();
			OpenLayers.Event.stop(a);
		};

		OpenLayers.Event.observe(this.closeDiv, "touchend", OpenLayers.Function
				.bindAsEventListener(a, this));
		OpenLayers.Event.observe(this.closeDiv, "click", OpenLayers.Function
				.bindAsEventListener(a, this))

	},

	CLASS_NAME : "OpenLayers.Popup.FramedWindow "
});


/**
 * @author Administrator
 * 
 */
OpenLayers.Popup.TabPopup = OpenLayers
		.Class(
				OpenLayers.Popup.FramedWindow,
				{
					device : null,
					imgStyle : "style='border: currentColor;  margin-right: 5px; vertical-align: -2px;'",
					contentSpanStyle : "style=' padding: 6px 0px;margin:5px; width: 99px; height: 18px; text-align: center; line-height: 18px; cursor: pointer;vertical-align: bottom;'",
					imgRoot : contextPath,
					contentClassName : "olwidgetPopupContent",

					initialize : function(id, feature, closeBoxCallback,contentclassName) {
						this.device = feature;
						var content = null;
						if(contentclassName)
						this.contentClassName=contentclassName;
						imgRoot = contextPath;
						closeBoxCallback||(closeBoxCallback=this.closeBoxCallback);
						OpenLayers.Popup.FramedWindow.prototype.initialize
								.apply(this, [
										id,
										feature.geometry.getBounds()
												.getCenterLonLat(), null,content,null,true,
										 closeBoxCallback,'tl', true]);

					},
					
					
					destroy: function() {
						
						var tempt= $("#tabHead span").unbind();
						
						this.device=null;
						this.imgStyle=null;
						this.contentSpanStyle=null;
						this.contentClassName=null;
						this.tabheadDivs=null;
						this.tabContentDivs=null;
						OpenLayers.Popup.FramedWindow.prototype.destroy.apply(this, arguments)
					},
					
					
					
					/**
					 * 关闭按钮回调
					 * 
					 */
					closeBoxCallback:function(){
						this.destroy();
					},
					
					updateSize : function() {

						var curSize = OpenLayers.Popup.prototype.updateSize.apply(this,
								arguments);

						this.updateImageLocation();
													
						return curSize;

					},

					/**
					 * 数据更新
					 * 
					 */
					upDate : function() {
					
						var spanDivs = this.contentDiv
								.getElementsByTagName('Div');

						if (spanDivs['content_runStatus'])
							spanDivs['content_runStatus'].innerHTML = this.createStateHtml();
					
						if (spanDivs['content_deviceStatus'])
							spanDivs['content_deviceStatus'].innerHTML = this.createWorkHtml();
						
						this.updateImageLocation();
					},

					/**
					 * 构造popup内部容器。
					 */
					setContentHTML : function(contentHTML) {
						contentHTML = this.createContentHTML(1);
						if (contentHTML !== null && contentHTML !== undefined) {
							this.contentHTML = contentHTML;
						}
						if (this.contentDiv !== null) {
							var popup = this;

							// 清空旧数据
							this.contentDiv.innerHTML = "";

							// 创建内部容器
							var containerDiv = document.createElement("div");
							containerDiv.innerHTML = this.contentHTML;
							containerDiv.className = this.contentClassName;
							this.contentDiv.appendChild(containerDiv);

							this.OnContentHTMLFilled(containerDiv);
							// this.contentDiv.style.zIndex=2;
							// 创建关闭按钮
							var temp = containerDiv.getElementsByTagName('img');

							this.olwidgetCloseBox
									&& this.addCloseBox(
											this.olwidgetCloseBoxCallback,
											containerDiv);
							if (this.autoSize) {
								this.registerImageListeners();
								var temp = this.updateSize();
								temp = null;
							}

							// if(event.currentTarget.style.background-color=='fbfbfb')alert(1);
						}
					},

					tabheadDivs : new Array(),
					tabContentDivs : new Array(),
					OnContentHTMLFilled : function(containerDiv) {
						
						var firstContent=null;
					
						$("#content_runStatus",containerDiv).length&&(firstContent=$("#content_runStatus",containerDiv)[0]);
						firstContent||($("#content_deviceStatus",containerDiv).length&&(firstContent=$("#content_deviceStatus",containerDiv)[0]));
						firstContent||($("#content_baseInfo",containerDiv).length&&(firstContent=$("#content_baseInfo",containerDiv)[0]));
						
						firstContent.style.display="";
						
						var spanDivs = containerDiv.getElementsByTagName('span');
						controlSpan = spanDivs['controlSpan'];
						if (controlSpan != null){							
							var msg = this.device.msg;
							var msgStr = JSON.stringify(msg);
							controlSpan.onclick = function() {
								if (msg.type == "17" || msg.type == "25"
										|| msg.type == "2" || msg.type == "100"
										|| msg.type == "110"|| msg.type == "100"
										|| msg.type == "124"|| msg.type == "121") {
								
									doException(_Click, msgStr);
								}

								if (msg.type == "26") {
									var controlSpan = this.ownerDocument
											.getElementById('controlSpan');
									if (controlSpan.innerText == "通行") {
										controlSpan.innerText = "禁行";
										this.ownerDocument
												.getElementById("stateSpan").innerText = "通行状态：通行";
									} else {
										controlSpan.innerText = "通行";
										this.ownerDocument
												.getElementById("stateSpan").innerText = "通行状态：禁行";
									}

									doException(_Click, msgStr);
								}

							};
						}
							

						

						var spanDivs = containerDiv.getElementsByTagName('div');
						var headdiv = spanDivs["tabHead"];
						var contentdiv = spanDivs["contentDivs"];
						if (headdiv == null || contentdiv == null)
							return;

						for ( var i = 0; i < headdiv.children.length; i++) {
							var temphead = headdiv.children[i];

							if (!temphead.id.match("head"))
								continue;

							var tempname = temphead.id.replace("head_", "");
							this.tabheadDivs[tempname] = temphead;

							for ( var j = 0; j < contentdiv.children.length; j++) {
								if (contentdiv.children[j].id == ("content_" + tempname))
									this.tabContentDivs[tempname] = contentdiv.children[j];
							}

							temphead.style.background = "url(../img/window/windowItem_selected.png)";
							if (i == 0)
								temphead.style.background = "url(../img/window/windowItem_normal.png)";

							temphead.style.padding = " 6px 0px 0px 0px";
							temphead.style.width = (312 / headdiv.children.length)
									+ "px";
							temphead.style.height = "25px";
							temphead.style.textAlign = "center";
							temphead.style.float = "left";
							temphead.style.cursor = "pointer";
							temphead.style.verticalAlign = "top";
							temphead.style.marginRight = "0px";
							if (i > 0) {
								temphead.style.borderLeft = "#cdcdd1 1px solid";
							}

						
							$(temphead).click($.proxy(this.onheadClick,this));
						}

					},

					onheadClick : function(arg) {
						var headdiv = $("#tabHead")[0];
						var contentdiv =$("#contentDivs")[0]; 
						var tempname = arg.target.id.replace("head_", "");
						for ( var i = 0; i < headdiv.children.length; i++) {
							var temphead = headdiv.children[i];
							if (!temphead.id.match("head"))
								continue;

							for ( var j = 0; j < contentdiv.children.length; j++) {
								if (contentdiv.children[j].id == ("content_" + tempname))
									contentdiv.children[j].style.display = "";
								else
									contentdiv.children[j].style.display = "none";
							}

							temphead.style.background = "url(../img/window/windowItem_selected.png)";
							if (temphead.id == "head_" + tempname)
								temphead.style.background = "url(../img/window/windowItem_normal.png)";
						}
						
						this.updateSize ();
					},

					/**
					 * 创建HTML
					 */
					createContentHTML : function() {

						var state = this.device.msg.type != "2";
						var contentHTML = "<div style=\"padding: 5px 0px; overflow: hidden; font-size: 12px;\">"
								+ this.createHeader();
						if (this.device.msg.type == "100"
								|| this.device.msg.type == "110"
								|| this.device.msg.type == "121"
								|| this.device.msg.type == "124")
							return contentHTML += this.createBaseInfoHtml()+"</div>";

					
						contentHTML += "</div>";
						contentHTML += "<div style=\"font-size: 12px;height:128px\">"
								+ "<div id=\"tabHead\" style=' overflow: hidden;'>";
						
						
					
						if (state)
							contentHTML += "<span id=\"head_runStatus\" "
									+ "<img " + this.imgStyle
									+ "src=\"../img/window/runstatus.png\">"
									+ "运行状态" + "</span>";

						contentHTML += "<span id=\"head_deviceStatus\""
								+ "<img "
								+ this.imgStyle
								+ "src=\"../img/window/deviceStatus.png\">"
								+ "设备状态"
								+ "</span>";
						
						contentHTML += "<span id=\"head_baseInfo\" " + "<img "
						+ this.imgStyle
						+ "src=\"../img/window/baseInfo.png\"/>"
						+ "基本信息" + "</span>";
						
						contentHTML += "</div>"
								+ "<div id=\"contentDivs\">"
								+ "<div id=\"content_deviceStatus\" style=\"padding: 5px 0px 0px 10px; height: 92px;display: none;\">"
								+ this.createWorkHtml() + "</div>";
						
						

						contentHTML += this.createBaseInfoHtml();

						if (state)
							contentHTML += "<div id=\"content_runStatus\"style=\"padding: 5px 0px 0px 10px;height: 92px;display: none;\">"
									+ this.createStateHtml() + "</div>";
						contentHTML += "</div></div>";
						
						var temp= $(contentHTML).html();
						
					
						return contentHTML;
					},

					/**
					 * 创建头
					 */
					createHeader : function() {
						// alert(JSON.stringify(this.device.msg));
						var msg = this.device.msg;
						var content = "<span style=\"margin:  5px 0px 0px 0px; padding: 0px 0px 0px 5px; color: rgb(0, 0, 0); width:240px; line-height: 18px; font-size: 14px;\">"
								+ msg.name + "</span>";

						if (msg.type == "110" || msg.type == "121"
								|| msg.type == "124" || msg.type == "100") {
							content = "<div style=\"width:312px; border-color: cdcdd1;border-style: solid; border-bottom-width: 1px;\"><span style=\"font-weight:bold; margin:  8px 0px 0px 0px; padding: 0px 0px 0px 5px; color: rgb(0, 0, 0); width:240px; line-height: 18px; font-size: 14px;\">"
									+ msg.name + "</span>" 
								    + "<span id=\"controlSpan\" style=\"background: ecebf0;border-style: solid;text-align: center;" +
								      "line-height: 18px;padding: 4px 0px 0px 0px;  border-color:#cdcdd1;border-width:1px; margin:  0px 0px 0px 15px;  width: 45px; height:21px; right:5px;cursor: pointer; \" >进入</span></div>";
						} else if (msg.type == "17" || msg.type == "25")
							content += "<span id=\"controlSpan\" style=\"background: url(../img/window/controlBg.png;); margin:  0px 0px 0px 15px;  width: 45px; height:21px; right:5px;cursor: pointer; \" ></span>";
						else if (msg.type == "26") {
							content += "<span id=\"controlSpan\" style=\"background: ecebf0;border-style: solid;text-align: center;line-height: 18px;padding: 4px 0px 0px 0px;  border-color:#cdcdd1;border-width:1px; margin:  0px 0px 0px 15px;  width: 45px; height:21px; right:5px;cursor: pointer; \" >禁行</span>";
						} else if (msg.type == "100" || msg.type == "110")
							content += "<span id=\"controlSpan\" style=\"background: ecebf0;border-style: solid;text-align: center;line-height: 18px;padding: 4px 0px 0px 0px;  border-color:#cdcdd1;border-width:1px; margin:  0px 0px 0px 15px;  width: 45px; height:21px; right:5px;cursor: pointer; \" >进入</span>";
						else if (msg.type == "2")
							content += "<span id=\"controlSpan\" style=\"background: ecebf0;border-style: solid;text-align: center;line-height: 18px;padding: 4px 0px 0px 0px;  border-color:#cdcdd1;border-width:1px; margin:  0px 0px 0px 15px;  width: 45px; height:21px; right:5px;cursor: pointer; \" >播放</span>";
						
						return content;
					},

					createBaseInfoHtml : function() {

						if (this.device.msg.type == "124")
							return "<div id=\"content_baseInfo\" style=\"padding: 5px 0px 0px 10px; height: 92px; display: none;\"><p style=\"padding-top:5px;\">机构："
									+ this.device.msg.organName + "</p></div>";
						
						if(this.device.msg.type=="100"){
							return "<div id=\"content_baseInfo\" style=\"padding: 5px 0px 0px 10px; height: 92px; display: none;\"><p style=\"padding-top:5px;\">机　　构："
							+ this.device.msg.organName + "</p><p style=\"padding-top:2px;\">桩　　号："
							+ this.device.msg.StakeNumber + "</p><p style=\"padding-top:2px;\">长　　度："
							+ this.device.msg.length+ "</p><p style=\"padding-top:2px;\">车 道 数："
							+ this.device.msg.laneNumber+ "</p></div>";
						}
						
						if(this.device.msg.type=="110"){
							return "<div id=\"content_baseInfo\" style=\"padding: 5px 0px 0px 10px; height: 92px;display: none; \"><p style=\"padding-top:5px;\">机　　构："
							+ this.device.msg.organName + "</p><p style=\"padding-top:2px;\">桩　　号："
							+ this.device.msg.StakeNumber + "</p><p style=\"padding-top:2px;\">长　　度："
							+ this.device.msg.length+ "</p></div>";
						}
						
						if(this.device.msg.type=="121"){
							
						   return "<div id=\"content_baseInfo\" style=\"padding: 5px 0px 0px 10px; height: 92px;display: none; \"><p style=\"padding-top:5px;\">机　构："
							+ this.device.msg.organName + "</p><p style=\"padding-top:2px;\">桩　号："
							+ this.device.msg.StakeNumber + "</p><p style=\"padding-top:2px;\">出口数："
							+ this.device.msg.ExitNumber+ "</p><p style=\"padding-top:2px;\">入口数："
							+ this.device.msg.EntranceNumber+ "</p></div>";
						}
							

						var contentHTML = "<div id=\"content_baseInfo\" style=\"padding: 5px 0px 0px 10px; height: 92px; display: none;\">"
								+ "<p style=\"padding-top:5px;\">机构："
								+ this.device.msg.organName
								+ "</p>"
								+ "<p style=\"padding-top:5px;\">编号："
								+ this.device.msg.standerNum + "</p>";
						if (this.device.msg.type != "100"
								&& this.device.msg.type != "110")
							contentHTML += "<p style=\"padding-top:5px;\">厂商："
									+ this.device.msg.facturer + "</p>"
									+ "<p style=\"padding-top:5px;\">桩号："
									+ this.device.msg.stakeNumber + "</p>";
						contentHTML += "</div>";

						return contentHTML;
					},

					/**
					 * 创建设备状态内容
					 */
					createStateHtml : function() {

						var msg = this.device.msg;
						if (msg.type == '10')
							return this.createVehicleHtml();
						else if (msg.type == '12')
							return this.createWeatherState();
						else if (msg.type == "17") {
							return this.createMessageState();
						} else if (msg.type == "25")
							return this.createTrafficlightsState();
						else if (msg.type == "26")
							return this.createLanelightsState();
						else if(msg.type=="29")
							return this.createViDetectorState();
						else if(msg.type=="30")
							return this.createRoadDetectorState();

						return "";
					},

					/**
					 * 创建车检器状态内容
					 */
					createVehicleHtml : function() {
						var msg = this.device.msg;
						var content = "<p><span style=\"width: 145px; float: left;\">上行大车流量："
								+ msg.UupFluxB
								+ "辆/分</span>"
								+ "<span style=\"margin: 5px 5px 0px 10px;\">上行小车流量："
								+ msg.UupFluxS
								+ "辆/分</span></p>"
								+ "<p><span style=\"width: 145px; float: left; \">下行大车流量："
								+ msg.DwFluxB
								+ "辆/分</span><span style=\"margin: 5px 5px 0px 10px;\">下行小车流量："
								+ msg.DwFluxS
								+ "辆/分</span></p>"
								+ "<p><span style=\"width: 145px; float: left;\">上行平均占有率："
								+ msg.UpOccup
								+ "%</span>"
								+ "<span style=\"margin: 5px 5px 0px 10px;\">下行平均占有率："
								+ msg.DwOccdown
								+ "%</span></p>"
								+ "<p><span style=\"width: 145px; float: left;\">上行平均速度："
								+ msg.UpSpeed
								+ "km/h</span>"
								+ "<span style=\"margin: 5px 5px 0px 10px;\">下行平均速度："
								+ msg.DwSpeed
								+ "km/h</span></p>"
								+ "<p><span style=\"width: 145px; float: left;\">上行流量："
								+ msg.UupFlux
								+ "辆/分</span>"
								+ "<span style=\"margin: 5px 5px 0px 10px;\">下行流量："
								+ msg.DwFlux + "辆/分</span></p>";

						return content;
					},

					/**
					 * 创建工作状态内容
					 */
					createWorkHtml : function() {
						if (this.device.msg.type == "100"
								|| this.device.msg.type == "110")
							return "";

						var content = "<div style='padding-top:5px'>" + "<span"
								+ this.contentSpanStyle + ">" + "<img "
								+ this.imgStyle + "src=\"";
						if (this.device.msg.workState == "0") {
							content += "../img/window/state_normal.png\">工作状态：正常";
						} else if (this.device.msg.workState == "1") {
							content += "../img/window/state_error.png\">工作状态：故障";
						} else if (this.device.msg.workState == "2") {
							content += "../img/window/state_error.png\">工作状态：不可控";
						}else if (this.device.msg.workState == "9") {
							content += "../img/window/state_error.png\">工作状态：报警";
						}
						content += "</span>" + "</div>"
								+ "<div style='padding-top:5px'>" + "<span"
								+ this.contentSpanStyle + ">" + "<img "
								+ this.imgStyle + "src=\"";
						if (this.device.msg.signalState == "0") {
							content += "../img/window/state_normal.png\">通信状态：正常";
						} else {
							content += "../img/window/state_error.png\">通信状态：异常";
						}

						content += "</span></div >";

						if (this.device.msg.type != "17")
							content += "<div style='padding-top:5px'>"
									+ "<span"
									+ this.contentSpanStyle
									+ ">"
									+ "<img "
									+ this.imgStyle
									+ "src=\"../img/window/state_normal.png\">报警状态：未报警</span></div >";

						content += "<div style='padding-top:5px'>" + "<span"
								+ this.contentSpanStyle + ">" + "<img "
								+ this.imgStyle
								+ "src=\"../img/window/gatherTime.png\">"
								+ this.device.msg.time + "</span></div>";
					
						return content;
					},

					/**
					 * 创建气象检测器运行状态
					 */
					createWeatherState : function() {

						var content = "<p ><span style=\"width: 145px; float: left;\">能  见  度："
								+ this.device.msg.Vis
								+ "m</span>"
								+ "<span style=\"margin: 5px 5px 0px 10px;\">风　　速："
								+ this.device.msg.WSpeed
								+ "m/s</span></p>"
								+ "<p><span style=\"width: 145px; float: left; \">风　　向："
								+ this.device.msg.WindDir
								+ "</span><span style=\"margin: 5px 5px 0px 10px;\">气　　温："
								+ this.device.msg.ATemp
								+ "℃</span></p>"
								+ "<p><span style=\"width: 145px; float: left;\">路面温度："
								+ this.device.msg.RTemp
								+ "℃</span>"
								+ "<span style=\"margin: 5px 5px 0px 10px;\">降  雨  量："
								+ this.device.msg.RainVol
								+ "mm</span></p>"
								+ "<p><span style=\"width: 145px; float: left;\">降  雪  量："
								+ this.device.msg.SnowVol
								+ "mm</span>"
								+ "<span style=\"margin: 5px 5px 0px 10px;\">路面状况："
								+ this.device.msg.Rsurface
								+ "</span></p>"
								+ "<p><span style=\"width: 145px; float: left;\">湿　　度："
								+ this.device.msg.Humi
								+ "％</span>"
								+ "</span></p>";

						return content;
					},

					/**
					 * 创建情报板运行状态
					 */
					createMessageState : function() {
						// alert( JSON.stringify(this.device.msg));
						var content = "<p style='padding-top:5px'><span style=\"width: 280px; float: left;\">显示内容："
								+ this.device.msg.content
								+ "</span></p>"
								+ "<p style='padding-top:5px'><span style=\"width: 145px; float: left; \">停留时间："
								+ this.device.msg.DispTime
								+ "秒</span><span style=\"margin: 5px 5px 0px 10px;\">字　　体："
								+ this.device.msg.Font
								+ "</span></p>"
								+ "<p style='padding-top:5px'><span style=\"width: 65px; float: left;\">颜　　色：</span>"
								+ "<span style=\"width: 20px; float: left;margin-right: 60px; background-color: "
								+ this.device.msg.favColor
								+ ";\"></span>"
								+ "<span style=\"margin: 5px 5px 0px 10px;\">字体大小："
								+ this.device.msg.Size + "</span></p>";
						
						if (this.device.msg.workState == "0")
							content="<p style='padding-top:5px'><span style=\"width: 280px; float: left;\">当前没有显示内容"								
								+ "</span></p>";
						else 
							content="<p style='padding-top:5px'><span style=\"width: 280px; float: left;\">显示内容获取失败"								
								+ "</span></p>";
							
						if(this.device.msg.img){
							
							 var mtop=(100-this.device.msg.imgHeight)/2-1;
							 content='<IMG style=\"margin: '+mtop+'px 0px '+mtop+'px 0px;\" SRC="data:image/gif;base64,'+this.device.msg.img+'" ALT="LeX">';
							 
							}
						

						return content;
					},
					
					/**
					 * 更图片位置
					 */
					updateImageLocation:function(){
						if(this.device.msg.type=="17"){
							var $container=$("#content_runStatus");
							$("img",$container).each(function(){
								var imgw=$(this).outerWidth();
								var containerw=$($container).innerWidth();
								containerw&&imgw&&$(this).css("margin-left",(containerw-imgw-15)/2);
							});
						}
					},

					/**
					 * 创建交通信号灯运行状态
					 */
					createTrafficlightsState : function() {
						var content = "<p style='padding-top:15px'><span style=\"width: 280px; float: left;\">信 号 灯："
								+ this.device.msg.TraffcState + "</span></p>";

						return content;
					},

					/**
					 * 创建车道指示灯运行状态
					 */
					createLanelightsState : function() {
						var content = "<p style='padding-top:15px'><span id=\"stateSpan\"; style=\"width: 280px; float: left;\">通行状态：";
						if (this.device.msg.TraffcState == "0")
							content += "禁行</span></p>";
						else
							content += "通行</span></p>";

						return content;
					},
					
					/**
					 * 创建交通信号灯运行状态
					 */
					createViDetectorState : function() {
						var content = "<p style='padding-top:15px'><span style=\"width: 280px; float: left;\">能见度："
								+(this.device.msg.VisAvg?this.device.msg.VisAvg:0) + "米</span></p>";

						return content;
					},
					
					/**
					 * 创建交通信号灯运行状态
					 */
					createRoadDetectorState : function() {
						var temp="干";
						switch(this.device.msg.SnowVol){
						case 0:temp="干";break;
						case 1:temp="潮";break;
						case 2:temp="湿";break;
						case 3:temp="潮并有化学品";break;
						case 4:temp="湿并有化学品";break;
						case 5:temp="霜";break;
						case 6:temp="雪";break;
						case 7:temp="冰";break;
						}
						
						var content = "<p style='padding-top:5px'><span style=\"width: 280px; float: left;\">路面状态："
							+temp + "</span></p>";
						
						 content += "<p style='padding-top:5px'><span style=\"width: 280px; float: left;\">路面温度："
								+(this.device.msg.RoadTempAvg?this.device.msg.RoadTempAvg:0) + "℃</span></p>";

						content += "<p style='padding-top:5px'><span style=\"width: 280px; float: left;\">降 雨 量："
							+(this.device.msg.RainVol?this.device.msg.RainVol:0) + "mm</span></p>";
						
						content += "<p style='padding-top:5px'><span style=\"width: 280px; float: left;\">降 雪 量："
							+(this.device.msg.SnowVol?this.device.msg.SnowVol:0) + "mm</span></p>";
						
						return content;
					},

					CLASS_NAME : "OpenLayers.Popup.TabPopup "
				});
