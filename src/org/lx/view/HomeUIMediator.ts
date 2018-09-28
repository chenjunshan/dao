module game {
    export class HomeUIMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "HomeUIMediator";
        public constructor(viewComponent: any) {
            super(HomeUIMediator.NAME, viewComponent);
        }
        public static CONTINUE_PALY: string = "continue_play";
        public static RESTART_PALY: string = "restart_play";
        public static SAVE_RECORD: string = "save_record";

        public listNotificationInterests(): Array<any> {
            return [
                ApplicationConstants.SET_SIZE,
                HomeUIMediator.CONTINUE_PALY,
                HomeUIMediator.RESTART_PALY,
                HomeUIMediator.SAVE_RECORD
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case ApplicationConstants.SET_SIZE: {
                    this.view.resizeUI();
                    break;
                }
                case HomeUIMediator.CONTINUE_PALY: {
                    this.view.reCurGame();
                    break;
                }
                case HomeUIMediator.RESTART_PALY: {
                    this.view.reStartGame();
                    break;
                }
                case HomeUIMediator.SAVE_RECORD: {
                    this.view.saveRecord();
                    break;
                }
            }
        }

        public get view(): HomeUI {
            return <HomeUI><any>(this.viewComponent);
        }
    }
}