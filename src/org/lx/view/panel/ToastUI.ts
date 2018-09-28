module game {

	export class ToastUI extends eui.Component {
		private isComplete: boolean;
		private mGameProxy: GameProxy;

		private content: eui.Group;
		private bg: eui.Image;
		private lab: eui.Label;

		private key;
		public constructor() {
			super();
			this.isComplete = false;
			this.mGameProxy = <GameProxy><any>(ApplicationFacade.getInstance().retrieveProxy(GameProxy.NAME));
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = SystemUtil.getResUrl("ToastUISkin_exml");
		}

		public createCompleteEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			ApplicationFacade.getInstance().registerMediator(new ToastUIMediator(this));
			this.isComplete = true;
			this.initView();
			this.resizeUI();
			// this.onShow();
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

			if (this.key != null && this.key != undefined) {
				clearTimeout(this.key)
				egret.Tween.removeTweens(this.content);
			}
			this.lab.text = "" + data;
			egret.setTimeout(() => {
				this.content.width = this.lab.textWidth + 120;
				this.content.height = this.lab.textHeight + 20;
			}, this, 50);
			egret.Tween.removeTweens(this.content);
			this.content.alpha = 0;
			var self = this;
			this.key = setTimeout(function () {
				egret.Tween.get(self.content).to({ alpha: 0 }, 200)
			}, 2000);
			egret.Tween.get(this.content).to({ alpha: 1 }, 200)
		}

		public onDismiss(data?) {
			this.lab.text = "";
		}


		private initView() {
			this.touchEnabled = false;
		}
	}
}