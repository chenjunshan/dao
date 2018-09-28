module game {
	export class HomeUI extends eui.Component {
		private isComplete: boolean;
		private mGameProxy: GameProxy;

		private pauseBtn: eui.Group;
		private clickG: eui.Group;
		private boxGroup: eui.Group;
		private fruitG: eui.Group;
		private yumiFruitG: eui.Group;
		private yumiGroup: eui.Group;
		private rewordBox: eui.Group;
		private knifeBox: eui.Group;
		private yumiKnifeBox: eui.Group;
		private knifeIcon: eui.Image;
		private curScoreBitMapLab: eui.BitmapLabel;
		private destroyPropBtn: eui.Group;
		private destroyPropNumLab: eui.Label;
		private slowPropBtn: eui.Group;
		private slowPropNumLab: eui.Label;
		private knifeNumG: eui.Group;
		private levelLab: eui.BitmapLabel;
		private rewordG: eui.Group;
		private titleG: eui.Group;
		private closeBtn: eui.Group;
		private iconRewordImg: eui.Image;
		private getRewordBtn: eui.Group;
		private rewordShareBtn: eui.Group;
		private propLabel: eui.Label;
		private infoG: eui.Group;
		private iconPropG: eui.Group;
		private levelRect1: eui.Rect;
		private levelRect2: eui.Rect;
		private levelRect3: eui.Rect;
		private levelRect4: eui.Rect;

		private knifeIconY: number;
		private knifeIconCenterX: number;
		private yumiKnifeBoxX: number;
		private knifeArr: any[];
		private rewordArr: any[] = [];
		private canThrow: boolean;
		private curTopScore: number;
		private knifeNum: number;
		private toRight: boolean;
		private moveX: number;
		private rotateSpeed: number;
		private slowNum: number;//使用减速道具次数

		private curLevel;

		public constructor() {
			super();
			this.isComplete = false;
			this.mGameProxy = <GameProxy><any>(ApplicationFacade.getInstance().retrieveProxy(GameProxy.NAME));
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = SystemUtil.getResUrl("HomeUISkin_exml");
		}

		public createCompleteEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			ApplicationFacade.getInstance().registerMediator(new HomeUIMediator(this));
			this.isComplete = true;
			this.initView();
			this.resizeUI();

			this.clickG.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickThis, this);
			this.pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pause, this);
			this.destroyPropBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
			this.slowPropBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.slow, this);
		}

		private destroy() {
			if (!this.hasEventListener(egret.Event.ENTER_FRAME)) {
				return;
			}
			if (GameData.destroyProp > 0 && this.knifeArr.length == 0) {
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "暂无飞刀可以粉碎");
			} else if (GameData.destroyProp > 0 && this.knifeArr.length > 0) {
				var img = new eui.Image();
				img.texture = RES.getRes("btn_destroy_prop_png");
				img.width = img.texture.$bitmapWidth;
				img.height = img.texture.$bitmapHeight;
				img.anchorOffsetX = img.width / 2;
				img.anchorOffsetY = img.height / 2;
				img.x = this.destroyPropBtn.x;
				img.y = this.destroyPropBtn.y;
				img.scaleX = img.scaleY = 2;
				this.addChild(img);
				GameData.destroyProp--;
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "使用碎刀石，减少靶上两把刀");
				egret.Tween.get(img).to({ x: this.width / 2, y: this.boxGroup.y, alpha: 0 }, 400).call(() => {
					this.removeChild(img);
					this.destroyPropNumLab.text = "碎刀石x" + GameData.destroyProp;
					this.reCurGame(true);
				}, this);
			}
		}

		private slow() {
			if (!this.hasEventListener(egret.Event.ENTER_FRAME)) {
				return;
			}
			if (GameData.slowProp > 0) {
				var img = new eui.Image();
				img.texture = RES.getRes("btn_slow_prop_png");
				img.width = img.texture.$bitmapWidth;
				img.height = img.texture.$bitmapHeight;
				img.anchorOffsetX = img.width / 2;
				img.anchorOffsetY = img.height / 2;
				img.x = this.slowPropBtn.x;
				img.y = this.slowPropBtn.y;
				img.scaleX = img.scaleY = 2;
				this.addChild(img);
				GameData.slowProp--;
				this.slowPropNumLab.text = "减速带x" + GameData.slowProp;
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "使用减速带，运动速度减半");
				egret.Tween.get(img).to({ x: this.width / 2, y: this.boxGroup.y, alpha: 0 }, 400).call(() => {
					this.removeChild(img);
					this.slowNum++;
				}, this);
			}
		}

		private pause() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_PAUSE);
		}

		public resizeUI() {
			this.width = Size.width;
			this.height = Size.height;
			if (window.innerHeight / window.innerWidth >= 2436 / 1125) {
				var scaleH = this.height / Size.height_design;
				this.knifeIcon.y *= scaleH;
				this.knifeIconY = this.knifeIcon.y;
			}
		}

		private boxGroupY: number;
		private yumiGroupY: number;
		private initView() {
			this.knifeIconY = this.knifeIcon.y;
			this.yumiKnifeBoxX = this.yumiKnifeBox.x;
			this.boxGroupY = this.boxGroup.y;
			this.yumiGroupY = this.yumiGroup.y;
			this.rewordG.visible = false;
			this.whiteCircle = new egret.Sprite();
			this.whiteCircle.graphics.beginFill(0xffffff);
			this.whiteCircle.graphics.drawCircle(this.boxGroup.width / 2, this.boxGroup.width / 2, this.boxGroup.width / 2);
			this.whiteCircle.graphics.endFill();
			this.whiteView = new egret.Sprite();
			this.whiteView.graphics.beginFill(0xffffff);
			this.whiteView.graphics.drawRect(0, 0, this.width, this.height);
			this.whiteView.graphics.endFill();
		}

		public onUpdate(data?) {

		}

		private op: number = 1;
		private setMoveTimer() {
			var min = 1, speed = 0.015;
			if (this.curLevel.type == 2) {
				min = 3;
			}
			if (this.curRotateSpeed < min) {
				this.op = 1;
			} else if (this.curRotateSpeed > this.curLevel.rotateSpeed * 1.8) {
				this.op = -1;
			}
			this.curRotateSpeed += this.op * speed;
		}

		private curRotateSpeed: number;
		private timerFunc() {
			if (this.slowNum != 0) {
				this.curRotateSpeed = this.curLevel.rotateSpeed / (GameConfig.slowNum * this.slowNum);
			}
			if (this.curLevel.type == 1) {
				if (this.curLevel.isOpposite == 1) {
					this.boxGroup.rotation += this.curRotateSpeed;
				} else if (this.curLevel.isOpposite == -1) {
					this.boxGroup.rotation -= this.curRotateSpeed;
				} else if (this.curLevel.isOpposite == 0) {
					if (!this.isOpposite) {
						this.boxGroup.rotation += this.curRotateSpeed;
					} else {
						this.boxGroup.rotation -= this.curRotateSpeed;
					}
				}
				var r = this.boxGroup.width / 2;
				for (var i = 0; i < this.knifeBox.numChildren; i++) {
					var child = this.knifeBox.getChildAt(i) as eui.Image;
					if (this.curLevel.isOpposite == 1) {
						child.rotation += this.curRotateSpeed;
					} else if (this.curLevel.isOpposite == -1) {
						child.rotation -= this.curRotateSpeed;
					} else if (this.curLevel.isOpposite == 0) {
						if (!this.isOpposite) {
							child.rotation += this.curRotateSpeed;
						} else {
							child.rotation -= this.curRotateSpeed;
						}
					}
					child.x = r - Math.sin(child.rotation * (Math.PI / 180)) * r;
					child.y = r + Math.cos(child.rotation * (Math.PI / 180)) * r;
				}
				for (var i = 0; i < this.rewordBox.numChildren; i++) {
					var child = this.rewordBox.getChildAt(i) as eui.Image;
					if (this.curLevel.isOpposite == 1) {
						child.rotation += this.curRotateSpeed;
					} else if (this.curLevel.isOpposite == -1) {
						child.rotation -= this.curRotateSpeed;
					} else if (this.curLevel.isOpposite == 0) {
						if (!this.isOpposite) {
							child.rotation += this.curRotateSpeed;
						} else {
							child.rotation -= this.curRotateSpeed;
						}
					}

					child.x = r - Math.sin((child.rotation - 180) * (Math.PI / 180)) * r;
					child.y = r + Math.cos((child.rotation - 180) * (Math.PI / 180)) * r;
				}
			} else if (this.curLevel.type == 2) {
				if (!this.toRight) {
					this.moveX += this.curRotateSpeed;
					this.yumiGroup.x += this.curRotateSpeed;
					this.yumiKnifeBox.x += this.curRotateSpeed;
					if (this.yumiGroup.x + (this.yumiGroup.width / 8) + this.curRotateSpeed >= this.width) {
						this.toRight = true;
					}
				} else {
					this.moveX -= this.curRotateSpeed;
					this.yumiGroup.x -= this.curRotateSpeed;
					this.yumiKnifeBox.x -= this.curRotateSpeed;
					if (this.yumiGroup.x - (this.yumiGroup.width / 8) - this.curRotateSpeed <= 0) {
						this.toRight = false;
					}
				}
			}
		}

		private clickThis() {
			if (!this.canThrow) {
				return;
			}
			if (GameData.music) { lx.Music.getInstance().play(music_type.knife_fly); }
			this.canThrow = false;
			var tw = egret.Tween.get(this.knifeIcon);
			var y;
			if (this.curLevel.type == 1) {
				y = this.boxGroup.y + this.boxGroup.height / 2 + this.knifeIcon.height;
			} else if (this.curLevel.type == 2) {
				y = this.yumiGroup.y + this.yumiGroup.height / 2 + this.knifeIcon.height;
			}
			if (this.whiteCircle && this.whiteCircle.parent) {
				this.whiteCircle.parent.removeChild(this.whiteCircle);
			}
			var speed = GameConfig.throwSpeed * (this.knifeIconY - y) / (this.knifeIconY - y + this.knifeIcon.height);
			tw.to({ y: y }, speed).call(this.twCallFun, this);
		}

		private flag: boolean;
		private setRewordViewByShare() {
			this.flag = true;
			this.infoG.scaleX = this.infoG.scaleY = 0.1;
			this.rewordG.visible = true;
			this.titleG.visible = true;
			this.propLabel.visible = false
			this.iconRewordImg.source = "icon_reword_png";
			this.iconRewordImg.scaleX = this.iconRewordImg.scaleY = 1;
			this.iconRewordImg.anchorOffsetX = this.iconRewordImg.width / 2;
			this.iconRewordImg.anchorOffsetY = this.iconRewordImg.height / 2;
			this.iconPropG.verticalCenter = -60;
			this.getRewordBtn.visible = false;
			this.rewordShareBtn.visible = true;
			if (Math.random() > 0.5) {
				this.curRewordProp = "slow";
			} else {
				this.curRewordProp = "destroy";
			}
			egret.Tween.get(this.infoG).to({ scaleX: 1, scaleY: 1 }, 200).call(() => {
				this.iconRewordImgTw();
				this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeRewordView, this);
				this.rewordShareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rewordShare, this);
				this.iconRewordImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rewordShare, this);
			}, this)
		}

		private iconRewordImgTw() {
			egret.Tween.get(this.iconRewordImg)
				.to({ verticalCenter: -20 }, 200)
				.to({ rotation: 10 }, 80)
				.to({ rotation: -10 }, 160)
				.to({ rotation: 10 }, 160)
				.to({ rotation: -10 }, 160)
				.to({ rotation: 10 }, 160)
				.to({ rotation: -10 }, 160)
				.to({ rotation: 0 }, 80)
				.to({ verticalCenter: 0 }, 200)
				.wait(500)
				.call(this.iconRewordImgTw, this);
		}

		private setRewordView() {
			this.flag = false;
			this.getRewordBtn.visible = true;
			this.rewordShareBtn.visible = false;
			this.titleG.visible = false;
			this.propLabel.visible = true;
			if (Math.random() > 0.5) {
				this.curRewordProp = "slow";
			} else {
				this.curRewordProp = "destroy";
			}
			if (this.curRewordProp == "slow") {
				this.iconRewordImg.source = "btn_slow_prop_png";
				this.propLabel.text = "减速带x1";
			} else {
				this.iconRewordImg.source = "btn_destroy_prop_png";
				this.propLabel.text = "碎刀石x1";
			}
			this.iconRewordImg.verticalCenter = 0;
			this.iconRewordImg.rotation = 0;
			this.iconRewordImg.scaleX = this.iconRewordImg.scaleY = 1.5;
			this.iconPropG.verticalCenter = -100;
			this.infoG.scaleX = this.infoG.scaleY = 0.1;
			this.rewordG.visible = true;

			egret.Tween.get(this.infoG).to({ scaleX: 1, scaleY: 1 }, 200).call(() => {
				this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeRewordView, this);
				this.getRewordBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getReword, this);
			}, this);
		}

		private rewordShare() {
			this.mGameProxy.typeShare((res) => {
				this.iconRewordImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rewordShare, this);
				egret.Tween.removeTweens(this.iconRewordImg);
				this.iconRewordImg.verticalCenter = 0;
				this.iconRewordImg.rotation = 0;
				this.flag = false;
				this.getRewordBtn.visible = true;
				this.rewordShareBtn.visible = false;
				this.titleG.visible = false;
				this.propLabel.visible = true;
				if (this.curRewordProp == "slow") {
					this.iconRewordImg.source = "btn_slow_prop_png";
					this.propLabel.text = "减速带x1";
				} else {
					this.iconRewordImg.source = "btn_destroy_prop_png";
					this.propLabel.text = "碎刀石x1";
				}
				this.iconRewordImg.scaleX = this.iconRewordImg.scaleY = 1.5;
				this.iconPropG.verticalCenter = -100;
				this.getRewordBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getReword, this);
			}, this, "prop");
		}

		private curRewordProp: string;
		private getReword() {
			this.closeRewordView();
			this.getRewordTw();
		}

		private getRewordTw() {
			var X, Y;
			if (this.curRewordProp == "slow") {
				X = this.slowPropBtn.x;
				Y = this.slowPropBtn.y;
			} else {
				X = this.destroyPropBtn.x;
				Y = this.destroyPropBtn.y;
			}
			var img = new eui.Image();
			img.texture = RES.getRes("btn_" + this.curRewordProp + "_prop_png");
			img.width = img.texture.$bitmapWidth;
			img.height = img.texture.$bitmapHeight;
			img.x = (this.width - img.width) / 2;
			img.y = (this.height - img.height) / 2;
			img.scaleX = img.scaleY = 1.5;
			this.addChild(img);
			egret.Tween.get(img)
				.to({ scaleX: 1, scaleY: 1, x: X, y: Y }, 500)
				.call((img) => {
					if (this.curRewordProp == "slow") {
						GameData.slowProp++;
						this.slowPropNumLab.text = "减速带x" + GameData.slowProp;
					} else {
						GameData.destroyProp++;
						this.destroyPropNumLab.text = "碎刀石x" + GameData.destroyProp;
					}
					this.removeChild(img);
				}, this, [img]);
		}

		private closeRewordView() {
			this.rewordG.visible = false;
			this.iconRewordImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rewordShare, this);
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeRewordView, this);
			this.getRewordBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getReword, this);
			this.rewordShareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rewordShare, this);
		}

		private isreword: boolean;
		private circleTwCallFun() {
			var isLegal = true;
			for (var i = 0; i < this.knifeArr.length; i++) {
				var knife = this.knifeArr[i];
				var a = this.boxGroup.rotation < 0 ? this.boxGroup.rotation + 360 : this.boxGroup.rotation;
				var b = knife < 0 ? knife + 360 : knife;
				if (Math.abs(a - b) < GameConfig.minAngle || Math.abs(a - b) > 360 - GameConfig.minAngle) {
					isLegal = false;
					break;
				}
			}
			this.isreword = false;
			for (var i = 0; i < this.rewordArr.length; i++) {
				var reword = this.rewordArr[i];
				var a = this.boxGroup.rotation < 0 ? this.boxGroup.rotation + 360 : this.boxGroup.rotation;
				var b = reword < 0 ? reword + 360 : reword;
				if (Math.abs(a - b) < GameConfig.minAngle * 2 || Math.abs(a - b) > 360 - GameConfig.minAngle * 2) {
					this.rewordBox.removeChildAt(i);
					this.rewordArr.splice(i, 1);
					this.isreword = true;
					console.log("击中");
					break;
				}
			}
			if (this.isreword) {
				if (isShowShare) {
					this.setRewordViewByShare();
				} else {
					this.setRewordView();
				}
			} else {
				this.hitBox();
			}
			if (isLegal) {
				var y = this.boxGroup.y + this.boxGroup.height / 2 + this.knifeIcon.height;
				var speed = GameConfig.throwSpeed * (this.knifeIcon.height) / (this.knifeIconY - y + this.knifeIcon.height);
				// egret.Tween.get(this.knifeIcon)
				// 	.to({ y: this.knifeIcon.y - this.knifeIcon.height }, speed)
				// 	.call((rotation) => {
				if (GameData.music) { lx.Music.getInstance().play(music_type.add_knife_success_circle); }
				var isAndroid = SystemUtil.isAndroid();
				if (!isAndroid) {
					platform.vibrateShort();
				}
				// 	}, this, [this.boxGroup.rotation]);
				this.addImg();
				this.knifeArr.push(this.boxGroup.rotation);
				this.knifeNum++;
				if (this.knifeNum >= this.curLevel.target) {
					this.rewordBox.removeChildren();
					this.removeEventListener(egret.Event.ENTER_FRAME, this.timerFunc, this);
					egret.Tween.get(this.boxGroup).wait(50).to({ scaleX: 1.1, scaleY: 1.1 }, 30).call(this.successTw, this)
				} else {
					this.canThrow = true;
					this.setKnifeIcon();
				}
				this.setKnifeNum();
				this.setCurScore(this.curLevel.eachScore);
				this.setBezierObj();
			} else {
				if (GameData.music) { lx.Music.getInstance().play(music_type.cur_game_fail); }
				this.removeEventListener(egret.Event.ENTER_FRAME, this.timerFunc, this);
				this.setFire();
				egret.Tween.get(this.knifeIcon)
					.to({ y: this.height, rotation: 160 + 20 * Math.random() }, GameConfig.throwSpeed)
					.call(this.showContinue, this);
			}
		}

		private yumiTwCallFun() {
			var isLegal = 1;
			var w = this.yumiKnifeBox.width;
			if (Math.abs(this.moveX) >= w / 2) {
				isLegal = -1;
			} else {
				for (var i = 0; i < this.knifeArr.length; i++) {
					var knife = this.knifeArr[i];
					if (Math.abs(w / 2 - this.moveX - knife) < GameConfig.minWidth) {
						isLegal = 0;
						break;
					}
				}
				this.hitYumiBox();
			}
			if (isLegal == 1) {
				if (GameData.music) { lx.Music.getInstance().play(music_type.add_knife_success_box); }
				var isAndroid = SystemUtil.isAndroid();
				if (!isAndroid) {
					platform.vibrateShort();
				}
				this.canThrow = true;
				this.addYumiImg(w / 2 - this.moveX);
				this.knifeNum++;
				this.knifeArr.push(w / 2 - this.moveX);
				// this.knifeIcon.y = this.knifeIconY;
				this.setKnifeIcon();
				this.setKnifeNum();
				if (this.knifeNum >= this.curLevel.target) {
					this.removeEventListener(egret.Event.ENTER_FRAME, this.timerFunc, this);
					egret.Tween.get(this.yumiGroup).wait(50).to({ scaleX: 1.1, scaleY: 1.1 }, 30).call(this.successYumiTw, this)
				}
				this.setCurScore(this.curLevel.eachScore);
				this.setBezierObj();
			} else {
				var tw = egret.Tween.get(this.knifeIcon);
				if (isLegal == -1) {
					tw.to({ y: 0 }, GameConfig.throwSpeed).call(this.showContinue, this);
				} else if (isLegal == 0) {
					if (GameData.music) { lx.Music.getInstance().play(music_type.cur_game_fail); }
					this.removeEventListener(egret.Event.ENTER_FRAME, this.timerFunc, this);
					this.setFire();
					tw.to({ y: this.height, rotation: 160 + 20 * Math.random() }, GameConfig.throwSpeed)
						.call(this.showContinue, this);
				}
			}
		}

		// private setCenterBezierObj() {
		// 	var color = curCircleColor[GameData.curBoxSkin];
		// 	var startPointX = this.boxGroup.x;
		// 	var startPointY = this.boxGroup.y;
		// 	if (this.curLevel.type == 2) {
		// 		color = curBoxColor[GameData.curBoxSkin];
		// 		startPointX = this.yumiGroup.x;
		// 		startPointY = this.yumiGroup.y;
		// 	}

		// 	for (var i = 0; i < 16 * Math.random(); i++) {
		// 		var circle = new egret.Sprite();
		// 		circle.graphics.beginFill(color);
		// 		circle.graphics.drawCircle(0, 0, 5 + 5 * Math.random());
		// 		circle.graphics.endFill();
		// 		this.addChild(circle);
		// 		circle.x = startPointX;
		// 		circle.y = startPointY;
		// 		var bezierObj: BezierObj;
		// 		if (i % 4 == 0) {
		// 			bezierObj = {
		// 				dis: circle,
		// 				startPoint: new egret.Point(startPointX, startPointY),
		// 				middlePoint: new egret.Point(startPointX - 300 * Math.random(), startPointY - 300 * Math.random()),
		// 				endPoint: new egret.Point(startPointX - 1000 * Math.random(), startPointY - 1000 * Math.random())
		// 			};
		// 		} else if (i % 4 == 1) {
		// 			bezierObj = {
		// 				dis: circle,
		// 				startPoint: new egret.Point(startPointX, startPointY),
		// 				middlePoint: new egret.Point(startPointX - 300 * Math.random(), startPointY + 300 * Math.random()),
		// 				endPoint: new egret.Point(startPointX - 1000 * Math.random(), startPointY + 1000 * Math.random())
		// 			};
		// 		} else if (i % 4 == 2) {
		// 			bezierObj = {
		// 				dis: circle,
		// 				startPoint: new egret.Point(startPointX, startPointY),
		// 				middlePoint: new egret.Point(startPointX + 300 * Math.random(), startPointY - 300 * Math.random()),
		// 				endPoint: new egret.Point(startPointX + 1000 * Math.random(), startPointY - 1000 * Math.random())
		// 			};
		// 		} else if (i % 4 == 3) {
		// 			bezierObj = {
		// 				dis: circle,
		// 				startPoint: new egret.Point(startPointX, startPointY),
		// 				middlePoint: new egret.Point(startPointX + 300 * Math.random(), startPointY + 300 * Math.random()),
		// 				endPoint: new egret.Point(startPointX + 1000 * Math.random(), startPointY + 1000 * Math.random())
		// 			};
		// 		}
		// 		bezierObj.time = 300;
		// 		bezierObj.completeFun = (s) => {
		// 			DisplayObjectUtil.removeObj(s)
		// 		}
		// 		bezierObj.thisObj = this;
		// 		DisplayObjectUtil.BezierTween(bezierObj);
		// 	}
		// }

		private setBezierObj() {
			var color = curCircleColor[GameData.curBoxSkin];
			var startPointX = this.width / 2;
			var startPointY = this.knifeBox.y + this.knifeBox.height / 2 + 10;
			if (this.curLevel.type == 2) {
				color = curBoxColor[GameData.curBoxSkin];
				startPointY = this.yumiKnifeBox.y + this.yumiKnifeBox.height / 2 - 10;
			}

			for (var i = 0; i < 6 + 4 * Math.random(); i++) {
				var circle = new egret.Sprite();
				circle.graphics.beginFill(color);
				circle.graphics.drawCircle(0, 0, 5 + 5 * Math.random());
				circle.graphics.endFill();
				this.addChild(circle);
				circle.x = startPointX;
				circle.y = startPointY;
				var bezierObj: BezierObj;
				if (i % 2 == 0) {
					bezierObj = {
						dis: circle,
						startPoint: new egret.Point(startPointX, startPointY),
						middlePoint: new egret.Point(startPointX - 50 * Math.random(), startPointY),
						endPoint: new egret.Point(startPointX - 200 * Math.random(), startPointY + 300 * Math.random()),
					};
				} else {
					bezierObj = {
						dis: circle,
						startPoint: new egret.Point(startPointX, startPointY),
						middlePoint: new egret.Point(startPointX + 50 * Math.random(), startPointY),
						endPoint: new egret.Point(startPointX + 200 * Math.random(), startPointY + 300 * Math.random()),
					};
				}
				bezierObj.time = 200;
				bezierObj.completeFun = (s) => {
					DisplayObjectUtil.removeObj(s)
				}
				bezierObj.thisObj = this;
				DisplayObjectUtil.BezierTween(bezierObj);
			}
		}

		private whiteCircle: egret.Sprite;
		private hitBox() {
			this.whiteCircle.alpha = 0.6;
			this.boxGroup.addChild(this.whiteCircle);
			egret.setTimeout(() => {
				if (this.whiteCircle && this.whiteCircle.parent) {
					this.whiteCircle.parent.removeChild(this.whiteCircle);
				}
			}, this, 30);

			egret.Tween.get(this.boxGroup)
				.to({ y: this.boxGroupY - 20 }, 30)
				.to({ y: this.boxGroupY }, 20);
			egret.Tween.get(this.knifeBox)
				.to({ y: this.boxGroupY - 20 }, 30)
				.to({ y: this.boxGroupY }, 20);
			egret.Tween.get(this.rewordBox)
				.to({ y: this.boxGroupY - 20 }, 30)
				.to({ y: this.boxGroupY }, 20);
		}

		private hitYumiBox() {
			egret.Tween.get(this.yumiGroup)
				.to({ y: this.yumiGroupY - 20 }, 30)
				.to({ y: this.yumiGroupY }, 20);
			egret.Tween.get(this.yumiKnifeBox)
				.to({ y: this.yumiGroupY - 20 }, 30)
				.to({ y: this.yumiGroupY }, 20);
		}

		private setFire() {
			var img = new eui.Image();
			img.texture = RES.getRes("fire_png");
			img.width = img.texture.$bitmapWidth;
			img.height = img.texture.$bitmapHeight;
			img.anchorOffsetX = img.width / 2;
			img.anchorOffsetY = img.height / 2;
			img.x = this.width / 2;
			img.y = this.knifeIcon.y - this.knifeIcon.height / 8 * 3;
			img.scaleX = img.scaleY = 0.6;
			img.alpha = 0;
			this.addChild(img);
			egret.Tween.get(img)
				.to({ alpha: 1, scaleX: 1, scaleY: 1 }, 15)
				.to({ alpha: 0.5, scaleX: 0.6, scaleY: 0.6 }, 30)
				.call((img) => {
					img.parent.removeChild(img);
				}, this, [img]);
		}

		private cutImg(bigImg, x, y, w, h, isYumi?) {
			var renderTexture: egret.RenderTexture = new egret.RenderTexture();
			renderTexture.drawToTexture(bigImg, new egret.Rectangle(x, y, w, h));
			var bitmap: egret.Bitmap = new egret.Bitmap(renderTexture);
			if (isYumi) {
				this.yumiFruitG.addChild(bitmap);
			} else {
				this.fruitG.addChild(bitmap);
			}
			bitmap.anchorOffsetX = w / 2;
			bitmap.anchorOffsetY = h / 2;
			bitmap.x = x + bitmap.anchorOffsetX;
			bitmap.y = y + bitmap.anchorOffsetY;
		}

		private successYumiTw() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.cur_game_pass_box); }
			this.setWhiteView();
			this.yumiGroup.scaleX = this.yumiGroup.scaleY = 1;
			this.canThrow = false;
			this.yumiFruitG.removeChildren();
			// this.removeEventListener(egret.Event.ENTER_FRAME, this.timerFunc, this);
			var bigImg1 = this.yumiGroup.getChildAt(0) as eui.Image;
			var bigImg = new eui.Image();
			bigImg.texture = bigImg1.texture;
			bigImg.width = bigImg1.texture.$bitmapWidth * 1.1;
			bigImg.height = bigImg1.texture.$bitmapHeight * 1.1;
			var bigImgW = bigImg.texture.$bitmapWidth;
			var bigImgH = bigImg.texture.$bitmapHeight;
			this.yumiFruitG.width = bigImgW;
			this.yumiFruitG.height = bigImgH;
			this.cutImg(bigImg, 0, 0, bigImgW * 0.6, bigImgH * 0.5, true);
			this.cutImg(bigImg, 0, bigImgH * 0.5, bigImgW * 0.3, bigImgH * 0.5, true);
			this.cutImg(bigImg, bigImgW * 0.6, 0, bigImgW * 0.4, bigImgH * 0.3, true);
			this.cutImg(bigImg, bigImgW * 0.6, bigImgH * 0.3, bigImgW * 0.4, bigImgH * 0.7, true);
			this.cutImg(bigImg, bigImgW * 0.3, bigImgH * 0.5, bigImgW * 0.3, bigImgH * 0.5, true);
			this.yumiGroup.getChildAt(0).visible = false;
			this.knifeIcon.visible = false;
			for (var i = 0; i < this.yumiFruitG.numChildren; i++) {
				var img = this.yumiFruitG.getChildAt(i);
				var random = Math.random();
				var x, y;
				var n = random > 0.5 ? 1 : -1;
				if (i == 0) {
					x = img.x - (150 + 100 * Math.random());
					y = img.y - (200 * Math.random());
				} else if (i == 1) {
					x = img.x - (150 + 100 * Math.random());
					y = img.y + (200 + 100 * Math.random());
				} else if (i == 2) {
					x = img.x + (150 + 100 * Math.random());
					y = img.y - (200 * Math.random());
				} else if (i == 3) {
					x = img.x + (150 + 100 * Math.random());
					y = img.y + (200 + 100 * Math.random());
				} else if (i == 4) {
					x = img.x + (200 * Math.random() * n);
					y = img.y - (200 * Math.random());
				}
				this.twYumiImg(img, x, y, random);
			}
			for (var i = 0; i < this.yumiKnifeBox.numChildren; i++) {
				var img = this.yumiKnifeBox.getChildAt(i);
				var random = 1;
				if (i % 2) {
					random = 0;
				}
				x = this.yumiKnifeBox.width / 2 + 600 * Math.random() * (random > 0.5 ? 1 : -1);
				y = img.y - (150 + 250 * Math.random());
				this.twYumiImg(img, x, y, random, true);
			}
		}

		private whiteView: egret.Sprite;
		private setWhiteView() {
			this.whiteView.alpha = 0.6;
			this.addChild(this.whiteView);
			egret.setTimeout(() => {
				if (this.whiteView.parent) {
					this.whiteView.parent.removeChild(this.whiteView);
				}
			}, this, 30);
		}

		private successTw() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.cur_game_pass_circle); }
			if (!this.isreword) {
				this.setWhiteView();
			}
			this.boxGroup.scaleX = this.boxGroup.scaleY = 1;
			this.yumiGroup.scaleX = this.yumiGroup.scaleY = 1;
			this.canThrow = false;
			this.fruitG.removeChildren();
			// this.removeEventListener(egret.Event.ENTER_FRAME, this.timerFunc, this);
			var bigImg1 = this.boxGroup.getChildAt(0) as eui.Image;
			var bigImg = new eui.Image();
			bigImg.texture = bigImg1.texture;
			bigImg.width = bigImg1.texture.$bitmapWidth * 1.1;
			bigImg.height = bigImg1.texture.$bitmapHeight * 1.1;
			var bigImgW = bigImg.width;
			var bigImgH = bigImg.height;
			this.fruitG.width = bigImgW;
			this.fruitG.height = bigImgH;
			this.cutImg(bigImg, 0, 0, bigImgW * 0.6, bigImgH * 0.5);
			this.cutImg(bigImg, 0, bigImgH * 0.5, bigImgW * 0.3, bigImgH * 0.5);
			this.cutImg(bigImg, bigImgW * 0.6, 0, bigImgW * 0.4, bigImgH * 0.3);
			this.cutImg(bigImg, bigImgW * 0.6, bigImgH * 0.3, bigImgW * 0.4, bigImgH * 0.7);
			this.cutImg(bigImg, bigImgW * 0.3, bigImgH * 0.5, bigImgW * 0.3, bigImgH * 0.5);
			this.boxGroup.getChildAt(0).visible = false;
			this.knifeIcon.visible = false;
			for (var i = 0; i < this.fruitG.numChildren; i++) {
				var img = this.fruitG.getChildAt(i) as eui.Image;
				var random = Math.random();
				var x, y;
				var n = random > 0.5 ? 1 : -1;
				if (i == 0) {
					x = img.x - (100 + 100 * Math.random());
					y = img.y - (150 * Math.random());
				} else if (i == 1) {
					x = img.x - (100 + 100 * Math.random());
					y = img.y + (200 + 100 * Math.random());
				} else if (i == 2) {
					x = img.x + (100 + 100 * Math.random());
					y = img.y - (150 * Math.random());
				} else if (i == 3) {
					x = img.x + (100 + 100 * Math.random());
					y = img.y + (200 + 100 * Math.random());
				} else if (i == 4) {
					x = img.x + (100 * Math.random() * n);
					y = img.y - (150 * Math.random());
				}
				this.twImg(img, x, y, random);
			}
			for (var i = 0; i < this.knifeBox.numChildren; i++) {
				var img = this.knifeBox.getChildAt(i) as eui.Image;
				var random = 1;
				if (i % 2) {
					random = 0;
				}
				x = this.knifeBox.width / 2 + 600 * Math.random() * (random > 0.5 ? 1 : -1);
				y = img.y - (150 + 250 * Math.random());
				this.twImg(img, x, y, random, true);
			}
		}

		private twYumiImg(img, x, y, random, isKnife?) {
			img.addEventListener(egret.Event.ENTER_FRAME, this.rotationImg, this);
			var X = (x - img.x) > 0 ? 1 : -1;
			var rotation;
			if (isKnife) {
				rotation = Math.random() > 0.5 ? (160 + 20 * Math.random()) : (-160 - 20 * Math.random());
			}
			egret.Tween.get(img)
				.to({
					x: x,
					y: y,
					// rotation: random > 0.5 ? (180 * Math.random()) : (-180 * Math.random())
				}, 200 * Math.random(), egret.Ease.quartIn)
				.call((img, X, rotation) => {
					egret.Tween.get(img)
						.to({
							x: img.x + 300 * Math.random() * X,
							y: this.height - this.yumiGroup.y + this.yumiGroup.height,
							// rotation: rotation
						}, 400 + 300 * Math.random(), egret.Ease.quadInOut)
						.call((img) => {
							img.parent.removeChild(img);
							img.removeEventListener(egret.Event.ENTER_FRAME, this.rotationImg, this);
							if (this.yumiFruitG.numChildren == 0 && this.yumiKnifeBox.numChildren == 0) {
								this.nextGame();
							}
						}, this, [img]);
				}, this, [img, X, rotation]);
			// this.setCenterBezierObj();
		}

		private rotationImg(evt: Event) {
			var currentTarget = evt.currentTarget as any;
			currentTarget.rotation += 15;
		}

		private twImg(img: eui.Image, x, y, random, isKnife?) {
			img.addEventListener(egret.Event.ENTER_FRAME, this.rotationImg, this);
			var X = (x - img.x) > 0 ? 1 : -1;
			var rotation;
			if (isKnife) {
				rotation = Math.random() > 0.5 ? (160 + 20 * Math.random()) : (-160 - 20 * Math.random());
			}
			egret.Tween.get(img)
				.to({
					x: x,
					y: y,
					// rotation: random > 0.5 ? 180 * random : -180 * random
				}, 200 * Math.random(), egret.Ease.quartIn)
				.call((img, X, rotation) => {
					egret.Tween.get(img)
						.to({
							x: img.x + 300 * Math.random() * X,
							y: this.height - this.boxGroup.y + this.boxGroup.height,
							// rotation: rotation
						}, 400 + 300 * Math.random(), egret.Ease.quadInOut)
						.call((img) => {
							img.parent.removeChild(img);
							img.removeEventListener(egret.Event.ENTER_FRAME, this.rotationImg, this);
							if (this.fruitG.numChildren == 0 && this.knifeBox.numChildren == 0) {
								this.nextGame();
							}
						}, this, [img]);
				}, this, [img, X, rotation]);
			// this.setCenterBezierObj();
		}

		private showContinue() {
			this.saveScore();
			if (GameData.curRestartTime < GameConfig.RestartTime) {
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_CONTINUE);
			} else {
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_END);
			}
		}

		private addYumiImg(x?) {
			var img = new eui.Image();
			img.texture = RES.getRes("knife" + GameData.curKnifeSkin + "_png");
			img.width = img.texture.$bitmapWidth;
			img.height = img.texture.$bitmapHeight;
			img.anchorOffsetX = img.width / 2;
			img.anchorOffsetY = img.height / 2;
			img.x = x;
			img.y = this.yumiGroup.height;
			this.yumiKnifeBox.addChild(img)
		}

		private twCallFun() {
			if (this.curLevel.type == 1) {
				this.circleTwCallFun();
			} else if (this.curLevel.type == 2) {
				this.yumiTwCallFun();
			}
		}

		private setKnifeArr() {
			this.knifeArr = [];
			for (var i in this.curLevel.knifeArr) {
				this.knifeArr.push(this.curLevel.knifeArr[i]);
			}
			this.rewordArr = [];
			this.rewordBox.removeChildren();
			if (!this.curLevel.rewordArr) {
				return;
			}
			for (var i in this.curLevel.rewordArr) {
				this.rewordArr.push(this.curLevel.rewordArr[i]);
			}
		}

		private setYumiSkin() {
			var skin = GameData.curBoxSkin;
			var yumiIcon = this.yumiGroup.getChildAt(0) as eui.Image;
			yumiIcon.horizontalCenter = 0;
			yumiIcon.verticalCenter = 0;
			if (skin == 0) {
				yumiIcon.horizontalCenter = 40;
			} else if (skin == 2) {
				yumiIcon.horizontalCenter = 30;
			} else if (skin == 3) {
				yumiIcon.horizontalCenter = 30;
			}
		}

		private setKnifeIcon() {
			this.knifeIcon.y = this.height;
			this.knifeIcon.alpha = 0.5;
			egret.Tween.get(this.knifeIcon)
				.to({ y: this.knifeIconY, alpha: 1 }, 100);
		}

		private nextGame() {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.timerFunc, this);
			this.slowNum = 0;
			this.boxGroup.visible = false;
			this.boxGroup.getChildAt(0).visible = true;
			this.yumiGroup.getChildAt(0).visible = true;
			this.knifeBox.visible = false;
			this.yumiGroup.visible = false;
			this.yumiKnifeBox.visible = false;
			this.knifeIcon.visible = true;
			// this.knifeIcon.y = this.knifeIconY;
			this.setKnifeIcon();
			if (this.curLevel.type == 1) {
				this.knifeBox.removeChildren();
				this.boxGroup.rotation = 0;
			} else if (this.curLevel.type == 2) {
				this.yumiKnifeBox.removeChildren();
				this.yumiGroup.x = this.yumiKnifeBoxX;
				this.yumiKnifeBox.x = this.yumiKnifeBoxX;
				this.moveX = 0;
			}
			this.knifeIcon.rotation = 0;
			this.knifeNum = 0;
			GameData.currentLevel++;
			this.getLevelConfig();
			this.setKnifeArr();
			for (var i = 0; i < this.knifeArr.length; i++) {
				if (this.curLevel.type == 1) {
					this.addImg(this.knifeArr[i]);
				} else if (this.curLevel.type == 2) {
					this.addYumiImg(this.knifeArr[i]);
				}
			}
			if (this.curLevel.type == 1) {
				for (var i = 0; i < this.rewordArr.length; i++) {
					this.addRewordImg(this.rewordArr[i]);
				}
			}
			this.canThrow = true;
			if (this.curLevel.type == 1) {
				this.boxGroup.visible = true;
				this.knifeBox.visible = true;
				this.yumiGroup.visible = false;
				this.yumiKnifeBox.visible = false;
			} else if (this.curLevel.type == 2) {
				this.yumiGroup.visible = true;
				this.yumiKnifeBox.visible = true;
				this.boxGroup.visible = false;
				this.knifeBox.visible = false;
				this.moveX = 0;
			}
			this.setKnifeNum();
			this.timerFunc();
			this.curRotateSpeed = this.curLevel.rotateSpeed;
			this.addEventListener(egret.Event.ENTER_FRAME, this.timerFunc, this);
		}

		public reCurGame(isDestroy?) {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.timerFunc, this);
			this.slowNum = 0;
			this.boxGroup.visible = false;
			this.knifeBox.visible = false;
			this.yumiGroup.visible = false;
			this.yumiKnifeBox.visible = false;
			if (this.curLevel.type == 1) {
				this.knifeBox.removeChildren();
				this.rewordBox.removeChildren();
				this.knifeIcon.rotation = 0;
				this.boxGroup.rotation = 0;
			} else if (this.curLevel.type == 2) {
				this.yumiKnifeBox.removeChildren();
				this.yumiGroup.x = this.yumiKnifeBoxX;
				this.yumiKnifeBox.x = this.yumiKnifeBoxX;
				this.moveX = 0;
			}
			this.knifeIcon.rotation = 0;
			this.boxGroup.rotation = 0;
			this.yumiGroup.x = this.yumiKnifeBoxX;
			this.yumiKnifeBox.x = this.yumiKnifeBoxX;
			if (isDestroy) {
				if (this.knifeArr.length <= GameConfig.destroyNum) {
					this.knifeArr = [];
				} else {
					for (var j = 0; j < GameConfig.destroyNum; j++) {
						this.knifeArr.pop();
					}
				}
				this.knifeIcon.y = this.knifeIconY;
				// GameData.curScore -= GameConfig.destroyNum * this.curLevel.eachScore;
			} else {
				this.setKnifeIcon();
				this.setKnifeArr();
				GameData.curScore -= this.knifeNum * this.curLevel.eachScore;
				this.knifeNum = 0;
			}
			for (var i = 0; i < this.knifeArr.length; i++) {
				if (this.curLevel.type == 1) {
					this.addImg(this.knifeArr[i]);
				} else if (this.curLevel.type == 2) {
					this.addYumiImg(this.knifeArr[i]);
				}
			}
			if (this.curLevel.type == 1) {
				for (var i = 0; i < this.rewordArr.length; i++) {
					this.addRewordImg(this.rewordArr[i]);
				}
			}
			if (this.curLevel.type == 1) {
				this.boxGroup.visible = true;
				this.knifeBox.visible = true;
				this.yumiGroup.visible = false;
				this.yumiKnifeBox.visible = false;
			} else if (this.curLevel.type == 2) {
				this.yumiGroup.visible = true;
				this.yumiKnifeBox.visible = true;
				this.boxGroup.visible = false;
				this.knifeBox.visible = false;
				this.moveX = 0;
			}
			this.canThrow = true;
			this.setKnifeNum();
			this.setCurScore();
			this.saveScore();
			ApplicationFacade.getInstance().sendNotification(GameCommand.SAVE_DATA);
			this.timerFunc();
			this.curRotateSpeed = this.curLevel.rotateSpeed;
			this.addEventListener(egret.Event.ENTER_FRAME, this.timerFunc, this);
		}

		public saveRecord() {
			GameData.hasRecord = true;
			var arr = [];
			for (var i in this.knifeArr) {
				arr.push(this.knifeArr[i]);
			}
			GameData.record = {
				knifeArr: arr,
				curScore: GameData.curScore,
				knifeNum: this.knifeNum,
				currentLevel: GameData.currentLevel,
				curRestartTime: GameData.curRestartTime
			}
			ApplicationFacade.getInstance().sendNotification(GameCommand.SAVE_DATA);
		}

		private getLevelConfig() {
			var length = this.mGameProxy.levelConfig.data.length;
			var level = GameData.currentLevel > 0 ? GameData.currentLevel % length : 0;
			this.curLevel = this.mGameProxy.levelConfig.data[level];
			var num = Number(GameData.currentLevel + 1);
			this.levelRect1.width = this.levelRect1.height = 35;
			this.levelRect2.width = this.levelRect2.height = 30;
			this.levelRect3.width = this.levelRect3.height = 30;
			this.levelRect4.width = this.levelRect4.height = 30;
			this.levelRect1.fillColor = 0xff8300;
			this.levelRect2.fillColor = 0xFFFFFF;
			this.levelRect3.fillColor = 0xFFFFFF;
			this.levelRect4.fillColor = 0xFFFFFF;
			if (num % 4 == 2) {
				this.levelRect2.fillColor = 0xff8300;
				this.levelRect1.width = this.levelRect1.height = 30;
				this.levelRect2.width = this.levelRect2.height = 35;
				this.levelRect3.width = this.levelRect3.height = 30;
				this.levelRect4.width = this.levelRect4.height = 30;
			} else if (num % 4 == 3) {
				this.levelRect2.fillColor = 0xff8300;
				this.levelRect3.fillColor = 0xff8300;
				this.levelRect1.width = this.levelRect1.height = 30;
				this.levelRect2.width = this.levelRect2.height = 30;
				this.levelRect3.width = this.levelRect3.height = 35;
				this.levelRect4.width = this.levelRect4.height = 30;
			} else if (num % 4 == 0) {
				this.levelRect2.fillColor = 0xff8300;
				this.levelRect3.fillColor = 0xff8300;
				this.levelRect4.fillColor = 0xff8300;
				this.levelRect1.width = this.levelRect1.height = 30;
				this.levelRect2.width = this.levelRect2.height = 30;
				this.levelRect3.width = this.levelRect3.height = 30;
				this.levelRect4.width = this.levelRect4.height = 35;
			}
			this.levelLab.text = "第" + Math.ceil(num / 4) + "关";
		}

		public reStartGame() {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.timerFunc, this);
			this.slowNum = 0;
			GameData.playNum++;
			this.boxGroup.visible = false;
			this.knifeBox.visible = false;
			this.yumiGroup.visible = false;
			this.yumiKnifeBox.visible = false;
			// this.knifeIcon.y = this.knifeIconY;
			this.setKnifeIcon();
			if (this.curLevel.type == 1) {
				this.knifeBox.removeChildren();
				this.knifeIcon.rotation = 0;
				this.boxGroup.rotation = 0;
			} else if (this.curLevel.type == 2) {
				this.yumiKnifeBox.removeChildren();
				this.yumiGroup.x = this.yumiKnifeBoxX;
				this.yumiKnifeBox.x = this.yumiKnifeBoxX;
				this.moveX = 0;
			}
			this.knifeIcon.rotation = 0;
			this.knifeNum = 0;
			GameData.currentLevel = 0;
			this.getLevelConfig();
			this.setKnifeNum();
			this.boxGroup.rotation = 0;
			this.yumiGroup.x = this.yumiKnifeBoxX;
			this.yumiKnifeBox.x = this.yumiKnifeBoxX;
			this.setKnifeArr();
			for (var i = 0; i < this.knifeArr.length; i++) {
				if (this.curLevel.type == 1) {
					this.addImg(this.knifeArr[i]);
				} else if (this.curLevel.type == 2) {
					this.addYumiImg(this.knifeArr[i]);
				}
			}
			if (this.curLevel.type == 1) {
				for (var i = 0; i < this.rewordArr.length; i++) {
					this.addRewordImg(this.rewordArr[i]);
				}
				this.boxGroup.visible = true;
				this.knifeBox.visible = true;
				this.yumiGroup.visible = false;
				this.yumiKnifeBox.visible = false;
			} else if (this.curLevel.type == 2) {
				this.yumiGroup.visible = true;
				this.yumiKnifeBox.visible = true;
				this.boxGroup.visible = false;
				this.knifeBox.visible = false;
				this.moveX = 0;
			}
			this.canThrow = true;
			GameData.curRestartTime = 0;
			GameData.curScore = 0;
			this.setCurScore();
			this.saveScore();
			ApplicationFacade.getInstance().sendNotification(GameCommand.SAVE_DATA);
			this.timerFunc();
			this.curRotateSpeed = this.curLevel.rotateSpeed;
			this.addEventListener(egret.Event.ENTER_FRAME, this.timerFunc, this);
		}

		private addRewordImg(rotation?) {
			var img = new eui.Image();
			img.texture = RES.getRes("icon_reword_png");
			img.width = img.texture.$bitmapWidth;
			img.height = img.texture.$bitmapHeight;
			img.anchorOffsetX = img.width / 2;
			img.anchorOffsetY = img.height - 5;
			img.x = this.boxGroup.width / 2;
			img.y = this.boxGroup.height + img.height / 2;
			img.scaleX = img.scaleY = 0.5;
			if (!rotation) {
				rotation = 0;
			}
			img.rotation = 180 - rotation;
			this.rewordBox.addChild(img)
		}

		private addImg(rotation?) {
			var img = new eui.Image();
			img.texture = RES.getRes("knife" + GameData.curKnifeSkin + "_png");
			img.width = img.texture.$bitmapWidth;
			img.height = img.texture.$bitmapHeight;
			img.anchorOffsetX = img.width / 2;
			img.anchorOffsetY = img.height / 2;
			img.x = this.boxGroup.width / 2;
			img.y = this.boxGroup.height;
			if (rotation) {
				img.rotation = -rotation;
			}
			this.knifeBox.addChild(img)
		}

		public onShow(data?) {
			if (!this.isComplete) {
				return;
			}
			if (GameData.curBoxSkin == 4) {
				(this.boxGroup.getChildAt(0) as eui.Image).verticalCenter = -40
			} else {
				(this.boxGroup.getChildAt(0) as eui.Image).verticalCenter = 0;
			}
			this.slowNum = 0;
			this.destroyPropNumLab.text = "碎刀石x" + GameData.destroyProp;
			this.slowPropNumLab.text = "减速带x" + GameData.slowProp;
			var img = this.boxGroup.getChildAt(0) as eui.Image;
			img.texture = RES.getRes("circle" + GameData.curBoxSkin + "_png");
			img = this.yumiGroup.getChildAt(0) as eui.Image
			img.texture = RES.getRes("yumi" + GameData.curBoxSkin + "_png");
			this.knifeIcon.texture = RES.getRes("knife" + GameData.curKnifeSkin + "_png");
			GameData.playNum++;
			this.boxGroup.rotation = 0;
			this.knifeIcon.rotation = 0;
			// this.knifeIcon.y = this.knifeIconY;
			this.setKnifeIcon();
			this.yumiGroup.x = this.yumiKnifeBoxX;
			this.yumiKnifeBox.x = this.yumiKnifeBoxX;
			this.knifeBox.removeChildren();
			this.rewordBox.removeChildren();
			this.yumiKnifeBox.removeChildren();
			this.getLevelConfig();
			if (GameData.hasRecord) {
				this.knifeArr = [];
				for (var j in GameData.record.knifeArr) {
					this.knifeArr.push(GameData.record.knifeArr[j]);
				}
				this.knifeNum = GameData.record.knifeNum;
				GameData.currentLevel = GameData.record.currentLevel;
				GameData.curScore = GameData.record.curScore;
				GameData.curRestartTime = GameData.record.curRestartTime;
				GameData.hasRecord = false;
				this.getLevelConfig();
			} else {
				this.setKnifeArr();
				this.knifeNum = 0;
				GameData.curRestartTime = 0;
			}
			this.setKnifeNum();
			for (var i = 0; i < this.knifeArr.length; i++) {
				if (this.curLevel.type == 1) {
					this.addImg(this.knifeArr[i]);
				} else if (this.curLevel.type == 2) {
					this.addYumiImg(this.knifeArr[i]);
				}
			}
			if (this.curLevel.type == 1) {
				for (var i = 0; i < this.rewordArr.length; i++) {
					this.addRewordImg(this.rewordArr[i]);
				}
				this.boxGroup.visible = true;
				this.knifeBox.visible = true;
				this.yumiGroup.visible = false;
				this.yumiKnifeBox.visible = false;
			} else if (this.curLevel.type == 2) {
				this.yumiGroup.visible = true;
				this.yumiKnifeBox.visible = true;
				this.boxGroup.visible = false;
				this.knifeBox.visible = false;
				this.moveX = 0;
			}
			this.isOppositeTimer();
			this.canThrow = true;
			this.setCurScore();
			this.curTopScore = 0;
			this.saveScore();
			ApplicationFacade.getInstance().sendNotification(GameCommand.SAVE_DATA);
			this.curRotateSpeed = this.curLevel.rotateSpeed;
			this.timerFunc();
			this.addEventListener(egret.Event.ENTER_FRAME, this.setMoveTimer, this);
			this.addEventListener(egret.Event.ENTER_FRAME, this.timerFunc, this);
		}

		private setKnifeNum() {
			var numChildren = this.knifeNumG.numChildren;
			if (numChildren > this.curLevel.target) {
				for (var i = 0; i < numChildren - this.curLevel.target; i++) {
					this.knifeNumG.removeChildAt(0);
				}
			} else if (numChildren < this.curLevel.target) {
				for (var i = 0; i < this.curLevel.target - numChildren; i++) {
					var img = new eui.Image();
					img.texture = RES.getRes("knife_white_png");
					img.width = img.texture.$bitmapWidth;
					img.height = img.texture.$bitmapHeight;
					img.scaleX = img.scaleY = 0.8;
					this.knifeNumG.addChild(img);
				}
			}

			for (var i = 0; i < this.knifeNumG.numChildren; i++) {
				var item = this.knifeNumG.getChildAt(i) as eui.Image;
				if (i < this.knifeNum) {
					item.texture = RES.getRes("knife_blcak_png");
				} else {
					item.texture = RES.getRes("knife_white_png");
				}
			}
		}

		private setCurScore(score?) {
			if (score) {
				GameData.curScore += score;
			}
			if (GameData.curScore > GameData.topScore) {
				GameData.topScore = GameData.curScore;
			}
			this.curScoreBitMapLab.text = "" + GameData.curScore;
		}

		private saveScore() {
			if (GameData.topScore > 0 && GameData.topScore > this.curTopScore) {
				this.curTopScore = GameData.topScore;
				console.log("save score to wxgame:" + GameData.topScore);
				platform.setUserCloudStorage({
					KVDataList: [{
						key: SaveRankKey,
						value: JSON.stringify({
							"wxgame": {
								"score": GameData.topScore,
								"update_time": new Date().getTime()
							}
						})
					}
					]
				});
				this.mGameProxy.setScoreToServer(rankName.world);
			}
		}

		private isOpposite: boolean;
		private isOppositeTimer() {
			egret.Tween.get(this)
				.wait(GameConfig.dareMinMoveTime + Math.floor(Math.random() * (GameConfig.dareMaxMoveTime - GameConfig.dareMinMoveTime)))
				.call(() => {
					var random = Math.random();
					if (random < 0.5) {
						this.isOpposite = true;
					} else {
						this.isOpposite = false;
					}
					this.isOpposite = !this.isOpposite;
					this.isOppositeTimer();
				}, this)
		}

		public onDismiss(data?) {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.timerFunc, this);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.setMoveTimer, this);
			ApplicationFacade.getInstance().sendNotification(GameCommand.SAVE_DATA);
			egret.Tween.removeAllTweens();
		}
	}
}