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
    var EndUIMediator = (function (_super) {
        __extends(EndUIMediator, _super);
        function EndUIMediator(viewComponent) {
            return _super.call(this, EndUIMediator.NAME, viewComponent) || this;
        }
        EndUIMediator.prototype.listNotificationInterests = function () {
            return [
                game.ApplicationConstants.SET_SIZE,
            ];
        };
        EndUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case game.ApplicationConstants.SET_SIZE: {
                    this.view.resizeUI();
                    break;
                }
            }
        };
        Object.defineProperty(EndUIMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        EndUIMediator.NAME = "EndUIMediator";
        return EndUIMediator;
    }(puremvc.Mediator));
    game.EndUIMediator = EndUIMediator;
    __reflect(EndUIMediator.prototype, "game.EndUIMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(game || (game = {}));
