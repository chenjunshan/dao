var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ApiMethod;
(function (ApiMethod) {
    ApiMethod[ApiMethod["GET"] = 0] = "GET";
    ApiMethod[ApiMethod["POST"] = 1] = "POST";
    ApiMethod[ApiMethod["PUT"] = 2] = "PUT";
})(ApiMethod || (ApiMethod = {}));
;
var ApiRequest = (function () {
    function ApiRequest(method, api) {
        this.params = {};
        this.method = method;
        this.api = api;
    }
    ApiRequest.prototype.addParam = function (key, value) {
        this.params[key] = value;
    };
    ApiRequest.prototype.send = function (onComplete, onError) {
        this.onComplete = onComplete;
        var params = "";
        for (var key in this.params) {
            params += '&' + key + '=' + this.params[key];
        }
        params = params.substr(1);
        egret.log(this.api + "\?" + params);
        var request = new egret.HttpRequest();
        request.addEventListener(egret.Event.COMPLETE, this.onCompleteListener, this);
        if (onError != undefined) {
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, onError, this);
        }
        request.responseType = egret.HttpResponseType.TEXT;
        if (this.method == ApiMethod.GET) {
            request.open(ApiRequest.API_ROOT + this.api + '?' + params, egret.HttpMethod.GET);
            request.send();
        }
        else if (this.method == ApiMethod.POST) {
            request.open(ApiRequest.API_ROOT + this.api, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send(params);
        }
        else if (this.method == ApiMethod.PUT) {
            request.open(ApiRequest.API_ROOT + this.api, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            params = "_method=PUT&" + params;
            request.send(params);
        }
    };
    ApiRequest.prototype.onCompleteListener = function (event) {
        var request = event.currentTarget;
        var response;
        if (!request.response || request.response.length == 0) {
            if (this.onComplete) {
                this.onComplete(null);
            }
            return;
        }
        response = JSON.parse(request.response);
        if (this.onComplete) {
            this.onComplete(response);
        }
    };
    ApiRequest.prototype.getParams = function () {
        return this.params;
    };
    ApiRequest.API_ROOT_TEST = "http://192.168.31.148/wxprogram/public/index.php/api";
    // public static API_ROOT_PRODUCTION = "https://request.twincamera.luoxiang.com/api";
    ApiRequest.API_ROOT_PRODUCTION = 'https://mp.huobaoniao.com/api';
    ApiRequest.API_ROOT = ApiRequest.API_ROOT_PRODUCTION;
    return ApiRequest;
}());
__reflect(ApiRequest.prototype, "ApiRequest");
