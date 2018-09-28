module game {
	export class EndUI extends eui.Component {
		private isComplete: boolean;
		private mGameProxy: GameProxy;

		private curScoreBitmapLab: eui.BitmapLabel;
		private topScoreLab: eui.Label;
		private infoG: eui.Group;
		private contentG: eui.Group;
		private restartBtn: eui.Group;
		private startBtn: eui.Group;
		private rankBtn: eui.Group;
		private dareBtn: eui.Group;

		private bitmap;

		public constructor() {
			super();
			this.isComplete = false;
			this.mGameProxy = <GameProxy><any>(ApplicationFacade.getInstance().retrieveProxy(GameProxy.NAME));
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = SystemUtil.getResUrl("EndUISkin_exml");
		}

		public createCompleteEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			ApplicationFacade.getInstance().registerMediator(new EndUIMediator(this));
			this.isComplete = true;
			this.initView();
			this.resizeUI();
			this.addBitmap();
			// this.onShow();

			this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);
			this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
			this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rank, this);
			this.dareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
		}

		private share() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			console.log("share openID: " + GameData.openID);
			this.mGameProxy.share(false, "inviter_open_id=" + GameData.openID, (res) => {
				if (res.shareTickets) {
					ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "分享成功");
					ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_END);
					ApplicationFacade.getInstance().sendNotification(HomeUIMediator.RESTART_PALY);
				} else {
					ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "获取失败，请分享到群");
				}
			}, this);
		}

		private restart() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_END);
			ApplicationFacade.getInstance().sendNotification(HomeUIMediator.RESTART_PALY);
		}

		private start() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_END);
			ApplicationFacade.getInstance().sendNotification(HomeUIMediator.RESTART_PALY);
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_HOME);
			ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_START);
		}

		private rank() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_END);
			ApplicationFacade.getInstance().sendNotification(HomeUIMediator.RESTART_PALY);
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_HOME);
			platform.getFriendCloudStorage({
				keyList: [SaveRankKey]
			});
			ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_RANK);
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
			this.curScoreBitmapLab.text = "" + GameData.curScore;
			this.topScoreLab.text = "历史最高分：" + GameData.topScore;

			platform.showLoading({
				title: "",
				mask: true
			});
			egret.setTimeout(() => {
				platform.hideLoading();
			}, this, 1000);

			platform.getEndFriendCloudStorage({
				keyList: [SaveRankKey],
				opendId: GameData.openID,
				x: (this.width - this.infoG.width) / 2 / this.width,
				y: this.infoG.top / this.height,
				w: this.infoG.width / this.width,
				h: this.infoG.height / this.height
			});

			this.addBitmap();
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

		private addBitmap() {
			if (platform.openDataContext) {
				this.bitmap = platform.openDataContext.createDisplayObject(null, this.width, this.height);
				this.contentG.addChild(this.bitmap);
			}
		}
	}
}