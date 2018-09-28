module game {

	export class GameCommand extends puremvc.SimpleCommand implements puremvc.ICommand {

		public constructor() {
			super();
		}
		public static NAME: string = "GameCommand";

		public static INIT_GAME: string = "init_game";

		public static START_GAME: string = "start_game";

		public static CONTINUE_GAME: string = "continue_game";

		public static RESTART_GAME: string = "restart_game";

		public static END_GAME: string = "end_game";

		public static SET_MUSIC: string = "set_music";

		public static SET_CONTINUE: string = "set_continue";

		public static SAVE_DATA: string = "save_data";

		public static GET_DESTROY_PROP: string = "get_destroy_prop";

		public static GET_CHANGE_PROP: string = "get_change_prop";

		public static GET_MAX_PROP: string = "get_max_prop";

		public static SHOW_GET_MAX_PROP: string = "show_get_max_prop";

		public static UPDATE_SHARE: string = "update_share";

		public static CHECK_GET_FOCUS: string = "check_get_focus";

		/**
		 * 注册消息
		 */
		public register(): void {
			this.facade.registerCommand(GameCommand.INIT_GAME, GameCommand);
			this.facade.registerCommand(GameCommand.START_GAME, GameCommand);
			this.facade.registerCommand(GameCommand.END_GAME, GameCommand);
			this.facade.registerCommand(GameCommand.SET_MUSIC, GameCommand);
			this.facade.registerCommand(GameCommand.SAVE_DATA, GameCommand);
		}

		public execute(notification: puremvc.INotification): void {
			var gameProxy: GameProxy = <GameProxy><any>(this.facade.retrieveProxy(GameProxy.NAME));
			var data: any = notification.getBody();
			switch (notification.getName()) {
				case GameCommand.INIT_GAME: {
					gameProxy.init();
					break;
				}
				case GameCommand.SET_MUSIC: {
					gameProxy.setMusic(data.play, data.music, data.noSave);
					break;
				}
				case GameCommand.SAVE_DATA: {
					gameProxy.SaveData();
					break;
				}
			}
		}
	}
}