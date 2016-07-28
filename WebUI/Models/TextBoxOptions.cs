using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebUI.App_Start;

namespace WebUI.Models
{
    public class TextBoxOptions
    {
        [FieldAttribute(PropertyTitle = "提示消息", PropertyName = "prompt")]
        public string prompt;

        [FieldAttribute(PropertyTitle = "组件的宽度", PropertyName = "width")]
        public int width;

        [FieldAttribute(PropertyTitle = "组件的高度", PropertyName = "height")]
        public int height;

        [FieldAttribute(PropertyTitle = "默认值", PropertyName = "value")]
        public string value;

        [FieldAttribute(PropertyTitle = "文本框类型", PropertyName = "type")]
        public string type;

        [FieldAttribute(PropertyTitle = "是否是多行", PropertyName = "multiline")]
        public bool multiline;

        [FieldAttribute(PropertyTitle = "是否可用", PropertyName = "editable")]
        public bool editable;

        [FieldAttribute(PropertyTitle = "是否禁用", PropertyName = "disabled")]
        public bool disabled;

        [FieldAttribute(PropertyTitle = "是否只读", PropertyName = "readonly")]
        public bool Readonly;

        [FieldAttribute(PropertyTitle = "背景图标", PropertyName = "iconCls")]
        public string iconCls;

        [FieldAttribute(PropertyTitle = "图标的位置", PropertyName = "iconAlign")]
        public string iconAlign;

        [FieldAttribute(PropertyTitle = "图标宽度", PropertyName = "iconWidth")]
        public int iconWidth;

        [FieldAttribute(PropertyTitle = "按钮显示文本", PropertyName = "buttonText")]
        public string buttonText;

        [FieldAttribute(PropertyTitle = "按钮图标", PropertyName = "buttonIcon")]
        public string buttonIcon;

        [FieldAttribute(PropertyTitle = "按钮位置", PropertyName = "buttonAlign")]
        public string buttonAlign;
    }
}