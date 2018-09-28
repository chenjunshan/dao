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
/**
 * 场景切换
 */
var game;
(function (game) {
    var SceneCommand = (function (_super) {
        __extends(SceneCommand, _super);
        function SceneCommand() {
            return _super.call(this) || this;
        }
        /**
         * 注册消息
         */
        SceneCommand.prototype.register = function () {
            this.facade.registerCommand(game.ApplicationConstants.SET_SIZE, SceneCommand);
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
            this.facade.registerCommand(SceneCommand.SHOW_DARE_CONTINUE, SceneCommand);
            this.facade.registerCommand(SceneCommand.CLOSE_DARE_CONTINUE, SceneCommand);
            this.facade.registerCommand(SceneCommand.SHOW_DARE_END, SceneCommand);
            this.facade.registerCommand(SceneCommand.CLOSE_DARE_END, SceneCommand);
        };
        SceneCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var appMediator = this.facade.retrieveMediator(game.ApplicationMediator.NAME);
            switch (notification.getName()) {
                case game.ApplicationConstants.SET_SIZE: {
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
                case SceneCommand.SHOW_DARE_CONTINUE: {
                    appMediator.view.enterDareContinue(data);
                    break;
                }
                case SceneCommand.CLOSE_DARE_CONTINUE: {
                    appMediator.view.closeDareContinue(data);
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
            }
        };
        SceneCommand.NAME = "SceneCommand";
        SceneCommand.INIT_SCENE = "init_scene";
        /**
         * 显示游戏场景
         */
        SceneCommand.SHOW_START = "show_start";
        SceneCommand.CLOSE_START = "close_start";
        SceneCommand.SHOW_HOME = "show_home";
        SceneCommand.CLOSE_HOME = "close_home";
        SceneCommand.SHOW_CONTINUE = "show_continue";
        SceneCommand.CLOSE_CONTINUE = "close_continue";
        SceneCommand.SHOW_PAUSE = "show_pause";
        SceneCommand.CLOSE_PAUSE = "close_pause";
        SceneCommand.SHOW_END = "show_end";
        SceneCommand.CLOSE_END = "close_end";
        SceneCommand.SHOW_RANK = "show_rank";
        SceneCommand.CLOSE_RANK = "close_rank";
        SceneCommand.SHOW_WORLD_RANK = "show_world_rank";
        SceneCommand.CLOSE_WORLD_RANK = "close_world_rank";
        SceneCommand.SHOW_SKIN = "show_skin";
        SceneCommand.CLOSE_SKIN = "close_skin";
        SceneCommand.SHOW_DARE = "show_dare";
        SceneCommand.CLOSE_DARE = "close_dare";
        SceneCommand.SHOW_DARE_CONTINUE = "show_dare_continue";
        SceneCommand.CLOSE_DARE_CONTINUE = "close_dare_continue";
        SceneCommand.SHOW_DARE_END = "show_dare_end";
        SceneCommand.CLOSE_DARE_END = "close_dare_end";
        return SceneCommand;
    }(puremvc.SimpleCommand));
    game.SceneCommand = SceneCommand;
    __reflect(SceneCommand.prototype, "game.SceneCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(game || (game = {}));
