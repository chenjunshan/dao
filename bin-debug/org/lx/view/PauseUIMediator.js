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
    var PauseUIMediator = (function (_super) {
        __extends(PauseUIMediator, _super);
        function PauseUIMediator(viewComponent) {
            return _super.call(this, PauseUIMediator.NAME, viewComponent) || this;
        }
        PauseUIMediator.prototype.listNotificationInterests = function () {
            return [
                game.ApplicationConstants.SET_SIZE,
            ];
        };
        PauseUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case game.ApplicationConstants.SET_SIZE: {
                    this.view.resizeUI();
                    break;
                }
            }
        };
        Object.defineProperty(PauseUIMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        PauseUIMediator.NAME = "PauseUIMediator";
        return PauseUIMediator;
    }(puremvc.Mediator));
    game.PauseUIMediator = PauseUIMediator;
    __reflect(PauseUIMediator.prototype, "game.PauseUIMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(game || (game = {}));
