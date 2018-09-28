module game {
	export enum RankType {
		friend = 1,
		group = 2,
		end = 3
	}
	export class RankUI extends eui.Component {
		private isComplete: boolean;
		private mGameProxy: GameProxy;

		private rankGroupBtn: eui.Group;
		private closeBtn: eui.Group;
		private contentG: eui.Group;
		private bitmap;

		public constructor() {
			super();
			this.isComplete = false;
			this.mGameProxy = <GameProxy><any>(ApplicationFacade.getInstance().retrieveProxy(GameProxy.NAME));
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = SystemUtil.getResUrl("RankUISkin_exml");
		}

		public createCompleteEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			ApplicationFacade.getInstance().registerMediator(new RankUIMediator(this));
			this.isComplete = true;
			this.initView();
			this.resizeUI();
			this.onShow();

			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
			this.rankGroupBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
		}

		private share() {
			console.log("share openID: " + GameData.openID);
			this.mGameProxy.share(false, "inviter_open_id=" + GameData.openID, (res) => {
				console.log(res);
				if (res.shareTickets) {
					ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "分享成功");
					platform.getGroupCloudStorage({
						shareTicket: res.shareTickets,
						keyList: [SaveRankKey]
					});
					this.onDismiss();
					this.onShow();
				} else {
					ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "获取失败，请分享到群");
				}
			}, this);
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
			switch (data) {
				case RankType.friend:
					break;
				case RankType.group:
					break;
				case RankType.end:
					break;
			}
			if (data) {
				platform.showLoading({
					title: "",
					mask: true
				})
				egret.setTimeout(() => {
					platform.hideLoading();
				}, this, 1000)
			}
			this.addBitmap();
		}

		private addBitmap() {
			if (platform.openDataContext) {
				this.bitmap = platform.openDataContext.createDisplayObject(null, this.width, this.height);
				this.contentG.addChild(this.bitmap);
			}
		}

		private close(evt: egret.TouchEvent) {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_RANK);
			ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_START);
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