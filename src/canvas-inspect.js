!function () {
	window.wrapContext = function (ctx) {
		var isRecording = false,
			frames = [],
			savedVars = {
				"imageSmoothingEnabled": ctx.imageSmoothingEnabled,
				"webkitImageSmoothingEnabled": ctx.webkitImageSmoothingEnabled,
				"webkitBackingStorePixelRatio": ctx.webkitBackingStorePixelRatio,
				"fillStyle": ctx.fillStyle,
				"strokeStyle": ctx.strokeStyle,
				"textBaseline": ctx.textBaseline,
				"textAlign": ctx.textAlign,
				"font": ctx.font,
				"currentPath": ctx.currentPath,
				"lineDashOffset": ctx.lineDashOffset,
				"shadowColor": ctx.shadowColor,
				"shadowBlur": ctx.shadowBlur,
				"shadowOffsetY": ctx.shadowOffsetY,
				"shadowOffsetX": ctx.shadowOffsetX,
				"miterLimit": ctx.miterLimit,
				"lineJoin": ctx.lineJoin,
				"lineCap": ctx.lineCap,
				"lineWidth": ctx.lineWidth,
				"globalCompositeOperation": ctx.globalCompositeOperation,
				"globalAlpha": ctx.globalAlpha,
				"canvas": ctx.canvas
			};

		this.imageSmoothingEnabled = ctx.imageSmoothingEnabled;
		this.webkitImageSmoothingEnabled = ctx.webkitImageSmoothingEnabled;
		this.webkitBackingStorePixelRatio = ctx.webkitBackingStorePixelRatio;
		this.fillStyle = ctx.fillStyle;
		this.strokeStyle = ctx.strokeStyle;
		this.textBaseline = ctx.textBaseline;
		this.textAlign = ctx.textAlign;
		this.font = ctx.font;
		this.currentPath = ctx.currentPath;
		this.lineDashOffset = ctx.lineDashOffset;
		this.shadowColor = ctx.shadowColor;
		this.shadowBlur = ctx.shadowBlur;
		this.shadowOffsetY = ctx.shadowOffsetY;
		this.shadowOffsetX = ctx.shadowOffsetX;
		this.miterLimit = ctx.miterLimit;
		this.lineJoin = ctx.lineJoin;
		this.lineCap = ctx.lineCap;
		this.lineWidth = ctx.lineWidth;
		this.globalCompositeOperation = ctx.globalCompositeOperation;
		this.globalAlpha = ctx.globalAlpha;
		this.canvas = ctx.canvas;

		this.save = function () { addEvent("save", arguments); };
		this.restore = function () { addEvent("restore", arguments); };
		this.scale = function () { addEvent("scale", arguments); }
		this.rotate = function () { addEvent("rotate", arguments); };
		this.translate = function () { addEvent("translate", arguments); };
		this.transform = function () { addEvent("transform", arguments); };
		this.setTransform = function () { addEvent("setTransform", arguments); };
		this.createLinearGradient = function () { addEvent("createLinearGradient", arguments); };
		this.createRadialGradient = function () { addEvent("createRadialGradient", arguments); };
		this.setLineDash = function () { addEvent("setLineDash", arguments); };
		this.getLineDash = function () { addEvent("getLineDash", arguments); };
		this.clearRect = function () { addEvent("clearRect", arguments); };
		this.fillRect = function () { addEvent("fillRect", arguments); };
		this.beginPath = function () { addEvent("beginPath", arguments); };
		this.closePath = function () { addEvent("closePath", arguments); };
		this.moveTo = function () { addEvent("moveTo", arguments); };
		this.lineTo = function () { addEvent("lineTo", arguments); };
		this.quadraticCurveTo = function () { addEvent("quadraticCurveTo", arguments); };
		this.bezierCurveTo = function () { addEvent("bezierCurveTo", arguments); };
		this.arcTo = function () { addEvent("arcTo", arguments); };
		this.rect = function () { addEvent("rect", arguments); };
		this.arc = function () { addEvent("arc", arguments); };
		this.fill = function () { addEvent("fill", arguments); };
		this.stroke = function () { addEvent("stroke", arguments); };
		this.clip = function () { addEvent("clip", arguments); };
		this.isPointInPath = function () { addEvent("isPointInPath", arguments); };
		this.isPointInStroke = function () { addEvent("isPointInStroke", arguments); };
		this.measureText = function () { addEvent("measureText", arguments); };
		this.setAlpha = function () { addEvent("setAlpha", arguments); };
		this.setCompositeOperation = function () { addEvent("setCompositeOperation", arguments); };
		this.setLineWidth = function () { addEvent("setLineWidth", arguments); };
		this.setLineCap = function () { addEvent("setLineCap", arguments); };
		this.setLineJoin = function () { addEvent("setLineJoin", arguments); };
		this.setMiterLimit = function () { addEvent("setMiterLimit", arguments); };
		this.clearShadow = function () { addEvent("clearShadow", arguments); };
		this.fillText = function () { addEvent("fillText", arguments); };
		this.strokeText = function () { addEvent("strokeText", arguments); };
		this.setStrokeColor = function () { addEvent("setStrokeColor", arguments); };
		this.setFillColor = function () { addEvent("setFillColor", arguments); };
		this.strokeRect = function () { addEvent("strokeRect", arguments); };
		this.drawImage = function () { addEvent("drawImage", arguments); };
		this.drawImageFromRect = function () { addEvent("drawImageFromRect", arguments); };
		this.setShadow = function () { addEvent("setShadow", arguments); };
		this.putImageData = function () { addEvent("putImageData", arguments); };
		this.webkitPutImageDataHD = function () { addEvent("webkitPutImageDataHD", arguments); };
		this.createPattern = function () { addEvent("createPattern", arguments); };
		this.createImageData = function () { addEvent("createImageData", arguments); };
		this.getImageData = function () { addEvent("getImageData", arguments); };
		this.webkitGetImageDataHD = function () { addEvent("webkitGetImageDataHD", arguments); };

		function checkStates() {
			for (var x in savedVars) {
				if (savedVars[x] != this[x] && typeof savedVars[x] !== "object") {
					ctx[x] = this[x];
					addEvent(x, [savedVars[x], ctx[x]]);
					savedVars[x] = ctx[x];
				}
			}
		}

		function addEvent(thisp, args) {
			if (isRecording) {
				var curFrame = frames[frames.length - 1];
				if (typeof ctx[thisp] !== "function") {
					curFrame.events.push(new stateChange(thisp, args[0], args[1]));
				}
				else {
					checkStates();
					ctx[thisp].apply(ctx, args);
					curFrame.events.push(new functionCall(thisp, args));
				}
			}
		}

		function stateChange(n, ov, nv) {
			this.type = "S";
			this.name = n;
			this.oldValue = ov;
			this.newValue = nv;
		}

		function functionCall(f, args) {
			this.type = "F";
			this.name = f;
			this.args = args;
		}

		function frame() {
			this.events = [];
		}

		this.startRecording = function () {
			isRecording = true;
			frames.push(new frame());
			checkStates();
			for (var name in savedVars) {
				addEvent(name, [savedVars[name], ctx[name]]);
			}
		}

		this.stopRecording = function () {
			isRecording = false;
		}

		this.replayFrame = function (idx, delay) {
			if (!idx || idx === -1) idx = frames.length - 1;
			if (!delay) delay = 0;
			var frameToReplay = frames[idx];
			var events = frameToReplay.events;
			var replayFunc = function (i) {
				var ev = events[i];
				switch (ev.type) {
					case "S":
						ctx[ev.name] = ev.newValue;
						break;
					case "F":
						ctx[ev.name].apply(ctx, ev.args);
						break;
				}
				if (i < events.length - 1) {
					setTimeout(function () {
						replayFunc(i + 1);
					},  (ev.type == "F") ? delay : 0);
				}
			}
			replayFunc(0);
		}

		return this;
	}
}();
