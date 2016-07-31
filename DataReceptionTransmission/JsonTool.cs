using Newtonsoft.Json;

namespace DataReceptionTransmission
{
    /// <summary> 
    /// Json强类型转换 
    /// </summary> 
    public static class JsonTool
    {
        /// <summary> 
        /// JSON文本转对象,泛型方法 
        /// </summary> 
        /// <typeparam name="T">类型</typeparam> 
        /// <param name="jsonText">JSON文本</param> 
        /// <returns>指定类型的对象</returns> 
        public static T JSONToObject<T>(this string json)
        {
            return JsonConvert.DeserializeObject<T>(json);
        }
        /// <summary> 
        /// 对象转JSON 
        /// </summary> 
        /// <param name="obj">对象</param> 
        /// <returns>JSON格式的字符串</returns> 
        public static string ObjectToJSON(this object obj)
        {
            if (obj == null)
            {
                //return null;
                return "";
            }
            //if (obj.GetType().Name == "DataRow")
            //{
            //    Dictionary<string, object> data = new Dictionary<string, object>();
            //    DataRow dr = obj as DataRow;
            //    foreach (DataColumn col in dr.Table.Columns)
            //    {
            //        data.Add(col.ColumnName, dr[col.ColumnName]);
            //    }
            //    obj = data;
            //}

            //if (obj.GetType().Name == "DataTable")
            //{
            //    List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
            //    DataTable dt = obj as DataTable;
            //    foreach (DataRow dr in dt.Rows)
            //    {
            //        Dictionary<string, object> data = null;
            //        foreach (DataColumn col in dt.Columns)
            //        {
            //            data = new Dictionary<string, object>();
            //            data.Add(col.ColumnName, dr[col.ColumnName]);
            //        }
            //        list.Add(data);
            //    }
            //    obj = list;
            //}
            return JsonConvert.SerializeObject(obj, Formatting.None,
                new Newtonsoft.Json.JsonSerializerSettings()
                {
                    //NullValueHandling = NullValueHandling.Ignore,
                    DateFormatHandling = Newtonsoft.Json.DateFormatHandling.MicrosoftDateFormat,
                });
        }
    }
}