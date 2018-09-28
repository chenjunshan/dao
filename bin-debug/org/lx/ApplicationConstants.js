var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var ApplicationConstants = (function () {
        function ApplicationConstants() {
        }
        /**
         * 设置大小
         */
        ApplicationConstants.SET_SIZE = "set_size";
        return ApplicationConstants;
    }());
    game.ApplicationConstants = ApplicationConstants;
    __reflect(ApplicationConstants.prototype, "game.ApplicationConstants");
})(game || (game = {}));
