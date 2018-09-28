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

class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        game.Font.def_font_family = "";

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }

        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        if (!SystemUtil.isNative()) {
            if (window.screen.height && window.screen.width / window.screen.height > 0.7) {
                this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            }
            this.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, function () {
                if (window.screen.height && window.screen.width / window.screen.height > 0.7) {
                    this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
                } else {
                    this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
                }
            }, this);
            if (SystemUtil.isMobile()) {
                this.stage.orientation = egret.OrientationMode.PORTRAIT;
            }
        }

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource();
        await this.login();
        platform.showShareMenu({
            withShareTicket: true
        });
        platform.onShow((res) => {
            console.log("onShow query: " + res.query);
            console.log(res.query);
            if (res.query && res.query.cp_menu) {
                game.cp_menu = res.query.cp_menu;
                console.log("cp_menu: " + game.cp_menu);
            }
            game.ApplicationFacade.getInstance().sendNotification(game.GameCommand.CHECK_GET_FOCUS);
        })
        platform.onShareAppMessage(function () {
            // 用户点击了“转发”按钮
            return {
                title: game.ShareText[Math.floor(Math.random() * game.ShareText.length)],
                imageUrl: SystemUtil.getResUrl("share_jpg"),
            }
        })
    }

    private isGetParams: boolean;
    private async login() {
        game.isShowShare = 0;
        game.isShowAd = 0;
        this.isGetParams = false;
        var request = new ApiRequest(ApiMethod.POST, "/app/params");
        request.addParam('app_id', game.AppID);
        request.addParam('version', game.Version.name);
        request.send(function (response) {
            console.log(" ApiRequest app params");
            console.log(response);
            game.isShowShare = response.data.show_share;
            game.isShowAd = response.data.show_video_ad;
            game.isShowFocus = response.data.show_follow;
            game.isShowType = response.data.share_type;
            game.isShowGameClub = response.data.show_game_club;
            game.isShowAwyAd = response.data.show_awy_ad;
            game.isShowFocusCp = response.data.show_gzh_follow;
            game.ApplicationFacade.getInstance().sendNotification(game.StartUIMediator.RESET_AWY_AD);
        });

        var data: any = egret.localStorage.getItem("isLogin");
        console.log(data);
        if (!data) {
            const login = await platform.login();
            if (login && login.code) {
                game.code = login.code;
            }
            game.isNeedLogin = true;
            egret.localStorage.setItem("isLogin", "true");
            console.log("login!!!");
        } else {
            const checkSession = await platform.checkSession();
            if (!checkSession) {
                const login = await platform.login();
                if (login && login.code) {
                    game.code = login.code;
                }
                game.isNeedLogin = true;
            } else {
                game.isNeedLogin = false;
            }
        }
        this.createScene();
    }


    private async loadResource() {
        try {
            await this.laodStage();
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
        });
    }

    private laodStage() {
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        if (game.Platform.current != "") {
            RES.loadConfig("resource/default.res." + game.Platform.current + ".json", "resource/");
        } else {
            RES.loadConfig("resource/default.res.json", "resource/");
        }
    }
    private appContainer: game.AppContainer;
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;

    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private async onConfigComplete(event: RES.ResourceEvent) {
        await this.loadTheme();

        RES.getResAsync("res_json", (resConfig) => {
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
    }

    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isLoad = true;
            this.createScene();
        }
    }
    private createScene() {
        if (!this.isLoad || this.isInit) {
            return;
        }
        this.isInit = true;
        this.startCreateScene();
        egret.setTimeout(() => {
            this.stage.removeChild(this.loadingView);
            SystemUtil.sendToNative("show_ad", "banner");
        }, this, 500);
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private isReady: boolean = false;
    private isLoad: boolean = false;
    private isLogin: boolean = false;
    private isInit: boolean = false;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        this.appContainer = new game.AppContainer();
        this.addChild(this.appContainer);
        game.ApplicationFacade.getInstance().startUp(this.appContainer);
        this.isReady = true;
        this.isInitGame();
    }

    private isInitGame(): void {
        if (SystemUtil.isNative()) {
            if (this.isReady && !SystemUtil.isVoid(game.GameProxy.sysLanguage)
                && !SystemUtil.isVoid(game.GameProxy.system)) {
                game.ApplicationFacade.getInstance().sendNotification(game.GameCommand.INIT_GAME);
            }
        } else {
            game.ApplicationFacade.getInstance().sendNotification(game.GameCommand.INIT_GAME);
        }
    }

}
