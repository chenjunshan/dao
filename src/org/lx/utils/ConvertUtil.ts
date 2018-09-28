/**
 *
 * @author xsq
 *
 */
class ConvertUtil {

    /**
     * 格式化时间 默认00：00
     */
    public static convertTime(time: number, defaultT?: string,
        defaultH?: string, defaultM?: string, defaultS?: string): string {
        if (time <= 0) {
            return defaultT ? defaultT : "00:00";
        }
        var h: number = Math.floor(time / 60 / 60);
        var hLeft: number = Math.floor(time % (60 * 60));
        var m: number = Math.floor(hLeft / 60);
        var s: number = Math.floor(hLeft % 60);
        var timeString = "";
        if (h == 0) {
            timeString = defaultH ? defaultH : "";
            if (m == 0) {
                timeString += defaultM ? defaultM : "00:";
                if (s == 0) {
                    timeString += defaultS ? defaultS : "00";
                } else if (s < 10 && s > 0) {
                    timeString += "0" + s;
                } else {
                    timeString += s;
                }
            } else if (m < 10 && m > 0) {
                timeString += "0" + m + ":";
                if (s < 10) {
                    timeString += "0" + s;
                } else {
                    timeString += s;
                }
            } else {
                timeString += m + ":";
                if (s < 10) {
                    timeString += "0" + s;
                } else {
                    timeString += s;
                }
            }
        } else if (h < 10 && h > 0) {
            timeString = "0" + h + ":";
            if (m < 10) {
                timeString += "0" + m + ":";
                if (s < 10) {
                    timeString += "0" + s;
                } else {
                    timeString += s;
                }
            } else {
                timeString += m + ":";
                if (s < 10) {
                    timeString += "0" + s;
                } else {
                    timeString += s;
                }
            }
        } else {
            timeString += h + ":";
            if (m < 10) {
                timeString += "0" + m + ":";
                if (s < 10) {
                    timeString += "0" + s;
                } else {
                    timeString += s;
                }
            } else {
                timeString += m + ":";
                if (s < 10) {
                    timeString += "0" + s;
                } else {
                    timeString += s;
                }
            }
        }
        return timeString;
    }

    public static concatText(list: Array<any>, data?: any): string {
        var searchValue = "_any_", str = "";
        var textList = JSON.parse(JSON.stringify(list));
        for (var i in textList) {
            var temp = "" + textList[i];
            var index = temp.indexOf(searchValue);
            if (index != -1 && data != null && data != undefined) {
                var key = temp.replace(searchValue, "");
                if (key == "" && temp == searchValue) {
                    str += "" + data;
                } else {
                    if (data[key] != null && data[key] != undefined) {
                        str += "" + data[key];
                    }
                }
            } else {
                str += temp;
            }
        }
        return str;
    }

    public static concatTextFlow(list: Array<any>, data?: any): Array<egret.ITextElement> {
        var searchValue = "_any_";
        var flow: Array<egret.ITextElement> = new Array();
        var textList = JSON.parse(JSON.stringify(list));
        for (var i in textList) {
            var temp = textList[i];
            var str = "" + temp.text;
            var index = str.indexOf(searchValue);
            if (index != -1 && data != null && data != undefined) {
                var key = str.replace(searchValue, "");
                if (key == "" && str == searchValue) {
                    temp.text = "" + data;
                } else {
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
                        } else {
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
    }

    public static concatTextList(list: Array<any>, data?: any): Array<any> {
        var arr = new Array();
        var textList = JSON.parse(JSON.stringify(list));
        for (var i in textList) {
            var temp = textList[i];
            if (typeof (temp) === "string" && !((temp as any) instanceof Array)) {
                arr.push(temp);
            } else {
                arr.push(this.concatText(temp, data));
            }
        }
        return arr;
    }

    public static convertValue(value): string {
        var str = "";
        if (value < 1000) {
            str = "" + value;
        } else if (value >= 1000 && value < 1000000) {
            str = "" + Math.floor(value / 1000) + "k";
        } else if (value >= 1000000) {
            str = "" + Math.floor(value / 1000000) + "m";
        }
        return str;
    }
}
