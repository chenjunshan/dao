

module game {
	export class GameProxy extends puremvc.Proxy implements puremvc.IProxy {
		public static NAME: string = "GameProxy";
		public static sysLanguage: string;
		public static system: string;
		public static music: string;

		public levelConfig;
		public skinConfig;
		public dareConfig;

		public gameClubButton;
		public userInfoButton;
		public bannerAd;
		public rewardedVideoAd;
		public constructor() {
			super(GameProxy.NAME);
		}

		public init() {
			this.initPlatform();

			this.setSize();
			// egret.localStorage.removeItem(SaveKey);
			this.initConfig();

		}

		private async initPlatform() {
			if (isShowGameClub) {
				this.gameClubButton = await platform.createGameClubButton({
					icon: 'green',
					style: {
						left: 10,
						top: 5,
						width: 40,
						height: 40
					}
				});
			}

			this.rewardedVideoAd = await platform.createRewardedVideoAd({
				adUnitId: 'adunit-55306803dc117a27'
			});
			console.log(this.rewardedVideoAd)
			if (this.rewardedVideoAd) {
				this.rewardedVideoAd.onLoad(() => {
					console.log('激励视频 广告加载成功')
				})
				this.rewardedVideoAd.onError((err) => {
					console.log('激励视频 广告加载失败')
					console.log(err)
				})
				this.rewardedVideoAd.onClose((res) => {
					console.log('激励视频 广告关闭')
					console.log(res)
					// 用户点击了【关闭广告】按钮
					// 小于 2.1.0 的基础库版本，res 是一个 undefined
					if (res && res.isEnded || res === undefined) {
						// 正常播放结束，可以下发游戏奖励
					}
					else {
						// 播放中途退出，不下发游戏奖励
					}
				})
			}
		}

		public async getSetting(btnObj: any, callBack: Function, thisObj: any, isTouch: boolean = false) {
			var res = await platform.getLaunchOptionsSync();
			console.log("getSetting query: " + res.query);
			console.log(res.query);
			if (res.query) {
				if (res.query.inviter_open_id) {
					inviteeOpenID = res.query.inviter_open_id;
					console.log("inviter_open_id: " + inviteeOpenID);
				}
				if (res.query.cp_menu) {
					cp_menu = res.query.cp_menu;
					console.log("cp_menu: " + cp_menu);
				}
			}
			ApplicationFacade.getInstance().sendNotification(GameCommand.CHECK_GET_FOCUS);
			var res = await platform.getSetting();
			var authSetting = res.authSetting;
			if (authSetting['scope.userInfo'] === true) {
				// 用户已授权，可以直接调用相关 API
				this.getUserInfo(callBack, thisObj, isTouch);
			}
			// else if (authSetting['scope.userInfo'] === false) {
			// 	// 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
			// 	if (this.userInfoButton) {
			// 		this.userInfoButton.show();
			// 	}
			// 	this.showModal(callBack, thisObj, isTouch);
			// } 
			else {
				// 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
				var sys = await platform.getSystemInfoSync();
				if (sys) {
					var w = sys.screenWidth;
					var h = sys.screenHeight;
					if (!RES.getRes(btnObj.res)) {
						RES.getResAsync(btnObj.res, (data) => {
							console.log("getResAsync:" + btnObj.res + "  " + data)
						}, this)
					}
					this.userInfoButton = await platform.createUserInfoButton({
						type: 'image',
						image: SystemUtil.getResUrl(btnObj.res),
						style: {
							left: btnObj.x * w,
							top: btnObj.y * h,
							width: btnObj.w * w,
							height: btnObj.h * h
						}
					});
				}
				if (this.userInfoButton) {
					this.userInfoButton.onTap((res) => {
						console.log(res);
						// if (GameData.music) { lx.Music.getInstance().play(music_type.btn); }
						if (res.errMsg == 'getUserInfo:ok') {
							this.userInfoButton.hide();
							this.getUserInfo(callBack, thisObj, true);
						}
					});
					this.userInfoButton.show();
				}
			}
		}

		private async getUserInfo(callBack: Function, thisObj: any, isTouch: boolean) {
			var userInfo = await platform.getUserInfo();
			if (userInfo) {
				GameData.nickName = userInfo.nickName;
				GameData.avatarUrl = userInfo.avatarUrl;
				if (code && game.isNeedLogin) {
					platform.showLoading({
						title: "",
						mask: true
					});
					var request = new ApiRequest(ApiMethod.POST, "/login");
					request.addParam('app_id', AppID);
					request.addParam('code', code);
					request.send(function (response) {
						platform.hideLoading();
						console.log(" ApiRequest login ");
						console.log(response);
						GameData.openID = response.data.open_id;
						GameData.userID = response.data.user_id;
						if (GameData.userID) {
							var requestUserInfo = new ApiRequest(ApiMethod.POST, "/login/set_user_info");
							requestUserInfo.addParam('app_id', AppID);
							requestUserInfo.addParam('user_id', GameData.userID);
							requestUserInfo.addParam('name', (GameData.nickName));
							requestUserInfo.addParam('avatar', (GameData.avatarUrl));
							requestUserInfo.send(function (response) {
								console.log(" ApiRequest login set_user_info ");
								console.log(response);
							});
						}
						if (callBack && thisObj) {
							callBack.call(thisObj, isTouch);
						}
						if (inviteeOpenID != null && inviteeOpenID != undefined) {
							var request = new ApiRequest(ApiMethod.POST, "/invite/set_inviter");
							request.addParam('app_id', AppID);
							request.addParam('open_id', GameData.openID);
							request.addParam('name', GameData.nickName);
							request.addParam('avatar', GameData.avatarUrl);
							request.addParam('inviter_open_id', inviteeOpenID);
							request.send(function (response) {
								console.log(" ApiRequest set_inviter ");
								console.log(response);
							});
						}
					});
				} else {
					if (callBack && thisObj) {
						callBack.call(thisObj, isTouch);
					}
				}
			} else {
				if (callBack && thisObj) {
					callBack.call(thisObj, isTouch);
				}
			}
		}

		private async showModal(callBack: Function, thisObj: any, isTouch: boolean) {
			var showModal = await platform.showModal({
				title: "警告",
				content: "您点击了拒绝授权,将无法正常运行程序,点击确定重新获取授权。"
			});
			if (showModal) {
				this.openSetting(callBack, thisObj, isTouch);
			}
		}

		private async openSetting(callBack: Function, thisObj: any, isTouch: boolean) {
			var openSetting = await platform.openSetting();
			if (openSetting) {
				this.getUserInfo(callBack, thisObj, isTouch);
			}
		}

		public onRewardedVideClose(callBack: Function, thisObj: any) {
			if (this.rewardedVideoAd) {
				this.rewardedVideoAd.onClose(((res) => {
					console.log('激励视频 广告关闭')
					console.log(res)
					// 用户点击了【关闭广告】按钮
					// 小于 2.1.0 的基础库版本，res 是一个 undefined
					if (res && res.isEnded || res === undefined) {
						ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "观看视频成功");
						// 正常播放结束，可以下发游戏奖励
						if (callBack && thisObj) {
							callBack.call(thisObj, res);
						}
					} else {
						// 播放中途退出，不下发游戏奖励
						ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "视频要看完");
					}
				}));
			}
		}

		public showRewardedVideoAd(callBack: Function, thisObj: any) {
			this.onRewardedVideClose(callBack, thisObj);
			if (this.rewardedVideoAd) {
				this.rewardedVideoAd.show().catch((err) => {
					ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "暂无可观看的视频");
					console.log('激励视频 广告加载失败')
					console.log(err)
					this.rewardedVideoAd.load();
				});
			} else {
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "暂无可观看的视频");
			}
		}


		public showGameClubButton(show) {
			if (this.gameClubButton && isShowGameClub) {
				this.gameClubButton.style.hidden = false;
			} else {
				this.hideGameClubButton();
			}

			if (this.userInfoButton && show) {
				this.userInfoButton.show();
			}
		}

		public hideGameClubButton() {
			if (this.gameClubButton) {
				this.gameClubButton.style.hidden = true;
			}
			if (this.userInfoButton) {
				this.userInfoButton.hide();
			}
		}

		public getBtnLab(group: eui.Group): eui.Label {
			var skin = (group.getChildAt(0) as eui.Button).skin as any;
			var lab = skin.label as eui.Label;
			return lab;
		}

		public setScoreToServer(rankName) {
			var request = new ApiRequest(ApiMethod.POST, "/rank/set_score");
			request.addParam('app_id', game.AppID);
			request.addParam('user_id', GameData.userID);
			request.addParam('rank_name', rankName);
			request.addParam('score', GameData.topScore + "");
			request.send(function (response) {
				console.log(" ApiRequest rank/set_score ");
				console.log(response);
			});
		}

		public getRankForServer(rankName, start, count, isAdd = false) {
			platform.showLoading({
				title: "加载中...",
				mask: true
			});
			var request = new ApiRequest(ApiMethod.POST, "/rank/get_range");
			request.addParam('app_id', game.AppID);
			request.addParam('user_id', GameData.userID);
			request.addParam('rank_name', rankName);
			request.addParam('start', start);
			request.addParam('count', count);
			request.send(function (response) {
				platform.hideLoading();
				console.log(" ApiRequest rank/get_range ");
				console.log(response);
				if (response.code == "0") {
					game.rankData = response.data;
					if (isAdd) {
						ApplicationFacade.getInstance().sendNotification(WorldRankUIMediator.UPDATE_DATA);
					} else {
						ApplicationFacade.getInstance().sendNotification(SceneCommand.CLOSE_START);
						ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_WORLD_RANK);
					}
				}
			});
		}

		private initConfig(): void {
			var data: any = egret.localStorage.getItem(SaveKey);
			if (data) {
				var gameData: any = JSON.parse(data);
				for (var l in gameData) {
					GameData[l] = gameData[l];
				}
			} else {
				// GameData.userID = egret.getTimer().toString();
				GameData.language = this.checkLanguage(GameProxy.sysLanguage);
			}
			var currentTime = new Date().getTime();
			if (!SystemUtil.isSameDay(currentTime, GameData.loginTime)) {
				GameData.shares = [];
				GameData.propShares = [];
				GameData.loginTime = currentTime;
			}
			this.levelConfig = RES.getRes("level_json");
			this.skinConfig = RES.getRes("skin_json");
			this.dareConfig = RES.getRes("dare_json");
			this.saveData();
			this.initData();
		}

		private isBgmLoad: boolean = false;
		private isHomeLoad: boolean = false;
		private initData(): void {
			if (GameData) {
				lx.Music.getInstance().load(music_type.btn, SystemUtil.getResUrl(music_type.btn), egret.Sound.EFFECT);
				lx.Music.getInstance().load(music_type.knife_fly, SystemUtil.getResUrl(music_type.knife_fly), egret.Sound.EFFECT);
				lx.Music.getInstance().load(music_type.add_knife_success_box, SystemUtil.getResUrl(music_type.add_knife_success_box), egret.Sound.EFFECT);
				lx.Music.getInstance().load(music_type.add_knife_success_circle, SystemUtil.getResUrl(music_type.add_knife_success_circle), egret.Sound.EFFECT);
				lx.Music.getInstance().load(music_type.cur_game_pass_circle, SystemUtil.getResUrl(music_type.cur_game_pass_circle), egret.Sound.EFFECT);
				lx.Music.getInstance().load(music_type.cur_game_pass_box, SystemUtil.getResUrl(music_type.cur_game_pass_box), egret.Sound.EFFECT);
				lx.Music.getInstance().load(music_type.cur_game_fail, SystemUtil.getResUrl(music_type.cur_game_fail), egret.Sound.EFFECT);

				ApplicationFacade.getInstance().sendNotification(SceneCommand.INIT_SCENE);
			}
		}

		public SaveData(): void {
			this.saveData();
		}

		public setMusic(play: boolean, music?: string, noSave?: boolean): void {
			// if (music == music_type.bgm) {
			// 	GameProxy.music = music;
			// 	this.setBgm(play);
			// 	this.setHome(false);
			// } else if (music == music_type.home) {
			// 	GameProxy.music = music;
			// 	this.setBgm(false);
			// 	this.setHome(play);
			// } else {
			// 	this.setBgm(false);
			// 	this.setHome(false);
			// }
			// if (!noSave) {
			// 	GameData.music = play;
			// 	this.saveData();
			// }
		}

		private setBgm(play: boolean): void {
			// if (this.isBgmLoad) {
			// 	this.playMusic(music_type.bgm, play);
			// } else {
			// 	this.loadAndPlayBgm(play);
			// }
		}

		private setHome(play: boolean): void {
			// if (this.isHomeLoad) {
			// 	this.playMusic(music_type.home, play);
			// } else {
			// 	this.loadAndPlayHome(play);
			// }
		}

		private playMusic(music: string, play: boolean): void {
			// if (play) {
			// 	lx.Music.getInstance().play(music, -1);
			// } else {
			// 	lx.Music.getInstance().stop(music);
			// }
		}

		private loadAndPlayHome(play: boolean): void {
			// lx.Music.getInstance().load(music_type.home, SystemUtil.getResUrl(music_type.home), egret.Sound.MUSIC, () => {
			// 	this.isHomeLoad = true;
			// 	this.playMusic(music_type.home, play);
			// });
		}

		private loadAndPlayBgm(play: boolean): void {
			// lx.Music.getInstance().load(music_type.bgm, SystemUtil.getResUrl(music_type.bgm), egret.Sound.MUSIC, () => {
			// 	this.isBgmLoad = true;
			// 	this.playMusic(music_type.bgm, play);
			// });
		}

		private checkLanguage(nativeLanguge?: string): string {
			game.language.current = game.language.default;
			var sysLanguage = "";
			if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
				if (nativeLanguge) {
					sysLanguage = nativeLanguge;
				}
			} else {
				if (egret.Capabilities.language) {
					sysLanguage = egret.Capabilities.language;
				}
			}
			for (var i in game.language_res) {
				if (sysLanguage.indexOf(game.language_res[i].key) > -1) {
					game.language.current = game.language_res[i].res;
					break;
				}
			}
			return game.language.current;
		}

		private saveData(): void {
			if (SystemUtil.isSameDay(new Date().getTime(), GameData.curTime) == false) {
				GameData.playDay++;
				// GameData.destroyProp += 2;
				// GameData.slowProp += 2;
			}
			GameData.curTime = new Date().getTime();
			egret.localStorage.removeItem(SaveKey);
			egret.localStorage.setItem(SaveKey, JSON.stringify(GameData).toString());
		}

		public getSkinValueByType(type?) {
			var num = 1; var total;
			if (type == SkinType.knife) {
				total = this.skinConfig[SkinType.knife].length;
				for (var i = 0; i < total; i++) {
					var knife = this.skinConfig[SkinType.knife][i];
					if (knife && knife.id > 0) {
						switch (knife.type) {
							case itemType.invite: {
								if (GameData.inviteNum >= knife.target) {
									num++;
								}
								break;
							}
							case itemType.score: {
								if (GameData.topScore >= knife.target) {
									num++;
								}
								break;
							}
						}
					}
				}
			} else if (type == SkinType.box) {
				total = this.skinConfig[SkinType.box].length;
				for (var i = 0; i < total; i++) {
					var box = this.skinConfig[SkinType.box][i];
					if (box && box.id > 0) {
						switch (box.type) {
							case itemType.day: {
								if (GameData.playDay >= box.target) {
									num++;
								}
								break;
							}
							case itemType.num: {
								if (GameData.playNum >= box.target) {
									num++;
								}
								break;
							}
							case itemType.get: {
								if (this.getKnifeSkinNum() >= box.target) {
									num++;
								}
								break;
							}
						}
					}
				}
			}
			return {
				num: num,
				total: total
			}
		}

		public getKnifeSkinNum() {
			var num = 1;
			for (var i in this.skinConfig[SkinType.knife]) {
				var knife = this.skinConfig[SkinType.knife][i];
				if (knife && knife.id > 0) {
					switch (knife.type) {
						case itemType.invite: {
							if (GameData.inviteNum >= knife.target) {
								num++;
							}
							break;
						}
						case itemType.score: {
							if (GameData.topScore >= knife.target) {
								num++;
							}
							break;
						}
					}
				}
			}
			return num;
		}

		public setSize(): void {
			Size.width = egret.MainContext.instance.stage.stageWidth;
			Size.height = egret.MainContext.instance.stage.stageHeight;
		}

		public checkShareTime(openGId, isProp: string = null): number {
			var currentTime = new Date().getTime();
			if (!SystemUtil.isSameDay(currentTime, GameData.loginTime)) {
				GameData.shares = [];
				GameData.propShares = [];
				GameData.dareShares = [];
				GameData.loginTime = currentTime;
			}
			var count = 0;
			var arr = GameData.shares;
			if (isProp == "prop") {
				arr = GameData.propShares;
			} else if (isProp == "dare") {
				arr = GameData.dareShares;
			}
			for (var i in arr) {
				var temp = arr[i];
				if (temp == openGId) {
					count++;
				}
			}
			if (count < 3) {
				arr.push(openGId);
				this.saveData();
			}
			return count;
		}

		public reStartGame() {
			GameData.isEnd = false;
			GameData.curRestartTime = GameConfig.RestartTime;
			GameData.curShareMax = GameConfig.ShareMaxTime;
			GameData.curScore = 0;
			ApplicationFacade.getInstance().sendNotification(GameCommand.SAVE_DATA);
		}

		public async share(isTip: boolean = true, queryStr: string = null, callBack?: Function, thisObj?: any) {
			var res = await platform.shareAppMessage({
				title: ShareText[Math.floor(Math.random() * ShareText.length)],
				imageUrl: SystemUtil.getResUrl("share_jpg"),
				query: queryStr
			});
			if (res) {
				if (isTip) {
					ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "分享成功");
				}
				if (callBack && thisObj) {
					callBack.call(thisObj, res);
				}
			} else {
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "分享失败");
			}
		}

		public async typeShare(callBack: Function, thisObj: any, isCheckProp: string = null) {
			this.share(false, null, (res) => {
				this.shareComplete(res, callBack, thisObj, isCheckProp)
			}, this);
		}

		private async shareComplete(res, callBack: Function, thisObj: any, isCheckProp: string = null) {
			if (isShowType == ShowType.Normal) {
				ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "分享成功");
				if (callBack && thisObj) {
					callBack.call(thisObj, res);
				}
			} else {
				if (res.shareTickets) {
					if (isShowType == ShowType.Group) {
						ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "分享成功");
						if (callBack && thisObj) {
							callBack.call(thisObj, res);
						}
					} else {
						var infoData = await platform.getShareInfo({
							shareTicket: res.shareTickets
						});
						if (infoData) {
							var request = new ApiRequest(ApiMethod.POST, "/app/decrypt_data");
							request.addParam('app_id', AppID);
							request.addParam('open_id', GameData.openID);
							request.addParam('encrypted_data', encodeURIComponent(infoData.encryptedData));
							request.addParam('iv', encodeURIComponent(infoData.iv));
							var self = this;
							request.send(function (response) {
								console.log(" ApiRequest app decrypt_data");
								console.log(response);
								var tempData = JSON.parse(response.data);
								if (response.data && tempData.openGId && self.checkShareTime(tempData.openGId, isCheckProp) <= 2) {
									ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "分享成功");
									if (callBack && thisObj) {
										callBack.call(thisObj, res);
									}
								} else {
									ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "这个群的好友已经帮助过你了，换个试试！");
								}
							});
						}
					}
				} else {
					ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "只有群里的好友才能帮助你！");
				}
			}
		}
	}
}