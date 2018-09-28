module game {
    export class ToastUIMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "ToastUIMediator";
        public constructor(viewComponent: any) {
            super(ToastUIMediator.NAME, viewComponent);
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

        public get view(): ToastUI {
            return <ToastUI><any>(this.viewComponent);
        }
    }
}