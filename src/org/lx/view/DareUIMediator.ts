module game {
    export class DareUIMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "DareUIMediator";
        public constructor(viewComponent: any) {
            super(DareUIMediator.NAME, viewComponent);
        }

        public static DARE_CONTINUE_GAME: string = "dare_continue_game";

        public listNotificationInterests(): Array<any> {
            return [
                ApplicationConstants.SET_SIZE,
                DareUIMediator.DARE_CONTINUE_GAME
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case ApplicationConstants.SET_SIZE: {
                    this.view.resizeUI();
                    break;
                }
                case DareUIMediator.DARE_CONTINUE_GAME: {
                    this.view.continueGame();
                    break;
                }
            }
        }

        public get view(): DareUI {
            return <DareUI><any>(this.viewComponent);
        }
    }
}