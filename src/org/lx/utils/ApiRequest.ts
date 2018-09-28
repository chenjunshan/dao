enum ApiMethod { GET, POST, PUT };
class ApiRequest {
    public static API_ROOT_TEST = "http://192.168.31.148/wxprogram/public/index.php/api";
    // public static API_ROOT_PRODUCTION = "https://request.twincamera.luoxiang.com/api";
    // public static API_ROOT_PRODUCTION = 'https://mp.huobaoniao.com/api';
    public static API_ROOT_PRODUCTION = 'https://s2048.kxtoo.com/api';
    public static API_ROOT = ApiRequest.API_ROOT_PRODUCTION;
    private method: ApiMethod;
    private api: string;
    private params = {};
    private onComplete: Function;

    public constructor(method: ApiMethod, api: string) {
        this.method = method;
        this.api = api;
    }

    public addParam(key: string, value: string) {
        this.params[key] = value;
    }

    public send(onComplete?: Function, onError?: Function) {
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
        } else if (this.method == ApiMethod.POST) {
            request.open(ApiRequest.API_ROOT + this.api, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send(params);
        } else if (this.method == ApiMethod.PUT) {
            request.open(ApiRequest.API_ROOT + this.api, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            params = "_method=PUT&" + params;
            request.send(params);
        }
    }

    public sendTest(onComplete?: Function, onError?: Function) {
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
            request.open(ApiRequest.API_ROOT_TEST + this.api + '?' + params, egret.HttpMethod.GET);
            request.send();
        } else if (this.method == ApiMethod.POST) {
            request.open(ApiRequest.API_ROOT_TEST + this.api, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send(params);
        } else if (this.method == ApiMethod.PUT) {
            request.open(ApiRequest.API_ROOT_TEST + this.api, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            params = "_method=PUT&" + params;
            request.send(params);
        }
    }

    private onCompleteListener(event: egret.Event) {
        var request = <egret.HttpRequest>event.currentTarget;
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
    }

    public getParams(): any {
        return this.params;
    }
}