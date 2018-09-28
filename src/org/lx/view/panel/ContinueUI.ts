module game {
	export class ContinueUI extends eui.Component {
		private isComplete: boolean;
		private mGameProxy: GameProxy;

		private giveUpBtn: eui.Group;
		private adBtn: eui.Group;
		private shareBtn: eui.Group;
		private freeBtn: eui.Group;
		private nextG: eui.Group;
		private btnG: eui.Group;
		private curScoreLab: eui.BitmapLabel;

		private bitmap;

		public constructor() {
			super();
			this.isComplete = false;
			this.mGameProxy = <GameProxy><any>(ApplicationFacade.getInstance().retrieveProxy(GameProxy.NAME));
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = SystemUtil.getResUrl("ContinueUISkin_exml");
		}

		public createCompleteEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			ApplicationFacade.getInstance().registerMediator(new ContinueUIMediator(this));
			this.isComplete = true;
			this.initView();
			this.resizeUI();
			// this.onShow();

			this.adBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showAd, this);
			this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
			this.freeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.continue, this);
			this.giveUpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.giveUp, this);
		}

		private share() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			this.mGameProxy.typeShare((res) => {
				GameData.curRestartTime++;
				ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_CONTINUE);
				ApplicationFacade.getInstance().sendNotification(HomeUIMediator.CONTINUE_PALY);
			}, this);
		}

		private showAd() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			this.mGameProxy.showRewardedVideoAd(() => {
				GameData.curRestartTime++;
				ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_CONTINUE);
				ApplicationFacade.getInstance().sendNotification(HomeUIMediator.CONTINUE_PALY);
			}, this);
		}

		private continue() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			GameData.curRestartTime++;
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_CONTINUE);
			ApplicationFacade.getInstance().sendNotification(HomeUIMediator.CONTINUE_PALY);
		}

		private giveUp() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_CONTINUE);
			ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_END);
		}

		private async addBitmap() {
			const data = await platform.getSystemInfoSync();
			if (data) {
				var system: string = data.system;
				var index = system.indexOf("Android");
				if (index == -1) {
					if (platform.openDataContext) {
						this.bitmap = platform.openDataContext.createDisplayObject(null, this.width, this.height);
						this.nextG.addChild(this.bitmap);
					}
				}
			}
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
			platform.getNextFriendCloudStorage({
				keyList: [SaveRankKey],
				topScore: GameData.topScore
			});
			this.curScoreLab.text = GameData.curScore + "";
			this.addBitmap();
			this.btnG.removeChildren();

			if (isShowAd && isShowShare) {
				this.btnG.verticalCenter = 400;
			} else {
				this.btnG.verticalCenter = 300;
			}
			if (isShowAd) {
				this.btnG.addChild(this.adBtn);
			}
			if (isShowShare) {
				this.btnG.addChild(this.shareBtn);
			}
			if (this.btnG.numChildren == 0) {
				this.btnG.addChild(this.freeBtn)
			}
			this.btnG.addChild(this.giveUpBtn);
		}

		public onDismiss(data?) {
			if (this.bitmap && this.bitmap.parent) {
				this.bitmap.parent.removeChild(this.bitmap);
				this.bitmap = null;
			}
			platform.clearSharedCanvas();
		}

		private initView() {

		}
	}
}