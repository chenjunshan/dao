module game {
    export class WorldRankUIMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "WorldRankUIMediator";
        public constructor(viewComponent: any) {
            super(WorldRankUIMediator.NAME, viewComponent);
        }
        public static UPDATE_DATA: string = "WorldRankUIMediator_update_data";

        public listNotificationInterests(): Array<any> {
            return [
                WorldRankUIMediator.UPDATE_DATA
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case WorldRankUIMediator.UPDATE_DATA: {
                    this.view.updateData();
                    break;
                }
            }
        }

        public get view(): WorldRankUI {
            return <WorldRankUI><any>(this.viewComponent);
        }
    }
}