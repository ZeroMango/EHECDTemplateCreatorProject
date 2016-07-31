using DataReceptionTransmission;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace WebUI.CodeGenerator
{
    public class JavaScriptCodeGenerator : CodeGenerator
    {
        public override void GenerateCode(object param)
        {
            Next(new ControllerCodeGenerator());
            var jsFileName = Guid.NewGuid().ToString().Replace("-", "") + ".js";
            result.Add(jsFileName);
            next.SetResult(result);
            next.Path = this.Path;
            #region 开始创建javascript

            CreateJavascriptCode(jsFileName, param);

            #endregion            
            next.GenerateCode(param);
        }

        private void CreateJavascriptCode(string fileName, object param)
        {
            var p = param as object[];
            if (p != default(object[]))
            {
                if (Directory.Exists(Path))
                {
                    var filePath = System.IO.Path.Combine(Path, fileName);
                    using (FileStream fs = File.Create(filePath))
                    {
                        StringBuilder sb = new StringBuilder();

                        sb.AppendLine("$(function(){");
                        sb.AppendLine("    /**");
                        sb.AppendLine("     * 文档加载完成后初始化一个全局变量");
                        sb.AppendLine("     * 用于对文档进行脚本的控制操作，该");
                        sb.AppendLine("     * 模块用于特定的文档，请注意变量名");
                        sb.AppendLine("     * 不要重复，模块名也不要重复以保证");
                        sb.AppendLine("     * 唯一性");
                        sb.AppendLine("     */");
                        sb.AppendLine("    操作模块变量名 = 操作模块().initModule();");
                        sb.AppendLine("});");
                        sb.AppendLine("");
                        sb.AppendLine("function 操作模块(){");
                        sb.AppendLine("");
                        sb.AppendLine("    /**");
                        sb.AppendLine("     * 初始化模块内容");
                        sb.AppendLine("     */");
                        sb.AppendLine("    function initModule(){");
                        sb.AppendLine("        try{");

                        foreach (var item in p)
                        {
                            var dirp = ParameterLoader.ConvertJsonToData<Dictionary<string, object>>(item.ToString());

                            object type = "";
                            if (dirp.TryGetValue("type", out type))
                            {
                                if (type.ToString() == "datagrid")
                                {
                                    object datagridDic = "";
                                    if (dirp.TryGetValue("value", out datagridDic))
                                    {
                                        //sb.Append(CreateDataGrid(datagridDic.ToString()));
                                    }
                                }
                            }
                        }

                        sb.AppendLine("        }catch (e){");
                        sb.AppendLine("            //这里请自行处理异常");
                        sb.AppendLine("        }");
                        sb.AppendLine("    }");
                        sb.AppendLine("");
                        sb.AppendLine("    return{");
                        sb.AppendLine("        initModule:initModule");
                        sb.AppendLine("    };");
                        sb.AppendLine("}");


                        using (StreamWriter sw = new StreamWriter(fs, Encoding.UTF8))
                        {
                            sw.Write(sb.ToString());
                        }
                    }
                }
                else
                {
                    throw new ApplicationException("生成失败，参数错误");
                }
            }
            else
            {
                throw new ApplicationException("没有找到路径" + Path);
            }
        }
    }
}