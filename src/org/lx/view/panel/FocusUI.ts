module game {
	export class FocusUI extends eui.Component {
		private isComplete: boolean;
		private mGameProxy: GameProxy;

		private closeBtn: eui.Group;
		private getBtn: eui.Group;
		private descImg: eui.Image;
		private stateLab: eui.Label;
		private maskG: eui.Group;

		public constructor() {
			super();
			this.isComplete = false;
			this.mGameProxy = <GameProxy><any>(ApplicationFacade.getInstance().retrieveProxy(GameProxy.NAME));
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = SystemUtil.getResUrl("FocusUISkin_exml");
		}

		public createCompleteEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			ApplicationFacade.getInstance().registerMediator(new FocusUIMediator(this));
			this.isComplete = true;
			this.initView();
			this.resizeUI();

			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
			this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.get, this);
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

			this.getBtn.visible = false;
			this.descImg.visible = false;
			this.stateLab.visible = false;
			if (cp_menu) {
				if (GameData.isGetFocus) {
					this.stateLab.visible = true;
				} else {
					this.getBtn.visible = true;
				}
			} else {
				this.descImg.visible = true;
			}
		}

		public onDismiss(data?) {

		}

		private close(evt: egret.TouchEvent) {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_FOCUS);
		}

		private get(evt: egret.TouchEvent) {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			// GameData.money += GameConfig.FocusMoney;
			GameData.isGetFocus = true;
			ApplicationFacade.getInstance().sendNotification(GameCommand.SAVE_DATA);
			// ApplicationFacade.getInstance().sendNotification(GameCommand.UPDATE_MONEY);
			this.onShow();
			this.updateMoney();
		}

		private initView() {

		}


		public updateMoney() {
			var point = this.getBtn.localToGlobal();

			this.maskG.visible = true;
			var hLayout = new eui.HorizontalLayout();
			hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
			hLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
			hLayout.gap = 0;
			var group = new eui.Group();
			group.layout = hLayout;
			group.x = point.x + this.getBtn.width / 2;
			group.y = point.y;
			this.addChild(group);

			var img = new eui.Image();
			img.texture = RES.getRes("icon_coin_png");
			group.addChild(img);

			var lab = new eui.Label();
			lab.size = 58;
			lab.text = "" + "+" + GameConfig.FocusMoney;
			group.addChild(lab);

			group.width = img.width + lab.textWidth;
			group.height = Math.max(img.height, lab.textHeight);
			group.anchorOffsetX = group.width / 2;
			group.anchorOffsetY = group.height;

			egret.Tween.get(group).to({ y: point.y - 200 }, 500).call(() => {
				if (group.parent) {
					group.parent.removeChild(group);
				}
				this.maskG.visible = false;
				ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_FOCUS);
			})
		}
	}
}