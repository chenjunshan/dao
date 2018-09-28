module game {
	export class PauseUI extends eui.Component {
		private isComplete: boolean;
		private mGameProxy: GameProxy;

		private saveRecordBtn: eui.Group;
		private restartBtn: eui.Group;
		private contuineBtn: eui.Group;
		private topScoreLab: eui.BitmapLabel;

		public constructor() {
			super();
			this.isComplete = false;
			this.mGameProxy = <GameProxy><any>(ApplicationFacade.getInstance().retrieveProxy(GameProxy.NAME));
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = SystemUtil.getResUrl("PauseUISkin_exml");
		}

		public createCompleteEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			ApplicationFacade.getInstance().registerMediator(new PauseUIMediator(this));
			this.isComplete = true;
			this.initView();
			this.resizeUI();
			// this.onShow();

			this.contuineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.continue, this);
			this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);
			this.saveRecordBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.saveRecord, this);
		}

		private saveRecord() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_PAUSE);
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_HOME);
			ApplicationFacade.getInstance().sendNotification(HomeUIMediator.SAVE_RECORD);
			ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_START);
		}

		private continue() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_PAUSE);
		}

		private restart() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_PAUSE);
			ApplicationFacade.getInstance().sendNotification(HomeUIMediator.RESTART_PALY);
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
			this.topScoreLab.text = "" + GameData.topScore;
		}

		public onDismiss(data?) {
		}

		private initView() {

		}
	}
}