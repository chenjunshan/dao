module game {
    export class RankUIMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "RankUIMediator";
        public constructor(viewComponent: any) {
            super(RankUIMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                ApplicationConstants.SET_SIZE
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

        public get view(): RankUI {
            return <RankUI><any>(this.viewComponent);
        }
    }
}