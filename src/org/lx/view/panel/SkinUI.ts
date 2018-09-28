module game {
	export class SkinUI extends eui.Component {
		private isComplete: boolean;
		private mGameProxy: GameProxy;

		private contentG: eui.Group;
		private closeBtn: eui.Group;
		private knifeBtn: eui.Button;
		private boxBtn: eui.Button;
		private knifeBtnG: eui.Group;
		private boxBtnG: eui.Group;
		private scroller: eui.Group;
		private scrollerG: eui.Group;
		private scroller0: eui.Group;
		private scrollerG0: eui.Group;
		private progress: eui.ProgressBar;
		private knifeBitmapLabel: eui.BitmapLabel;
		private boxBitmapLabel: eui.BitmapLabel;

		private items: Array<ScrollerItem>;
		private items0: Array<ScrollerItem>;
		private selected: number;
		public constructor() {
			super();
			this.isComplete = false;
			this.mGameProxy = <GameProxy><any>(ApplicationFacade.getInstance().retrieveProxy(GameProxy.NAME));
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = SystemUtil.getResUrl("SkinUISkin_exml");
		}

		public createCompleteEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			ApplicationFacade.getInstance().registerMediator(new SkinUIMediator(this));
			this.isComplete = true;
			this.initView();
			this.resizeUI();

			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
			this.knifeBtnG.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickKnife, this);
			this.boxBtnG.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBox, this);
		}

		public resizeUI() {
			this.width = Size.width;
			this.height = Size.height;

			if (window.innerHeight / window.innerWidth >= 2436 / 1125) {
				// this.topImg.visible = false;
				this.contentG.bottom = 300;
			} else {
				// this.topImg.visible = true;
				this.contentG.bottom = 200;
			}
		}

		private close() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_SKIN);
			ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_START);
		}

		private clickKnife() {
			if (this.selected == 1) {
				return;
			}
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			this.boxBtnG.parent.removeChild(this.boxBtnG);
			this.knifeBtnG.parent.addChildAt(this.boxBtnG, 0);
			this.selected = 1;
			this.scroller.visible = true;
			this.scroller0.visible = false;
			(this.knifeBtn.skin as any).img.source = "btn_white_tab_png";
			this.knifeBitmapLabel.font = "green_fnt";
			(this.boxBtn.skin as any).img.source = "btn_green_tab_png";
			this.boxBitmapLabel.font = "white_fnt";
			this.setProgress(SkinType.knife);
		}

		private clickBox() {
			if (this.selected == 2) {
				return;
			}
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			this.knifeBtnG.parent.removeChild(this.knifeBtnG);
			this.boxBtnG.parent.addChildAt(this.knifeBtnG, 0);
			this.selected = 2;
			this.scroller.visible = false;
			this.scroller0.visible = true;
			(this.boxBtn.skin as any).img.source = "btn_white_tab_png";
			this.boxBitmapLabel.font = "green_fnt";
			(this.knifeBtn.skin as any).img.source = "btn_green_tab_png";
			this.knifeBitmapLabel.font = "white_fnt";
			this.setProgress(SkinType.box);
		}

		public onUpdate(data?) {
		}

		private setProgress(type?) {
			var data = this.mGameProxy.getSkinValueByType(type);
			this.progress.maximum = data.total;
			this.progress.value = data.num;
		}

		public onShow(data?) {
			if (!this.isComplete) {
				return;
			}
			var fun = () => {
				this.clickKnife();
				this.scroller.visible = true;
				this.scroller0.visible = false;
				this.setProgress(SkinType.knife);
				for (var i = 0; i < this.items.length; i++) {
					var skinItem = this.items[i];
					var config = this.mGameProxy.skinConfig[SkinType.knife][i];
					skinItem.onShow({
						id: config.id,
						desc: config.desc,
						target: config.target,
						itemType: config.type,
						type: SkinType.knife,
					});
				}
				for (var i = 0; i < this.items0.length; i++) {
					var skinItem = this.items0[i];
					var config = this.mGameProxy.skinConfig[SkinType.box][i];
					skinItem.onShow({
						id: config.id,
						desc: config.desc,
						target: config.target,
						itemType: config.type,
						type: SkinType.box,
					});
				}
				if (data && data == SkinType.box) {
					this.clickBox();
				}
			}
			fun();
			platform.showLoading({
				title: "",
				mask: true
			})
			if (GameData.openID) {
				var request = new ApiRequest(ApiMethod.POST, "/invite/get_invitees");
				request.addParam('app_id', AppID);
				request.addParam('open_id', GameData.openID);
				request.send(function (response) {
					platform.hideLoading();
					console.log(" ApiRequest get_invitees ");
					console.log(response);
					GameData.inviteNum = response.data.length;
					ApplicationFacade.getInstance().sendNotification(GameCommand.SAVE_DATA);
					fun();
				});
			}
			egret.setTimeout(() => {
				platform.hideLoading();
			}, this, 1000);

		}

		public onDismiss(data?) {

		}

		private initView() {
			this.selected = 1;
			for (var j in this.mGameProxy.skinConfig) {
				if (j == SkinType.knife) {
					this.items = new Array();
					for (var i in this.mGameProxy.skinConfig[j]) {
						var skinItem = new ScrollerItem();
						this.items.push(skinItem);
						this.scrollerG.addChild(skinItem);
					}
				} else if (j == SkinType.box) {
					this.items0 = new Array();
					for (var i in this.mGameProxy.skinConfig[j]) {
						var skinItem = new ScrollerItem();
						this.items0.push(skinItem);
						this.scrollerG0.addChild(skinItem);
					}
				}
			}
		}
	}
}