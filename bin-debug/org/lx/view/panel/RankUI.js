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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var game;
(function (game) {
    var RankType;
    (function (RankType) {
        RankType[RankType["friend"] = 1] = "friend";
        RankType[RankType["group"] = 2] = "group";
        RankType[RankType["end"] = 3] = "end";
    })(RankType = game.RankType || (game.RankType = {}));
    var RankUI = (function (_super) {
        __extends(RankUI, _super);
        function RankUI() {
            var _this = _super.call(this) || this;
            _this.isComplete = false;
            _this.mGameProxy = (game.ApplicationFacade.getInstance().retrieveProxy(game.GameProxy.NAME));
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.skinName = SystemUtil.getResUrl("RankUISkin_exml");
            return _this;
        }
        RankUI.prototype.createCompleteEvent = function () {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            game.ApplicationFacade.getInstance().registerMediator(new game.RankUIMediator(this));
            this.isComplete = true;
            this.initView();
            this.resizeUI();
            this.onShow();
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
        };
        RankUI.prototype.resizeUI = function () {
            this.width = game.Size.width;
            this.height = game.Size.height;
        };
        RankUI.prototype.onUpdate = function (data) {
        };
        RankUI.prototype.onShow = function (data) {
            if (!this.isComplete) {
                return;
            }
            this.curScore.visible = false;
            switch (data) {
                case RankType.friend:
                    break;
                case RankType.group:
                    break;
                case RankType.end:
                    this.curScore.visible = true;
                    this.curScore.text = "本局得分：" + game.GameData.curScore;
                    break;
            }
            if (data) {
                platform.showLoading({
                    title: "",
                    mask: true
                });
                egret.setTimeout(function () {
                    platform.hideLoading();
                }, this, 1000);
            }
            this.addBitmap();
        };
        RankUI.prototype.addBitmap = function () {
            if (platform.openDataContext) {
                this.bitmap = platform.openDataContext.createDisplayObject(null, this.width, this.height);
                this.contentG.addChild(this.bitmap);
            }
        };
        RankUI.prototype.share = function (evt) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.mGameProxy.share();
                    return [2 /*return*/];
                });
            });
        };
        RankUI.prototype.close = function (evt) {
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.CLOSE_HOME);
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.CLOSE_RANK);
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.SHOW_START);
        };
        RankUI.prototype.onDismiss = function (data) {
            if (this.bitmap && this.bitmap.parent) {
                this.bitmap.parent.removeChild(this.bitmap);
                this.bitmap = null;
            }
            platform.clearSharedCanvas();
        };
        RankUI.prototype.initView = function () {
        };
        return RankUI;
    }(eui.Component));
    game.RankUI = RankUI;
    __reflect(RankUI.prototype, "game.RankUI");
})(game || (game = {}));
