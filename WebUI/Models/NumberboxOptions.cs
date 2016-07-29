using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebUI.App_Start;

namespace WebUI.Models
{
    public class NumberboxOptions
    {
        [FieldAttribute(PropertyTitle = "是否禁用", PropertyName = "disabled")]
        public bool disabled;

        [FieldAttribute(PropertyTitle = "默认值", PropertyName = "value")]
        public int value;

        [FieldAttribute(PropertyTitle = "最小值", PropertyName = "min")]
        public int min;

        [FieldAttribute(PropertyTitle = "最大值", PropertyName = "max")]
        public int max;

        [FieldAttribute(PropertyTitle = "最大精度", PropertyName = "precision")]
        public int precision;

        [FieldAttribute(PropertyTitle = "分隔字符", PropertyName = "decimalSeparator")]
        public string decimalSeparator;

        [FieldAttribute(PropertyTitle = "分割整数组字符", PropertyName = "groupSeparator")]
        public string groupSeparator;


        [FieldAttribute(PropertyTitle = "前缀字符", PropertyName = "prefix")]
        public string prefix;

        [FieldAttribute(PropertyTitle = "后缀字符", PropertyName = "suffix")]
        public string suffix;

    }
}