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
/**
 * 声音控制模块
 */
var lx;
(function (lx) {
    var MusicState;
    (function (MusicState) {
        MusicState[MusicState["stop"] = 0] = "stop";
        MusicState[MusicState["play"] = 1] = "play";
    })(MusicState = lx.MusicState || (lx.MusicState = {}));
    var Music = (function (_super) {
        __extends(Music, _super);
        function Music() {
            var _this = _super.call(this) || this;
            /**
             * 保存初始化过的 music
             */
            _this.music = {};
            _this.sounds = {};
            return _this;
        }
        Music.getInstance = function () {
            if (!Music.sInstance) {
                Music.sInstance = new Music();
            }
            return Music.sInstance;
        };
        Music.prototype.init = function (key, path, type, callback) {
            var _this = this;
            var sound = new egret.Sound();
            sound.type = type;
            var isSoundOk = false;
            sound.addEventListener(egret.Event.COMPLETE, function (event) {
                var music = { sound: sound, state: MusicState.stop };
                _this.music[key] = music;
                if (_this.sounds[key].callback) {
                    _this.sounds[key].callback();
                }
            }, this);
            sound.load(path);
        };
        Music.prototype.load = function (key, path, type, callback) {
            if (this.sounds[key] && !this.music[key]) {
                this.sounds[key].callback = callback;
                return;
            }
            if (this.music[key]) {
                if (callback) {
                    callback();
                }
                return;
            }
            this.sounds[key] = { "key": key, "callback": callback };
            this.init(key, path, type, callback);
            return Music.sInstance;
        };
        Music.prototype.play = function (key, loop) {
            var music = this.music[key];
            if (!music) {
                return;
            }
            var sound = music.sound;
            var channel = music.channel;
            // if (channel) {
            // 	channel.stop();
            // 	channel = null;
            // }
            if (channel && sound.type == egret.Sound.MUSIC && music.state == MusicState.play) {
                return;
            }
            if (loop) {
                channel = sound.play(0, loop);
            }
            else {
                channel = sound.play(0, 1);
            }
            music.channel = channel;
            music.state = MusicState.play;
        };
        Music.prototype.stop = function (key) {
            var music = this.music[key];
            if (!music) {
                return;
            }
            var channel = music.channel;
            if (channel) {
                channel.stop();
                channel = null;
            }
            music.state = MusicState.stop;
        };
        return Music;
    }(egret.HashObject));
    lx.Music = Music;
    __reflect(Music.prototype, "lx.Music");
})(lx || (lx = {}));
