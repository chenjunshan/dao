//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.isReady = false;
        _this.isLoad = false;
        _this.isLogin = false;
        _this.isInit = false;
        game.Font.def_font_family = "";
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }
        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // }
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        if (!SystemUtil.isNative()) {
            if (window.screen.height && window.screen.width / window.screen.height > 0.7) {
                this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            }
            this.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, function () {
                if (window.screen.height && window.screen.width / window.screen.height > 0.7) {
                    this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
                }
                else {
                    this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
                }
            }, this);
            if (SystemUtil.isMobile()) {
                this.stage.orientation = egret.OrientationMode.PORTRAIT;
            }
        }
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.login()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var login;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, platform.login()];
                    case 1:
                        login = _a.sent();
                        if (login) {
                            if (login.code) {
                                game.code = login.code;
                                //     game.isShowShare = 0;
                                //     game.isShowAd = 0;
                                //     var request = new ApiRequest(ApiMethod.POST, "/app/params");
                                //     request.addParam('app_id', game.AppID);
                                //     request.addParam('version', game.Version.name);
                                //     request.send(function (response) {
                                //         console.log(" ApiRequest app params");
                                //         console.log(response);
                                //         game.isShowShare = response.data.show_share;
                                //         game.isShowAd = response.data.show_video_ad;
                                //     });
                            }
                            this.getUserInfo(this.showModal, this);
                        }
                        else {
                            this.showModal();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.getUserInfo = function (faillCallBack, thisObJ) {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, platform.getUserInfo()];
                    case 1:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        if (userInfo) {
                            game.nickName = userInfo.nickName;
                            game.avatarUrl = userInfo.avatarUrl;
                            // var data = await platform.getLaunchOptionsSync();
                            // console.log(data);
                            // if (data.query && data.query.inviter_open_id) {
                            // console.log(data);
                            // game.inviteeOpenID = data.query.inviter_open_id;
                            // console.log("inviter_open_id: " + game.inviteeOpenID);
                            // if (game.code) {
                            //     var request = new ApiRequest(ApiMethod.POST, "/login");
                            //     request.addParam('app_id', game.AppID);
                            //     request.addParam('code', game.code);
                            //     request.send(function (response) {
                            //         console.log(" ApiRequest login ");
                            //         console.log(response);
                            //         game.openID = response.data.open_id;
                            //         if (game.inviteeOpenID != null && game.inviteeOpenID != undefined) {
                            //             var request = new ApiRequest(ApiMethod.POST, "/invite/set_inviter");
                            //             request.addParam('app_id', game.AppID);
                            //             request.addParam('open_id', game.openID);
                            //             request.addParam('name', encodeURIComponent(game.nickName));
                            //             request.addParam('avatar', encodeURIComponent(game.avatarUrl));
                            //             request.addParam('inviter_open_id', game.inviteeOpenID);
                            //             request.send(function (response) {
                            //                 console.log(" ApiRequest set_inviter ");
                            //                 console.log(response);
                            //             });
                            //         }
                            //     });
                            // }
                            // } else {
                            if (game.code) {
                                request = new ApiRequest(ApiMethod.POST, "/login");
                                request.addParam('app_id', game.AppID);
                                request.addParam('code', game.code);
                                request.send(function (response) {
                                    console.log(" ApiRequest login ");
                                    console.log(response);
                                    game.openID = response.data.open_id;
                                });
                            }
                            // }
                            this.isLogin = true;
                            // this.createScene();
                        }
                        else if (faillCallBack && thisObJ) {
                            faillCallBack.call(thisObJ);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.showModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var showModal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, platform.showModal({
                            title: "警告",
                            content: "您点击了拒绝授权,将无法正常运行程序,点击确定重新获取授权。"
                        })];
                    case 1:
                        showModal = _a.sent();
                        if (showModal) {
                            this.openSetting();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.openSetting = function () {
        return __awaiter(this, void 0, void 0, function () {
            var openSetting;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, platform.openSetting()];
                    case 1:
                        openSetting = _a.sent();
                        if (openSetting) {
                            this.getUserInfo();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.laodStage()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    Main.prototype.laodStage = function () {
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        if (game.Platform.current != "") {
            RES.loadConfig("resource/default.res." + game.Platform.current + ".json", "resource/");
        }
        else {
            RES.loadConfig("resource/default.res.json", "resource/");
        }
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadTheme()];
                    case 1:
                        _a.sent();
                        RES.getResAsync("res_json", function (resConfig) {
                            SystemUtil.ResData = resConfig.resources;
                        }, this);
                        // SystemUtil.ResData = event.target.resConfig.keyMap;
                        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
                        //Config loading process interface
                        //设置加载进度界面
                        this.loadingView = new LoadingUI();
                        this.stage.addChild(this.loadingView);
                        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                        RES.loadGroup("preload");
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isLoad = true;
            this.createScene();
        }
    };
    Main.prototype.createScene = function () {
        var _this = this;
        // if (!this.isLoad || !this.isLogin || this.isInit) {
        //     return;
        // }
        this.isInit = true;
        this.startCreateScene();
        egret.setTimeout(function () {
            _this.stage.removeChild(_this.loadingView);
            SystemUtil.sendToNative("show_ad", "banner");
        }, this, 500);
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.startCreateScene = function () {
        this.appContainer = new game.AppContainer();
        this.addChild(this.appContainer);
        game.ApplicationFacade.getInstance().startUp(this.appContainer);
        this.isReady = true;
        this.isInitGame();
    };
    Main.prototype.isInitGame = function () {
        if (SystemUtil.isNative()) {
            if (this.isReady && !SystemUtil.isVoid(game.GameProxy.sysLanguage)
                && !SystemUtil.isVoid(game.GameProxy.system)) {
                game.ApplicationFacade.getInstance().sendNotification(game.GameCommand.INIT_GAME);
            }
        }
        else {
            game.ApplicationFacade.getInstance().sendNotification(game.GameCommand.INIT_GAME);
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
