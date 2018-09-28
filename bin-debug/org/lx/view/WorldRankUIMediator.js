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
    var WorldRankUIMediator = (function (_super) {
        __extends(WorldRankUIMediator, _super);
        function WorldRankUIMediator(viewComponent) {
            return _super.call(this, WorldRankUIMediator.NAME, viewComponent) || this;
        }
        WorldRankUIMediator.prototype.listNotificationInterests = function () {
            return [];
        };
        WorldRankUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
            }
        };
        Object.defineProperty(WorldRankUIMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        WorldRankUIMediator.NAME = "WorldRankUIMediator";
        return WorldRankUIMediator;
    }(puremvc.Mediator));
    game.WorldRankUIMediator = WorldRankUIMediator;
    __reflect(WorldRankUIMediator.prototype, "game.WorldRankUIMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(game || (game = {}));
