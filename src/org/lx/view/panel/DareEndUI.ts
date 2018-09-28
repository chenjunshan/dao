module game {
	export class DareEndUI extends eui.Component {
		private isComplete: boolean;
		private mGameProxy: GameProxy;

		private fruitG: eui.Group;
		private startBtn: eui.Group;
		private restartBtn: eui.Group;
		private adBtn: eui.Group;
		private shareBtn: eui.Group;
		private btnG: eui.Group;
		private tipLab: eui.Label;
		private titleImg: eui.Image;

		private target: number[];
		private curTargetValue: number[];

		public constructor() {
			super();
			this.isComplete = false;
			this.mGameProxy = <GameProxy><any>(ApplicationFacade.getInstance().retrieveProxy(GameProxy.NAME));
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = SystemUtil.getResUrl("DareEndUISkin_exml");
		}

		public createCompleteEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			ApplicationFacade.getInstance().registerMediator(new DareEndUIMediator(this));
			this.isComplete = true;
			this.initView();
			this.resizeUI();

			this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);
			this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
			this.adBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showAd, this);
			this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
		}

		private share() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			this.mGameProxy.typeShare((res) => {
				ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_DARE_END);
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_DARE);
				ApplicationFacade.getInstance().sendNotification(DareUIMediator.DARE_CONTINUE_GAME);
			}, this, "dare");
		}

		private showAd() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			this.mGameProxy.showRewardedVideoAd(() => {
				ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_DARE_END);
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_DARE);
				ApplicationFacade.getInstance().sendNotification(DareUIMediator.DARE_CONTINUE_GAME);
			}, this);
		}

		private restart() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_DARE_END);
			ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_DARE);
		}

		private start() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_DARE_END);
			ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_START);
		}

		public resizeUI() {
			this.width = Size.width;
			this.height = Size.height;
		}

		public onUpdate(data?) {

		}

		public onShow(data?) {
			if (!this.isComplete) {
				return;
			}
			this.curTargetValue = [0, 0, 0, 0]
			if (data) {
				this.curTargetValue = data;
			}
			this.setFruitG();
			this.tipLab.visible = true;
			this.btnG.removeChildren();
			if (isShowAd && isShowShare) {
				this.btnG.addChild(this.adBtn);
				this.btnG.addChild(this.shareBtn);
				this.tipLab.text = "使用视频或分享复活重玩本局飞刀数+3";
			} else if (isShowAd && !isShowShare) {
				this.btnG.addChild(this.adBtn);
				this.tipLab.text = "使用视频复活重玩本局飞刀数+3";
			} else if (!isShowAd && isShowShare) {
				this.btnG.addChild(this.shareBtn);
				this.tipLab.text = "使用分享复活重玩本局飞刀数+3";
			} else {
				this.btnG.addChild(this.restartBtn)
				this.tipLab.visible = false;
			}
			this.btnG.addChild(this.startBtn);
			this.setTitleTW();
		}

		private setTitleTW() {
			egret.Tween.get(this.titleImg)
				.to({ rotation: 5 }, 80)
				.to({ rotation: -5 }, 80)
				.to({ rotation: 0 }, 80)
				.to({ rotation: 5 }, 80)
				.to({ rotation: -5 }, 80)
				.to({ rotation: 0 }, 80)
				.to({ rotation: 5 }, 80)
				.to({ rotation: -5 }, 80)
				.to({ rotation: 0 }, 80)
				.wait(500)
				.call(this.setTitleTW, this);
		}

		private setFruitG() {
			this.fruitG.removeChildren();
			var length = this.mGameProxy.dareConfig.data.length;
			var level = GameData.curDareLevel > 0 ? GameData.curDareLevel % length : 0;
			this.target = this.mGameProxy.dareConfig.data[level].target;
			var kind = 0;
			for (var i = 0; i < this.target.length; i++) {
				if (this.target[i] <= 0) {
					continue;
				}
				kind++;
				this.createFruitGroup(i);
			}
			if (kind <= 2) {
				(this.fruitG.layout as eui.HorizontalLayout).gap = 110;
			} else if (kind == 3) {
				(this.fruitG.layout as eui.HorizontalLayout).gap = 60;
			} else {
				(this.fruitG.layout as eui.HorizontalLayout).gap = 20;
			}
		}

		private createFruitGroup(index) {
			var fruitGroup = new eui.Group();
			fruitGroup.layout = new eui.VerticalLayout();
			(fruitGroup.layout as eui.VerticalLayout).horizontalAlign = "center";
			var group = new eui.Group();
			var bgImg = new eui.Image();
			bgImg.texture = RES.getRes("bg_dare_end_fruit_png");
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
			var num = Number(this.target[index] - this.curTargetValue[index]);
			label.text = (num > 0 ? num : 0) + "/" + this.target[index];
			fruitGroup.addChild(label);
			this.fruitG.addChild(fruitGroup);
		}

		public onDismiss(data?) {
			egret.Tween.removeAllTweens();
		}

		private initView() {

		}
	}
}