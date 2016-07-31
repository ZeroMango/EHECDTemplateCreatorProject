using System.Collections.Generic;
using System.IO;
using System.Web;

namespace DataReceptionTransmission
{
    public static class ParameterLoader
    {
        public static T ConvertJsonToData<T>(string json)
        {
            return JsonTool.JSONToObject<T>(json);
        }

        /// <summary>
        /// 载入AJax提交的请求参数
        /// </summary>
        /// <param name="stream"></param>
        /// <returns></returns>
        public static RequestData LoadAjaxPostParameters(Stream stream)
        {
            RequestData r = new RequestData();
            using (StreamReader sr = new StreamReader(stream))
            {
                
                var requstDic = JsonTool.JSONToObject<IDictionary<string, object>>(HttpUtility.UrlDecode(sr.ReadToEnd()));

                object rdata = "";

                if(requstDic.TryGetValue("data", out rdata)) {
                    r.dataStr = rdata.ToString();
                    r.data = JsonTool.JSONToObject<object>(r.dataStr);
                }

                object rsign = "";

                if(requstDic.TryGetValue("sign", out rsign))
                {
                    r.sign = rsign.ToString();
                }

                object ridentity = "";

                if (requstDic.TryGetValue("dec", out ridentity))
                {
                    r.identity = ridentity.ToString();
                }             
            }
            return r;
        }

        /// <summary>
        /// 获取json响应
        /// </summary>
        /// <param name="responseData"></param>
        /// <returns></returns>
        public static string LoadResponseJSONStr(object responseData)
        {
            return JsonTool.ObjectToJSON(responseData);
        }
    }
}
