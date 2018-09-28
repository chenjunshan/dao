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
    var ApplicationMediator = (function (_super) {
        __extends(ApplicationMediator, _super);
        function ApplicationMediator(viewComponent) {
            return _super.call(this, ApplicationMediator.NAME, viewComponent) || this;
        }
        ApplicationMediator.prototype.listNotificationInterests = function () {
            return [
                game.ApplicationConstants.SET_SIZE,
            ];
        };
        ApplicationMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case game.ApplicationConstants.SET_SIZE: {
                    this.view.resizeUI();
                    break;
                }
            }
        };
        Object.defineProperty(ApplicationMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        ApplicationMediator.NAME = "ApplicationMediator";
        return ApplicationMediator;
    }(puremvc.Mediator));
    game.ApplicationMediator = ApplicationMediator;
    __reflect(ApplicationMediator.prototype, "game.ApplicationMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(game || (game = {}));
