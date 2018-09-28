module game {
    export class LxProgressBar extends eui.Group {
        private defaultWidth: number = 200;
        private defaultHeight: number = 20;

        private track: eui.Image;
        private thumb: eui.Image;
        private label: eui.Label;
        private _value: number;
        private _text: string;

        public constructor(w?, h?) {
            super();
            this.setSize(w, h);
            this.initView();
        }

        public setSize(w?, h?) {
            this.width = w ? w : this.defaultWidth;
            this.height = h ? h : this.defaultHeight;
        }

        public set value(value: number) {
            this._value = value ? value : 0;
            this.thumb.width = this._value * this.width;
        }

        public get value() {
            return this._value;
        }

        public set text(text: string) {
            this._text = text ? text : "";
            this.label.text = this._text;
            this.label.visible = true;
        }

        public get text() {
            return this._text;
        }

        private initView() {
            this._value = 0;
            this.track = new eui.Image();
            this.track.source = "skin_item_track_pb_png";
            this.track.width = this.width;
            this.track.height = this.height;
            this.track.scale9Grid = new egret.Rectangle(13,11,282,21);
            this.track.verticalCenter = 0;
            this.thumb = new eui.Image();
            this.thumb.source = "skin_item_thumb_pb_png";
            this.thumb.scale9Grid = new egret.Rectangle(13,11,282,21);
            this.thumb.width = this.width * this._value;
            this.thumb.height = this.height;
            this.thumb.verticalCenter = 0;
            this.label = new eui.Label();
            this.label.size = 24;
            this.label.text = "";
            this.label.textColor = 0x000000;
            this.label.visible = false;
            this.label.horizontalCenter = 0;
            this.label.verticalCenter = 0;
            this.addChild(this.track);
            this.addChild(this.thumb);
            this.addChild(this.label);
        }
    }
}