using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebUI.CodeGenerator
{
    public class BussinessCodeGenerator : CodeGenerator
    {
        public override void GenerateCode(object param)
        {
            result.Add("business");           
        }
    }
}