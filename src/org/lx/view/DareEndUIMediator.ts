module game {
    export class DareEndUIMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "DareEndUIMediator";
        public constructor(viewComponent: any) {
            super(DareEndUIMediator.NAME, viewComponent);
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

        public get view(): DareEndUI {
            return <DareEndUI><any>(this.viewComponent);
        }
    }
}