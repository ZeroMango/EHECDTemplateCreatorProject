﻿using DataReceptionTransmission;
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
        private List<JSJob> joblist = new List<JSJob>();

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

                        #region 创建初始化脚本
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
                                        var functionName = string.Format("initDataGrid${0}();", Guid.NewGuid().ToString().ToLower().Replace("-", ""));
                                        //开始初始化datagrid
                                        sb.AppendLine("            /**");
                                        sb.AppendLine("            /*请注意命名规范：");
                                        sb.AppendLine("            /*初始化datagrid的方法名字是按照如下规范生成的");
                                        sb.AppendLine("            /*【initDataGrid$这个是datagrid的名字()这里是生成的guid】");
                                        sb.AppendLine("            /*initDataGrid$这段是固定的，后面跟datagrid的名字，你可以");
                                        sb.AppendLine("            /*更改，也可以沿用这个名字以保证一致性");
                                        sb.AppendLine("            */");
                                        sb.AppendLine(string.Format("            {0}", functionName));

                                        var datagridpro = datagridDic.ToString();

                                        joblist.Add(new JSJob
                                        {
                                            func = (s1, s2) => { return CreateDatagridCode(s1, s2); },
                                            param1 = datagridpro,
                                            param2 = functionName
                                        });
                                    }
                                }
                            }
                        }
                        #endregion

                        sb.AppendLine("        }catch (e){");
                        sb.AppendLine("            //这里请自行处理异常");
                        sb.AppendLine("        }");
                        sb.AppendLine("    }");
                        sb.AppendLine("");

                        for (int i = 0; i < joblist.Count; i++)
                        {
                            sb.Append(joblist[i].func.Invoke(joblist[i].param1, joblist[i].param2));
                        }

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

        /// <summary>
        /// 创建初始化js脚本
        /// </summary>
        /// <param name="v"></param>
        /// <returns></returns>
        private string CreateDatagridCode(string v, string functionName)
        {
            StringBuilder sb = new StringBuilder();

            var gridops = ParameterLoader.ConvertJsonToData<Dictionary<string, object>>(v);

            object colunms = "";
            if (gridops.TryGetValue("columns", out colunms))
            {
                sb.AppendLine("    /**");
                sb.AppendLine("    /* 初始化datagrid");
                sb.AppendLine("    */");
                sb.AppendLine(string.Format("    {0}(){", functionName));
                sb.AppendLine("        try{");

                var cols = ParameterLoader.ConvertJsonToData<Dictionary<string, object>[]>(colunms.ToString());

                for (int i = 0; i < cols.Length; i++)
                {

                }

                sb.AppendLine("        } catch (e) {");
                sb.AppendLine("        }");
            }

            return sb.ToString();
        }
    }

    internal class JSJob
    {
        public Func<string, string, string> func { get; set; }
        public string param1 { get; set; }
        public string param2 { get; set; }
    }
}