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
    var StartUIMediator = (function (_super) {
        __extends(StartUIMediator, _super);
        function StartUIMediator(viewComponent) {
            return _super.call(this, StartUIMediator.NAME, viewComponent) || this;
        }
        StartUIMediator.prototype.listNotificationInterests = function () {
            return [
                game.ApplicationConstants.SET_SIZE,
            ];
        };
        StartUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case game.ApplicationConstants.SET_SIZE: {
                    this.view.resizeUI();
                    break;
                }
            }
        };
        Object.defineProperty(StartUIMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        StartUIMediator.NAME = "StartUIMediator";
        return StartUIMediator;
    }(puremvc.Mediator));
    game.StartUIMediator = StartUIMediator;
    __reflect(StartUIMediator.prototype, "game.StartUIMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(game || (game = {}));
