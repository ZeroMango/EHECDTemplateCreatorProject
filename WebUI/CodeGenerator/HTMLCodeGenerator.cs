using DataReceptionTransmission;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace WebUI.CodeGenerator
{
    public class HTMLCodeGenerator : CodeGenerator
    {
        private static readonly string BtnHtml = "            <a href=\"javascript:;\" plain=\"true\" iconcls=\"{0}\" class=\"easyui-linkbutton {1}\">{2}</a>";
        private static readonly string TextBoxHtml = "            {0}：<input type=\"text\" class=\"easyui-textbox {1}\" data-options=\"{2}\" />";

        public override void GenerateCode(object param)
        {
            Next(new JavaScriptCodeGenerator());
            var htmlFileName = "index.cshtml";
            result.Add(htmlFileName);
            next.SetResult(result);            
            #region 开始创建html

            CreateHtmlCode(htmlFileName, param);

            #endregion
            next.GenerateCode(param);
        }

        private void CreateHtmlCode(string fileName, object param)
        {
            var p = param as object[];
            if (p != default(object[]))
            {
                if (Directory.Exists(Path))
                {
                    var tempDir = Directory.CreateDirectory(System.IO.Path.Combine(Path, Guid.NewGuid().ToString().Replace("-", "").ToUpper())).FullName;
                    if (Directory.Exists(tempDir))
                    {
                        next.Path = tempDir;
                        var filePath = System.IO.Path.Combine(tempDir, fileName);
                        using (FileStream fs = File.Create(filePath))
                        {
                            StringBuilder sb = new StringBuilder();
                            sb.AppendLine("@{ Layout = null; }");
                            sb.AppendLine("<!DOCTYPE html>");
                            sb.AppendLine("<html lang=\"zh-cn\">");
                            sb.AppendLine("<head>");
                            sb.AppendLine("    <meta name=\"viewport\" content=\"width=device-width\" />");
                            sb.AppendLine("    <title>请自己设置页标题</title>");
                            sb.AppendLine("    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
                            sb.AppendLine("    <!--");
                            sb.AppendLine("        请在这里引入需要用到的css和javascript文件");
                            sb.AppendLine("    -->");
                            sb.AppendLine("</head>");
                            sb.AppendLine("<body>");

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
                                            sb.Append(CreateDataGrid(datagridDic.ToString()));
                                        }
                                    }
                                }
                            }
                            sb.AppendLine("</body>");
                            sb.AppendLine("</html>");
                            using (StreamWriter sw = new StreamWriter(fs, Encoding.UTF8))
                            {
                                sw.Write(sb.ToString());
                            }
                        }
                    }
                    else
                    {
                        throw new ApplicationException("创建临时文件夹路径失败" + tempDir);
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

        /// <summary>
        /// 创建datagrid
        /// </summary>
        /// <param name="ops"></param>
        /// <returns></returns>
        private string CreateDataGrid(string ops)
        {
            StringBuilder sb = new StringBuilder();

            sb.AppendLine("    <table id=\"请自己设置ID\" data-options=\"fit: true\"></table>");

            var gridops = ParameterLoader.ConvertJsonToData<Dictionary<string, object>>(ops);

            object condi = "";
            object btns = "";

            var hasTool = false;

            if (gridops.TryGetValue("conditions", out condi))
            {
                var conditions = ParameterLoader.ConvertJsonToData<Dictionary<string, object>[]>(condi.ToString());
                if (conditions.Length > 0)
                {
                    hasTool = true;
                    sb.AppendLine("    <div id=\"请输入工具栏的ID\" style=\"padding: 10px;\">");
                    sb.AppendLine("        <div style=\"margin-top: 10px\">");

                    foreach (var item in conditions)
                    {
                        object controlType = "", conditionDes = "", fieldName = "", options = "";
                        var convertRet = true;
                        convertRet = item.TryGetValue("controlType", out controlType);
                        convertRet = item.TryGetValue("conditionDes", out conditionDes);
                        convertRet = item.TryGetValue("fieldName", out fieldName);
                        convertRet = item.TryGetValue("options", out options);

                        if (convertRet)
                        {
                            var htm = GetConditionHtml(controlType.ToString());
                            sb.AppendLine(string.Format(htm, conditionDes, fieldName, options.ToString().Replace("\"", "'")));
                        }
                    }
                }
            }

            if (gridops.TryGetValue("opbtns", out btns))
            {
                var bns = ParameterLoader.ConvertJsonToData<Dictionary<string, object>[]>(btns.ToString());
                if (bns.Length > 0)
                {
                    if (!hasTool)
                    {
                        hasTool = true;
                        sb.AppendLine("    <div id=\"请输入工具栏的ID\" style=\"padding: 10px;\">");
                        sb.AppendLine("        <div style=\"margin-top: 10px\">");
                    }

                    foreach (var item in bns)
                    {
                        object operateField = "", operateText = "", operateIcon = "";
                        var convertRet = true;
                        convertRet = item.TryGetValue("operateField", out operateField);
                        convertRet = item.TryGetValue("operateText", out operateText);
                        convertRet = item.TryGetValue("operateIcon", out operateIcon);

                        if (convertRet)
                        {
                            sb.AppendLine(string.Format(BtnHtml, operateIcon, operateField, operateText));
                        }
                    }

                    sb.AppendLine("        </div>");
                    sb.AppendLine("    </div>");
                }
                else
                {
                    if (hasTool)
                    {
                        sb.AppendLine("        </div>");
                        sb.AppendLine("    </div>");
                    }
                }
            }

            return sb.ToString();
        }

        /// <summary>
        /// 获取查询条件的HTML
        /// </summary>
        /// <param name="type">查询条件类型</param>
        /// <returns></returns>
        private string GetConditionHtml(string type)
        {
            var ret = "";
            switch (type)
            {
                case "textbox":
                    ret = TextBoxHtml;
                    break;
                default:
                    break;
            }
            return ret;
        }
    }
}