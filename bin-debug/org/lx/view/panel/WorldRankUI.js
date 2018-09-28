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
    var WorldRankUI = (function (_super) {
        __extends(WorldRankUI, _super);
        function WorldRankUI() {
            var _this = _super.call(this) || this;
            _this.isComplete = false;
            _this.mGameProxy = (game.ApplicationFacade.getInstance().retrieveProxy(game.GameProxy.NAME));
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            return _this;
            // this.skinName = SystemUtil.getResUrl("StartUISkin_exml");
        }
        WorldRankUI.prototype.createCompleteEvent = function () {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            game.ApplicationFacade.getInstance().registerMediator(new game.WorldRankUIMediator(this));
            this.isComplete = true;
            this.initView();
            // this.onShow();
        };
        WorldRankUI.prototype.onUpdate = function (data) {
        };
        WorldRankUI.prototype.onShow = function (data) {
            if (!this.isComplete) {
                return;
            }
        };
        WorldRankUI.prototype.onDismiss = function (data) {
        };
        WorldRankUI.prototype.initView = function () {
        };
        return WorldRankUI;
    }(eui.Component));
    game.WorldRankUI = WorldRankUI;
    __reflect(WorldRankUI.prototype, "game.WorldRankUI");
})(game || (game = {}));
