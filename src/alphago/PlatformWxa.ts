
class PlatformWxa {
    private initComplete: boolean = false;
    public init(callback: Function, thisObj: any) {
        if (!platform.SDKWxa) {
            return;
        }
        platform.SDKWxa.init({
            gameid: 444,
            location: 'kxtoo.com'
        }, () => {
            console.log("platform init complete");
            this.initComplete = true;
            callback.call(thisObj);
        });
    }

    public getRandAd(callback: Function, thisObj: any) {
        if (this.isCan) {
            return;
        }
        platform.SDKWxa.getRandAd((res) => {
            console.log("getRandAd");
            console.log(res);
            callback.call(thisObj, res);
        });
    }

    public navigateToMiniProgram(callback: Function, thisObj: any) {
        if (this.isCan) {
            return;
        }
        platform.SDKWxa.navigateToMiniProgram({}, (res) => {
            console.log("navigateToMiniProgram");
            console.log(res);
            callback.call(thisObj, res);
        });
    }

    public checkFocus(callback: Function, thisObj: any, isTouch: boolean) {
        if (this.isCan) {
            return;
        }
        platform.SDKWxa.checkFocus((res) => {
            console.log("checkFocus");
            console.log(res);
            callback.call(thisObj, res, isTouch);
        });
    }

    public focusBox() {
        if (this.isCan) {
            return;
        }
        platform.SDKWxa.focusBox();
    }

    private get isCan() {
        return !platform.SDKWxa || !this.initComplete;
    }
}