module game {
	export class WorldRankScrollerItem extends eui.Component {
		private isComplete: boolean;
		private mGameProxy: GameProxy;
		private data: any;

		private rankImg: eui.Image;
		private rankLab: eui.Label;
		private avatarImg: eui.Image;
		private nameLab: eui.Label;
		private scoreLab: eui.Label;

		public constructor() {
			super();
			this.isComplete = false;
			this.mGameProxy = <GameProxy><any>(ApplicationFacade.getInstance().retrieveProxy(GameProxy.NAME));
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = SystemUtil.getResUrl("WorldRankScrollerItemSkin_exml");
		}

		public createCompleteEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.isComplete = true;
			this.initView();
			this.resizeUI();
		}

		public resizeUI() {

		}

		public onUpdate(data?) {

		}

		public onShow(data?) {
			this.data = data;
			if (!this.isComplete || !this.data) {
				return;
			}
			if (this.data.rank <= 3) {
				this.rankImg.visible = true;
				this.rankLab.visible = false;
				if (this.data.rank == 1) {
					this.rankImg.source = "first_png";
				} else if (this.data.rank == 2) {
					this.rankImg.source = "second_png";
				} else if (this.data.rank == 3) {
					this.rankImg.source = "third_png";
				}
			} else {
				this.rankImg.visible = false;
				this.rankLab.visible = true;
				this.rankLab.text = this.data.rank;
			}
			this.avatarImg.source = this.data.avatar;
			this.nameLab.text = this.data.name;
			this.scoreLab.text = this.data.score;
			if (this.data.avatar == null || this.data.avatar == undefined || this.data.avatar == "") {
				this.avatarImg.source = "def_avatar_png";
			}
		}

		public onDismiss(data?) {

		}

		private initView() {
		}
	}
}