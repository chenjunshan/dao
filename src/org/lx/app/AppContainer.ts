
module game {
    export enum SceneType {
        start,
        home,
        continue,
        end,
        rank,
        worldRank,
        skin,
        dare,
        dareContinue,
        dareEnd,
        pause
    }
    export class AppContainer extends eui.Group {
        private currentScene: number;

        public bottomG: eui.Group;
        public middleG: eui.Group;
        public topG: eui.Group;

        public startUI: StartUI;
        public homeUI: HomeUI;
        public continueUI: ContinueUI;
        public pauseUI: PauseUI;
        public endUI: EndUI;
        public rankUI: RankUI;
        public worldRankUI: WorldRankUI;
        public skinUI: SkinUI;
        public dareUI: DareUI;
        public dareEndUI: DareEndUI;
        public focusUI: FocusUI;
        public toastUI: ToastUI;

        public constructor() {
            super();

            this.bottomG = new eui.Group();
            this.middleG = new eui.Group();
            this.topG = new eui.Group();
            this.bottomG.touchEnabled = false;
            this.middleG.touchEnabled = false;
            this.topG.touchEnabled = false;
            this.addChild(this.bottomG);
            this.addChild(this.middleG);
            this.addChild(this.topG);

            this.resizeUI();
        }

        public resizeUI() {
            if (this.bottomG) {
                this.bottomG.width = Size.width;
                this.bottomG.height = Size.height;
            }
            if (this.middleG) {
                this.middleG.width = Size.width;
                this.middleG.height = Size.height;
            }
            if (this.topG) {
                this.topG.width = Size.width;
                this.topG.height = Size.height;
            }
        }

        private enterPage(view, data?, root = this.bottomG) {
            if (view.onUpdate) {
                view.onUpdate(data);
            }
            if (!view.parent) {
                root.addChild(view);
            }
            if (view.onShow) {
                view.onShow(data);
            }
        }

        private closePage(view, data?) {
            if (view.onDismiss) {
                view.onDismiss(data);
            }
            if (view.parent) {
                view.parent.removeChild(view);
            }
        }

        public init(): void {
            this.startUI = new StartUI();
            this.homeUI = new HomeUI();
            this.continueUI = new ContinueUI();
            this.pauseUI = new PauseUI();
            this.endUI = new EndUI();
            this.rankUI = new RankUI();
            this.worldRankUI = new WorldRankUI();
            this.skinUI = new SkinUI();
            this.dareUI = new DareUI();
            this.dareEndUI = new DareEndUI();
            this.toastUI = new ToastUI();
            this.focusUI = new FocusUI();
            ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_START);
        }

        public enterStart(data?): void {
            this.currentScene = SceneType.start;
            this.enterPage(this.startUI, data);
        }
        public closeStart(data?): void {
            this.closePage(this.startUI, data);
        }
        public enterHome(data?): void {
            this.currentScene = SceneType.home;
            this.enterPage(this.homeUI, data);
        }
        public closeHome(data?): void {
            this.closePage(this.homeUI, data);
        }
        public enterContinue(data?): void {
            this.currentScene = SceneType.continue;
            this.enterPage(this.continueUI, data);
        }
        public closeContinue(data?): void {
            this.closePage(this.continueUI, data);
        }
        public enterPause(data?): void {
            this.currentScene = SceneType.pause;
            this.enterPage(this.pauseUI, data);
        }
        public closePause(data?): void {
            this.closePage(this.pauseUI, data);
        }
        public enterEnd(data?): void {
            this.currentScene = SceneType.end;
            this.enterPage(this.endUI, data);
        }
        public closeEnd(data?): void {
            this.closePage(this.endUI, data);
        }
        public enterRank(data?): void {
            this.currentScene = SceneType.rank;
            this.enterPage(this.rankUI, data);
        }
        public closeRank(data?): void {
            this.closePage(this.rankUI, data);
        }
        public enterWorldRank(data?): void {
            this.currentScene = SceneType.worldRank;
            this.enterPage(this.worldRankUI, data);
        }
        public closeWorldRank(data?): void {
            this.closePage(this.worldRankUI, data);
        }
        public enterSkin(data?): void {
            this.currentScene = SceneType.skin;
            this.enterPage(this.skinUI, data);
        }
        public closeSkin(data?): void {
            this.closePage(this.skinUI, data);
        }
        public enterDare(data?): void {
            this.currentScene = SceneType.dare;
            this.enterPage(this.dareUI, data);
        }
        public closeDare(data?): void {
            this.closePage(this.dareUI, data);
        }
        public enterDareEnd(data?): void {
            this.currentScene = SceneType.dareEnd;
            this.enterPage(this.dareEndUI, data);
        }
        public closeDareEnd(data?): void {
            this.closePage(this.dareEndUI, data);
        }
        public enterFocus(data?): void {
            this.enterPage(this.focusUI, data);
        }
        public closeFocus(data?): void {
            this.closePage(this.focusUI, data);
        }
        public enterToast(data?): void {
            this.enterPage(this.toastUI, data, this.topG);
        }
        public closeToast(data?): void {
            this.closePage(this.toastUI, data);
        }
    }
}