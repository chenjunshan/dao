module game {

	export var AppID = "wx784d93c1419745cd";

	export var Version = {
		name: "1.0.7",
		code: 1,
		add: "?v1805311400"
	};
	export var Platform = {
		/**
		 * 当前平台
		 */
		current: "",
	};
	/**
	 * 游戏服务器相关
	 */
	export var Socket = {
		host: "",
		port: 0
	};
	export var Size = {
		/**
		 * 屏幕实际宽（动态设置）
		 */
		width: 1080,
		/**
		 * 屏幕实际高（动态设置）
		 */
		height: 1920,
		// 设计分辨率
		width_design: 1080,
		height_design: 1920,
	};
	/**
	 * 颜色
	 */
	export var Color = {
		gold: 0xb68523,
		yellow: 0xF8E297,
		blue: 0x1398e5,
		red: 0xfc0202,
		white: 0xffffff,
		black: 0x000000
	};
	export var Font = {
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
	export var Mrak = {
		multiply: "×"
	};
	export var GameConfig = {
		RestartTime: 1,//每局可复活次数
		ShareNum: 10,//每日可获得道具最大值
		ShareMaxTime: 1,
		throwSpeed: 100,//丢飞刀的速度
		minAngle: 8,//最小插飞刀相隔角度
		minWidth: 40,//最小插飞刀相隔距离
		destroyNum: 2,//碎刀石碎刀数量
		slowNum: 2,//减速倍数
		dareRotateSpeed: 2,
		// dareRotateTime: 20,
		dareMinAngle: 10,//最小插飞刀相隔角度
		dareMinMoveTime: 2000,//毫秒
		dareMaxMoveTime: 5000,//毫秒
		FocusMoney: 200,//关注奖励
		worldRankNumber: 10//世界排行一次显示的数量
	}
	export var GameData = {
		userID: null,
		openID: null,
		nickName: null,
		avatarUrl: null,
		music: true,
		language: "",
		curScore: 0,
		topScore: 0,
		currentLevel: 0,
		curRestartTime: 0,
		destroyProp: 2,
		slowProp: 2,
		isEnd: true,
		loginTime: 0,
		shares: [],
		propShares: [],
		dareShares: [],
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
		},
		curDareLevel: 0,
		isGetFocus: false
	}

	export var music_type = {
		use_prop: "", //使用道具
		next_game_start: "", //每个关卡开始
		knife_fly: "knife_fly_mp3",
		add_knife_success_circle: "add_knife_success_circle_mp3",//刀插上水果
		add_knife_success_box: "add_knife_success_mp3",//刀插上蔬菜
		cur_game_fail: "cur_game_fail_mp3", //刀没插上水果
		cur_game_pass_circle: "cur_game_pass_circle_mp3", //过关
		cur_game_pass_box: "cur_game_pass_box_mp3",
		btn: "btn_mp3" //点击按钮
	}

	export var curCircleColor = [
		0xff3636, 0xffec4a, 0xff00b4, 0xcbe858, 0xfffde6, 0xededed, 0xffc48b
	]

	export var curBoxColor = [
		0xff8a00, 0xabdfab, 0xfef235, 0x7a1adc, 0x55af2f, 0xe2f2d0, 0xff9900
	]

	export var rankName = {
		world: "world"
	};

	export var cp_menu = null;
	export var code = null;
	export var nickName = null;
	export var avatarUrl = null;
	export var openID = null;
	export var userID = null;
	export var inviteeOpenID = null;

	export var isNeedLogin = false;

	export var isShowFocusCp = 0;
	export var isShowAwyAd = 0;
	export var isShowGameClub = 0;
	export var isShowAd = 0;
	export var isShowShare = 0;
	export var isShowFocus = 0;
	export var ShowType = {
		Normal: "normal",
		Group: "group",
		DiffGroup: "diff_group",
	}
	export var isShowType = ShowType.Group;

	export var rankData = null;

	export var SaveKey = "lx_game";

	export var SaveRankKey = "rank";

	export var language_type = {
		cn: "cn",
		tw: "tw",
		en: "en"
	}

	export var language_list = [
		language_type.cn,
		language_type.tw,
		language_type.en
	]

	export var language_res = {
		ios_cn: {
			key: "zh-Hant",
			res: language_type.tw
		},
		ios_tw: {
			key: "zh-Hans",
			res: language_type.cn
		},
		ios_cn_pro: {
			key: "zh-Hant-CN",
			res: language_type.tw
		},
		ios_tw_pro: {
			key: "zh-Hans-CN",
			res: language_type.cn
		},
		web_cn: {
			key: "zh-CN",
			res: language_type.cn
		},
		web_tw: {
			key: "zh-TW",
			res: language_type.tw
		},
		en: {
			key: "en",
			res: language_type.en
		}
	}

	export var language = {
		text: null,
		current: "",
		default: language_res.en.res
	}

	export var ShareText = [
		"我的飞刀，谁与争锋？",
		"全民减压，一起扔飞刀！",
		"最爽快的飞刀，一个字，射！",
		"亲，射得不准？快来练习最佳手法！"
	]
}