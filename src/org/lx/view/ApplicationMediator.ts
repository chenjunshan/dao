

module game {

	export class ApplicationMediator extends puremvc.Mediator implements puremvc.IMediator {
		public static NAME: string = "ApplicationMediator";
		public constructor(viewComponent: any) {
			super(ApplicationMediator.NAME, viewComponent);
		}

		public listNotificationInterests(): Array<any> {
			return [
				ApplicationConstants.SET_SIZE,
			];
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case ApplicationConstants.SET_SIZE: {
					this.view.resizeUI();
					break;
				}
			}
		}

		public get view(): AppContainer {
			return <AppContainer><any>(this.viewComponent);
		}
	}
}