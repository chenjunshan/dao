module game {
	export class StartUI extends eui.Component {
		private isComplete: boolean;
		private mGameProxy: GameProxy;

		private startBtn: eui.Group;
		private rankBtn: eui.Group;
		private skinBtn: eui.Group;
		private groupRankBtn: eui.Group;
		private worldRankBtn: eui.Group;
		private dareBtn: eui.Group;
		private userLab: eui.Label;
		private versionLab: eui.Label;
		private logoImg: eui.Image;
		private startImg: eui.Button;
		private skinImg: eui.Button;

		public constructor() {
			super();
			this.isComplete = false;
			this.mGameProxy = <GameProxy><any>(ApplicationFacade.getInstance().retrieveProxy(GameProxy.NAME));
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = SystemUtil.getResUrl("StartUISkin_exml");
		}

		public createCompleteEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			ApplicationFacade.getInstance().registerMediator(new StartUIMediator(this));
			this.isComplete = true;
			this.initView();
			this.resizeUI();
			// this.onShow();
			this.startBtn.visible = false;
			this.userLab.visible = false;
			this.mGameProxy.getSetting({
				res: "start_png",
				x: (this.width - this.startBtn.width) / 2 / this.width,
				y: (this.height - this.startBtn.bottom - this.startBtn.height) / this.height,
				w: this.startBtn.width / this.width,
				h: this.startBtn.height / this.height,
			}, (isTouch) => {
				if (!SystemUtil.isVoid(GameData.userID)) {
					this.userLab.visible = true;
					this.userLab.text = "ID：" + GameData.userID;
				} else {
					this.userLab.visible = false;
				}
				this.startBtn.visible = true;
				if (isTouch) {
					if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
					this.mGameProxy.userInfoButton.hide();
					ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_START);
					ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_HOME);
				}
			}, this);

			this.startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
			this.startBtn.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
			this.startBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
			this.startBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
			this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showHome, this);
			this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRank, this);
			this.groupRankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goGroupRank, this);
			this.worldRankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goWorldRank, this);
			this.skinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSkin, this);
			this.dareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDare, this);
		}

		private touchBegin(evt: Event) {
			(evt.currentTarget as any).alpha = 0.8;
		}

		private touchEnd(evt: Event) {
			(evt.currentTarget as any).alpha = 1;
		}

		public resizeUI() {
			this.width = Size.width;
			this.height = Size.height;
		}

		public onUpdate(data?) {

		}

		private setLogoTw() {
			egret.Tween.get(this.logoImg)
				.to({ bottom: this.logoImgBottom + 10 }, 1000)
				.to({ bottom: this.logoImgBottom - 10 }, 2000)
				.to({ bottom: this.logoImgBottom }, 1000)
				.call(this.setLogoTw, this);
		}

		private setSkinTW() {
			egret.Tween.get(this.skinImg)
				.to({ rotation: 10 }, 80)
				.to({ rotation: -10 }, 80)
				.to({ rotation: 0 }, 80)
				.to({ rotation: 10 }, 80)
				.to({ rotation: -10 }, 80)
				.to({ rotation: 0 }, 80)
				.to({ rotation: 10 }, 80)
				.to({ rotation: -10 }, 80)
				.to({ rotation: 0 }, 80)
				.wait(800)
				.call(this.setSkinTW, this);
		}


		private setStartImg() {
			egret.Tween.get(this.startImg)
				.to({ scaleX: 1.05, scaleY: 1.05 }, 1000)
				.to({ scaleX: 1, scaleY: 1 }, 1000)
				.call(this.setStartImg, this);
		}

		public onShow(data?) {
			if (!this.isComplete) {
				return;
			}
			this.showPlatform();
			if (this.isStartAdTw) {
				this.playAdEffect(this.adImg);
			}
			if (this.isStartAdTimer && this.adTimer && !this.adTimer.running) {
				this.adTimer.start();
			}
			this.versionLab.text = "V" + Version.name;
			this.logoImg.bottom = this.logoImgBottom;
			this.setLogoTw();
			this.setStartImg();
			this.setSkinTW();
		}

		public onDismiss(data?) {
			this.mGameProxy.hideGameClubButton();
			egret.Tween.removeAllTweens();
		}

		private logoImgBottom: number;
		private initView() {
			this.initPlatformAd();
			this.logoImgBottom = this.logoImg.bottom;
		}

		private showHome() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_START);
			ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_HOME);
		}

		private goGroupRank() {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			console.log("share openID: " + GameData.openID);
			this.mGameProxy.share(false, "inviter_open_id=" + GameData.openID, (res) => {
				console.log(res);
				if (res.shareTickets) {
					ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "分享成功");
					platform.getGroupCloudStorage({
						shareTicket: res.shareTickets,
						keyList: [SaveRankKey]
					});
					ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_START);
					ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_RANK, RankType.group);
				} else {
					ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "获取失败，请分享到群");
				}
			}, this);
		}

		private goWorldRank() {
			if (!this.userLab.visible) {
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "请点击开始游戏授权");
				return;
			}
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			this.mGameProxy.getRankForServer(rankName.world, 0, GameConfig.worldRankNumber);
		}

		private showDare() {
			if (!this.userLab.visible) {
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "请点击开始游戏授权");
				return;
			}
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_START);
			ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_DARE);
		}

		private showSkin() {
			if (!this.userLab.visible) {
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "请点击开始游戏授权");
				return;
			}
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_START);
			ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_SKIN);
		}

		private showRank() {
			if (!this.userLab.visible) {
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "请点击开始游戏授权");
				return;
			}
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			platform.getFriendCloudStorage({
				keyList: [SaveRankKey]
			});
			ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_START);
			ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_RANK, RankType.friend);
		}

		/**
		* ===========================================
		*/
		private focusBtn: eui.Group;
		private moreBtn: eui.Group;
		private adBtn: eui.Group;
		private adImg: eui.Image;
		private mIconurl: string;
		private curPlatform: PlatformWxa;
		private adTimer: egret.Timer;
		private iconlist: Array<string>;
		private timerImgIndex: number;
		private curTimerImgIndex: number;
		private isStartAdTw: boolean;
		private isStartAdTimer: boolean;

		private initPlatformAd() {
			this.moreBtn.visible = false;
			this.adBtn.visible = false;
			this.focusBtn.visible = false;

			this.adTimer = new egret.Timer(100, -1);
			this.adTimer.addEventListener(egret.TimerEvent.TIMER, this.adLoop, this);

			this.curPlatform = new PlatformWxa();
			this.curPlatform.init(this.platformComplete, this);

			this.focusBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showFocus, this);
			this.moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.focus, this);
			this.adBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ad, this);
		}

		public showPlatform() {
			this.mGameProxy.showGameClubButton(!this.startBtn.visible);
		}

		public checkGetFocus() {
			if (cp_menu && GameData.isGetFocus) {
				this.focusBtn.visible = false;
			} else {
				if (isShowFocusCp) {
					this.focusBtn.visible = true;
				}
			}
		}

		private showFocus(evt: egret.TouchEvent) {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			if (!this.userLab.visible) {
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "请点击开始游戏授权");
				return;
			}
			ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_FOCUS);
		}

		private focus(evt: egret.TouchEvent) {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			if (!this.userLab.visible) {
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "请点击开始游戏授权");
				return;
			}
			this.curPlatform.checkFocus(this.checkFocusHandle, this, true);
		}

		private ad(evt: egret.TouchEvent) {
			if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
			if (!this.userLab.visible) {
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "请点击开始游戏授权");
				return;
			}
			this.curPlatform.navigateToMiniProgram(this.getRandAdHandle, this);
		}

		private platformComplete() {
			this.initAwyAd();
			this.curPlatform.checkFocus(this.checkFocusHandle, this, false);
		}

		private checkFocusHandle(res, isTouch) {
			if (res && isShowFocus) {
				this.moreBtn.visible = true;
				if (isTouch) {
					this.curPlatform.focusBox();
				}
			} else {
				this.moreBtn.visible = false;
			}
		}

		public initAwyAd() {
			this.curPlatform.getRandAd(this.getRandAdHandle, this);
		}

		private getRandAdHandle(res) {
			this.adBtn.visible = false;
			egret.Tween.removeTweens(this.adImg);
			this.adTimer.stop();
			this.isStartAdTw = false;
			this.isStartAdTimer = false;
			if (res && isShowAwyAd) {
				this.adBtn.visible = true;
				//当前存在广告，项目中需要显示广告
				if (res.type == 1) {
					//当前收到的只有一张图片，利用2.1.2方法创建对象绘制到项目中即可（默认抖动特效）
					//广告icon路径
					RES.getResByUrl(res.data, (texture) => {
						this.adImg.texture = texture;
					}, this, RES.ResourceItem.TYPE_IMAGE);
					this.playAdEffect(this.adImg);
					this.isStartAdTw = true;
				} else if (res.type == 2) {
					//当前收到的是一个图片列表,需要项目创建帧动画并添加到项目中
					this.iconlist = res.data.imglist //图片列表
					this.adTimer.delay = res.data.intervals //每帧间隔 (毫秒)
					this.timerImgIndex = 0;
					this.curTimerImgIndex = -1;
					this.adLoop();
					this.adTimer.start();
					this.isStartAdTimer = true;
				}
			} else {
				// 没有广告存在，可移除项目中相关广告组件
			}
		}

		private adLoop(evt?: egret.TimerEvent) {
			if (this.iconlist && this.iconlist.length > 0 && this.curTimerImgIndex != this.timerImgIndex) {
				this.curTimerImgIndex = this.timerImgIndex;
				if (this.timerImgIndex >= this.iconlist.length) {
					this.timerImgIndex = 0;
				}
				RES.getResByUrl(this.iconlist[this.timerImgIndex], (texture) => {
					this.adImg.texture = texture;
					this.timerImgIndex++;
				}, this, RES.ResourceItem.TYPE_IMAGE);
			}
		}

		public playAdEffect(dis: egret.DisplayObject, rotation: number = 25, duration: number = 150, waitTime: number = 4000): void {
			dis.rotation = 0;
			dis.anchorOffsetX = dis.width / 2;
			dis.anchorOffsetY = dis.height / 2;
			dis.x = dis.x + dis.width / 2;
			dis.y = dis.y + dis.height / 2;
			egret.Tween.get(dis, { loop: true })
				.wait(waitTime)
				.to({ rotation: -1 * rotation }, duration / 2)
				.to({ rotation: rotation }, duration)
				.to({ rotation: -1 * (rotation * 0.8) }, duration * 0.8)
				.to({ rotation: (rotation * 0.8) }, duration * 0.8)
				.to({ rotation: 0 }, (duration * 0.8) / 2);
		}
	}
}