using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebUI.CodeGenerator
{
    public class ControllerCodeGenerator : CodeGenerator
    {
        public override void GenerateCode(object param)
        {
            Next(new BussinessCodeGenerator());
            var controllerFileName = "控制器名称Controller.cs";
            result.Add(controllerFileName);
            next.Path = this.Path;

            next.SetResult(result);
            next.GenerateCode(param);
        }
    }
}