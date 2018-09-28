module game {
    export class EndUIMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "EndUIMediator";
        public constructor(viewComponent: any) {
            super(EndUIMediator.NAME, viewComponent);
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

        public get view(): EndUI {
            return <EndUI><any>(this.viewComponent);
        }
    }
}