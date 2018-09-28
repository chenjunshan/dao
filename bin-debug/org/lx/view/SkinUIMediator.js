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
    var SkinUIMediator = (function (_super) {
        __extends(SkinUIMediator, _super);
        function SkinUIMediator(viewComponent) {
            return _super.call(this, SkinUIMediator.NAME, viewComponent) || this;
        }
        SkinUIMediator.prototype.listNotificationInterests = function () {
            return [];
        };
        SkinUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
            }
        };
        Object.defineProperty(SkinUIMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        SkinUIMediator.NAME = "SkinUIMediator";
        return SkinUIMediator;
    }(puremvc.Mediator));
    game.SkinUIMediator = SkinUIMediator;
    __reflect(SkinUIMediator.prototype, "game.SkinUIMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(game || (game = {}));
