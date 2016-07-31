using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Routing;
using DataReceptionTransmission;
using System.Text;
using log4net;

namespace WebUI.App_Start
{
    public class SuperController : Controller
    {
        protected ResponseData result = new ResponseData
        {
            Data = null,
            Succeeded = false,
            Msg = "",
            ErrUrl = null
        };

        protected RequestData RequestParameters = new RequestData
        {
            data = null,
            sign = "",
            identity = ""
        };

        /// <summary>
        /// 处理前
        /// </summary>
        /// <param name="requestContext"></param>
        protected override void Initialize(RequestContext requestContext)
        {
            if (requestContext.HttpContext.Request.IsAjaxRequest() && requestContext.HttpContext.Request.RequestType.ToLower() == "post")
            {
                RequestParameters = ParameterLoader.LoadAjaxPostParameters(requestContext.HttpContext.Request.InputStream);
            }
            base.Initialize(requestContext);
        }

        /// <summary>
        /// 处理后
        /// </summary>
        /// <param name="filterContext"></param>
        protected override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            if (filterContext.Exception != default(Exception))
            {
                StringBuilder sb = new StringBuilder();
                Exception err = filterContext.Exception;
                ILog log = LogManager.GetLogger(err.TargetSite.DeclaringType);
                sb.AppendLine(string.Format("所在方法：{0}", err.TargetSite.Name));
                sb.AppendLine(string.Format("异常简述：{0}", err.Message));
                sb.AppendLine("详细信息：");
                sb.AppendLine(string.Format(err.StackTrace));
                log.Error(sb.ToString());
                
                result.Succeeded = false;
                result.Msg = filterContext.Exception.Message;
                result.ErrUrl = "/SiteStatus/HtmlError/?type=" + 500;
                filterContext.ExceptionHandled = true;
                filterContext.Result = Content(ParameterLoader.LoadResponseJSONStr(result));
                
            }
            else if (filterContext.HttpContext.Request.IsAjaxRequest() && filterContext.HttpContext.Request.RequestType.ToLower() == "post")
            {
                filterContext.Result = Content(ParameterLoader.LoadResponseJSONStr(result));
            }
        }
    }
}