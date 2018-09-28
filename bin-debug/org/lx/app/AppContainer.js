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
    var SceneType;
    (function (SceneType) {
        SceneType[SceneType["start"] = 0] = "start";
        SceneType[SceneType["home"] = 1] = "home";
        SceneType[SceneType["continue"] = 2] = "continue";
        SceneType[SceneType["end"] = 3] = "end";
        SceneType[SceneType["rank"] = 4] = "rank";
        SceneType[SceneType["worldRank"] = 5] = "worldRank";
        SceneType[SceneType["skin"] = 6] = "skin";
        SceneType[SceneType["dare"] = 7] = "dare";
        SceneType[SceneType["dareContinue"] = 8] = "dareContinue";
        SceneType[SceneType["dareEnd"] = 9] = "dareEnd";
        SceneType[SceneType["pause"] = 10] = "pause";
    })(SceneType = game.SceneType || (game.SceneType = {}));
    var AppContainer = (function (_super) {
        __extends(AppContainer, _super);
        function AppContainer() {
            var _this = _super.call(this) || this;
            _this.bottomG = new eui.Group();
            _this.middleG = new eui.Group();
            _this.topG = new eui.Group();
            _this.bottomG.touchEnabled = false;
            _this.middleG.touchEnabled = false;
            _this.topG.touchEnabled = false;
            _this.addChild(_this.bottomG);
            _this.addChild(_this.middleG);
            _this.addChild(_this.topG);
            _this.resizeUI();
            return _this;
        }
        AppContainer.prototype.resizeUI = function () {
            if (this.bottomG) {
                this.bottomG.width = game.Size.width;
                this.bottomG.height = game.Size.height;
            }
            if (this.middleG) {
                this.middleG.width = game.Size.width;
                this.middleG.height = game.Size.height;
            }
            if (this.topG) {
                this.topG.width = game.Size.width;
                this.topG.height = game.Size.height;
            }
        };
        AppContainer.prototype.enterPage = function (view, data, root) {
            if (root === void 0) { root = this.bottomG; }
            if (view.onUpdate) {
                view.onUpdate(data);
            }
            if (!view.parent) {
                root.addChild(view);
            }
            if (view.onShow) {
                view.onShow(data);
            }
        };
        AppContainer.prototype.closePage = function (view, data) {
            if (view.onDismiss) {
                view.onDismiss(data);
            }
            if (view.parent) {
                view.parent.removeChild(view);
            }
        };
        AppContainer.prototype.init = function () {
            this.startUI = new game.StartUI();
            this.homeUI = new game.HomeUI();
            this.continueUI = new game.ContinueUI();
            this.pauseUI = new game.PauseUI();
            this.endUI = new game.EndUI();
            this.rankUI = new game.RankUI();
            this.worldRankUI = new game.WorldRankUI();
            this.skinUI = new game.SkinUI();
            this.dareUI = new game.DareUI();
            this.dareContinueUI = new game.DareContinueUI();
            this.dareEndUI = new game.DareEndUI();
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.SHOW_START);
        };
        AppContainer.prototype.enterStart = function (data) {
            this.currentScene = SceneType.start;
            this.enterPage(this.startUI, data);
        };
        AppContainer.prototype.closeStart = function (data) {
            this.closePage(this.startUI, data);
        };
        AppContainer.prototype.enterHome = function (data) {
            this.currentScene = SceneType.home;
            this.enterPage(this.homeUI, data);
        };
        AppContainer.prototype.closeHome = function (data) {
            this.closePage(this.homeUI, data);
        };
        AppContainer.prototype.enterContinue = function (data) {
            this.currentScene = SceneType.continue;
            this.enterPage(this.continueUI, data);
        };
        AppContainer.prototype.closeContinue = function (data) {
            this.closePage(this.continueUI, data);
        };
        AppContainer.prototype.enterPause = function (data) {
            this.currentScene = SceneType.pause;
            this.enterPage(this.pauseUI, data);
        };
        AppContainer.prototype.closePause = function (data) {
            this.closePage(this.pauseUI, data);
        };
        AppContainer.prototype.enterEnd = function (data) {
            this.currentScene = SceneType.end;
            this.enterPage(this.endUI, data);
        };
        AppContainer.prototype.closeEnd = function (data) {
            this.closePage(this.endUI, data);
        };
        AppContainer.prototype.enterRank = function (data) {
            this.currentScene = SceneType.rank;
            this.enterPage(this.rankUI, data);
        };
        AppContainer.prototype.closeRank = function (data) {
            this.closePage(this.rankUI, data);
        };
        AppContainer.prototype.enterWorldRank = function (data) {
            this.currentScene = SceneType.worldRank;
            this.enterPage(this.worldRankUI, data);
        };
        AppContainer.prototype.closeWorldRank = function (data) {
            this.closePage(this.worldRankUI, data);
        };
        AppContainer.prototype.enterSkin = function (data) {
            this.currentScene = SceneType.skin;
            this.enterPage(this.skinUI, data);
        };
        AppContainer.prototype.closeSkin = function (data) {
            this.closePage(this.skinUI, data);
        };
        AppContainer.prototype.enterDare = function (data) {
            this.currentScene = SceneType.dare;
            this.enterPage(this.dareUI, data);
        };
        AppContainer.prototype.closeDare = function (data) {
            this.closePage(this.dareUI, data);
        };
        AppContainer.prototype.enterDareContinue = function (data) {
            this.currentScene = SceneType.dareContinue;
            this.enterPage(this.dareContinueUI, data);
        };
        AppContainer.prototype.closeDareContinue = function (data) {
            this.closePage(this.dareContinueUI, data);
        };
        AppContainer.prototype.enterDareEnd = function (data) {
            this.currentScene = SceneType.dareEnd;
            this.enterPage(this.dareEndUI, data);
        };
        AppContainer.prototype.closeDareEnd = function (data) {
            this.closePage(this.dareEndUI, data);
        };
        return AppContainer;
    }(eui.Group));
    game.AppContainer = AppContainer;
    __reflect(AppContainer.prototype, "game.AppContainer");
})(game || (game = {}));
