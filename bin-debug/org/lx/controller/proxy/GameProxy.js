var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var game;
(function (game) {
    var GameProxy = (function (_super) {
        __extends(GameProxy, _super);
        function GameProxy() {
            var _this = _super.call(this, GameProxy.NAME) || this;
            _this.isBgmLoad = false;
            _this.isHomeLoad = false;
            return _this;
        }
        GameProxy.prototype.init = function () {
            this.initPlatform();
            this.setSize();
            // egret.localStorage.removeItem(SaveKey);
            this.initConfig();
        };
        GameProxy.prototype.initPlatform = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        GameProxy.prototype.onRewardedVideClose = function (callBack) {
            if (this.rewardedVideoAd) {
                this.rewardedVideoAd.onClose(callBack);
            }
        };
        // public showRewardedVideoAd() {
        // 	if (this.rewardedVideoAd) {
        // 		this.rewardedVideoAd.show().catch((err) => {
        // 			ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "暂无可观看的视频");
        // 			console.log('激励视频 广告加载失败')
        // 			console.log(err)
        // 			this.rewardedVideoAd.load();
        // 		});
        // 	} else {
        // 		ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_TOAST, "暂无可观看的视频");
        // 	}
        // }
        GameProxy.prototype.showGameClubButton = function () {
            if (this.gameClubButton) {
                this.gameClubButton.style.hidden = false;
            }
        };
        GameProxy.prototype.hideGameClubButton = function () {
            if (this.gameClubButton) {
                this.gameClubButton.style.hidden = true;
            }
        };
        GameProxy.prototype.getBtnLab = function (group) {
            var skin = group.getChildAt(0).skin;
            var lab = skin.label;
            return lab;
        };
        GameProxy.prototype.initConfig = function () {
            var data = egret.localStorage.getItem(game.SaveKey);
            if (data) {
                var gameData = JSON.parse(data);
                for (var l in gameData) {
                    game.GameData[l] = gameData[l];
                }
            }
            else {
                game.GameData.userId = egret.getTimer().toString();
                game.GameData.language = this.checkLanguage(GameProxy.sysLanguage);
            }
            var currentTime = new Date().getTime();
            if (!SystemUtil.isSameDay(currentTime, game.GameData.loginTime)) {
                game.GameData.shares = [];
                game.GameData.propShares = [];
                game.GameData.loginTime = currentTime;
            }
            this.levelConfig = RES.getRes("level_json");
            this.skinConfig = RES.getRes("skin_json");
            this.saveData();
            this.initData();
        };
        GameProxy.prototype.initData = function () {
            if (game.GameData) {
                // lx.Music.getInstance().load(music_type.bgm, SystemUtil.getResUrl(music_type.bgm), egret.Sound.MUSIC, () => {
                // 	this.isBgmLoad = true;
                // });
                // lx.Music.getInstance().load(music_type.home, SystemUtil.getResUrl(music_type.home), egret.Sound.MUSIC, () => {
                // 	this.isHomeLoad = true;
                // });
                game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.INIT_SCENE);
            }
        };
        GameProxy.prototype.SaveData = function () {
            this.saveData();
        };
        GameProxy.prototype.setMusic = function (play, music, noSave) {
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
        };
        GameProxy.prototype.setBgm = function (play) {
            // if (this.isBgmLoad) {
            // 	this.playMusic(music_type.bgm, play);
            // } else {
            // 	this.loadAndPlayBgm(play);
            // }
        };
        GameProxy.prototype.setHome = function (play) {
            // if (this.isHomeLoad) {
            // 	this.playMusic(music_type.home, play);
            // } else {
            // 	this.loadAndPlayHome(play);
            // }
        };
        GameProxy.prototype.playMusic = function (music, play) {
            // if (play) {
            // 	lx.Music.getInstance().play(music, -1);
            // } else {
            // 	lx.Music.getInstance().stop(music);
            // }
        };
        GameProxy.prototype.loadAndPlayHome = function (play) {
            // lx.Music.getInstance().load(music_type.home, SystemUtil.getResUrl(music_type.home), egret.Sound.MUSIC, () => {
            // 	this.isHomeLoad = true;
            // 	this.playMusic(music_type.home, play);
            // });
        };
        GameProxy.prototype.loadAndPlayBgm = function (play) {
            // lx.Music.getInstance().load(music_type.bgm, SystemUtil.getResUrl(music_type.bgm), egret.Sound.MUSIC, () => {
            // 	this.isBgmLoad = true;
            // 	this.playMusic(music_type.bgm, play);
            // });
        };
        GameProxy.prototype.checkLanguage = function (nativeLanguge) {
            game.language.current = game.language.default;
            var sysLanguage = "";
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                if (nativeLanguge) {
                    sysLanguage = nativeLanguge;
                }
            }
            else {
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
        };
        GameProxy.prototype.saveData = function () {
            if (SystemUtil.isSameDay(new Date().getTime(), game.GameData.curTime) == false) {
                game.GameData.playDay++;
            }
            game.GameData.curTime = new Date().getTime();
            egret.localStorage.removeItem(game.SaveKey);
            egret.localStorage.setItem(game.SaveKey, JSON.stringify(game.GameData).toString());
        };
        GameProxy.prototype.getKnifeSkinNum = function () {
            var num = 1;
            for (var i in this.skinConfig[game.SkinType.knife]) {
                var knife = this.skinConfig[game.SkinType.knife][i];
                if (knife && knife.id > 0) {
                    switch (knife.type) {
                        case game.itemType.invite: {
                            if (game.GameData.inviteNum >= knife.target) {
                                num++;
                            }
                            break;
                        }
                        case game.itemType.score: {
                            if (game.GameData.topScore >= knife.target) {
                                num++;
                            }
                            break;
                        }
                    }
                }
            }
            return num;
        };
        GameProxy.prototype.setSize = function () {
            game.Size.width = egret.MainContext.instance.stage.stageWidth;
            game.Size.height = egret.MainContext.instance.stage.stageHeight;
        };
        GameProxy.prototype.checkShareTime = function (openGId, isProp) {
            var currentTime = new Date().getTime();
            if (!SystemUtil.isSameDay(currentTime, game.GameData.loginTime)) {
                game.GameData.shares = [];
                game.GameData.propShares = [];
                game.GameData.loginTime = currentTime;
            }
            var count = 0;
            var arr = game.GameData.shares;
            if (isProp) {
                arr = game.GameData.propShares;
            }
            for (var i in arr) {
                var temp = arr[i];
                if (temp == openGId) {
                    count++;
                }
            }
            if (count == 0) {
                arr.push(openGId);
                this.saveData();
            }
            return count;
        };
        GameProxy.prototype.reStartGame = function () {
            game.GameData.isEnd = false;
            game.GameData.curRestartTime = game.GameConfig.RestartTime;
            game.GameData.curShareMax = game.GameConfig.ShareMaxTime;
            game.GameData.curScore = 0;
            game.ApplicationFacade.getInstance().sendNotification(game.GameCommand.SAVE_DATA);
        };
        GameProxy.prototype.share = function (isTip, queryStr, callBack, thisObj) {
            if (isTip === void 0) { isTip = true; }
            if (queryStr === void 0) { queryStr = null; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        GameProxy.NAME = "GameProxy";
        return GameProxy;
    }(puremvc.Proxy));
    game.GameProxy = GameProxy;
    __reflect(GameProxy.prototype, "game.GameProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(game || (game = {}));
