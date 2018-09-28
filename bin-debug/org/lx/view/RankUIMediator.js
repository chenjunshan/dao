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
    var RankUIMediator = (function (_super) {
        __extends(RankUIMediator, _super);
        function RankUIMediator(viewComponent) {
            return _super.call(this, RankUIMediator.NAME, viewComponent) || this;
        }
        RankUIMediator.prototype.listNotificationInterests = function () {
            return [
                game.ApplicationConstants.SET_SIZE
            ];
        };
        RankUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case game.ApplicationConstants.SET_SIZE: {
                    this.view.resizeUI();
                    break;
                }
            }
        };
        Object.defineProperty(RankUIMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        RankUIMediator.NAME = "RankUIMediator";
        return RankUIMediator;
    }(puremvc.Mediator));
    game.RankUIMediator = RankUIMediator;
    __reflect(RankUIMediator.prototype, "game.RankUIMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(game || (game = {}));
