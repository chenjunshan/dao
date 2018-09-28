module game {
    export class StartUIMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "StartUIMediator";
        public constructor(viewComponent: any) {
            super(StartUIMediator.NAME, viewComponent);
        }

        public static RESET_AWY_AD: string = "reset_awy_ad";

        public listNotificationInterests(): Array<any> {
            return [
                ApplicationConstants.SET_SIZE,
                GameCommand.CHECK_GET_FOCUS,
                StartUIMediator.RESET_AWY_AD
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case ApplicationConstants.SET_SIZE: {
                    this.view.resizeUI();
                    break;
                }
                case GameCommand.CHECK_GET_FOCUS: {
                    this.view.checkGetFocus();
                    break;
                }
                case StartUIMediator.RESET_AWY_AD: {
                    this.view.initAwyAd();
                    break;
                }
            }
        }

        public get view(): StartUI {
            return <StartUI><any>(this.viewComponent);
        }
    }
}