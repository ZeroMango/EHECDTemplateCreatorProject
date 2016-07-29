using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebUI.Controllers
{
    public class SiteStatusController : Controller
    {
        // GET: SiteStatus
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult HtmlError(int type)
        {
            return PartialView("HtmlError", type);
        }
    }
}