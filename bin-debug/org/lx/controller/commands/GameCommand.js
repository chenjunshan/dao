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
    var GameCommand = (function (_super) {
        __extends(GameCommand, _super);
        function GameCommand() {
            return _super.call(this) || this;
        }
        /**
         * 注册消息
         */
        GameCommand.prototype.register = function () {
            this.facade.registerCommand(GameCommand.INIT_GAME, GameCommand);
            this.facade.registerCommand(GameCommand.START_GAME, GameCommand);
            this.facade.registerCommand(GameCommand.END_GAME, GameCommand);
            this.facade.registerCommand(GameCommand.SET_MUSIC, GameCommand);
            this.facade.registerCommand(GameCommand.SAVE_DATA, GameCommand);
        };
        GameCommand.prototype.execute = function (notification) {
            var gameProxy = (this.facade.retrieveProxy(game.GameProxy.NAME));
            var data = notification.getBody();
            switch (notification.getName()) {
                case GameCommand.INIT_GAME: {
                    gameProxy.init();
                    break;
                }
                case GameCommand.SET_MUSIC: {
                    gameProxy.setMusic(data.play, data.music, data.noSave);
                    break;
                }
                case GameCommand.SAVE_DATA: {
                    gameProxy.SaveData();
                    break;
                }
            }
        };
        GameCommand.NAME = "GameCommand";
        GameCommand.INIT_GAME = "init_game";
        GameCommand.START_GAME = "start_game";
        GameCommand.CONTINUE_GAME = "continue_game";
        GameCommand.RESTART_GAME = "restart_game";
        GameCommand.END_GAME = "end_game";
        GameCommand.SET_MUSIC = "set_music";
        GameCommand.SET_CONTINUE = "set_continue";
        GameCommand.SAVE_DATA = "save_data";
        GameCommand.GET_DESTROY_PROP = "get_destroy_prop";
        GameCommand.GET_CHANGE_PROP = "get_change_prop";
        GameCommand.GET_MAX_PROP = "get_max_prop";
        GameCommand.SHOW_GET_MAX_PROP = "show_get_max_prop";
        GameCommand.UPDATE_SHARE = "update_share";
        return GameCommand;
    }(puremvc.SimpleCommand));
    game.GameCommand = GameCommand;
    __reflect(GameCommand.prototype, "game.GameCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(game || (game = {}));
