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
    var EndUI = (function (_super) {
        __extends(EndUI, _super);
        function EndUI() {
            var _this = _super.call(this) || this;
            _this.isComplete = false;
            _this.mGameProxy = (game.ApplicationFacade.getInstance().retrieveProxy(game.GameProxy.NAME));
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.skinName = SystemUtil.getResUrl("EndUISkin_exml");
            return _this;
        }
        EndUI.prototype.createCompleteEvent = function () {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            game.ApplicationFacade.getInstance().registerMediator(new game.EndUIMediator(this));
            this.isComplete = true;
            this.initView();
            this.resizeUI();
            // this.onShow();
            this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
        };
        EndUI.prototype.restart = function () {
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.CLOSE_END);
            game.ApplicationFacade.getInstance().sendNotification(game.HomeUIMediator.RESTART_PALY);
        };
        EndUI.prototype.start = function () {
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.CLOSE_END);
            game.ApplicationFacade.getInstance().sendNotification(game.HomeUIMediator.RESTART_PALY);
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.CLOSE_HOME);
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.SHOW_START);
        };
        EndUI.prototype.resizeUI = function () {
            this.width = game.Size.width;
            this.height = game.Size.height;
        };
        EndUI.prototype.onUpdate = function (data) {
        };
        EndUI.prototype.onShow = function (data) {
            if (!this.isComplete) {
                return;
            }
            this.curScoreLab.text = "" + game.GameData.curScore;
            this.topScoreLab.text = "历史最高分：" + game.GameData.topScore;
            platform.showLoading({
                title: "",
                mask: true
            });
            egret.setTimeout(function () {
                platform.hideLoading();
            }, this, 1000);
            platform.getEndFriendCloudStorage({
                keyList: [game.SaveRankKey],
                opendId: game.openID,
                x: (this.width - this.infoG.width) / 2 / this.width,
                y: this.infoG.top / this.height,
                w: this.infoG.width / this.width,
                h: this.infoG.height / this.height
            });
            console.log("111" + game.openID);
            this.addBitmap();
        };
        EndUI.prototype.onDismiss = function (data) {
            if (this.bitmap && this.bitmap.parent) {
                this.bitmap.parent.removeChild(this.bitmap);
                this.bitmap = null;
            }
            platform.clearSharedCanvas();
        };
        EndUI.prototype.initView = function () {
        };
        EndUI.prototype.addBitmap = function () {
            if (platform.openDataContext) {
                this.bitmap = platform.openDataContext.createDisplayObject(null, this.width, this.height);
                this.contentG.addChild(this.bitmap);
            }
        };
        return EndUI;
    }(eui.Component));
    game.EndUI = EndUI;
    __reflect(EndUI.prototype, "game.EndUI");
})(game || (game = {}));
