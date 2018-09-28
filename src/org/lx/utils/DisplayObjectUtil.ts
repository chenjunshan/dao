interface FlyObj {
	fps: number,
	gravity: number,//重力
	resilience: number,//弹力
	fadeTime: number,//可弹跳次数

	dis: egret.DisplayObject,
	offsetX: number,//停止时位置的x
	offsetY: number,//停止时位置的y

	direction: number,//运动方向
	hitOffsetY: number,//地平线与开始飞行的距离
	fadeCnt: number;//弹跳次数
	tParam: number,//运动时间
	flyAngle: number,//飞行角度
	flySpeed: number,//飞行速度
	flyRad: number,//飞行弧度
	flyAngleSpeed?: number,//飞行旋转速度

	completeFun?: Function,
	thisObj?: any
	isComplete?: boolean
	isSlide?: boolean//是否滑行
}
interface BezierObj {
	factor?: number,//(无需设置)
	dis: egret.DisplayObject,
	startPoint: egret.Point,
	middlePoint: egret.Point,
	endPoint: egret.Point,
	speed?: number,//运动速度（与运动时间任选一个，时间优先）
	time?: number,//运动时间（与运动速度任选一个，时间优先）
	ease?: Function,//egret.Ease.quadInOut
	changeFun?: Function,
	completeFun?: Function,
	thisObj?: any,
	isComplete?: boolean
}
class DisplayObjectUtil {
	public static removeObj(obj) {
		if (obj && obj.parent) {
			obj.parent.removeChild(obj);
		}
	}

	public static addObj(obj, root) {
		if (obj && !obj.parent && root) {
			root.addChild(obj);
		}
	}

	public static Fly(obj: FlyObj) {
		if (SystemUtil.isVoid(obj)) {
			console.error("Fly error: FlyObj为空");
			return;
		}
		obj.tParam += obj.fps;
		DisplayObjectUtil.FlyMove(obj, obj.flySpeed, obj.flyRad);
	}

	private static FlyMove(obj: FlyObj, speed, rad) {
		var x = speed * Math.cos(rad) * obj.tParam;
		var y = speed * Math.sin(rad) * obj.tParam - 1 / 2 * obj.gravity * SystemUtil.Square(obj.tParam) + obj.hitOffsetY;//v0*sina-1/2gt2
		var vx = speed * Math.cos(rad);//x轴上的运动速度			
		var vy = speed * Math.sin(rad) - obj.gravity * obj.tParam;//y轴上的运动速度
		var slope = -obj.gravity / SystemUtil.Square(speed) / SystemUtil.Square(Math.cos(rad)) * x + Math.sin(rad) / Math.cos(rad);//抛物线斜率					
		// if (obj.flyAngleSpeed) {
		// 	obj.dis.rotation += obj.flyAngleSpeed;
		// } else {
		// 	obj.dis.rotation = slope * obj.flyAngle;
		// }

		var dif = vx * obj.fps;
		/**
		 * 移动舞台部分
		*/
		// if (x + obj.offsetX > obj.flyStageDistance) {
		// 	this.stageMove(dif, x + obj.offsetX);//舞台一个时间间隔内移动的距离
		// } else {
		// 	obj.dis.x = x + obj.offsetX;
		// }
		obj.dis.x = obj.direction * x + obj.offsetX;
		obj.dis.y = obj.offsetY - y;

		if (y <= 0 && slope < 0) {
			//reset				
			obj.tParam = 0;
			obj.offsetX += obj.direction * x;
			obj.flySpeed = speed * obj.resilience / obj.fadeTime;
			obj.flyRad = rad * obj.resilience / obj.fadeTime;
			obj.fadeCnt++;
			obj.hitOffsetY = 0;
			if (obj.fadeCnt >= obj.fadeTime) {
				//end tw
				obj.isComplete = true;
				if (obj.isSlide) {
					egret.Tween.removeTweens(obj.dis);
					egret.Tween.get(obj.dis).to({ x: obj.dis.x + obj.direction * dif * 20 * Math.random() }, 200 * Math.random() + 300).call(() => {
						if (obj.completeFun && obj.thisObj) {
							obj.completeFun.call(obj.thisObj, obj.dis);
						}
					}, this);
				} else if (obj.completeFun && obj.thisObj) {
					obj.completeFun.call(obj.thisObj, obj.dis);
				}
			}
		}
	}

	public static BezierTween(obj: BezierObj) {
		if (SystemUtil.isVoid(obj)) {
			console.error("BezierTween error: BezierObj为空");
			return;
		}
		var time;
		if (SystemUtil.isVoid(obj.time) && !SystemUtil.isVoid(obj.speed)) {
			var len = SystemUtil.ParabolaLength(obj.startPoint, obj.middlePoint, obj.endPoint);
			time = len / obj.speed;
		} else {
			time = obj.time;
		}
		if (SystemUtil.isVoid(time)) {
			console.error("BezierTween error: 请设置运动速度或运动时间");
			return;
		}
		obj.isComplete = false;
		obj.factor = 0;
		egret.Tween.removeTweens(obj);
		egret.Tween.get(obj, {
			onChange: () => {
				if (obj.isComplete) {
					return;
				}
				DisplayObjectUtil.BezierTweenOnChange(obj, obj.factor);
				if (obj.changeFun && obj.thisObj) {
					obj.changeFun.call(obj.thisObj, obj.dis, obj.factor);
				}
			},
			onChangeObj: obj.thisObj
		}).to({ factor: 1 }, time, obj.ease).call(() => {
			obj.isComplete = true;
			obj.factor = 1;
			DisplayObjectUtil.BezierTweenOnChange(obj, obj.factor);
			if (obj.completeFun && obj.thisObj) {
				obj.completeFun.call(obj.thisObj, obj.dis);
			}
		});
	}

	private static BezierTweenOnChange(obj: BezierObj, value: number) {
		obj.dis.x = (1 - value) * (1 - value) * obj.startPoint.x
			+ 2 * value * (1 - value) * obj.middlePoint.x
			+ value * value * obj.endPoint.x;
		obj.dis.y = (1 - value) * (1 - value) * obj.startPoint.y
			+ 2 * value * (1 - value) * obj.middlePoint.y
			+ value * value * obj.endPoint.y;
	}

	//
	public static DrawSector(shape: egret.Shape, rotation: number, radius: number, color: number, alpha?: number, isDrawArc: boolean = true) {
		var angle = SystemUtil.AngleToRad(Math.floor(rotation));
		shape.graphics.clear();
		if (!isDrawArc && (rotation == 0 || rotation == 360)) {
			return;
		}
		shape.graphics.beginFill(color, alpha);
		shape.graphics.moveTo(0, 0);
		shape.graphics.drawArc(0, 0, radius, angle, 0, false);
		shape.graphics.lineTo(0, 0);
		shape.graphics.endFill();
	}

	public static getGradientColor(startColor: Array<number>, endColor: Array<number>, step: number, index: number) {
		var MaxValue = 255;
		var getValue = (num) => {
			var value = num
			if (value > MaxValue) {
				value = MaxValue;
			}
			return value;
		}
		var getDeltaColor = (startColor, endColor) => {
			var delta = (endColor - startColor) / step;
			return delta;
		}
		var getColorFun = (startColor, deltaColor, stepIndex) => {
			var d = stepIndex % step;
			var result = startColor + d * deltaColor;
			return result;
		}
		var hex = (x) => {
			return ("0" + parseInt(x).toString(16)).slice(-2);
		}
		var getColorNumFun = (tempR, tempG, tempB) => {
			var _hex = "0x" + (hex(getValue(tempR)) + hex(getValue(tempG)) + hex(getValue(tempB))).toUpperCase();
			return _hex;
		}

		var startR = startColor[0], startG = startColor[1], startB = startColor[2];
		var endR = endColor[0], endG = endColor[1], endB = endColor[2];
		var deltaR = getDeltaColor(startR, endR);
		var deltaG = getDeltaColor(startG, endG);
		var deltaB = getDeltaColor(startB, endB);
		var r = getColorFun(startR, deltaR, index);
		var g = getColorFun(startG, deltaG, index);
		var b = getColorFun(startB, deltaB, index);

		var gradientColor = getColorNumFun(r, g, b);
		return gradientColor;
	}

	public static loadSkin(obj: any, resName: string, callFun?: Function, thisObj?: any) {
		obj.skinName = SystemUtil.getResUrl(resName);
		if (obj.skin) {
			callFun.call(thisObj, obj.skin);
		} else {
			obj.addEventListener(eui.UIEvent.COMPLETE, (evt: eui.UIEvent) => {
				var skin = evt.target.skin as any;
				callFun.call(thisObj, skin);
			}, thisObj);
		}
	}
}