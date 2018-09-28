/**
 * 声音控制模块
 */
module lx {
	export enum MusicState {
		stop,
		play
	}
	export class Music extends egret.HashObject {
		private static sInstance: Music;
		/**
		 * 保存初始化过的 music
		 */
		private music = {};
		private sounds = {};

		public constructor() {
			super();
		}

		public static getInstance(): Music {
			if (!Music.sInstance) {
				Music.sInstance = new Music();
			}
			return Music.sInstance;
		}

		private init(key: string, path: string, type: string, callback?: Function) {
			var sound = new egret.Sound();
			sound.type = type;
			var isSoundOk = false;
			sound.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
				var music = { sound: sound, state: MusicState.stop };
				this.music[key] = music;
				if (this.sounds[key].callback) {
					this.sounds[key].callback();
				}
			}, this);
			sound.load(path);
		}

		public load(key: string, path: string, type: string, callback?: Function): Music {
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
		}

		public play(key: string, loop?: number) {
			var music = this.music[key];
			if (!music) {
				return;
			}
			var sound: egret.Sound = music.sound;
			var channel: egret.SoundChannel = music.channel;
			// if (channel) {
			// 	channel.stop();
			// 	channel = null;
			// }
			if (channel && sound.type == egret.Sound.MUSIC && music.state == MusicState.play) {
				return;
			}
			if (loop) {
				channel = sound.play(0, loop);
			} else {
				channel = sound.play(0, 1);
			}
			music.channel = channel;
			music.state = MusicState.play;
		}

		public stop(key: string) {
			var music = this.music[key];
			if (!music) {
				return;
			}
			var channel: egret.SoundChannel = music.channel;
			if (channel) {
				channel.stop();
				channel = null;
			}
			music.state = MusicState.stop;
		}
	}
}