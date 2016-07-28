/**********************************************
* 说明:页面操作对象基础类[PageControlObject],该
*      类依赖jquery1.8以后的版本.
* 创建日期：2016-07-26
* 作者：杨瑜堃
* 版本号：V2.00
***********************************************/

/**
 * 扩展字符串方法：格式化字符串
 * @param {[Object]} args 要替换的字符集合
 * @returns {String} 
 */
String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({)" + key + "(})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

/**
 * 工具类库
 *     该库中所有方法遇到异常将不做处理，但会封装
 *     并抛出
 */
var pagectrl = (function PageControl() {

    var errorInfos = {
        dependEasyui$checkHasSelectedSingleRow$Error: "校验datagrid是否有选中行（单行）时出错（方法名称为{1}），错误信息为：{0}",
        dependEasyui$Confirm$Error: "提示确认框时出错（方法名称为{1}），错误信息为：{0}",
        dependEasyui$confirmHasSelectedRows$Error: "校验datagrid是否有选中行（多行带确认框）时出错（方法名称为{1}），错误信息为：{0}",
        dependEasyui$checkHasSelectedRows$Error: "校验datagrid是否有选中行(多行)时出错（方法名称为{1}），错误信息为：{0}",
        dependEasyui$PagerBind$Error: "datagrid绑定方法出错（方法名称为{1}），错误信息为：{0}",
        dependEasyui$LoadDatagridData$Error: "easyui Datagrid载入数据时出错（方法名称为{1}），错误信息为：{0}",
        dependEasyui$GetDatagridData$Error: "获取easyui Datagrid 数据时出错（方法名称为{1}），错误信息为：{0}",
        dependEasyui$TextBox$GetText$Error: "获取easyui textbox控件文本时出错（方法名称为{1}），错误信息为：{0}",
        dependEasyui$TextBox$SetText$Error: "设置easyui textbox控件文本时出错（方法名称为{1}），错误信息为：{0}",
        dependEasyui$GetObjectByForm$Error: "封装easyui form内容至对象时出错（方法名称为{1}），错误信息为：{0}",
        dependEasyui$SetInputVlue$Error: "设置container里面的easyui输入框（textbox和numberbox）的值时出错（方法名称为{1}），错误信息为：{0}",
        dependEasyui$ResetElementValue$Error: "重置container里面的easyui输入框（textbox和numberbox）的值时出错（方法名称为{1}），错误信息为：{0}",
        dependEasyui$GetDatagridPager$Error: "获取easyui DatagridPager对象时出错（方法名称为{1}），错误信息为：{0}",
        dependEasyui$SearchGridData$Error: "查询datagrid数据时出错（方法名称为{1}），错误信息为：{0}",
        element$GetJQueryObject$Error: "获取指定选择表达式的页面元素jquery对象时出错（方法名称为{1}），错误信息为：{0}",
        element$GetObjectByClass$Error: "根据class名称获取jquery对象时出错（方法名称为{1}），错误信息为：{0}",
        element$GetObjectByID$Error: "根据ID名称获取jquery对象时出错（方法名称为{1}），错误信息为：{0}"
    };

    var createErrorInfo = function (formatString, error) {
        /// <summary>
        ///     创建一个错误信息
        ///     如 createErrorInfo("生成错误信息{0}{1}",["这是替换0的","这是替换1的"])
        ///     运行结果为：生成错误信息这是替换0的这是替换1的(…) 
        /// </summary>     
        /// <param name="formatString" type="String">格式化错误内容</param>             
        /// <returns type="Error">生成的异常信息</returns>
        return new Error(formatString.format(error));
    };

    var version = {
        //IE内核
        trident: navigator.userAgent.indexOf('Trident') > -1,
        //opera内核
        presto: navigator.userAgent.indexOf('Presto') > -1,
        //苹果、谷歌内核
        webKit: navigator.userAgent.indexOf('AppleWebKit') > -1,
        //火狐内核
        gecko: navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1,
        //是否为移动终端
        mobile: !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/),
        //ios终端
        ios: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        //android终端或者uc浏览器
        android: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1,
        //是否为iPhone或者QQHD浏览器
        iPhone: navigator.userAgent.indexOf('iPhone') > -1,
        //是否iPad
        iPad: navigator.userAgent.indexOf('iPad') > -1,
        //是否web应该程序，没有头部与底部
        safari: navigator.userAgent.indexOf('Safari') > -1,
        //是否web应该程序，没有头部与底部
        chrome: navigator.userAgent.indexOf('Chrome') > -1,
        //是否微信 （2015-01-22新增）
        weixin: navigator.userAgent.indexOf('MicroMessenger') > -1,
        //是否QQ
        qq: navigator.userAgent.match(/\sQQ/i) == " qq"
    };

    this.alertIcon = {
        error: "error",
        question: "question",
        info: "info",
        warning: "warning"
    };

    ////new function PageElement() {

    /**
     * 元素操作模块
     */
    var element = (function Element() {

        function dependEasyui$checkHasSelectedSingleRow(selector, callBackFuc, unSelectRowsMessage) {
            /// <summary>校验datagrid是否有选中行（单行）</summary>     
            /// <param name="selector" type="String 或者是 jQuery对象">选择器或者是datagrid对象</param>   
            /// <param name="callBackFuc" type="Function">回调的函数</param>   
            /// <param name="unSelectRowsMessage" type="String">未选中时的提示信息</param>
            /// <returns type="void"></returns>
            try {
                var selectedRows = null;
                if (typeof selector === "string") {
                    selectedRows = $("#" + selector.replace("#", "")).datagrid("getSelected");
                } else {
                    selectedRows = selector.datagrid("getSelected");
                }
                if (selectedRows !== null && selectedRows !== undefined) {
                    callBackFuc(selectedRows);
                } else {
                    pagectrl.fuc.alert(unSelectRowsMessage, "请注意", pagectrl.alertIcon.info, null);
                }
            } catch (e) {
                throw createErrorInfo(errorInfos.dependEasyui$checkHasSelectedSingleRow$Error, [e.message, "dependEasyui$checkHasSelectedSingleRow"]);
            }
        }

        function dependEasyui$checkHasSelectedRows(selector, callBackFuc, unSelectRowMessage) {
            /// <summary>
            /// 校验datagrid是否有选中行(多行)
            /// </summary>
            /// <param name="selector" type="String 或者是 jQuery对象">选择描述符或者是datagrid对象</param>
            /// <param name="callBackFuc" type="Function">回调的函数</param>
            /// <param name="unSelectRowMessage" type="String">未选中时的提示信息</param>
            /// <returns type="void"></returns>
            try {
                var selectedRow = null;

                if (typeof selector === "string") {
                    selectedRow = $("#" + selector.replace("#", "")).datagrid("getSelected");
                } else {
                    selectedRow = selector.datagrid("getSelected");
                }
                if (selectedRow !== null) {
                    callBackFuc(selectedRow);
                } else {
                    alert(unSelectRowMessage);
                }
            } catch (e) {
                throw createErrorInfo(errorInfos.dependEasyui$checkHasSelectedRows$Error, [e.message, "dependEasyui$checkHasSelectedRows"]);
            }
        }

        function dependEasyui$Confirm(confirmMessage, callBackFuc, callBackParam) {
            /// <summary>提示确认框</summary>   
            /// <param name="confirmMessage" type="String">操作时的提示内容</param>  
            /// <param name="callBackFuc" type="Function">回调的函数</param>
            /// <param name="callBackParam" type="Object">回调函数的参数</param>            
            /// <returns type="void"></returns>
            try {
                $.messager.confirm('确认', confirmMessage, function (result) {
                    if (result) {
                        if (callBackFuc) {
                            if (callBackParam) {
                                callBackFuc(callBackParam);
                            } else {
                                callBackFuc();
                            }
                        }
                    }
                });
            } catch (e) {
                throw createErrorInfo(errorInfos.dependEasyui$Confirm$Error, [e.message, "dependEasyui$Confirm"]);
            }
        }

        function dependEasyui$confirmHasSelectedRows(selector, callBackFuc, confirmMessage, unSelectRowMessage, formatConfirmMSGCallBack) {
            /// <summary>校验datagrid是否有选中行（多行带确认框）</summary>     
            /// <param name="selector" type="String 或者是 jQuery对象">选择器或者是datagrid对象</param>   
            /// <param name="callBackFuc" type="Function">确认的回调函数</param> 
            /// <param name="confirmMessage" type="String">操作时的提示信息</param>  
            /// <param name="unSelectRowMessage" type="Function">未选中时的提示信息</param>  
            /// <param name="formatConfirmMSGCallBack" type="Function">需要获取selectedRow信息以便对提示信息格式化的回调函数</param> 
            /// <returns type="void"></returns>
            try {
                var selectedRow = null;
                if (typeof selector === "string") {
                    selectedRow = $("#" + selector.replace("#", "")).datagrid("getSelected");
                } else {
                    selectedRow = selector.datagrid("getSelected");
                }
                if (selectedRow !== null) {

                    if (formatConfirmMSGCallBack) {
                        confirmMessage = formatConfirmMSGCallBack(selectedRow);
                    }

                    $.messager.confirm('确认', confirmMessage, function (result) {
                        if (result) {
                            callBackFuc(selectedRow);
                        }
                    });
                } else {
                    alert(unSelectRowMessage);
                }
            } catch (e) {
                throw createErrorInfo(errorInfos.dependEasyui$confirmHasSelectedRows$Error, [e.message, "dependEasyui$confirmHasSelectedRows"]);
            }
        }

        function dependEasyui$PagerBind(datagrid, fn) {
            /// <summary>datagrid绑定方法</summary>     
            /// <param name="datagrid" type="datagrid对象">DataGrid</param>   
            /// <param name="fn" type="String">执行的绑定方法的名称</param>
            /// <returns type="viod"></returns>
            try {
                return this.dependEasyui$GetDatagridPager(datagrid).pagination({
                    pageList: [10, 20, 30, 40, 50, 100],
                    pageNumber: 1,
                    pageSize: 10,
                    beforePageText: '第',//页数文本框前显示的汉字 
                    afterPageText: '页    共 {pages} 页',
                    displayMsg: '当前显示 {from} - {to} 条记录  共{total}条记录',
                    onSelectPage: function (pageNumber, pageSize) {
                        if (fn && typeof fn === "string") {
                            if (pageNumber < 1) {
                                pageNumber = 1;
                            }
                            eval(fn + "(" + pageSize + "," + pageNumber + ")");
                        }
                    }
                });
            } catch (e) {
                throw createErrorInfo(errorInfos.dependEasyui$PagerBind$Error, [e.message, "dependEasyui$PagerBind"]);
            }
        }

        function dependEasyui$LoadDatagridData(datagrid, data) {
            /// <summary>easyui Datagrid载入数据</summary>     
            /// <param name="datagrid" type="datagrid对象">datagrid对象</param> 
            /// <param name="data" type="Json[]">json对象数组</param>
            /// <returns type="void"></returns>
            try {
                if (Array.isArray(data) && data.length > 1) {
                    datagrid.datagrid("loadData", data);
                } else {
                    datagrid.datagrid("loadData", []);
                }
            } catch (e) {
                throw createErrorInfo(errorInfos.dependEasyui$LoadDatagridData$Error, [e.message, "dependEasyui$LoadDatagridData"]);
            }
        }

        function dependEasyui$GetDatagridData(datagrid) {
            /// <summary>
            /// 获取easyui Datagrid 数据
            /// </summary>
            /// <param name="datagrid" type="datagrid对象">datagrid对象</param>
            /// <returns type="Object[]"></returns>
            try {
                return datagrid.datagrid('getData');
            } catch (e) {
                throw createErrorInfo(errorInfos.dependEasyui$GetDatagridData$Error, [e.message, "dependEasyui$GetDatagridData"]);
            }
        }

        function dependEasyui$TextBox$SetText(selector, text) {
            /// <summary>设置easyui textbox控件文本</summary>     
            /// <param name="selector" type="String或者是jquery对象">选择器，如#id,或者是jquery对象</param>   
            /// <param name="text" type="String">设置的内容</param>            
            /// <returns type="void"></returns>
            try {
                if (typeof selector === "string") {
                    $("#" + selector.replace("#", "")).textbox("setText", text);
                } else {
                    selector.textbox("setText", text);
                }
            } catch (e) {
                throw createErrorInfo(errorInfos.dependEasyui$TextBox$SetText$Error, [e.message, "dependEasyui$TextBox$SetText"]);
            }
        }

        function dependEasyui$TextBox$GetText(selector) {
            /// <summary>获取easyui textbox控件文本</summary>     
            /// <param name="selector" type="String或者是jquery对象">选择器，如#id，或者是jquery对象</param> 
            /// <returns type="String"></returns>
            try {
                if (typeof selector === "string") {
                    return $("#" + selector.replace("#", "")).textbox("getText");
                } else {
                    return selector.textbox("getText");
                }
            } catch (e) {
                throw createErrorInfo(errorInfos.dependEasyui$TextBox$GetText$Error, [e.message, "dependEasyui$TextBox$GetText"]);
            }
        }

        function dependEasyui$GetObjectByForm(easyuiform) {
            /// <summary>
            ///     获取form里面的easyui输入框
            ///     （textbox、numberbox、combotree、combobox）
            ///     的值并封装成一个对象。请注意由于字段的key是
            ///     取的网页元素的data-name元素值，因此请注意要
            ///     给元素加上data-name属性，里面装的就是对应的
            ///     key值。
            /// </summary>
            /// <param name="easyuiform" type="Object">easyui form对象</param>
            try {
                var param = {};
                $.each(form.find("input[class^='easyui']"), function (index, item) {
                    var element = $(item);
                    var name = element.attr("data-name");
                    if (element.hasClass("easyui-textbox")) {
                        param[name] = element.textbox("getText");
                        return true;
                    } else if (element.hasClass("easyui-numberbox")) {
                        param[name] = element.numberbox("getValue");
                        return true;
                    } else if (element.hasClass("easyui-combotree")) {
                        param[name] = element.combotree("getValue");
                        return true;
                    } else if (element.hasClass("easyui-combobox")) {
                        param[name] = element.combobox("getValue");
                        return true;
                    }
                });
                return param;
            } catch (e) {
                throw createErrorInfo(errorInfos.dependEasyui$GetObjectByForm$Error, [e.message, "dependEasyui$GetObjectByForm"]);
            }
        }

        function dependEasyui$SetInputVlue(container, model) {
            /// <summary>
            /// 设置container里面的easyui输入框（textbox和numberbox）的值
            ///     请注意由于字段的key是取的网页元素的data-name元素，因此请注意要给元素加上data-name属性
            ///     从model取值时使用的就是data-name属性的值作为key，可以使用数据库字段名作为该属性值。
            ///     该方法内针对textbox的值进行了html解码。
            /// </summary>
            /// <param name="container" type="Object">容器对象</param>
            /// <param name="model" type="Object">要设置的值的数据源对象</param>
            try {
                $.each(container.find("input[class^='easyui']"), function (index, item) {
                    var element = $(item);
                    var fieldName = element.attr("data-name");
                    if (element.hasClass("easyui-textbox")) {
                        if (model[fieldName] !== undefined) {
                            //html解码
                            element.textbox("setText", $('<div/>').html(model[fieldName]).text());
                        }
                    } else if (element.hasClass("easyui-numberbox")) {
                        if (model[fieldName] !== undefined) {
                            element.numberbox("setValue", model[fieldName]);
                        }
                    }
                });
            } catch (e) {
                throw createErrorInfo(errorInfos.dependEasyui$SetInputVlue$Error, [e.message, "dependEasyui$SetInputVlue"]);
            }
        }

        function dependEasyui$ResetElementValue(container) {
            /// <summary>
            /// 重置container里面的easyui输入框（textbox和numberbox）的值
            /// </summary>
            /// <param name="container" type="Object">容器对象</param>
            try {
                $.each(container.find("input[class^='easyui']"), function (index, item) {
                    var element = $(item);
                    if (element.hasClass("easyui-textbox") || element.hasClass("easyui-numberbox")) {
                        element.textbox("reset");
                    }
                });
            } catch (e) {
                throw createErrorInfo(errorInfos.dependEasyui$ResetElementValue$Error, [e.message, "dependEasyui$ResetElementValue"]);
            }
        }

        function dependEasyui$GetDatagridPager(datagrid) {
            /// <summary>获取easyui DatagridPager对象</summary>     
            /// <param name="datagrid" type="datagrid对象">datagrid对象</param>            
            /// <returns type="pager对象"></returns>
            try {
                return datagrid.datagrid('getPager');
            } catch (e) {
                throw createErrorInfo(errorInfos.dependEasyui$GetDatagridPager$Error, [e.message, "dependEasyui$GetDatagridPager"]);
            }
        }

        function dependEasyui$SearchGridData(grid, isSelected) {
            /// <summary>查询datagrid数据</summary>     
            /// <param name="grid" type="Object">grid对象</param>
            /// <param name="isSelected" type="Boolean">是否选中grid行</param>
            var getPager;
            try {
                getPager = this.dependEasyui$GetDatagridPager(grid, true).pagination("select", 1);
                if (!isSelected) {
                    grid.datagrid("unselectAll");
                }
            } catch (e) {
                throw createErrorInfo(errorInfos.dependEasyui$SearchGridData$Error, [e.message, "dependEasyui$SearchGridData"]);
            } finally {
                getPager = null;
            }
        }

        function element$GetJQueryObject(selector) {
            /// <summary>
            /// 获取指定选择表达式的页面元素jquery对象
            /// </summary>
            /// <param name="selector" type="String">选择元素的表达式</param>
            /// <returns type="jquery对象或者jquery对象数组"></returns>              
            try {
                //找到对应网页元素
                var elements = $.find(selector);
                //判断元素合法性
                if (elements !== null &&
                    elements !== undefined &&
                    elements !== "") {
                    //元素长度大于1，则返回一个jquery对象数组
                    if (elements.length > 1) {
                        var jqueryObjs = [];
                        $.each(elements, function (index, item) {
                            jqueryObjs.push($(item));
                        });
                        return jqueryObjs;
                        //长度等于1，则返回一个jquery对象
                    } else if (elements.length === 1) {
                        var jqueryObj = $(elements[0]);
                        return jqueryObj;
                        //没有找到，则返回null
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            } catch (e) {
                throw createErrorInfo(errorInfos.element$GetJQueryObject$Error, [e.message, "element$GetJQueryObject"]);
            }
        }

        function element$GetObjectByCss(css) {
            /// <summary>根据class名称获取jquery对象</summary>
            /// <param name="css" type="String">Class名称，不用带.号</param>
            /// <returns type="jquery对象或者jquery对象数组"></returns>
            try {
                return this.element$GetJQueryObject("." + css.replace(".", ""));
            } catch (e) {
                throw createErrorInfo(errorInfos.element$GetJQueryObject$Error, [e.message, "element$GetObjectByClass"]);
            }
        }

        function element$GetObjectByID(id) {
            /// <summary>根据ID名称获取jquery对象</summary>
            /// <param name="id" type="String">ID名称，不用带#号</param>
            /// <returns type="jquery对象"></returns>
            try {
                return this.element$GetJQueryObject("#" + id.replace("#", ""));
            } catch (e) {
                throw createErrorInfo(errorInfos.element$GetObjectByID$Error, [e.message, "element$GetObjectByID"]);
            }
        }

        return {
            dependEasyui$checkHasSelectedSingleRow: dependEasyui$checkHasSelectedSingleRow,
            dependEasyui$checkHasSelectedRows: dependEasyui$checkHasSelectedRows,
            dependEasyui$Confirm: dependEasyui$Confirm,
            dependEasyui$confirmHasSelectedRows: dependEasyui$confirmHasSelectedRows,
            dependEasyui$PagerBind: dependEasyui$PagerBind,
            dependEasyui$LoadDatagridData: dependEasyui$LoadDatagridData,
            dependEasyui$GetDatagridData: dependEasyui$GetDatagridData,
            dependEasyui$TextBox$SetText: dependEasyui$TextBox$SetText,
            dependEasyui$TextBox$GetText: dependEasyui$TextBox$GetText,
            dependEasyui$GetObjectByForm: dependEasyui$GetObjectByForm,
            dependEasyui$SetInputVlue: dependEasyui$SetInputVlue,
            dependEasyui$ResetElementValue: dependEasyui$ResetElementValue,
            dependEasyui$GetDatagridPager: dependEasyui$GetDatagridPager,
            dependEasyui$SearchGridData: dependEasyui$SearchGridData,
            element$GetJQueryObject: element$GetJQueryObject,
            element$GetObjectByCss: element$GetObjectByCss,
            element$GetObjectByID: element$GetObjectByID
        };
    })();

    /**
     * 公用方法模块    
     */
    var func = (function Func() {

        function uuid() {
            /// <summary>
            /// 生成uuid
            /// </summary>
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
            s[8] = s[13] = s[18] = s[23] = "-";

            var uuid = s.join("");
            return uuid;
        }

        function calculateByExpression(expression, precision, isFourHomesFive) {
            /// <summary>根据表达式计算结果，表达式是数字和数字之间的+、-、*、/、%等算法，精度将依照设置的精度返回double值</summary>     
            /// <param name="expression" type="String">计算表达式</param>        
            /// <param name="precision" type="Number">计算的精度值，如果使用时不输入，默认精度就为2</param>      
            /// <param name="isFourHomesFive" type="Boolean">是否四舍五入</param>
            /// <returns type="Double">获取的值</returns>
            try {
                if (precision > 15 || precision < 0) throw createErrorInfo("所设置的精度{0}已超过最大精度边界15或者最小边界0", [precision]);
                if (!isFourHomesFive) {
                    return parseFloat(this.numberFormat(eval(expression), !precision || precision === null || precision === undefined || precision === "" ? 2 : precision));
                } else {
                    return parseFloat(eval(expression).toFixed(!precision || precision === null || precision === undefined || precision === "" ? 2 : precision));
                }
            } catch (e) {
                throw createErrorInfo("对{0}进行解析计算出错，错误原因是：{1}", [expression, e.message]);
            }
        }

        function numberFormat(number, precision) {
            /// <summary>格式化小数至指定精度，返回的值是String。</summary>
            /// <param name="number" type="Number">要格式化的数字</param>
            /// <param name="precision" type="Number">精度到多少位</param>
            /// <returns type="String"></returns>
            try {
                if (!this.isNumber(number)) throw createErrorInfo("参数1[{0}]并非数字类型数据，请确保输入的参数类型为数字", [number]);
                if (!this.isNumber(precision)) throw createErrorInfo("参数2[{0}]并非数字类型数据，请确保输入的参数类型为数字", [precision]);
                if (precision > 15 || precision < 0) throw createErrorInfo("所设置的精度{0}已超过最大精度边界15或者最小边界0", [precision]);

                if (parseInt(number) === number) {
                    return number.toFixed(precision);
                } else {
                    var p = number.toString().split('.');
                    var r = p[0] + ".";
                    var i = p[1].length;
                    if (i < precision) {
                        r = number.toFixed(i + (precision - i));
                    } else {
                        r += p[1].substring(0, precision);
                    }
                    return r;
                }
            } catch (e) {
                throw createErrorInfo("执行格式化小数精度出错，错误原因是：{0}", [e.message]);
            }
        }

        function definededAndNotNull(value) {
            /// <summary>校验对象不为undefined和空</summary>     
            /// <param name="value" type="Object">要判断的对象</param>             
            /// <returns type="Boolean"></returns>
            return typeof value !== 'undefined' && value !== null;
        }

        function isNumber(value) {
            /// <summary>判断对象是否是数字</summary>     
            /// <param name="value" type="Object">要判断的对象</param>             
            /// <returns type="Boolean">判断结果</returns>
            return typeof value === 'number';
        }

        function isDate(value) {
            /// <summary>判断对象是否是日期对象</summary>     
            /// <param name="value" type="Object">要判断的对象</param>             
            /// <returns type="Boolean">判断结果</returns>
            return toString.call(value) === '[object Date]';
        }

        function isArray(value) {
            /// <summary>判断对象是否是数组</summary>     
            /// <param name="value" type="Object">要判断的对象</param>             
            /// <returns type="Boolean"></returns>
            try {
                return Array.isArray(value);
            } catch (e) {
                return false;
            }
        }

        function isHasValuesArray(value) {
            /// <summary>判断对象是否是含有值得数组</summary>     
            /// <param name="value" type="Object">要判断的对象</param>             
            /// <returns type="Boolean"></returns>
            try {
                if (this.isArray(value)) {
                    return value.length > 0;
                } else {
                    return false;
                }
            } catch (e) {
                return false;
            }
        }

        function pushStateToHistroy(state) {
            /// <summary>pushState创建历史记录</summary>     
            /// <param name="value" type="Object">state对象，至少包含title和url属性。url不能跨域</param>             
            /// <returns type="Boolean">执行结果</returns>
            try {
                if (history.pushState && 'pushState' in history) {
                    document.title = state.title;
                    window.history.pushState(state, state.title, state.url);
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                return false;
            }
        }

        function isDecimal(num) {
            /// <summary>判断一个数是否是小数(字符)</summary>     
            /// <param name="value" type="number">要判断的内容</param>             
            /// <returns type="Boolean"></returns>   
            try {
                if (typeof num === 'number') {
                    var numString = num.toString();
                    if (numString.indexOf('.') > 0) {
                        return parseInt(numString.substring(numString.indexOf(".") + 1)) > 0;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } catch (e) {
                return false;
            }
        }

        function isString(val) {
            /// <summary>判断对象是否是字符串</summary>     
            /// <param name="val" type="Object">要判断的对象</param>             
            /// <returns type="Boolean">判断结果</returns>
            return typeof val === 'string';
        }

        function isFunction(val) {
            /// <summary>判断对象是否是函数</summary>     
            /// <param name="val" type="Object">要判断的对象</param>             
            /// <returns type="Boolean">判断结果</returns>
            return typeof val === 'function';
        }

        function isFile(obj) {
            /// <summary>判断对象是否是文件</summary>     
            /// <param name="val" type="Object">要判断的对象</param>             
            /// <returns type="Boolean">判断结果</returns>
            return toString.call(obj) === '[object File]';
        }

        function fromJson(json) {
            /// <summary>从json转换成对象。依赖json2.js</summary>     
            /// <param name="val" type="Object或者字符串">要转换的对象或者字符串</param>                
            /// <returns type="Json对象"></returns>
            try {
                return this.isString(json) ? JSON.parse(json) : null;
            } catch (e) {
                return null;
            }
        }

        function isMobilePhone(val) {
            /// <summary>
            /// 判断是否是手机电话
            /// </summary>
            /// <param name="val" type="String">要判断的值</param>
            /// <returns type="Boolean"></returns>
            var patrn = /^((13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8})*$/;
            if (patrn.exec(val))
                return true;
            return false;
        }

        function isWebAddress(val) {
            /// <summary>
            /// 是否是网址
            /// </summary>
            /// <param name="val" type="String">要判断的值</param>
            /// <returns type="Boolean"></returns>
            var strRegex = /(http(s)?:\/\/|^$)([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
            var patrn = new RegExp(strRegex);
            if (patrn.exec(val))
                return true;
            return false;
        }

        function isPhone(val) {
            /// <summary>判断对象是否是电话号码</summary>     
            /// <param name="val" type="Object">要判断的对象</param>             
            /// <returns type="Boolean">判断结果</returns>
            var patrn = /^((13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8})*$/;
            if (patrn.exec(val))
                return true;
            var patrn = /^(\d{3}-\d{8}|\d{4}-\d{7})*$/;
            if (patrn.exec(val))
                return true;
            return false;
        }

        function timeCompare(startTimeString, endTimeString) {
            /// <summary>比较两个时间的大小</summary>     
            /// <param name="startTimeString" type="String">开始时间</param>             
            /// <param name="endTimeString" type="String">结束时间</param>
            /// <returns type="Boolean"></returns>
            try {
                return Date.parse(startTimeString) >= Date.parse(endTimeString);
            } catch (e) {
                return false;
            }
        }

        function createStringSplitByCommaFromArray(rows, fieldName) {
            /// <summary>传进一个数据对象集合，根据指定的字段名称，将对应的值取出，以逗号分隔，每个字段以单引号引用，返回一个组合好的字符串</summary>     
            /// <param name="rows" type="Object[]">数据对象的集合</param>
            /// <param name="fieldName" type="String">要取出的字段名称</param>    
            /// <returns type="String"></returns>
            try {
                var retString = "";
                $.each(rows, function (index, item) {
                    retString += "'" + item[fieldName] + "',";
                });
                retString = retString.replace(/,$/gi, "");
                return retString;
            } catch (e) {
                throw e;
            }
        }

        function formatJsonDate(jsondate, format) {
            /// <summary>
            ///     格式化时间
            /// </summary>     
            /// <param name="jsondate" type="String">json时间文本</param>    
            /// <param name="format" type="String">格式化文本</param> 
            /// <returns type="String">格式化的字符串</returns>
            jsondate = jsondate + "";
            if (!/^\/Date[(].+[)]\/$/.test(jsondate)) return jsondate.replace("T", " ");
            jsondate = jsondate.replace("/Date(", "").replace(")/", "");
            if (jsondate.indexOf("+") > 0) {
                jsondate = jsondate.substring(0, jsondate.indexOf("+"));
            }
            else if (jsondate.indexOf("-") > 0) {
                jsondate = jsondate.substring(0, jsondate.indexOf("-"));
            }
            var datetime = new Date(parseInt(jsondate, 10));
            if (!format) format = "yyyy-MM-dd";
            return datetime.Format(format);
        }

        function randomBy(under, over) {
            /// <summary>
            ///     选取范围内的随机数，如果只输入一个参数，就是0-输入的参数之间的随机数
            /// </summary>     
            /// <param name="under" type="Number">范围起点</param>    
            /// <param name="over" type="Number">范围终点</param> 
            /// <returns type="Number">随机的数字</returns>
            switch (arguments.length) {
                case 1: return parseInt(Math.random() * under + 1);
                case 2: return parseInt(Math.random() * (over - under + 1) + under);
                default: return 0;
            }
        }

        function templateHelper(template, filterName, callBack) {
            /// <summary>template辅助方法,用于格式化指定的过滤器。</summary>
            /// <param name="template" type="Object">template模板对象</param>
            /// <param name="filterName" type="String">过滤器名称</param>
            /// <param name="callBack" type="Function">处理数据的函数</param>
            /// <returns type="void"></returns>
            try {
                template.helper(filterName, callBack);
            } catch (e) {
                throw e;
            }
        }

        function getClientType() {
            /// <summary>
            /// 获取客户端类型：3.安卓 4.IOS 2.微信
            /// </summary>
            /// <returns type="Number"></returns>
            var clientType = -1;

            if (version.android === true) clientType = 3;
            if (version.iPhone === true) clientType = 4;
            if (version.weixin === true) clientType = 2;
            return clientType;
        }

        /*
        * file转base编码，并压缩file
        * 用法如下
            fuc.FileToBase64(file, function(base64) {
                fuc.AutoResizeImage(base64, 0, 0, function (zipbase64) {
                
                });
            });
        */
        function FileToBase64(file, fn) {
            //利用html5转base64
            if ("FileReader" in window) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    if (fn) {
                        return fn(this.result);
                    }
                };
                //将文件读取为DataURL
                reader.readAsDataURL(file);
            }
        }

        /*
        * base64图像压缩
        * base64:base64编码
        * maxWidth:最大图像宽度，0为auto
        * maxHeight:最大图像高度，0为auto
        * fn(base64):压缩完成后回调，返回base64编码
        * 用法如下
            fuc.AutoResizeImage(base64, 0, 0, function (zipbase64) {
            
            });
        */
        function AutoResizeImage(base64, maxWidth, maxHeight, fn) {
            //开始压缩图片
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = function () {
                //获取当前最合适的图像比率
                var hRatio;
                var wRatio;
                var Ratio = 1;
                var w = img.width;
                var h = img.height;
                wRatio = maxWidth / w;
                hRatio = maxHeight / h;
                if (maxWidth == 0 && maxHeight == 0) {
                    Ratio = 1;
                } else if (maxWidth == 0) { //
                    if (hRatio < 1) Ratio = hRatio;
                } else if (maxHeight == 0) {
                    if (wRatio < 1) Ratio = wRatio;
                } else if (wRatio < 1 || hRatio < 1) {
                    Ratio = (wRatio <= hRatio ? wRatio : hRatio);
                }
                if (Ratio < 1) {
                    w = w * Ratio;
                    h = h * Ratio;
                }

                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas清屏 	

                //缩小
                img.width = w;
                img.height = h;

                //重置canvans宽高
                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0, img.width, img.height); // 将图像绘制到canvas上
                var zipbase64 = canvas.toDataURL('image/png'); //输出base64
                //if (img.size > (1024 * 1024 * 0.5)) {
                //    alert("图片太大，压缩后仍然超过0.5M!");
                //    return;
                //}
                fn(zipbase64, img.width, img.height);
            };
            img.src = base64;
            if (img.complete || img.complete === undefined) {
                img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                img.src = base64;
            }
        }

        function alert(msg, title, icon, callback) {
            /// <summary>
            /// 弹出easy的message
            /// </summary>
            /// <param name="msg" type="String">消息内容</param>
            /// <param name="title" type="String">消息框标题</param>
            /// <param name="icon" type="String">icon</param>
            /// <param name="callback" type="Function">点击确定后的回调</param>
            if (callback) {
                $.messager.alert(title, msg, icon, callback);
            } else {
                $.messager.alert(title, msg, icon);
            }
        }

        return {
            uuid: uuid,
            calculateByExpression: calculateByExpression,
            numberFormat: numberFormat,
            definededAndNotNull: definededAndNotNull,
            isNumber: isNumber,
            isDate: isDate,
            isArray: isArray,
            isHasValuesArray: isHasValuesArray,
            pushStateToHistroy: pushStateToHistroy,
            isDecimal: isDecimal,
            isString: isString,
            isFunction: isFunction,
            isFile: isFile,
            fromJson: fromJson,
            isMobilePhone: isMobilePhone,
            isWebAddress: isWebAddress,
            isPhone: isPhone,
            timeCompare: timeCompare,
            createStringSplitByCommaFromArray: createStringSplitByCommaFromArray,
            formatJsonDate: formatJsonDate,
            randomBy: randomBy,
            templateHelper: templateHelper,
            getClientType: getClientType,
            FileToBase64: FileToBase64,
            AutoResizeImage: AutoResizeImage,
            alert: alert
        };
    })();

    return {
        //元素操作模块
        element: element,
        //公用方法模块
        func: func
    };
})();



