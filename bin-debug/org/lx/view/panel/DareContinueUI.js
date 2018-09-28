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
    var DareContinueUI = (function (_super) {
        __extends(DareContinueUI, _super);
        function DareContinueUI() {
            var _this = _super.call(this) || this;
            _this.isComplete = false;
            _this.mGameProxy = (game.ApplicationFacade.getInstance().retrieveProxy(game.GameProxy.NAME));
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            return _this;
            // this.skinName = SystemUtil.getResUrl("StartUISkin_exml");
        }
        DareContinueUI.prototype.createCompleteEvent = function () {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            game.ApplicationFacade.getInstance().registerMediator(new game.DareContinueUIMediator(this));
            this.isComplete = true;
            this.initView();
            this.resizeUI();
        };
        DareContinueUI.prototype.resizeUI = function () {
            this.width = game.Size.width;
            this.height = game.Size.height;
        };
        DareContinueUI.prototype.onUpdate = function (data) {
        };
        DareContinueUI.prototype.onShow = function (data) {
            if (!this.isComplete) {
                return;
            }
        };
        DareContinueUI.prototype.onDismiss = function (data) {
        };
        DareContinueUI.prototype.initView = function () {
        };
        return DareContinueUI;
    }(eui.Component));
    game.DareContinueUI = DareContinueUI;
    __reflect(DareContinueUI.prototype, "game.DareContinueUI");
})(game || (game = {}));
