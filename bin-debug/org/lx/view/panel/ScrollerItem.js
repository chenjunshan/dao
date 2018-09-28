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
    game.SkinType = {
        knife: "knife",
        box: "box"
    };
    game.itemType = {
        null: "null",
        invite: "invite",
        score: "score",
        day: "day",
        num: "num",
        get: "get" //获取飞刀数量
    };
    var ScrollerItem = (function (_super) {
        __extends(ScrollerItem, _super);
        function ScrollerItem() {
            var _this = _super.call(this) || this;
            _this.isComplete = false;
            _this.mGameProxy = (game.ApplicationFacade.getInstance().retrieveProxy(game.GameProxy.NAME));
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.skinName = SystemUtil.getResUrl("ScrollerItemSkin_exml");
            return _this;
        }
        ScrollerItem.prototype.createCompleteEvent = function () {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.isComplete = true;
            this.initView();
            this.resizeUI();
            this.progress.maximum = 100;
            this.progress.minimum = 0;
            this.progress.value = 10;
        };
        ScrollerItem.prototype.resizeUI = function () {
        };
        ScrollerItem.prototype.onUpdate = function (data) {
        };
        ScrollerItem.prototype.onShow = function (data) {
            // this.data = data;
            // if (!this.isComplete || !this.data) {
            // 	return;
            // }
            // this.stateLab.visible = false;
            // this.Btn.visible = false;
            // this.progress.visible = true;
            // this.descLab.text = this.data.desc;
            // if (this.data.type == SkinType.knife) {
            // 	this.curSkin = GameData.curKnifeSkin;
            // } else if (this.data.type == SkinType.box) {
            // 	this.curSkin = GameData.curBoxSkin;
            // }
            // if (this.data.itemType == itemType.null) {
            // 	this.progress.visible = false;
            // 	this.curValue = 999999;
            // } else if (this.data.itemType == itemType.invite) {
            // 	this.curValue = GameData.inviteNum;
            // } else if (this.data.itemType == itemType.score) {
            // 	this.curValue = GameData.topScore;
            // } else if (this.data.itemType == itemType.day) {
            // 	this.curValue = GameData.playDay;
            // } else if (this.data.itemType == itemType.num) {
            // 	this.curValue = GameData.playNum;
            // } else if (this.data.itemType == itemType.get) {
            // 	this.curValue = this.mGameProxy.getKnifeSkinNum();
            // }
            // if (this.curValue < this.data.target) {
            // 	this.progress.value = this.curValue / this.data.target * 100;
            // 	this.Btn.label = "来一把";
            // 	if (this.data.itemType == itemType.invite) {
            // 		this.Btn.label = "邀请";
            // 	}
            // 	this.Btn.visible = true;
            // } else {
            // 	this.progress.value = this.progress.maximum;
            // 	if (this.curSkin == this.data.id) {
            // 		this.stateLab.visible = true;
            // 		this.Btn.visible = false;
            // 	} else {
            // 		this.Btn.label = "使用";
            // 		this.Btn.visible = true;
            // 	}
            // }
            // this.progress.labelDisplay.textColor = 0x000000;
            // console.log(this.progress.minimum + "/" + this.progress.maximum + "---" + this.progress.value
            // 	+ "---" + this.progress.width + "---" + this.progress.height);
        };
        ScrollerItem.prototype.onDismiss = function (data) {
        };
        ScrollerItem.prototype.initView = function () {
        };
        return ScrollerItem;
    }(eui.Component));
    game.ScrollerItem = ScrollerItem;
    __reflect(ScrollerItem.prototype, "game.ScrollerItem");
})(game || (game = {}));
