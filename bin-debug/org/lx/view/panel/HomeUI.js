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
    var HomeUI = (function (_super) {
        __extends(HomeUI, _super);
        function HomeUI() {
            var _this = _super.call(this) || this;
            _this.isComplete = false;
            _this.mGameProxy = (game.ApplicationFacade.getInstance().retrieveProxy(game.GameProxy.NAME));
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.skinName = SystemUtil.getResUrl("HomeUISkin_exml");
            return _this;
        }
        HomeUI.prototype.createCompleteEvent = function () {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            game.ApplicationFacade.getInstance().registerMediator(new game.HomeUIMediator(this));
            this.isComplete = true;
            this.initView();
            this.resizeUI();
            this.clickG.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickThis, this);
            this.pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pause, this);
        };
        HomeUI.prototype.pause = function () {
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.SHOW_PAUSE);
        };
        HomeUI.prototype.resizeUI = function () {
            this.width = game.Size.width;
            this.height = game.Size.height;
            if (window.innerHeight / window.innerWidth >= 2436 / 1125) {
                this.topScoreLab.top = 80;
            }
            else {
                this.topScoreLab.top = 35;
            }
            this.curScoreLab.top = this.topScoreLab.top + this.topScoreLab.textHeight + 10;
        };
        HomeUI.prototype.initView = function () {
            this.knifeIconY = this.knifeIcon.y;
            this.yumiKnifeBoxX = this.yumiKnifeBox.x;
        };
        HomeUI.prototype.onUpdate = function (data) {
        };
        HomeUI.prototype.timerFunc = function () {
            var rotateSpeed = this.curLevel.rotateSpeed;
            if (this.curLevel.type == 1) {
                this.boxGroup.rotation += rotateSpeed;
                var r = this.boxGroup.width / 2;
                for (var i = 0; i < this.knifeBox.numChildren; i++) {
                    var child = this.knifeBox.getChildAt(i);
                    child.rotation += rotateSpeed;
                    child.x = r - Math.sin(child.rotation * (Math.PI / 180)) * r;
                    child.y = r + Math.cos(child.rotation * (Math.PI / 180)) * r;
                }
            }
            else if (this.curLevel.type == 2) {
                if (!this.toRight) {
                    this.moveX += rotateSpeed;
                    this.yumiGroup.x += rotateSpeed;
                    this.yumiKnifeBox.x += rotateSpeed;
                    if (this.yumiGroup.x + (this.yumiGroup.width / 4) + rotateSpeed >= this.width) {
                        this.toRight = true;
                    }
                }
                else {
                    this.moveX -= rotateSpeed;
                    this.yumiGroup.x -= rotateSpeed;
                    this.yumiKnifeBox.x -= rotateSpeed;
                    if (this.yumiGroup.x - (this.yumiGroup.width / 4) - rotateSpeed <= 0) {
                        this.toRight = false;
                    }
                }
            }
        };
        HomeUI.prototype.clickThis = function () {
            if (!this.canThrow) {
                return;
            }
            this.canThrow = false;
            var tw = egret.Tween.get(this.knifeIcon);
            var y;
            if (this.curLevel.type == 1) {
                y = this.boxGroup.y + this.boxGroup.height / 2;
            }
            else if (this.curLevel.type == 2) {
                y = this.yumiGroup.y + this.yumiGroup.height / 2;
            }
            tw.to({ y: y }, game.GameConfig.throwSpeed).call(this.twCallFun, this);
        };
        HomeUI.prototype.circleTwCallFun = function () {
            var isLegal = true;
            for (var i = 0; i < this.knifeArr.length; i++) {
                var knife = this.knifeArr[i];
                if (Math.abs(this.boxGroup.rotation - knife) < game.GameConfig.minAngle) {
                    isLegal = false;
                    break;
                }
            }
            if (isLegal) {
                this.canThrow = true;
                this.addImg();
                this.knifeNum++;
                this.knifeArr.push(this.boxGroup.rotation);
                this.knifeIcon.y = this.knifeIconY;
                if (this.knifeNum >= this.curLevel.target) {
                    this.nextGame();
                }
                this.setCurScore(this.curLevel.eachScore);
            }
            else {
                var tw = egret.Tween.get(this.knifeIcon);
                tw.to({ y: this.height, rotation: 10 }, game.GameConfig.throwSpeed * 4).call(this.showContinue, this);
            }
        };
        HomeUI.prototype.showContinue = function () {
            if (game.GameData.curRestartTime < game.GameConfig.RestartTime) {
                game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.SHOW_CONTINUE);
            }
            else {
                game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.SHOW_END);
            }
        };
        HomeUI.prototype.yumiTwCallFun = function () {
            var isLegal = 1;
            var w = this.yumiKnifeBox.width;
            if (Math.abs(this.moveX) >= w / 2) {
                isLegal = -1;
            }
            else {
                for (var i = 0; i < this.knifeArr.length; i++) {
                    var knife = this.knifeArr[i];
                    if (Math.abs(w / 2 - this.moveX - knife) < game.GameConfig.minWidth) {
                        isLegal = 0;
                        break;
                    }
                }
            }
            if (isLegal == 1) {
                this.canThrow = true;
                this.addYumiImg(w / 2 - this.moveX);
                this.knifeNum++;
                this.knifeArr.push(w / 2 - this.moveX);
                this.knifeIcon.y = this.knifeIconY;
                if (this.knifeNum >= this.curLevel.target) {
                    this.nextGame();
                }
                this.setCurScore(this.curLevel.eachScore);
            }
            else {
                var tw = egret.Tween.get(this.knifeIcon);
                if (isLegal == -1) {
                    tw.to({ y: 0 }, game.GameConfig.throwSpeed * 4).call(this.showContinue, this);
                }
                else if (isLegal == 0) {
                    tw.to({ y: this.height, rotation: 10 }, game.GameConfig.throwSpeed * 4).call(this.showContinue, this);
                }
            }
        };
        HomeUI.prototype.continue = function () {
        };
        HomeUI.prototype.addYumiImg = function (x) {
            var img = new eui.Image();
            img.texture = RES.getRes("knife_png");
            img.width = img.texture.$bitmapWidth * 2;
            img.height = img.texture.$bitmapHeight * 2;
            img.anchorOffsetX = img.width / 2;
            img.anchorOffsetY = img.height / 2;
            img.x = x;
            img.y = this.yumiGroup.height;
            this.yumiKnifeBox.addChild(img);
        };
        HomeUI.prototype.twCallFun = function () {
            if (this.curLevel.type == 1) {
                this.circleTwCallFun();
            }
            else if (this.curLevel.type == 2) {
                this.yumiTwCallFun();
            }
        };
        HomeUI.prototype.setKnifeArr = function () {
            this.knifeArr = [];
            for (var i in this.curLevel.knifeArr) {
                this.knifeArr.push(this.curLevel.knifeArr[i]);
            }
        };
        HomeUI.prototype.nextGame = function () {
            this.boxGroup.visible = false;
            this.knifeBox.visible = false;
            this.yumiGroup.visible = false;
            this.yumiKnifeBox.visible = false;
            this.knifeIcon.y = this.knifeIconY;
            if (this.curLevel.type == 1) {
                this.knifeBox.removeChildren();
                this.boxGroup.rotation = 0;
            }
            else if (this.curLevel.type == 2) {
                this.yumiKnifeBox.removeChildren();
                this.yumiGroup.x = this.yumiKnifeBoxX;
                this.yumiKnifeBox.x = this.yumiKnifeBoxX;
                this.moveX = 0;
            }
            this.knifeIcon.rotation = 0;
            this.knifeNum = 0;
            this.moveTime.reset();
            game.GameData.currentLevel++;
            this.curLevel = this.mGameProxy.levelConfig[game.GameData.currentLevel];
            if (game.GameData.currentLevel >= this.mGameProxy.levelConfig.length) {
                //全部通过
                return;
            }
            this.setKnifeArr();
            for (var i = 0; i < this.knifeArr.length; i++) {
                if (this.curLevel.type == 1) {
                    this.addImg(this.knifeArr[i]);
                }
                else if (this.curLevel.type == 2) {
                    this.addYumiImg(this.knifeArr[i]);
                }
            }
            this.canThrow = true;
            if (this.curLevel.type == 1) {
                this.boxGroup.visible = true;
                this.knifeBox.visible = true;
                this.yumiGroup.visible = false;
                this.yumiKnifeBox.visible = false;
            }
            else if (this.curLevel.type == 2) {
                this.yumiGroup.visible = true;
                this.yumiKnifeBox.visible = true;
                this.boxGroup.visible = false;
                this.knifeBox.visible = false;
                this.moveX = 0;
            }
            this.moveTime.start();
        };
        HomeUI.prototype.reCurGame = function () {
            this.boxGroup.visible = false;
            this.knifeBox.visible = false;
            this.yumiGroup.visible = false;
            this.yumiKnifeBox.visible = false;
            this.knifeIcon.y = this.knifeIconY;
            if (this.curLevel.type == 1) {
                this.knifeBox.removeChildren();
                this.knifeIcon.rotation = 0;
                this.boxGroup.rotation = 0;
            }
            else if (this.curLevel.type == 2) {
                this.yumiKnifeBox.removeChildren();
                this.yumiGroup.x = this.yumiKnifeBoxX;
                this.yumiKnifeBox.x = this.yumiKnifeBoxX;
                this.moveX = 0;
            }
            this.knifeIcon.rotation = 0;
            this.boxGroup.rotation = 0;
            this.yumiGroup.x = this.yumiKnifeBoxX;
            this.yumiKnifeBox.x = this.yumiKnifeBoxX;
            this.moveTime.reset();
            this.setKnifeArr();
            for (var i = 0; i < this.knifeArr.length; i++) {
                if (this.curLevel.type == 1) {
                    this.addImg(this.knifeArr[i]);
                }
                else if (this.curLevel.type == 2) {
                    this.addYumiImg(this.knifeArr[i]);
                }
            }
            if (this.curLevel.type == 1) {
                this.boxGroup.visible = true;
                this.knifeBox.visible = true;
                this.yumiGroup.visible = false;
                this.yumiKnifeBox.visible = false;
            }
            else if (this.curLevel.type == 2) {
                this.yumiGroup.visible = true;
                this.yumiKnifeBox.visible = true;
                this.boxGroup.visible = false;
                this.knifeBox.visible = false;
                this.moveX = 0;
            }
            this.canThrow = true;
            this.moveTime.start();
            game.GameData.curScore -= this.knifeNum * this.curLevel.eachScore;
            this.knifeNum = 0;
            this.setCurScore();
            this.saveScore();
            game.ApplicationFacade.getInstance().sendNotification(game.GameCommand.SAVE_DATA);
        };
        HomeUI.prototype.saveRecord = function () {
            game.GameData.hasRecord = true;
            var arr = [];
            for (var i in this.knifeArr) {
                arr.push(this.knifeArr[i]);
            }
            game.GameData.record = {
                knifeArr: arr,
                curScore: game.GameData.curScore,
                knifeNum: this.knifeNum,
                currentLevel: game.GameData.currentLevel,
                curRestartTime: game.GameData.curRestartTime
            };
            game.ApplicationFacade.getInstance().sendNotification(game.GameCommand.SAVE_DATA);
        };
        HomeUI.prototype.reStartGame = function () {
            game.GameData.playNum++;
            this.boxGroup.visible = false;
            this.knifeBox.visible = false;
            this.yumiGroup.visible = false;
            this.yumiKnifeBox.visible = false;
            this.knifeIcon.y = this.knifeIconY;
            if (this.curLevel.type == 1) {
                this.knifeBox.removeChildren();
                this.knifeIcon.rotation = 0;
                this.boxGroup.rotation = 0;
            }
            else if (this.curLevel.type == 2) {
                this.yumiKnifeBox.removeChildren();
                this.yumiGroup.x = this.yumiKnifeBoxX;
                this.yumiKnifeBox.x = this.yumiKnifeBoxX;
                this.moveX = 0;
            }
            this.knifeIcon.rotation = 0;
            this.knifeNum = 0;
            game.GameData.currentLevel = 0;
            this.curLevel = this.mGameProxy.levelConfig[game.GameData.currentLevel];
            this.boxGroup.rotation = 0;
            this.yumiGroup.x = this.yumiKnifeBoxX;
            this.yumiKnifeBox.x = this.yumiKnifeBoxX;
            this.moveTime.reset();
            this.setKnifeArr();
            for (var i = 0; i < this.knifeArr.length; i++) {
                if (this.curLevel.type == 1) {
                    this.addImg(this.knifeArr[i]);
                }
                else if (this.curLevel.type == 2) {
                    this.addYumiImg(this.knifeArr[i]);
                }
            }
            if (this.curLevel.type == 1) {
                this.boxGroup.visible = true;
                this.knifeBox.visible = true;
                this.yumiGroup.visible = false;
                this.yumiKnifeBox.visible = false;
            }
            else if (this.curLevel.type == 2) {
                this.yumiGroup.visible = true;
                this.yumiKnifeBox.visible = true;
                this.boxGroup.visible = false;
                this.knifeBox.visible = false;
                this.moveX = 0;
            }
            this.canThrow = true;
            this.moveTime.start();
            game.GameData.curRestartTime = 0;
            game.GameData.curScore = 0;
            this.setCurScore();
            this.saveScore();
            game.ApplicationFacade.getInstance().sendNotification(game.GameCommand.SAVE_DATA);
        };
        HomeUI.prototype.addImg = function (rotation) {
            var img = new eui.Image();
            img.texture = RES.getRes("knife_png");
            img.width = img.texture.$bitmapWidth * 2;
            img.height = img.texture.$bitmapHeight * 2;
            img.anchorOffsetX = img.width / 2;
            img.anchorOffsetY = img.height / 2;
            img.x = this.boxGroup.width / 2;
            img.y = this.boxGroup.height;
            if (rotation) {
                img.rotation = -rotation;
            }
            this.knifeBox.addChild(img);
        };
        HomeUI.prototype.onShow = function (data) {
            if (!this.isComplete) {
                return;
            }
            game.GameData.playNum++;
            this.boxGroup.rotation = 0;
            this.knifeIcon.rotation = 0;
            this.knifeIcon.y = this.knifeIconY;
            this.yumiGroup.x = this.yumiKnifeBoxX;
            this.yumiKnifeBox.x = this.yumiKnifeBoxX;
            this.knifeBox.removeChildren();
            this.yumiKnifeBox.removeChildren();
            this.curLevel = this.mGameProxy.levelConfig[game.GameData.currentLevel];
            if (game.GameData.hasRecord) {
                this.knifeArr = [];
                for (var j in game.GameData.record.knifeArr) {
                    this.knifeArr.push(game.GameData.record.knifeArr[j]);
                }
                this.knifeNum = game.GameData.record.knifeNum;
                game.GameData.currentLevel = game.GameData.record.currentLevel;
                game.GameData.curScore = game.GameData.record.curScore;
                game.GameData.curRestartTime = game.GameData.record.curRestartTime;
                game.GameData.hasRecord = false;
                this.curLevel = this.mGameProxy.levelConfig[game.GameData.currentLevel];
            }
            else {
                this.setKnifeArr();
                this.knifeNum = 0;
                game.GameData.curRestartTime = 0;
            }
            for (var i = 0; i < this.knifeArr.length; i++) {
                if (this.curLevel.type == 1) {
                    this.addImg(this.knifeArr[i]);
                }
                else if (this.curLevel.type == 2) {
                    this.addYumiImg(this.knifeArr[i]);
                }
            }
            this.moveTime = new egret.Timer(this.curLevel.rotateTime, 0);
            this.moveTime.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            if (this.curLevel.type == 1) {
                this.boxGroup.visible = true;
                this.knifeBox.visible = true;
                this.yumiGroup.visible = false;
                this.yumiKnifeBox.visible = false;
            }
            else if (this.curLevel.type == 2) {
                this.yumiGroup.visible = true;
                this.yumiKnifeBox.visible = true;
                this.boxGroup.visible = false;
                this.knifeBox.visible = false;
                this.moveX = 0;
            }
            this.canThrow = true;
            this.setCurScore();
            this.curTopScore = 0;
            this.saveScore();
            game.ApplicationFacade.getInstance().sendNotification(game.GameCommand.SAVE_DATA);
            this.addBitmap();
            this.moveTime.start();
        };
        HomeUI.prototype.addBitmap = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data, system, index;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, platform.getSystemInfoSync()];
                        case 1:
                            data = _a.sent();
                            if (data) {
                                system = data.system;
                                index = system.indexOf("Android");
                                if (index == -1) {
                                    if (platform.openDataContext) {
                                        this.bitmap = platform.openDataContext.createDisplayObject(null, this.width, this.height);
                                        this.nextG.addChild(this.bitmap);
                                    }
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        HomeUI.prototype.setCurScore = function (score) {
            if (score) {
                game.GameData.curScore += score;
            }
            if (game.GameData.curScore > game.GameData.topScore) {
                game.GameData.topScore = game.GameData.curScore;
            }
            this.curScoreLab.text = "得分：" + game.GameData.curScore;
            this.topScoreLab.text = "历史最高：" + game.GameData.topScore;
        };
        HomeUI.prototype.saveScore = function () {
            if (game.GameData.topScore > 0 && game.GameData.topScore > this.curTopScore) {
                this.curTopScore = game.GameData.topScore;
                platform.setUserCloudStorage({
                    KVDataList: [{
                            key: game.SaveRankKey,
                            value: JSON.stringify({
                                "wxgame": {
                                    "score": game.GameData.topScore,
                                    "update_time": new Date().getTime()
                                }
                            })
                        }
                    ]
                });
                platform.getNextFriendCloudStorage({
                    keyList: [game.SaveRankKey],
                    topScore: game.GameData.topScore
                });
            }
        };
        HomeUI.prototype.onDismiss = function (data) {
            if (this.bitmap && this.bitmap.parent) {
                this.bitmap.parent.removeChild(this.bitmap);
                this.bitmap = null;
            }
            platform.clearSharedCanvas();
            this.moveTime.reset();
            game.ApplicationFacade.getInstance().sendNotification(game.GameCommand.SAVE_DATA);
        };
        return HomeUI;
    }(eui.Component));
    game.HomeUI = HomeUI;
    __reflect(HomeUI.prototype, "game.HomeUI");
})(game || (game = {}));
