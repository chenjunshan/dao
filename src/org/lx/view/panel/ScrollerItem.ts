module game {
	export var SkinType = {
		knife: "knife",
		box: "box"
	};
	export var itemType = {
		null: "null",//初始
		invite: "invite",//邀请
		score: "score",//分数
		day: "day",//玩游戏天数
		num: "num",//玩游戏场数
		get: "get"//获取飞刀数量
	}
	export var BtnType = {
		play: "play",
		invite: "invite",
		use: "use"
	};
	export class ScrollerItem extends eui.Component {
		private isComplete: boolean;
		private mGameProxy: GameProxy;

		private infoG: eui.Group;
		private iconImg: eui.Image;
		private descLab: eui.Label;
		private btnBtn: eui.Group;
		private Btn: eui.Button;
		private btnBitMapLabel: eui.BitmapLabel;
		private bgIconImg: eui.Image;

		private colorFlilter: any;

		private data: any;
		private curSkin: any;
		private curValue: number;
		public constructor() {
			super();
			this.isComplete = false;
			this.mGameProxy = <GameProxy><any>(ApplicationFacade.getInstance().retrieveProxy(GameProxy.NAME));
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = SystemUtil.getResUrl("ScrollerItemSkin_exml");
		}

		public createCompleteEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.isComplete = true;
			this.initView();
			this.resizeUI();
			this.btnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
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
			this.infoG.removeChildren();
			if (this.data.type == SkinType.knife) {
				this.curSkin = GameData.curKnifeSkin;
				this.iconImg.texture = RES.getRes("knife" + this.data.id + "_png");
				this.iconImg.scaleX = this.iconImg.scaleY = 0.5;
				this.iconImg.rotation = -45;
			} else if (this.data.type == SkinType.box) {
				this.curSkin = GameData.curBoxSkin;
				this.iconImg.texture = RES.getRes("circle" + this.data.id + "_png");
				this.iconImg.scaleX = this.iconImg.scaleY = 0.3;
				this.iconImg.rotation = 0;
			}
			if (this.data.itemType == itemType.null) {
				this.curValue = 999999;
			} else if (this.data.itemType == itemType.invite) {
				this.curValue = GameData.inviteNum;
			} else if (this.data.itemType == itemType.score) {
				this.curValue = GameData.topScore;
			} else if (this.data.itemType == itemType.day) {
				this.curValue = GameData.playDay;
			} else if (this.data.itemType == itemType.num) {
				this.curValue = GameData.playNum;
			} else if (this.data.itemType == itemType.get) {
				this.curValue = this.mGameProxy.getKnifeSkinNum();
			}
			this.iconImg.filters = [];
			this.bgIconImg.source = "skin_item_icon_bg_png";
			var progress: LxProgressBar;
			if (this.data.itemType != itemType.null) {
				progress = new LxProgressBar(400, 42);
				if (this.curValue < this.data.target) {
					progress.value = this.curValue / this.data.target;
					progress.text = this.curValue + "/" + this.data.target;
					this.Btn.name = BtnType.play;
					(this.Btn.skin as any).img.source = "btn_play_png";
					this.btnBitMapLabel.text = "玩一局";
					if (this.data.itemType == itemType.invite) {
						this.Btn.name = BtnType.invite;
						(this.Btn.skin as any).img.source = "btn_invite_png";
						this.btnBitMapLabel.text = "邀请";
					}
					this.bgIconImg.source = "skin_item_icon_bg_black_png";
					this.iconImg.filters = [this.colorFlilter];
				} else {
					progress.value = 1;
					progress.text = this.curValue + "/" + this.data.target;
					if (this.curSkin == this.data.id) {
						(this.Btn.skin as any).img.source = "btn_use_png";
						this.btnBitMapLabel.text = "使用中";
					} else {
						this.Btn.name = BtnType.use;
						(this.Btn.skin as any).img.source = "btn_invite_png";
						this.btnBitMapLabel.text = "使用";
					}
				}
				this.infoG.addChild(progress);
			} else {
				if (this.curSkin == this.data.id) {
					(this.Btn.skin as any).img.source = "btn_use_png";
					this.btnBitMapLabel.text = "使用中";
				} else {
					this.Btn.name = BtnType.use;
					(this.Btn.skin as any).img.source = "btn_invite_png";
					this.btnBitMapLabel.text = "使用";
				}
			}
			var descLab = new eui.Label();
			descLab.size = 40;
			descLab.textColor = 0x2dab62;
			descLab.text = this.data.desc;
			this.infoG.addChild(descLab);
		}

		private click() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			var type = this.Btn.name;
			if (type == BtnType.use) {
				if (this.data.type == SkinType.knife) {
					GameData.curKnifeSkin = this.data.id;
				} else if (this.data.type == SkinType.box) {
					GameData.curBoxSkin = this.data.id;
				}
				ApplicationFacade.getInstance().sendNotification(SkinUIMediator.UPDATE_DATA, this.data.type);
			} else if (type == BtnType.invite) {
				console.log("share openID: " + GameData.openID);
				this.mGameProxy.share(false, "inviter_open_id=" + GameData.openID, (res) => {
					ApplicationFacade.getInstance().sendNotification(SkinUIMediator.UPDATE_DATA);
				}, this);
			} else if (type == BtnType.play) {
				ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_SKIN);
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_HOME);
			}
		}

		public onDismiss(data?) {

		}

		private initView() {
			var colorMatrix = [
				0, 0, 0, 0, 0,
				0, 0, 0, 0, 0,
				0, 0, 0, 0, 0,
				0, 0, 0, 1, 0
			];
			this.colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		}
	}
}