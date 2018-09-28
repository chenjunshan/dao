module game {
    export class ContinueUIMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "ContinueUIMediator";
        public constructor(viewComponent: any) {
            super(ContinueUIMediator.NAME, viewComponent);
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

        public get view(): ContinueUI {
            return <ContinueUI><any>(this.viewComponent);
        }
    }
}