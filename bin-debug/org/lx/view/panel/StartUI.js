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
var game;
(function (game) {
    var StartUI = (function (_super) {
        __extends(StartUI, _super);
        function StartUI() {
            var _this = _super.call(this) || this;
            _this.isComplete = false;
            _this.mGameProxy = (game.ApplicationFacade.getInstance().retrieveProxy(game.GameProxy.NAME));
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.skinName = SystemUtil.getResUrl("StartUISkin_exml");
            return _this;
        }
        StartUI.prototype.createCompleteEvent = function () {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            game.ApplicationFacade.getInstance().registerMediator(new game.StartUIMediator(this));
            this.isComplete = true;
            this.initView();
            this.resizeUI();
            // this.onShow();
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showHome, this);
            this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRank, this);
            this.skinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSkin, this);
        };
        StartUI.prototype.resizeUI = function () {
            this.width = game.Size.width;
            this.height = game.Size.height;
            // if (window.innerHeight / window.innerWidth >= 2436 / 1125) {
            // 	// this.topImg.visible = false;
            // 	this.startBtn.bottom = 550;
            // } else {
            // 	// this.topImg.visible = true;
            // 	this.startBtn.bottom = 450;
            // }
        };
        StartUI.prototype.onUpdate = function (data) {
        };
        StartUI.prototype.onShow = function (data) {
            if (!this.isComplete) {
                return;
            }
        };
        StartUI.prototype.onDismiss = function (data) {
        };
        StartUI.prototype.initView = function () {
        };
        StartUI.prototype.showHome = function () {
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.CLOSE_START);
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.SHOW_HOME);
        };
        StartUI.prototype.showSkin = function () {
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.CLOSE_START);
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.SHOW_SKIN);
        };
        StartUI.prototype.showRank = function () {
            platform.getFriendCloudStorage({
                keyList: [game.SaveRankKey]
            });
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.CLOSE_START);
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.SHOW_RANK, game.RankType.friend);
        };
        return StartUI;
    }(eui.Component));
    game.StartUI = StartUI;
    __reflect(StartUI.prototype, "game.StartUI");
})(game || (game = {}));
