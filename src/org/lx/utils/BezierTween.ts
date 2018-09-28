class BezierTween {
	public mId: number;
	private mItem: egret.DisplayObject;
	private mStartX: number = 0;
	private mStartY: number = 0;
	private mTempX: number = 0;
	private mTempY: number = 0;
	private mEndX: number = 0;
	private mEndY: number = 0;
	private mTime: number = 0;
	private mFunComplete: FunBandThis;

	public constructor(id: number, item: egret.DisplayObject) {
		this.mId = id;
		this.mItem = item;
	}

	public init(startX: number, startY: number,
		tempX: number, tempY: number,
		endX: number, endY: number, time: number): void {
		this.mStartX = startX;
		this.mStartY = startY;

		this.mTempX = tempX;
		this.mTempY = tempY;

		this.mEndX = endX;
		this.mEndY = endY;

		this.mTime = time;
	}

	public show(obj?: Object): void {
		if (obj != null && obj != undefined) {
			egret.Tween.removeTweens(this.mItem);
			egret.Tween.get(this.mItem).to(obj, this.mTime);
		}
		this.factor = 0;
		egret.Tween.removeTweens(this);
		egret.Tween.get(this).to({ factor: 1 }, this.mTime, egret.Ease.quadInOut).call(() => {
			if (this.mFunComplete) {
				this.mFunComplete.fun.call(this.mFunComplete.thisObj);
			}
		});
	}

	public dismiss(): void {
		if (this.mItem.parent) {
			this.mItem.parent.removeChild(this.mItem);
		}
		egret.Tween.removeTweens(this.mItem);
		egret.Tween.removeTweens(this);
	}

	public onCompleteListener(fun: Function, thisObj: any) {
		this.mFunComplete = { fun: fun, thisObj: thisObj };
	}

	public get factor(): number {
		return 0;
	}

	public set factor(value: number) {
		this.mItem.x = (1 - value) * (1 - value) * this.mStartX
			+ 2 * value * (1 - value) * this.mTempX
			+ value * value * this.mEndX;
		this.mItem.y = (1 - value) * (1 - value) * this.mStartY
			+ 2 * value * (1 - value) * this.mTempY
			+ value * value * this.mEndY;
	}
}