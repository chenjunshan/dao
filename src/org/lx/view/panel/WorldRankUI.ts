module game {
	export class WorldRankUI extends eui.Component {
		private isComplete: boolean;
		private mGameProxy: GameProxy;

		private closeBtn: eui.Group;
		private playBtn: eui.Group;
		private scroller: eui.Scroller;
		private scrollerG: eui.Group;
		private myRankLab: eui.Label;
		private myAvatarImg: eui.Image;
		private myNameLab: eui.Label;
		private myScoreLab: eui.Label;
		private items: Array<WorldRankScrollerItem>;

		private rankData: Array<any>;

		private refreshCount: number = 0;//刷新次数

		public constructor() {
			super();
			this.isComplete = false;
			this.mGameProxy = <GameProxy><any>(ApplicationFacade.getInstance().retrieveProxy(GameProxy.NAME));
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = SystemUtil.getResUrl("WorldRankUISkin_exml");
		}

		public createCompleteEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			ApplicationFacade.getInstance().registerMediator(new WorldRankUIMediator(this));
			this.isComplete = true;
			this.initView();
			this.resizeUI();
			// this.onShow();
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
			this.playBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.play, this);
			this.scroller.addEventListener(egret.Event.CHANGE, this.change, this);
			this.scroller.addEventListener(eui.UIEvent.CHANGE_END, this.changeEnd, this);
		}

		private isNeedUp: boolean;
		private change() {
			if (this.scroller.viewport.scrollV > (this.scroller.viewport.contentHeight - this.scroller.viewport.height) + 80) {
				this.isNeedUp = true;
			}
		}

		private changeEnd() {
			if (this.isNeedUp) {
				this.isNeedUp = false;
				this.refreshCount++;
				this.mGameProxy.getRankForServer(rankName.world, GameConfig.worldRankNumber * this.refreshCount, GameConfig.worldRankNumber);
			}
		}

		public resizeUI() {
			this.width = Size.width;
			this.height = Size.height;
		}

		private close() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_WORLD_RANK);
			ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_START);
		}

		private play() {
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_WORLD_RANK);
			ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_HOME);
		}

		public onUpdate(data?) {

		}

		public updateData() {
			this.setScrollerView();
		}

		private setRankData() {
			for (var s = 0; s < game.rankData.rank_users.length; s++) {
				this.rankData.push(game.rankData.rank_users[s]);
			}
		}

		private setScrollerView() {
			this.setRankData();
			var itemLength = this.items.length;
			if (itemLength > this.rankData.length) {
				for (var s = 0; s < itemLength - this.rankData.length; s++) {
					this.items.pop();
					this.scrollerG.removeChildAt(this.scrollerG.numChildren - 1);
				}
			} else if (itemLength < this.rankData.length) {
				for (var s = 0; s < this.rankData.length - itemLength; s++) {
					var skinItem = new WorldRankScrollerItem();
					this.items.push(skinItem);
					this.scrollerG.addChild(skinItem);
					// skinItem.horizontalCenter = 0;
				}
			}

			for (var i = 0; i < this.rankData.length; i++) {
				var item = this.items[i];
				var itemData = this.rankData[i];
				item.onShow(itemData);
			}
		}

		public onShow(data?) {
			if (!this.isComplete) {
				return;
			}
			this.setScrollerView();

			var me = game.rankData.me;
			this.myScoreLab.text = me.score;
			this.myRankLab.text = me.rank;
			if (me.score && me.rank > 10000) {
				this.myRankLab.text = "10000+";
			} else if (!me.score) {
				this.myRankLab.text = "--"
				this.myScoreLab.text = "0";
			}
			this.myNameLab.text = GameData.nickName;
			this.myAvatarImg.source = GameData.avatarUrl;
			if (GameData.avatarUrl == null || GameData.avatarUrl == undefined || GameData.avatarUrl == "") {
				this.myAvatarImg.source = "def_avatar_png";
			}
		}

		public onDismiss(data?) {
			this.refreshCount = 0;
			this.rankData = [];
			this.scroller.viewport.scrollV = 0;
		}

		private initView() {
			this.items = new Array();
			this.rankData = new Array();
			this.scroller.viewport.scrollV = 0;
			this.refreshCount = 0;
			this.rankData = [];
		}
	}
}