var game;
(function (game) {
    game.AppID = "wx784d93c1419745cd";
    game.Version = {
        name: "1.1.0",
        code: 1,
        add: "?v1805311400"
    };
    game.Platform = {
        /**
         * 当前平台
         */
        current: "",
    };
    /**
     * 游戏服务器相关
     */
    game.Socket = {
        host: "",
        port: 0
    };
    game.Size = {
        /**
         * 屏幕实际宽（动态设置）
         */
        width: 640,
        /**
         * 屏幕实际高（动态设置）
         */
        height: 1136,
        // 设计分辨率
        width_design: 640,
        height_design: 1136,
    };
    /**
     * 颜色
     */
    game.Color = {
        gold: 0xb68523,
        yellow: 0xF8E297,
        blue: 0x1398e5,
        red: 0xfc0202,
        white: 0xffffff,
        black: 0x000000
    };
    game.Font = {
        small_size: 22,
        normal_size: 26,
        large_size: 30,
        /**
         * 默认字体
         */
        def_font_family: "basic_font",
    };
    /**
     * 默认标记
     */
    game.Mrak = {
        multiply: "×"
    };
    game.GameData = {
        userId: null,
        music: true,
        language: "",
        curScore: 0,
        topScore: 0,
        currentLevel: 0,
        curRestartTime: 0,
        isEnd: true,
        loginTime: 0,
        shares: [],
        propShares: [],
        curShareMax: 0,
        isShareMax: false,
        isShareProp: false,
        isShareRestart: false,
        inviteNum: 0,
        curTime: 0,
        playDay: 0,
        playNum: 0,
        curKnifeSkin: 0,
        curBoxSkin: 0,
        hasRecord: false,
        record: {
            knifeArr: [],
            curScore: 0,
            knifeNum: 0,
            currentLevel: 0,
            curRestartTime: 0
        }
    };
    game.code = null;
    game.nickName = null;
    game.avatarUrl = null;
    game.openID = null;
    game.inviteeOpenID = null;
    game.isShowAd = 0;
    game.isShowShare = 0;
    game.SaveKey = "lx_game";
    game.SaveRankKey = "rank";
    game.language_type = {
        cn: "cn",
        tw: "tw",
        en: "en"
    };
    game.language_list = [
        game.language_type.cn,
        game.language_type.tw,
        game.language_type.en
    ];
    game.language_res = {
        ios_cn: {
            key: "zh-Hant",
            res: game.language_type.tw
        },
        ios_tw: {
            key: "zh-Hans",
            res: game.language_type.cn
        },
        ios_cn_pro: {
            key: "zh-Hant-CN",
            res: game.language_type.tw
        },
        ios_tw_pro: {
            key: "zh-Hans-CN",
            res: game.language_type.cn
        },
        web_cn: {
            key: "zh-CN",
            res: game.language_type.cn
        },
        web_tw: {
            key: "zh-TW",
            res: game.language_type.tw
        },
        en: {
            key: "en",
            res: game.language_type.en
        }
    };
    game.language = {
        text: null,
        current: "",
        default: game.language_res.en.res
    };
    game.GameConfig = {
        ReviveDestroy: 2,
        RestartTime: 1,
        ShareNum: 10,
        ShareMaxTime: 1,
        throwSpeed: 150,
        minAngle: 10,
        minWidth: 20,
    };
    game.ShareText = [
        "脑力与眼力的终极考验——2048六边形！",
        "全新一代的消消乐——2048六边形！",
        "你绝对没玩过的2048六边形！"
    ];
})(game || (game = {}));
