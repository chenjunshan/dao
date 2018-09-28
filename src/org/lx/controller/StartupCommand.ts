module game {

	export class StartupCommand extends puremvc.MacroCommand{

		public constructor(){
			super();
		}
		public initializeMacroCommand():void{
			this.addSubCommand(game.ControllerPrepCommand);
			this.addSubCommand(game.ModelPrepCommand);
			this.addSubCommand(game.ViewPrepCommand);
		}
	}
}