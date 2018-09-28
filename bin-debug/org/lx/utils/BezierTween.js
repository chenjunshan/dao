var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BezierTween = (function () {
    function BezierTween(id, item) {
        this.mStartX = 0;
        this.mStartY = 0;
        this.mTempX = 0;
        this.mTempY = 0;
        this.mEndX = 0;
        this.mEndY = 0;
        this.mTime = 0;
        this.mId = id;
        this.mItem = item;
    }
    BezierTween.prototype.init = function (startX, startY, tempX, tempY, endX, endY, time) {
        this.mStartX = startX;
        this.mStartY = startY;
        this.mTempX = tempX;
        this.mTempY = tempY;
        this.mEndX = endX;
        this.mEndY = endY;
        this.mTime = time;
    };
    BezierTween.prototype.show = function (obj) {
        var _this = this;
        if (obj != null && obj != undefined) {
            egret.Tween.removeTweens(this.mItem);
            egret.Tween.get(this.mItem).to(obj, this.mTime);
        }
        this.factor = 0;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ factor: 1 }, this.mTime, egret.Ease.quadInOut).call(function () {
            if (_this.mFunComplete) {
                _this.mFunComplete.fun.call(_this.mFunComplete.thisObj);
            }
        });
    };
    BezierTween.prototype.dismiss = function () {
        if (this.mItem.parent) {
            this.mItem.parent.removeChild(this.mItem);
        }
        egret.Tween.removeTweens(this.mItem);
        egret.Tween.removeTweens(this);
    };
    BezierTween.prototype.onCompleteListener = function (fun, thisObj) {
        this.mFunComplete = { fun: fun, thisObj: thisObj };
    };
    Object.defineProperty(BezierTween.prototype, "factor", {
        get: function () {
            return 0;
        },
        set: function (value) {
            this.mItem.x = (1 - value) * (1 - value) * this.mStartX
                + 2 * value * (1 - value) * this.mTempX
                + value * value * this.mEndX;
            this.mItem.y = (1 - value) * (1 - value) * this.mStartY
                + 2 * value * (1 - value) * this.mTempY
                + value * value * this.mEndY;
        },
        enumerable: true,
        configurable: true
    });
    return BezierTween;
}());
__reflect(BezierTween.prototype, "BezierTween");
