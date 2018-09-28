var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HexOrientation = (function () {
    function HexOrientation(f0, f1, f2, f3, b0, b1, b2, b3, startAngle) {
        this.f0 = f0;
        this.f1 = f1;
        this.f2 = f2;
        this.f3 = f3;
        this.b0 = b0;
        this.b1 = b1;
        this.b2 = b2;
        this.b3 = b3;
        this.startAngle = startAngle;
    }
    return HexOrientation;
}());
__reflect(HexOrientation.prototype, "HexOrientation");
;
var HexLayout = (function () {
    function HexLayout(orientation, size, origin) {
        this.orientation = orientation;
        this.size = size;
        this.origin = origin;
    }
    return HexLayout;
}());
__reflect(HexLayout.prototype, "HexLayout");
var HexPoint = (function () {
    function HexPoint(x, y, z) {
        var sub = x + y + z;
        if (sub != 0) {
            throw (new Error("error hex point"));
        }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    return HexPoint;
}());
__reflect(HexPoint.prototype, "HexPoint");
var HexUtil = (function () {
    function HexUtil() {
    }
    /**
     * 获取横向六边形中的所有顶点坐标
     * 横向与纵向模式下的区别是x跟y换掉了
     */
    HexUtil.HexCorners = function (center, size) {
        var points = new Array();
        for (var i = 0; i < 6; i++) {
            points.push(HexUtil.HexCorner(center, size, i));
        }
        return points;
    };
    /**
     * 获取横向六边形中的一个顶点坐标
     */
    HexUtil.HexCorner = function (center, size, i) {
        var angle_deg = 60 * i;
        var angle_rad = Math.PI / 180 * angle_deg;
        return new egret.Point(center.x + size * Math.cos(angle_rad), center.y + size * Math.sin(angle_rad));
    };
    HexUtil.HexEquals = function (a, b) {
        return a.x == b.x && a.y == b.y && a.z == b.z;
    };
    HexUtil.HexAdd = function (a, b) {
        return new HexPoint(a.x + b.x, a.y + b.y, a.z + b.z);
    };
    HexUtil.HexSubtract = function (a, b) {
        return new HexPoint(a.x - b.x, a.y - b.y, a.z - b.z);
    };
    HexUtil.HexMultiply = function (a, b) {
        return new HexPoint(a.x * b.x, a.y * b.y, a.z * b.z);
    };
    HexUtil.HexLength = function (hex) {
        return ((Math.abs(hex.x) + Math.abs(hex.y) + Math.abs(hex.z)) / 2);
    };
    HexUtil.HexDistance = function (a, b) {
        return HexUtil.HexLength(HexUtil.HexSubtract(a, b));
    };
    HexUtil.HexRound = function (h) {
        var x = Math.round(h.x);
        var y = Math.round(h.y);
        var z = Math.round(h.z);
        var x_diff = Math.abs(x - h.x);
        var y_diff = Math.abs(y - h.y);
        var z_diff = Math.abs(z - h.z);
        if (x_diff > y_diff && x_diff > z_diff) {
            x = -y - z;
        }
        else if (y_diff > z_diff) {
            y = -x - z;
        }
        else {
            z = -x - y;
        }
        return new HexPoint(x, y, z);
    };
    HexUtil.HexToPixel = function (layout, h) {
        var m = layout.orientation;
        var x = (m.f0 * h.x + m.f1 * h.y) * layout.size.x;
        var y = (m.f2 * h.x + m.f3 * h.y) * layout.size.y;
        return new egret.Point(x + layout.origin.x, y + layout.origin.y);
    };
    HexUtil.PixelToHex = function (layout, p) {
        var m = layout.orientation;
        var pt = new egret.Point((p.x - layout.origin.x) / layout.size.x, (p.y - layout.origin.y) / layout.size.y);
        var x = m.b0 * pt.x + m.b1 * pt.y;
        var y = m.b2 * pt.x + m.b3 * pt.y;
        return new HexPoint(x, y, -x - y);
    };
    HexUtil.layoutPointy = new HexOrientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
    HexUtil.layoutFlat = new HexOrientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);
    return HexUtil;
}());
__reflect(HexUtil.prototype, "HexUtil");
