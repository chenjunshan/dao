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
    var HomeUIMediator = (function (_super) {
        __extends(HomeUIMediator, _super);
        function HomeUIMediator(viewComponent) {
            return _super.call(this, HomeUIMediator.NAME, viewComponent) || this;
        }
        HomeUIMediator.prototype.listNotificationInterests = function () {
            return [
                game.ApplicationConstants.SET_SIZE,
                HomeUIMediator.CONTINUE_PALY,
                HomeUIMediator.RESTART_PALY,
                HomeUIMediator.SAVE_RECORD
            ];
        };
        HomeUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case game.ApplicationConstants.SET_SIZE: {
                    this.view.resizeUI();
                    break;
                }
                case HomeUIMediator.CONTINUE_PALY: {
                    this.view.reCurGame();
                    break;
                }
                case HomeUIMediator.RESTART_PALY: {
                    this.view.reStartGame();
                    break;
                }
                case HomeUIMediator.SAVE_RECORD: {
                    this.view.saveRecord();
                    break;
                }
            }
        };
        Object.defineProperty(HomeUIMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HomeUIMediator.NAME = "HomeUIMediator";
        HomeUIMediator.CONTINUE_PALY = "continue_play";
        HomeUIMediator.RESTART_PALY = "restart_play";
        HomeUIMediator.SAVE_RECORD = "save_record";
        return HomeUIMediator;
    }(puremvc.Mediator));
    game.HomeUIMediator = HomeUIMediator;
    __reflect(HomeUIMediator.prototype, "game.HomeUIMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(game || (game = {}));
