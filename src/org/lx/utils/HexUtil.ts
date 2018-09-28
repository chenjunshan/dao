class HexOrientation {
	public f0: number;
	public f1: number;
	public f2: number;
	public f3: number;
	public b0: number;
	public b1: number;
	public b2: number;
	public b3: number;
	public startAngle: number; // in multiples of 60°
	public constructor(f0: number, f1: number, f2: number, f3: number,
		b0: number, b1: number, b2: number, b3: number,
		startAngle: number) {
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
};

class HexLayout {
	public orientation: HexOrientation;
	public size: egret.Point;
	public origin: egret.Point;
	public constructor(orientation: HexOrientation, size: egret.Point, origin: egret.Point) {
		this.orientation = orientation;
		this.size = size;
		this.origin = origin;
	}
}

class HexPoint {
	public x: number;
	public y: number;
	public z: number;
	public constructor(x, y, z) {
		var sub = x + y + z;
		if (sub != 0) {
			throw (new Error("error hex point"));
		}
		this.x = x;
		this.y = y;
		this.z = z;
	}
}

class HexUtil {
	public static layoutPointy: HexOrientation = new HexOrientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0,
		Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0,
		0.5);
	public static layoutFlat: HexOrientation = new HexOrientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0),
		2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0,
		0.0);

	/**
	 * 获取横向六边形中的所有顶点坐标
	 * 横向与纵向模式下的区别是x跟y换掉了
	 */
	public static HexCorners(center: egret.Point, size: number): Array<egret.Point> {
		var points = new Array<egret.Point>();
		for (var i = 0; i < 6; i++) {
			points.push(HexUtil.HexCorner(center, size, i));
		}
		return points;
	}

	/**
	 * 获取横向六边形中的一个顶点坐标
	 */
	public static HexCorner(center: egret.Point, size: number, i: number): egret.Point {
		var angle_deg = 60 * i
		var angle_rad = Math.PI / 180 * angle_deg
		return new egret.Point(center.x + size * Math.cos(angle_rad),
			center.y + size * Math.sin(angle_rad))
	}

	public static HexEquals(a: HexPoint, b: HexPoint): boolean {
		return a.x == b.x && a.y == b.y && a.z == b.z;
	}

	public static HexAdd(a: HexPoint, b: HexPoint): HexPoint {
		return new HexPoint(a.x + b.x, a.y + b.y, a.z + b.z);
	}

	public static HexSubtract(a: HexPoint, b: HexPoint): HexPoint {
		return new HexPoint(a.x - b.x, a.y - b.y, a.z - b.z);
	}

	public static HexMultiply(a: HexPoint, b: HexPoint): HexPoint {
		return new HexPoint(a.x * b.x, a.y * b.y, a.z * b.z);
	}

	public static HexLength(hex: HexPoint): number {
		return ((Math.abs(hex.x) + Math.abs(hex.y) + Math.abs(hex.z)) / 2);
	}

	public static HexDistance(a: HexPoint, b: HexPoint): number {
		return HexUtil.HexLength(HexUtil.HexSubtract(a, b));
	}

	public static HexRound(h: HexPoint): HexPoint {
		var x = Math.round(h.x);
		var y = Math.round(h.y);
		var z = Math.round(h.z);
		var x_diff = Math.abs(x - h.x);
		var y_diff = Math.abs(y - h.y);
		var z_diff = Math.abs(z - h.z);
		if (x_diff > y_diff && x_diff > z_diff) {
			x = -y - z;
		} else if (y_diff > z_diff) {
			y = -x - z;
		} else {
			z = -x - y;
		}
		return new HexPoint(x, y, z);
	}

	public static HexToPixel(layout: HexLayout, h: HexPoint): egret.Point {
		var m = layout.orientation;
		var x = (m.f0 * h.x + m.f1 * h.y) * layout.size.x;
		var y = (m.f2 * h.x + m.f3 * h.y) * layout.size.y;
		return new egret.Point(x + layout.origin.x, y + layout.origin.y);
	}

	public static PixelToHex(layout: HexLayout, p: egret.Point): HexPoint {
		var m = layout.orientation;
		var pt = new egret.Point((p.x - layout.origin.x) / layout.size.x,
			(p.y - layout.origin.y) / layout.size.y);
		var x = m.b0 * pt.x + m.b1 * pt.y;
		var y = m.b2 * pt.x + m.b3 * pt.y;
		return new HexPoint(x, y, -x - y);
	}
}