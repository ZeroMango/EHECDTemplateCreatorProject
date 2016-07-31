using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataReceptionTransmission
{
    [Serializable]
    public class ResponseData
    {
        /// <summary>
        /// 是否成功
        /// </summary>
        public bool Succeeded { get; set; }

        public string ErrUrl { get; set; }

        /// <summary>
        /// 返回客户端数据
        /// </summary>
        public object Data { get; set; }

        /// <summary>
        /// 消息（异常或者是请求失败都用这个处理）
        /// </summary>
        public string Msg { get; set; }
    }

    public class RequestData
    {
        public string sign { get; set; }

        public object data { get; set; }

        public string identity { get; set; }

        public string dataStr { get; set; }
    }
}
