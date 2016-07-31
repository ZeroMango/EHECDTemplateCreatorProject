using DataReceptionTransmission;
using System;
using System.Web.Mvc;
using WebUI.App_Start;

namespace WebUI.Controllers
{
    public class HomeController : SuperController
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult AddDatagrid()
        {
            return PartialView();
        }

        public PartialViewResult EditConditionOptions(string type)
        {
            return PartialView("EditConditionOptions", type);
        }

        public void GeneratorCode()
        {
            var rparams = ParameterLoader.ConvertJsonToData<object[]>(RequestParameters.data.ToString());
            CodeGenerator.CodeGenerator cg = new CodeGenerator.HTMLCodeGenerator();
            cg.SetResult(new System.Collections.Generic.List<string>());
            cg.Path = System.IO.Path.Combine(Server.MapPath("/"), "Codes");
            cg.GenerateCode(rparams);
            result.Data = string.Join(",", cg.GetResult());
            result.Succeeded = true;
        }
    }
}