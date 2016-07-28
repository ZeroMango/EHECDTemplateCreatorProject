using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebUI.App_Start
{
    [AttributeUsage(AttributeTargets.Field)]
    public class FieldAttribute:Attribute
    {
        public string PropertyTitle { get; set; }

        public string PropertyName { get; set; }
    }
}