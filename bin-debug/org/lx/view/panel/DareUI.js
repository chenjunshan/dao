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
    var DareUI = (function (_super) {
        __extends(DareUI, _super);
        function DareUI() {
            var _this = _super.call(this) || this;
            _this.isComplete = false;
            _this.mGameProxy = (game.ApplicationFacade.getInstance().retrieveProxy(game.GameProxy.NAME));
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            return _this;
            // this.skinName = SystemUtil.getResUrl("StartUISkin_exml");
        }
        DareUI.prototype.createCompleteEvent = function () {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            game.ApplicationFacade.getInstance().registerMediator(new game.DareUIMediator(this));
            this.isComplete = true;
            this.initView();
            this.resizeUI();
        };
        DareUI.prototype.resizeUI = function () {
            this.width = game.Size.width;
            this.height = game.Size.height;
        };
        DareUI.prototype.onUpdate = function (data) {
        };
        DareUI.prototype.onShow = function (data) {
            if (!this.isComplete) {
                return;
            }
        };
        DareUI.prototype.onDismiss = function (data) {
        };
        DareUI.prototype.initView = function () {
        };
        return DareUI;
    }(eui.Component));
    game.DareUI = DareUI;
    __reflect(DareUI.prototype, "game.DareUI");
})(game || (game = {}));
