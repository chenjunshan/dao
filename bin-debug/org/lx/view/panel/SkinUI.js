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
    var SkinUI = (function (_super) {
        __extends(SkinUI, _super);
        function SkinUI() {
            var _this = _super.call(this) || this;
            _this.isComplete = false;
            _this.mGameProxy = (game.ApplicationFacade.getInstance().retrieveProxy(game.GameProxy.NAME));
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.skinName = SystemUtil.getResUrl("SkinUISkin_exml");
            return _this;
        }
        SkinUI.prototype.createCompleteEvent = function () {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            game.ApplicationFacade.getInstance().registerMediator(new game.SkinUIMediator(this));
            this.isComplete = true;
            this.initView();
            // this.onShow();
            this.knifeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickKnife, this);
            this.boxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBox, this);
        };
        SkinUI.prototype.clickKnife = function () {
            if (this.selected == 1) {
                return;
            }
            this.selected = 1;
            this.scroller.visible = true;
            this.scroller0.visible = false;
            // this.knifeBtn.icon = "btn_green_png";
            // this.boxBtn.icon = "";
        };
        SkinUI.prototype.clickBox = function () {
            if (this.selected == 2) {
                return;
            }
            this.selected = 2;
            this.scroller.visible = false;
            this.scroller0.visible = true;
            // this.boxBtn.icon = "btn_green_png";
            // this.knifeBtn.icon = "";
        };
        SkinUI.prototype.onUpdate = function (data) {
        };
        SkinUI.prototype.onShow = function (data) {
            if (!this.isComplete) {
                return;
            }
            this.selected = 1;
            this.scroller.visible = true;
            this.scroller0.visible = false;
            for (var i = 0; i < this.items.length; i++) {
                var skinItem = this.items[i];
                var config = this.mGameProxy.skinConfig[game.SkinType.knife][i];
                skinItem.onShow({
                    id: config.id,
                    desc: config.desc,
                    target: config.target,
                    itemType: config.type,
                    type: game.SkinType.knife,
                });
            }
            for (var i = 0; i < this.items0.length; i++) {
                var skinItem = this.items0[i];
                var config = this.mGameProxy.skinConfig[game.SkinType.box][i];
                skinItem.onShow({
                    id: config.id,
                    desc: config.desc,
                    target: config.target,
                    itemType: config.type,
                    type: game.SkinType.box,
                });
            }
        };
        SkinUI.prototype.onDismiss = function (data) {
        };
        SkinUI.prototype.initView = function () {
            this.selected = 1;
            for (var j in this.mGameProxy.skinConfig) {
                if (j == game.SkinType.knife) {
                    this.items = new Array();
                    for (var i in this.mGameProxy.skinConfig[j]) {
                        var skinItem = new game.ScrollerItem();
                        this.items.push(skinItem);
                        this.scrollerG.addChild(skinItem);
                    }
                }
                else if (j == game.SkinType.box) {
                    this.items0 = new Array();
                    for (var i in this.mGameProxy.skinConfig[j]) {
                        var skinItem = new game.ScrollerItem();
                        this.items0.push(skinItem);
                        this.scrollerG0.addChild(skinItem);
                    }
                }
            }
        };
        return SkinUI;
    }(eui.Component));
    game.SkinUI = SkinUI;
    __reflect(SkinUI.prototype, "game.SkinUI");
})(game || (game = {}));
