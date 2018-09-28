var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author xsq
 *
 */
var SystemUtil = (function () {
    function SystemUtil() {
    }
    /**
    * 判断当前运行环境是否是 Native
    */
    SystemUtil.isNative = function () {
        return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
    };
    /**
    * 判断当前运行环境是否是 手机
    */
    SystemUtil.isMobile = function () {
        return egret.Capabilities.isMobile;
    };
    /**
    * 判断当前运行环境是否是 微信
    */
    SystemUtil.isWX = function () {
        var result = false;
        var str = window.navigator.userAgent;
        if (str && (str.indexOf("MicroMessenger") != -1)) {
            result = true;
        }
        return result;
    };
    /**
    * 发生消息给Native
    */
    SystemUtil.sendToNative = function (sendType, sendData) {
        if (SystemUtil.isNative()) {
            var send = {
                type: sendType
            };
            if (sendData) {
                send["data"] = sendData;
            }
            egret.ExternalInterface.call("sendToNative", JSON.stringify(send));
        }
    };
    /**
     * 判断data是否存在
     */
    SystemUtil.isVoid = function (data) {
        return data == null || data == undefined;
    };
    SystemUtil.removeObj = function (obj) {
        if (obj && obj.parent) {
            obj.parent.removeChild(obj);
        }
    };
    SystemUtil.addObj = function (obj, root) {
        if (obj && !obj.parent && root) {
            root.addChild(obj);
        }
    };
    //判断两个时间戳是否是同一天
    SystemUtil.isSameDay = function (currentTime, saveTime) {
        if (saveTime == null || saveTime == undefined || saveTime == 0
            || currentTime == null || currentTime == undefined || currentTime == 0) {
            return false;
        }
        var currentDate = new Date(currentTime);
        var saveDate = new Date(saveTime);
        return (currentDate.getFullYear() == saveDate.getFullYear()
            && currentDate.getMonth() == saveDate.getMonth()
            && currentDate.getDate() == saveDate.getDate());
    };
    //判断两个时间戳是否连续
    SystemUtil.isConsecutiveDay = function (currentTime, saveTime) {
        var currentDate = new Date(currentTime);
        var saveDate = new Date(saveTime);
        var value = currentDate.getDate() - saveDate.getDate();
        return (currentDate.getFullYear() == saveDate.getFullYear()
            && currentDate.getMonth() == saveDate.getMonth()
            && value == 1);
    };
    SystemUtil.getAngle = function (px, py, mx, my) {
        var x = px - mx;
        var y = py - my;
        var z = Math.sqrt(x * x + y * y);
        var cos = y / z;
        var radina = Math.acos(cos); //用反三角函数求弧度
        var angle = 180 / (Math.PI / radina); //将弧度转换成角度
        return angle;
    };
    SystemUtil.getEgretAngle = function (px, py, mx, my) {
        var x = Math.abs(px - mx);
        var y = Math.abs(py - my);
        var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        var cos = y / z;
        var radina = Math.acos(cos); //用反三角函数求弧度
        var angle = Math.floor(180 / (Math.PI / radina)); //将弧度转换成角度
        if (mx > px && my > py) {
            angle = 180 - angle;
        }
        if (mx == px && my > py) {
            angle = 180;
        }
        if (mx > px && my == py) {
            angle = 90;
        }
        if (mx < px && my > py) {
            angle = 180 + angle;
        }
        if (mx < px && my == py) {
            angle = 270;
        }
        if (mx < px && my < py) {
            angle = 360 - angle;
        }
        return angle;
    };
    SystemUtil.dist = function (x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    };
    //判断两个矩形是否相交
    SystemUtil.checkRect = function (startX1, endX1, startY1, endY1, startX2, endX2, startY2, endY2) {
        return SystemUtil.checkPoint(startX1, endX1, startY1, endY1, startX2, endX2, startY2, endY2)
            || SystemUtil.checkPoint(startX2, endX2, startY2, endY2, startX1, endX1, startY1, endY1);
    };
    SystemUtil.checkPoint = function (startX1, endX1, startY1, endY1, startX2, endX2, startY2, endY2) {
        var result = false;
        if (((startX1 >= startX2 && startX1 <= endX2)
            || (endX1 >= startX2 && endX1 <= endX2))
            && ((startY1 >= startY2 && startY1 <= endY2)
                || (endY1 >= startY2 && endY1 <= endY2))) {
            result = true;
        }
        return result;
    };
    SystemUtil.getResUrl = function (resName) {
        var resUrl = "";
        for (var i in SystemUtil.ResData) {
            var temp = SystemUtil.ResData[i];
            if (temp.name == resName) {
                resUrl = "resource/" + temp.url;
                break;
            }
        }
        return resUrl;
    };
    SystemUtil.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x - obj1.anchorOffsetX;
        rect1.y = obj1.y - obj1.anchorOffsetY;
        rect2.x = obj2.x - obj2.anchorOffsetX;
        rect2.y = obj2.y - obj2.anchorOffsetY;
        return rect1.intersects(rect2);
    };
    SystemUtil.ResData = {};
    return SystemUtil;
}());
__reflect(SystemUtil.prototype, "SystemUtil");
