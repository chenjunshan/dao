module game {
    export class SkinUIMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "SkinUIMediator";
        public constructor(viewComponent: any) {
            super(SkinUIMediator.NAME, viewComponent);
        }

        public static UPDATE_DATA: string = "update_data";

        public listNotificationInterests(): Array<any> {
            return [
                SkinUIMediator.UPDATE_DATA
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case SkinUIMediator.UPDATE_DATA: {
                    this.view.onShow(data);
                    break;
                }
            }
        }

        public get view(): SkinUI {
            return <SkinUI><any>(this.viewComponent);
        }
    }
}