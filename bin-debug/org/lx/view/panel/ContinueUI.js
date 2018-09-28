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
    var ContinueUI = (function (_super) {
        __extends(ContinueUI, _super);
        function ContinueUI() {
            var _this = _super.call(this) || this;
            _this.isComplete = false;
            _this.mGameProxy = (game.ApplicationFacade.getInstance().retrieveProxy(game.GameProxy.NAME));
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.skinName = SystemUtil.getResUrl("ContinueUISkin_exml");
            return _this;
        }
        ContinueUI.prototype.createCompleteEvent = function () {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            game.ApplicationFacade.getInstance().registerMediator(new game.ContinueUIMediator(this));
            this.isComplete = true;
            this.initView();
            this.resizeUI();
            // this.onShow();
            this.contuineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.continue, this);
            this.giveUpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.giveUp, this);
        };
        ContinueUI.prototype.continue = function () {
            game.GameData.curRestartTime++;
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.CLOSE_CONTINUE);
            game.ApplicationFacade.getInstance().sendNotification(game.HomeUIMediator.CONTINUE_PALY);
        };
        ContinueUI.prototype.giveUp = function () {
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.CLOSE_CONTINUE);
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.SHOW_END);
        };
        ContinueUI.prototype.resizeUI = function () {
            this.width = game.Size.width;
            this.height = game.Size.height;
        };
        ContinueUI.prototype.onUpdate = function (data) {
        };
        ContinueUI.prototype.onShow = function (data) {
            if (!this.isComplete) {
                return;
            }
            this.curScoreLab.text = game.GameData.curScore + "";
        };
        ContinueUI.prototype.onDismiss = function (data) {
        };
        ContinueUI.prototype.initView = function () {
        };
        return ContinueUI;
    }(eui.Component));
    game.ContinueUI = ContinueUI;
    __reflect(ContinueUI.prototype, "game.ContinueUI");
})(game || (game = {}));
