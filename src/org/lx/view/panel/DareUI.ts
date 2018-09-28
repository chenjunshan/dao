module game {
	export class DareUI extends eui.Component {
		private isComplete: boolean;
		private mGameProxy: GameProxy;

		private knifeBox: eui.Group;
		private knifeIcon: eui.Image;
		private boxGroup: eui.Group;
		private clickG: eui.Group;
		private fruitG: eui.Group;
		private levelLab: eui.BitmapLabel;
		private targetFruitG: eui.Group;
		private targetG: eui.Group;
		private targetInfoG: eui.Group;
		private knifeNumG: eui.Group;

		private knifeIconY: number;
		private knifeArr: any[];
		// private moveTime: egret.Timer;
		private canThrow: boolean;
		private knifeNum: number;
		private target: number[];
		private curTargetValue: number[];
		private knifeNumMax: number;

		public constructor() {
			super();
			this.isComplete = false;
			this.mGameProxy = <GameProxy><any>(ApplicationFacade.getInstance().retrieveProxy(GameProxy.NAME));
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = SystemUtil.getResUrl("DareUISkin_exml");
		}

		public createCompleteEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			ApplicationFacade.getInstance().registerMediator(new DareUIMediator(this));
			this.isComplete = true;
			this.initView();
			this.resizeUI();

			this.clickG.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickThis, this);
		}

		private clickThis() {
			if (!this.canThrow || this.knifeNum <= 0) {
				return;
			}
			if (GameData.music) { lx.Music.getInstance().play(music_type.knife_fly); }
			this.canThrow = false;
			var tw = egret.Tween.get(this.knifeIcon);
			var y = this.boxGroup.y + this.boxGroup.height / 2;
			this.knifeNum--;
			this.setKnifeNum();
			tw.to({ y: y }, GameConfig.throwSpeed).call(this.circleTwCallFun, this);
		}

		private setKnifeNum() {
			var numChildren = this.knifeNumG.numChildren;
			if (numChildren > this.knifeNumMax) {
				for (var i = 0; i < numChildren - this.knifeNumMax; i++) {
					this.knifeNumG.removeChildAt(0);
				}
			} else if (numChildren < this.knifeNumMax) {
				for (var i = 0; i < this.knifeNumMax - numChildren; i++) {
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
				if (i < this.knifeNumMax - this.knifeNum) {
					item.texture = RES.getRes("knife_blcak_png");
				} else {
					item.texture = RES.getRes("knife_white_png");
				}
			}
		}

		private addFun() {
			if (this.boxGroup.rotation >= 0 && this.boxGroup.rotation < 90) {
				this.curTargetValue[0]++;
				return 0;
			} else if (this.boxGroup.rotation >= 90 && this.boxGroup.rotation <= 180) {
				this.curTargetValue[1]++;
				return 1;
			} else if (this.boxGroup.rotation >= -180 && this.boxGroup.rotation < -90) {
				this.curTargetValue[2]++;
				return 2;
			} else if (this.boxGroup.rotation >= -90 && this.boxGroup.rotation < 0) {
				this.curTargetValue[3]++;
				return 3;
			}
		}

		private isSuccess() {
			for (var i = 0; i < this.curTargetValue.length; i++) {
				if (this.curTargetValue[i] < this.target[i]) {
					return false;
				}
			}
			return true;
		}

		private addFruitTw(index) {
			var img = new eui.Image();
			img.texture = RES.getRes("small_fruit" + index + "_png");
			img.width = img.texture.$bitmapWidth;
			img.height = img.texture.$bitmapHeight;
			img.anchorOffsetX = img.width / 2;
			img.anchorOffsetY = img.height / 2;
			img.x = (this.width - img.width) / 2;
			img.y = this.boxGroup.y + this.boxGroup.height / 4;
			img.scaleX = img.scaleY = 0.8;
			var X = img.x, Y = img.y + 300;
			for (var i = 0; i < this.fruitG.numChildren; i++) {
				var group = this.fruitG.getChildAt(i) as eui.Group;
				if (index + "" == group.name) {
					X = this.fruitG.x;
					Y = this.fruitG.y + (group.height + 6) * i;
				}
			}
			this.addChild(img);
			egret.Tween.get(img).wait(400)
				.to({ x: X, y: Y, alpha: 0.6 }, 200)
				.call(() => {
					this.removeChild(img);
					this.setFruitNum();
					this.canThrow = true;
					if (this.isSuccess()) {
						this.nextGame();
					} else {
						if (this.knifeNum <= 0) {
							ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_DARE);
							ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_DARE_END, this.curTargetValue);
						}
					}
				}, this);
		}

		private circleTwCallFun() {
			var isLegal = true;
			for (var i = 0; i < this.knifeArr.length; i++) {
				var knife = this.knifeArr[i];
				var a = this.boxGroup.rotation < 0 ? this.boxGroup.rotation + 360 : this.boxGroup.rotation;
				var b = knife < 0 ? knife + 360 : knife;
				if (Math.abs(a - b) < GameConfig.dareMinAngle || Math.abs(a - b) > 360 - GameConfig.dareMinAngle) {
					isLegal = false;
					break;
				}
			}
			if (isLegal) {
				if (GameData.music) { lx.Music.getInstance().play(music_type.add_knife_success_box); }
				var isAndroid = SystemUtil.isAndroid();
				if (!isAndroid) {
					platform.vibrateShort();
				}
				var index = this.addFun();
				this.canThrow = false;
				this.addImg();
				this.knifeArr.push(this.boxGroup.rotation);
				// this.knifeIcon.y = this.knifeIconY;
				this.setKnifeIcon();
				this.addFruitTw(index);
				if (!this.isSuccess()) {
					if (this.knifeNum <= 0) {
						this.canThrow = false;
					} else {
						this.canThrow = true;
					}
				}
			} else {
				if (GameData.music) { lx.Music.getInstance().play(music_type.cur_game_fail); }
				var tw = egret.Tween.get(this.knifeIcon);
				tw.to({ y: this.height, rotation: 10 }, GameConfig.throwSpeed * 4).call(this.continue, this);
			}
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

		private setKnifeIcon() {
			this.knifeIcon.y = this.height;
			this.knifeIcon.alpha = 0.5;
			egret.Tween.get(this.knifeIcon)
				.to({ y: this.knifeIconY, alpha: 1 }, 200);
		}


		private continue() {
			// this.knifeIcon.y = this.knifeIconY;
			this.setKnifeIcon();
			this.knifeIcon.rotation = 0;
			if (this.knifeNum <= 0) {
				//闯关失败
				ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_DARE);
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_DARE_END, this.curTargetValue);
			} else {
				this.canThrow = true;
			}
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

		public onUpdate(data?) {

		}

		private setFruitNum() {
			for (var i = 0; i < this.fruitG.numChildren; i++) {
				var group = this.fruitG.getChildAt(i) as eui.Group;
				var label = group.getChildAt(1) as eui.Label;
				var targetNum = this.target[group.name]
				var curNum = this.curTargetValue[group.name];
				label.text = (curNum > targetNum ? targetNum : curNum) + "/" + targetNum;
			}
		}

		private setFruitG() {
			this.fruitG.removeChildren();
			var length = this.mGameProxy.dareConfig.data.length;
			var level = GameData.curDareLevel > 0 ? GameData.curDareLevel % length : 0;
			this.target = this.mGameProxy.dareConfig.data[level].target;
			var knifeNum = 0;
			for (var i = 0; i < this.target.length; i++) {
				if (this.target[i] <= 0) {
					continue;
				}
				var group = new eui.Group();
				group.name = i + "";
				group.layout = new eui.HorizontalLayout();
				(group.layout as eui.HorizontalLayout).verticalAlign = "bottom";
				var img = new eui.Image();
				img.texture = RES.getRes("fruit" + i + "_png");
				img.width = img.texture.$bitmapWidth;
				img.height = img.texture.$bitmapHeight;
				img.scaleX = img.scaleY = 0.8;
				group.addChild(img);
				var label = new eui.Label();
				label.size = 44;
				label.bold = true;
				group.addChild(label);
				this.fruitG.addChild(group);
				knifeNum += this.target[i];
			}
			return knifeNum + 2;
		}

		public continueGame() {
			this.nextGame("continue");
		}

		private nextGame(last: string = "") {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.timerFunc, this);
			if (!last) {
				GameData.curDareLevel++;
				this.levelLab.text = "第 " + (Number(GameData.curDareLevel) + 1) + " 关";
				ApplicationFacade.getInstance().sendNotification(GameCommand.SAVE_DATA);
			}
			this.boxGroup.rotation = 0;
			this.knifeIcon.rotation = 0;
			// this.knifeIcon.y = this.knifeIconY;
			this.setKnifeIcon();
			this.knifeBox.removeChildren();
			this.knifeNum = this.setFruitG();
			if (last == "continue") {
				this.knifeNum += 3;
			}
			this.knifeNumMax = this.knifeNum;
			this.setKnifeNum();
			this.curTargetValue = [0, 0, 0, 0];
			this.setFruitNum();
			this.knifeArr = [];
			// this.moveTime.reset();
			this.canThrow = true;
			this.isOpposite = false;
			this.showTargetView();
			this.showTargetViewTw();
			// this.moveTime.start();
			this.addEventListener(egret.Event.ENTER_FRAME, this.timerFunc, this);
		}

		public onShow(data?) {
			if (!this.isComplete) {
				return;
			}
			this.knifeIcon.texture = RES.getRes("knife" + GameData.curKnifeSkin + "_png");
			this.boxGroup.rotation = 0;
			this.knifeIcon.rotation = 0;
			// this.knifeIcon.y = this.knifeIconY;
			this.setKnifeIcon();
			this.knifeBox.removeChildren();
			this.knifeNum = this.setFruitG();
			this.knifeNumMax = this.knifeNum;
			this.setKnifeNum();
			this.curTargetValue = [0, 0, 0, 0];
			this.setFruitNum();
			this.levelLab.text = "第 " + (Number(GameData.curDareLevel) + 1) + " 关";

			this.knifeArr = [];
			// this.moveTime = new egret.Timer(GameConfig.dareRotateTime, 0);
			// this.moveTime.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
			this.canThrow = true;
			this.showTargetView();
			this.showTargetViewTw();
			// this.moveTime.start();
			this.curRotateSpeed = GameConfig.dareRotateSpeed + GameConfig.dareRotateSpeed * Math.random();
			this.addEventListener(egret.Event.ENTER_FRAME, this.timerFunc, this);
			this.setMoveTimer();
		}

		private showTargetViewTw() {
			if (!this.targetG.parent) {
				this.addChild(this.targetG);
			}
			this.targetInfoG.alpha = 0;
			egret.Tween.get(this.targetInfoG).to({ alpha: 1 }, 500)
				.wait(500).to({ alpha: 0 }, 500)
				.call(() => {
					if (this.targetG.parent) {
						this.targetG.parent.removeChild(this.targetG);
					}
				}, this)

		}

		private showTargetView() {
			this.targetFruitG.removeChildren();
			var kind = 0;
			for (var i = 0; i < this.target.length; i++) {
				if (this.target[i] <= 0) {
					continue;
				}
				kind++;
				this.createFruitGroup(i);
			}
			if (kind <= 2) {
				(this.targetFruitG.layout as eui.HorizontalLayout).gap = 110;
			} else if (kind == 3) {
				(this.targetFruitG.layout as eui.HorizontalLayout).gap = 60;
			} else {
				(this.targetFruitG.layout as eui.HorizontalLayout).gap = 20;
			}
		}

		private createFruitGroup(index) {
			var fruitGroup = new eui.Group();
			fruitGroup.layout = new eui.VerticalLayout();
			(fruitGroup.layout as eui.VerticalLayout).horizontalAlign = "center";
			var group = new eui.Group();
			var bgImg = new eui.Image();
			bgImg.texture = RES.getRes("bg_dare_target_fruit_png");
			bgImg.width = bgImg.texture.$bitmapWidth;
			bgImg.height = bgImg.texture.$bitmapHeight;
			group.addChild(bgImg);
			var img = new eui.Image();
			img.texture = RES.getRes("fruit" + index + "_png");
			img.width = img.texture.$bitmapWidth;
			img.height = img.texture.$bitmapHeight;
			img.horizontalCenter = 0;
			img.verticalCenter = 0;
			group.addChild(img);
			fruitGroup.addChild(group);
			var label = new eui.Label();
			label.size = 50;
			label.bold = true;
			label.textColor = 0xFF0000;
			var num = Number(this.target[index] - this.curTargetValue[index]);
			label.text = (num > 0 ? num : 0) + "/" + this.target[index];
			fruitGroup.addChild(label);
			this.targetFruitG.addChild(fruitGroup);
		}

		private setMoveTimer() {
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
					this.curRotateSpeed = GameConfig.dareRotateSpeed + GameConfig.dareRotateSpeed * Math.random();
					// this.moveTime.stop();
					// this.moveTime.delay = GameConfig.dareRotateTime + Math.floor(random * 30);
					// this.moveTime.start();
					this.setMoveTimer();
				}, this)
		}

		private isOpposite: boolean;
		private curRotateSpeed: number;
		private timerFunc() {
			var rotateSpeed = this.curRotateSpeed;
			if (!this.isOpposite) {
				this.boxGroup.rotation += rotateSpeed;
			} else {
				this.boxGroup.rotation -= rotateSpeed;
			}
			var r = this.boxGroup.width / 2;
			for (var i = 0; i < this.knifeBox.numChildren; i++) {
				var child = this.knifeBox.getChildAt(i) as eui.Image;
				if (!this.isOpposite) {
					child.rotation += rotateSpeed;
				} else {
					child.rotation -= rotateSpeed;
				}
				child.x = r - Math.sin(child.rotation * (Math.PI / 180)) * r;
				child.y = r + Math.cos(child.rotation * (Math.PI / 180)) * r;
			}

		}


		public onDismiss(data?) {
			// this.moveTime.reset();
			// this.moveTime.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.timerFunc, this);
			ApplicationFacade.getInstance().sendNotification(GameCommand.SAVE_DATA);
			// egret.Tween.removeAllTweens();
		}

		private initView() {
			this.knifeIconY = this.knifeIcon.y;
		}
	}
}