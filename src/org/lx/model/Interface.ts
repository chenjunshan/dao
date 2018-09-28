/**
 *
 * @author 
 *
 */
/**
 * 通知类型
 */ 
enum TypeNotification{
    Normal,
    Recycle,
    /**
     * 插队消息
     */ 
    Jump
}

/**
 * 通知结构体
 * @type 通知类型默认 Normal
 * @msg any类型 string/Array<egret.ITextElement>
 */ 
interface StructNotification{
    type:TypeNotification;
    msg:any;
}

/**
 * Toast类型
 */ 
enum TypeToast{
    Normal,
    Style,
    List
}

interface FunBandThis {
    id?: string;
    fun: Function;
    thisObj: any;
}
