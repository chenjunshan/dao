/**
 *
 * @author
 *
 */
/**
 * 通知类型
 */
var TypeNotification;
(function (TypeNotification) {
    TypeNotification[TypeNotification["Normal"] = 0] = "Normal";
    TypeNotification[TypeNotification["Recycle"] = 1] = "Recycle";
    /**
     * 插队消息
     */
    TypeNotification[TypeNotification["Jump"] = 2] = "Jump";
})(TypeNotification || (TypeNotification = {}));
/**
 * Toast类型
 */
var TypeToast;
(function (TypeToast) {
    TypeToast[TypeToast["Normal"] = 0] = "Normal";
    TypeToast[TypeToast["Style"] = 1] = "Style";
    TypeToast[TypeToast["List"] = 2] = "List";
})(TypeToast || (TypeToast = {}));
