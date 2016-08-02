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

        /// <summary>
        /// 创建HTML代码
        /// </summary>
        /// <param name="fileName">代码文件名称</param>
        /// <param name="param">用来创建的参数</param>
        private void CreateHtmlCode(string fileName, object param)
        {
            var p = param as object[];
            if (p != default(object[]))
            {
                if (Directory.Exists(Path))
                {
                    //创建一个临时文件夹用来保存生成的代码文件
                    var tempDir = Directory.CreateDirectory(System.IO.Path.Combine(Path, Guid.NewGuid().ToString().Replace("-", "").ToUpper())).FullName;

                    if (Directory.Exists(tempDir))
                    {
                        //设置下一个环节要用到的文件生成存放临时文件夹的路径
                        next.Path = tempDir;

                        //创建html文件全名（包含路径）
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

                                //从参数里获取要生成的类型
                                object type = "";
                                if (dirp.TryGetValue("type", out type))
                                {
                                    //生成datagrid
                                    if (type.ToString() == "datagrid")
                                    {
                                        object datagridDic = "";
                                        if (dirp.TryGetValue("value", out datagridDic))
                                        {
                                            //去创建datagrid的html
                                            sb.Append(CreateDataGrid(datagridDic.ToString()));
                                        }
                                    }

                                    //这里是预留给其他元素的

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
                        throw new ApplicationException("创建用来保存生成的代码文件的临时文件夹失败：" + tempDir);
                    }
                }
                else
                {
                    throw new ApplicationException("生成失败，代码文件路径不存在");
                }
            }
            else
            {
                throw new ApplicationException("获取生成代码的参数失败：原因是参数p == default(object[])");
            }
        }

        /// <summary>
        /// 创建datagrid
        /// </summary>
        /// <param name="ops">参数</param>
        /// <returns></returns>
        private string CreateDataGrid(string ops)
        {
            StringBuilder sb = new StringBuilder();

            sb.AppendLine("    <table id=\"请自己设置ID\" data-options=\"fit: true\"></table>");

            var gridops = ParameterLoader.ConvertJsonToData<Dictionary<string, object>>(ops);

            object condi = "";
            object btns = "";

            //临时变量，用来标识是否已经生成了datagrid的工具栏
            var hasTool = false;

            if (gridops.TryGetValue("conditions", out condi))
            {
                //获取查询条件的参数
                var conditions = ParameterLoader.ConvertJsonToData<Dictionary<string, object>[]>(condi.ToString());
                if (conditions.Length > 0)
                {
                    //标识生成了datagrid的工具栏
                    hasTool = true;
                    sb.AppendLine("    <div id=\"请输入工具栏的ID\" style=\"padding: 10px;\">");
                    sb.AppendLine("        <div style=\"margin-top: 10px\">");

                    foreach (var item in conditions)
                    {
                        object controlType = "", conditionDes = "", fieldName = "", options = "";
                        var convertRet = true;
                        convertRet = item.TryGetValue("controlType", out controlType);
                        if (!convertRet) throw new ApplicationException("获取查询条件参数的控件类型失败");
                        convertRet = item.TryGetValue("conditionDes", out conditionDes);
                        if (!convertRet) throw new ApplicationException("获取查询条件参数的条件描述失败");
                        convertRet = item.TryGetValue("fieldName", out fieldName);
                        if (!convertRet) throw new ApplicationException("获取查询条件参数的字段名称失败");
                        convertRet = item.TryGetValue("options", out options);
                        if (!convertRet) throw new ApplicationException("获取查询条件参数的options属性失败");

                        //根据控件类型获取对应的html
                        var htm = GetConditionHtml(controlType.ToString());
                        sb.AppendLine(string.Format(htm, conditionDes, fieldName, options.ToString().Replace("\"", "'")));
                    }
                }
            }

            if (gridops.TryGetValue("opbtns", out btns))
            {
                //获取操作的参数
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
                        if (!convertRet) throw new ApplicationException("获取操作的参数的标识符类型失败");
                        convertRet = item.TryGetValue("operateText", out operateText);
                        if (!convertRet) throw new ApplicationException("获取操作的参数的操作描述失败");
                        convertRet = item.TryGetValue("operateIcon", out operateIcon);
                        if (!convertRet) throw new ApplicationException("获取操作的参数的图标类型失败");

                        sb.AppendLine(string.Format(BtnHtml, operateIcon, operateField, operateText));
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