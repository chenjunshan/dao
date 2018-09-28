module game {
    export class FocusUIMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "FocusUIMediator";
        public constructor(viewComponent: any) {
            super(FocusUIMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                ApplicationConstants.SET_SIZE,
                GameCommand.CHECK_GET_FOCUS,
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
                    this.view.onShow();
                    break;
                }
            }
        }

        public get view(): FocusUI {
            return <FocusUI><any>(this.viewComponent);
        }
    }
}