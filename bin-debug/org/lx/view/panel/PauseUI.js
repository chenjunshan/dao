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
    var PauseUI = (function (_super) {
        __extends(PauseUI, _super);
        function PauseUI() {
            var _this = _super.call(this) || this;
            _this.isComplete = false;
            _this.mGameProxy = (game.ApplicationFacade.getInstance().retrieveProxy(game.GameProxy.NAME));
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.skinName = SystemUtil.getResUrl("PauseUISkin_exml");
            return _this;
        }
        PauseUI.prototype.createCompleteEvent = function () {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            game.ApplicationFacade.getInstance().registerMediator(new game.PauseUIMediator(this));
            this.isComplete = true;
            this.initView();
            this.resizeUI();
            // this.onShow();
            this.contuineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.continue, this);
            this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);
            this.saveRecordBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.saveRecord, this);
        };
        PauseUI.prototype.saveRecord = function () {
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.CLOSE_PAUSE);
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.CLOSE_HOME);
            game.ApplicationFacade.getInstance().sendNotification(game.HomeUIMediator.SAVE_RECORD);
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.SHOW_START);
        };
        PauseUI.prototype.continue = function () {
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.CLOSE_PAUSE);
        };
        PauseUI.prototype.restart = function () {
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.CLOSE_PAUSE);
            game.ApplicationFacade.getInstance().sendNotification(game.HomeUIMediator.RESTART_PALY);
        };
        PauseUI.prototype.resizeUI = function () {
            this.width = game.Size.width;
            this.height = game.Size.height;
        };
        PauseUI.prototype.onUpdate = function (data) {
        };
        PauseUI.prototype.onShow = function (data) {
            if (!this.isComplete) {
                return;
            }
            this.topScoreLab.text = "最高分：" + game.GameData.topScore;
        };
        PauseUI.prototype.onDismiss = function (data) {
        };
        PauseUI.prototype.initView = function () {
        };
        return PauseUI;
    }(eui.Component));
    game.PauseUI = PauseUI;
    __reflect(PauseUI.prototype, "game.PauseUI");
})(game || (game = {}));
