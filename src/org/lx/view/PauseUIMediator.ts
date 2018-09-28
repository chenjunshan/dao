module game {
    export class PauseUIMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "PauseUIMediator";
        public constructor(viewComponent: any) {
            super(PauseUIMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                ApplicationConstants.SET_SIZE,
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case ApplicationConstants.SET_SIZE: {
                    this.view.resizeUI();
                    break;
                }
            }
        }

        public get view(): PauseUI {
            return <PauseUI><any>(this.viewComponent);
        }
    }
}