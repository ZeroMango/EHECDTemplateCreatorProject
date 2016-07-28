using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebUI.Models;

namespace WebUI.App_Start
{
    public abstract class TagHelper
    {
        protected string _rowHtmlString = "<tr class=\"tabs-header\"><td>{0}</td><td>{1}</td><td>{2}</td></tr>";
        protected string _numberboxString = "<input type=\"text\" class=\"easyui-numberbox\" data-options=\"width:80,precision:0\" />";
        protected string _textboxString = "<input type=\"text\" class=\"easyui-textbox\" data-options=\"width:80\" />";
        protected string _radioString = "<input type=\"radio\" name=\"{0}\" value=\"true\" />是<input type=\"radio\" name=\"{0}\" value=\"false\" />否";
        protected Type t;

        public TagHelper(Type t) {
            this.t = t;
        }

        public abstract HtmlString LoadHtmlString();
    }

    public static class TagHelperFactory
    {
        public static TagHelper CreateTagHelper(string type)
        {
            Type _type = null;

            switch (type)
            {
                case "textbox":
                    _type = typeof(TextBoxOptions);
                    break;

                default:
                    break;
            }

            return new ConditionTagHelper(_type);
        }
    }
}