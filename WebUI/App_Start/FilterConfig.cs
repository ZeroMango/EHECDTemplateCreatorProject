using System;
using System.IO;
using System.Web;
using System.Web.Mvc;
using log4net;
using log4net.Config;
using System.Reflection;
using System.Text;

namespace WebUI
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new AppHandleErrorAttribute());
        }
    }

    /// <summary>
    /// 重写异常处理特性
    /// </summary>
    public class AppHandleErrorAttribute : HandleErrorAttribute
    {
        public override void OnException(ExceptionContext filterContext)
        {
            StringBuilder sb = new StringBuilder();
            Exception err = filterContext.Exception;
            ILog log = LogManager.GetLogger(err.TargetSite.DeclaringType);

            sb.AppendLine(string.Format("所在方法：{0}", err.TargetSite.Name));
            sb.AppendLine(string.Format("异常简述：{0}", err.Message));
            sb.AppendLine("详细信息：");
            sb.AppendLine(string.Format(err.StackTrace));

            log.Error(sb.ToString());

            filterContext.ExceptionHandled = true;

            filterContext.Result = new RedirectResult("/SiteStatus/HtmlError/?type=" + 500);
        }
    }
}