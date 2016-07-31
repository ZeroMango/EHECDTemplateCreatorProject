using System.Linq;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System;

namespace DataReceptionTransmission
{
    /// <summary>
    /// 验签
    /// </summary>
    public static class SgnedInspection
    {
        /// <summary>
        /// 验证签名
        /// </summary>
        /// <param name="sign">签名</param>
        /// <param name="data">要验证的数据</param>
        /// <returns></returns>
        public static bool SgnedInspectionSign(string sign, string data)
        {
            using (MD5 md5 = MD5.Create())
            {
                data = data.Replace("\r\n", "").Replace(" ", "");
                byte[] temp = Encoding.UTF8.GetBytes(data);

                //var t = string.Join(",",temp.Select(m=> { return m.ToString(); }));

                List<byte> sortArr = new List<byte>();
                sortArr.AddRange(temp);
                sortArr.Sort();

                StringBuilder sb = new StringBuilder();

                foreach (var item in sortArr)
                {
                    sb.Append(item);
                }

                var sortStr = sb.ToString();

                byte[] bytes = md5.ComputeHash(Encoding.UTF8.GetBytes(sortStr.ToString()));
                StringBuilder sBuilder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    sBuilder.Append(bytes[i].ToString("x2"));
                }
                string ret = sBuilder.ToString();
                return ret == sign;
            }
        }
    }
}
