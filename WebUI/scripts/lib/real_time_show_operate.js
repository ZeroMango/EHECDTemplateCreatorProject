function RealTimeOperate() {

    var showid = "#layout_center";

    function endEdit() {
        try {
            var colproid = "#dt_dtgd";
            var condiproid = "#dt_dttlgd";
            var opbtnid = "#dt_dttlgd2";

            $.each($(colproid).datagrid("getRows"), function (index, item) {
                $(colproid).datagrid("endEdit", index);
            });

            $.each($(condiproid).datagrid("getRows"), function (index, item) {
                $(condiproid).datagrid("endEdit", index);
            });

            $.each($(opbtnid).datagrid("getRows"), function (index, item) {
                $(opbtnid).datagrid("endEdit", index);
            });

        } catch (e) {
            pagectrl.func.alert(e.message, "异常", pagectrl.alertIcon.error, null);
        }
    }

    function enterCreateDataGrid(prop) {
        try {

            endEdit();

            if (pagectrl.func.isHasValuesArray(prop.columns)) {

                //1.创建一个table                
                var tab = $("<table/>");
                var tid = pagectrl.func.uuid();
                
                $(showid).html("");
                $(showid).append(tab);

                //列属性
                var colProps = [];
                //列属性
                var _coprop = [];

                //测试数据
                var textData = {};

                //2.创建列属性集合
                $.each(prop.columns, function (index, item) {

                    var p = {};

                    p.field = item.field;
                    p.title = item.columnName;
                    p.width = item.width;
                    p.align = item.align;
                    if (item.formatter !== "") {
                        p.formatter = function (value, row, index) {
                            return eval(item.formatter);
                        }
                    }
                    _coprop.push(p);

                    //创建测试数据字段
                    textData[p.field] = p.field;
                });

                //给字段赋值
                for (var i in textData) {
                    textData[i] = "textdata";
                }

                //添加列属性
                colProps.push(_coprop);

                var condition = getConditionhtml(prop.conditions, prop.opbtns);
                if (condition !== null) {
                    tab.datagrid({
                        toolbar: "#show_tools",
                        fit: true,
                        fitColumns: false,
                        pagination: true,
                        rownumbers: true,
                        columns: colProps
                    });
                } else {
                    tab.datagrid({
                        fit: true,
                        fitColumns: false,
                        pagination: true,
                        rownumbers: true,
                        columns: colProps
                    });
                }
                tab.datagrid("loadData", [textData]);
                tab.datagrid("getPanel").parent().attr("id", tid);

                return { id: "#" + tid, type: "datagrid", value: prop };

            } else {
                pagectrl.func.alert("请添加列属性！", "提示", pagectrl.alertIcon.info, null);
                return null;
            }
        } catch (e) {
            pagectrl.func.alert(e.message, "异常", pagectrl.alertIcon.error, null);
            return null;
        }
    }

    /**
     * 获取查询条件节点
     * @param {Array} conditions 查询的条件
     * @returns {Objec} null 或者 节点 null表示没有条件，否则返回生成的节点
     */
    function getConditionhtml(conditions, btns) {
        try {
            if (pagectrl.func.isHasValuesArray(conditions)) {
                var toolid = "show_tools";
                var div = $("<div/>");
                div.attr("id", toolid);
                div.css("padding", "15px");

                $(showid).append(div);

                $.each(conditions, function (index, item) {
                    getCondition(item, toolid);
                });

                $.each(btns, function (index, item) {
                    getOperateBtn(item, toolid);
                });
                return 0;
            }
            return null;
        } catch (e) {
            pagectrl.func.alert(e.message, "异常", pagectrl.alertIcon.error, null);
            return null;
        }
    }

    /**
     * 获取查询条件生成的节点
     * @param {Objec} p
     * @returns {Object} 
     */
    function getCondition(p, toolid) {
        try {
            switch (p.controlType) {

                case "textbox":
                    getTextBoxCondition(p, toolid);
                    break;

                default:
                    break;
            }
        } catch (e) {
            pagectrl.func.alert(e.message, "异常", pagectrl.alertIcon.error, null);
            return null;
        }
    }

    /**
     * 创建操作的按钮
     * @param {json} p 按钮属性
     * @param {string} toolid 容器id
     * @returns {void} 
     */
    function getOperateBtn(p, toolid) {
        try {
            var a = $("<a/>");
            $("#" + toolid).append("&nbsp;&nbsp;&nbsp;&nbsp;");
            $("#" + toolid).append(a);
            a.attr("href", "javascript:;");
            a.attr("iconcls", p.operateIcon);
            a.text(p.operateText);
            a.addClass(p.operateField);
            a.on("click", function () {
                pagectrl.func.alert("这个事件在生成代码后需要你自己实现", "请注意", pagectrl.alertIcon.warning, function () {
                    pagectrl.func.alert("一定要记到自己实现哈", "切记切记", pagectrl.alertIcon.warning);
                });
            });
            a.linkbutton({});
        } catch (e) {
            pagectrl.func.alert(e.message, "异常", pagectrl.alertIcon.error, null);
            return null;
        }
    }

    /**
     * 获取textbox查询条件
     * @param {type} p
     * @returns {type} 
     */
    function getTextBoxCondition(p, toolid) {
        try {
            var textbox = $("<input/>");
            textbox.addClass(p.fieldName);
            $("#" + toolid).append("&nbsp;&nbsp;&nbsp;&nbsp;");
            $("#" + toolid).append(p.conditionDes);
            $("#" + toolid).append("：");
            $("#" + toolid).append(textbox);

            var opStr = [];
            if (p.options.length > 0) {
                $.each(p.options.split(","), function (index, item) {
                    var op = item.split(":");
                    opStr.push(("\"" + op[0] + "\"") + ":" + op[1]);
                });
                opStr = opStr.join(",");
                var opt = JSON.parse("{" + opStr + "}");
                textbox.textbox(opt);
            } else {
                textbox.textbox({});
            }
        } catch (e) {
            pagectrl.func.alert(e.message, "异常", pagectrl.alertIcon.error, null);
            return null;
        }
    }

    return {
        enterCreateDataGrid: enterCreateDataGrid
    }

};