/**
 * 场景切换
 */
module game {

    export class SceneCommand extends puremvc.SimpleCommand implements puremvc.ICommand {

        public constructor() {
            super();
        }
        public static NAME: string = "SceneCommand";

        public static INIT_SCENE: string = "init_scene";
        /**
         * 显示游戏场景
         */

        public static SHOW_START: string = "show_start";
        public static CLOSE_START: string = "close_start";
        public static SHOW_HOME: string = "show_home";
        public static CLOSE_HOME: string = "close_home";
        public static SHOW_CONTINUE: string = "show_continue";
        public static CLOSE_CONTINUE: string = "close_continue";
        public static SHOW_PAUSE: string = "show_pause";
        public static CLOSE_PAUSE: string = "close_pause";
        public static SHOW_END: string = "show_end";
        public static CLOSE_END: string = "close_end";
        public static SHOW_RANK: string = "show_rank";
        public static CLOSE_RANK: string = "close_rank";
        public static SHOW_WORLD_RANK: string = "show_world_rank";
        public static CLOSE_WORLD_RANK: string = "close_world_rank";
        public static SHOW_SKIN: string = "show_skin";
        public static CLOSE_SKIN: string = "close_skin";
        public static SHOW_DARE: string = "show_dare";
        public static CLOSE_DARE: string = "close_dare";
        public static SHOW_DARE_END: string = "show_dare_end";
        public static CLOSE_DARE_END: string = "close_dare_end";
        public static SHOW_FOCUS: string = "show_focus";
        public static CLOSE_FOCUS: string = "close_focus";

        public static SHOW_TOAST: string = "show_toast";
        public static CLOSE_TOAST: string = "close_toast";


        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand(ApplicationConstants.SET_SIZE, SceneCommand);

            this.facade.registerCommand(SceneCommand.INIT_SCENE, SceneCommand);

            this.facade.registerCommand(SceneCommand.SHOW_START, SceneCommand);
            this.facade.registerCommand(SceneCommand.CLOSE_START, SceneCommand);
            this.facade.registerCommand(SceneCommand.SHOW_HOME, SceneCommand);
            this.facade.registerCommand(SceneCommand.CLOSE_HOME, SceneCommand);
            this.facade.registerCommand(SceneCommand.SHOW_CONTINUE, SceneCommand);
            this.facade.registerCommand(SceneCommand.CLOSE_CONTINUE, SceneCommand);
            this.facade.registerCommand(SceneCommand.SHOW_PAUSE, SceneCommand);
            this.facade.registerCommand(SceneCommand.CLOSE_PAUSE, SceneCommand);
            this.facade.registerCommand(SceneCommand.SHOW_END, SceneCommand);
            this.facade.registerCommand(SceneCommand.CLOSE_END, SceneCommand);
            this.facade.registerCommand(SceneCommand.SHOW_RANK, SceneCommand);
            this.facade.registerCommand(SceneCommand.CLOSE_RANK, SceneCommand);
            this.facade.registerCommand(SceneCommand.SHOW_WORLD_RANK, SceneCommand);
            this.facade.registerCommand(SceneCommand.CLOSE_WORLD_RANK, SceneCommand);
            this.facade.registerCommand(SceneCommand.SHOW_SKIN, SceneCommand);
            this.facade.registerCommand(SceneCommand.CLOSE_SKIN, SceneCommand);
            this.facade.registerCommand(SceneCommand.SHOW_DARE, SceneCommand);
            this.facade.registerCommand(SceneCommand.CLOSE_DARE, SceneCommand);
            this.facade.registerCommand(SceneCommand.SHOW_DARE_END, SceneCommand);
            this.facade.registerCommand(SceneCommand.CLOSE_DARE_END, SceneCommand);
            this.facade.registerCommand(SceneCommand.SHOW_FOCUS, SceneCommand);
            this.facade.registerCommand(SceneCommand.CLOSE_FOCUS, SceneCommand);
            this.facade.registerCommand(SceneCommand.SHOW_TOAST, SceneCommand);
            this.facade.registerCommand(SceneCommand.CLOSE_TOAST, SceneCommand);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            var appMediator: ApplicationMediator =
                <ApplicationMediator><any>this.facade.retrieveMediator(ApplicationMediator.NAME);
            switch (notification.getName()) {
                case ApplicationConstants.SET_SIZE: {
                    appMediator.view.resizeUI();
                    break;
                }

                case SceneCommand.INIT_SCENE: {
                    appMediator.view.init();
                    break;
                }

                case SceneCommand.SHOW_START: {
                    appMediator.view.enterStart(data);
                    break;
                }
                case SceneCommand.CLOSE_START: {
                    appMediator.view.closeStart(data);
                    break;
                }
                case SceneCommand.SHOW_HOME: {
                    appMediator.view.enterHome(data);
                    break;
                }
                case SceneCommand.CLOSE_HOME: {
                    appMediator.view.closeHome(data);
                    break;
                }
                case SceneCommand.SHOW_CONTINUE: {
                    appMediator.view.enterContinue(data);
                    break;
                }
                case SceneCommand.CLOSE_CONTINUE: {
                    appMediator.view.closeContinue(data);
                    break;
                }
                case SceneCommand.SHOW_PAUSE: {
                    appMediator.view.enterPause(data);
                    break;
                }
                case SceneCommand.CLOSE_PAUSE: {
                    appMediator.view.closePause(data);
                    break;
                }
                case SceneCommand.SHOW_END: {
                    appMediator.view.enterEnd(data);
                    break;
                }
                case SceneCommand.CLOSE_END: {
                    appMediator.view.closeEnd(data);
                    break;
                }
                case SceneCommand.SHOW_RANK: {
                    appMediator.view.enterRank(data);
                    break;
                }
                case SceneCommand.CLOSE_RANK: {
                    appMediator.view.closeRank(data);
                    break;
                }
                case SceneCommand.SHOW_WORLD_RANK: {
                    appMediator.view.enterWorldRank(data);
                    break;
                }
                case SceneCommand.CLOSE_WORLD_RANK: {
                    appMediator.view.closeWorldRank(data);
                    break;
                }
                case SceneCommand.SHOW_SKIN: {
                    appMediator.view.enterSkin(data);
                    break;
                }
                case SceneCommand.CLOSE_SKIN: {
                    appMediator.view.closeSkin(data);
                    break;
                }
                case SceneCommand.SHOW_DARE: {
                    appMediator.view.enterDare(data);
                    break;
                }
                case SceneCommand.CLOSE_DARE: {
                    appMediator.view.closeDare(data);
                    break;
                }
                case SceneCommand.SHOW_DARE_END: {
                    appMediator.view.enterDareEnd(data);
                    break;
                }
                case SceneCommand.CLOSE_DARE_END: {
                    appMediator.view.closeDareEnd(data);
                    break;
                }
                case SceneCommand.SHOW_FOCUS: {
                    appMediator.view.enterFocus(data);
                    break;
                }
                case SceneCommand.CLOSE_FOCUS: {
                    appMediator.view.closeFocus(data);
                    break;
                }
                case SceneCommand.SHOW_TOAST: {
                    appMediator.view.enterToast(data);
                    break;
                }
                case SceneCommand.CLOSE_TOAST: {
                    appMediator.view.closeToast(data);
                    break;
                }
            }
        }
    }
}