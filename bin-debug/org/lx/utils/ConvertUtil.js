var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author xsq
 *
 */
var ConvertUtil = (function () {
    function ConvertUtil() {
    }
    /**
     * 格式化时间 默认00：00
     */
    ConvertUtil.convertTime = function (time, defaultT, defaultH, defaultM, defaultS) {
        if (time <= 0) {
            return defaultT ? defaultT : "00:00";
        }
        var h = Math.floor(time / 60 / 60);
        var hLeft = Math.floor(time % (60 * 60));
        var m = Math.floor(hLeft / 60);
        var s = Math.floor(hLeft % 60);
        var timeString = "";
        if (h == 0) {
            timeString = defaultH ? defaultH : "";
            if (m == 0) {
                timeString += defaultM ? defaultM : "00:";
                if (s == 0) {
                    timeString += defaultS ? defaultS : "00";
                }
                else if (s < 10 && s > 0) {
                    timeString += "0" + s;
                }
                else {
                    timeString += s;
                }
            }
            else if (m < 10 && m > 0) {
                timeString += "0" + m + ":";
                if (s < 10) {
                    timeString += "0" + s;
                }
                else {
                    timeString += s;
                }
            }
            else {
                timeString += m + ":";
                if (s < 10) {
                    timeString += "0" + s;
                }
                else {
                    timeString += s;
                }
            }
        }
        else if (h < 10 && h > 0) {
            timeString = "0" + h + ":";
            if (m < 10) {
                timeString += "0" + m + ":";
                if (s < 10) {
                    timeString += "0" + s;
                }
                else {
                    timeString += s;
                }
            }
            else {
                timeString += m + ":";
                if (s < 10) {
                    timeString += "0" + s;
                }
                else {
                    timeString += s;
                }
            }
        }
        else {
            timeString += h + ":";
            if (m < 10) {
                timeString += "0" + m + ":";
                if (s < 10) {
                    timeString += "0" + s;
                }
                else {
                    timeString += s;
                }
            }
            else {
                timeString += m + ":";
                if (s < 10) {
                    timeString += "0" + s;
                }
                else {
                    timeString += s;
                }
            }
        }
        return timeString;
    };
    ConvertUtil.concatText = function (list, data) {
        var searchValue = "_any_", str = "";
        var textList = JSON.parse(JSON.stringify(list));
        for (var i in textList) {
            var temp = "" + textList[i];
            var index = temp.indexOf(searchValue);
            if (index != -1 && data != null && data != undefined) {
                var key = temp.replace(searchValue, "");
                if (key == "" && temp == searchValue) {
                    str += "" + data;
                }
                else {
                    if (data[key] != null && data[key] != undefined) {
                        str += "" + data[key];
                    }
                }
            }
            else {
                str += temp;
            }
        }
        return str;
    };
    ConvertUtil.concatTextFlow = function (list, data) {
        var searchValue = "_any_";
        var flow = new Array();
        var textList = JSON.parse(JSON.stringify(list));
        for (var i in textList) {
            var temp = textList[i];
            var str = "" + temp.text;
            var index = str.indexOf(searchValue);
            if (index != -1 && data != null && data != undefined) {
                var key = str.replace(searchValue, "");
                if (key == "" && str == searchValue) {
                    temp.text = "" + data;
                }
                else {
                    if (data[key] != null && data[key] != undefined) {
                        temp.text = "" + data[key];
                    }
                }
            }
            if (temp.style) {
                var style = temp.style;
                for (var j in style) {
                    var styleTemp = "" + style[j];
                    var styleIndex = styleTemp.indexOf(searchValue);
                    if (styleIndex != -1 && data != null && data != undefined) {
                        var styleKey = styleTemp.replace(searchValue, "");
                        if (styleKey == "" && styleTemp == searchValue) {
                            style[j] = data;
                        }
                        else {
                            if (data[styleKey] != null && data[styleKey] != undefined) {
                                style[j] = data[styleKey];
                            }
                        }
                    }
                }
            }
            flow.push(temp);
        }
        return flow;
    };
    ConvertUtil.concatTextList = function (list, data) {
        var arr = new Array();
        var textList = JSON.parse(JSON.stringify(list));
        for (var i in textList) {
            var temp = textList[i];
            if (typeof (temp) === "string" && !(temp instanceof Array)) {
                arr.push(temp);
            }
            else {
                arr.push(this.concatText(temp, data));
            }
        }
        return arr;
    };
    ConvertUtil.convertValue = function (value) {
        var str = "";
        if (value < 1000) {
            str = "" + value;
        }
        else if (value >= 1000 && value < 1000000) {
            str = "" + Math.floor(value / 1000) + "k";
        }
        else if (value >= 1000000) {
            str = "" + Math.floor(value / 1000000) + "m";
        }
        return str;
    };
    return ConvertUtil;
}());
__reflect(ConvertUtil.prototype, "ConvertUtil");
