/**
* 查询条件操作模块
*/
function ConditionOperate() {

    var conditionID = "#dt_dttlgd";
    var dialogID = "#operate_dialog";

    /**
     * 创建查询条件
     */
    function createCondition() {
        try {
            $(conditionID).datagrid("appendRow", {
                conditionDes: "查询条件描述",
                fieldName: "字段名",
                controlType: "textbox",
                options: ""
            });
        } catch (e) {
            pagectrl.func.alert(e.message, "错误", pagectrl.alertIcon.error);
        }
    }

    /**
     * 移除查询条件
     */
    function delCondition() {
        try {
            pagectrl.element.dependEasyui$checkHasSelectedSingleRow(conditionID, function (selectedRow) {
                $(conditionID).datagrid("deleteRow", $(conditionID).datagrid("getRowIndex", selectedRow));
            }, "请选中你要删除的查询条件");
        } catch (e) {
            pagectrl.func.alert(e.message, "错误", pagectrl.alertIcon.error);
        }
    }

    /**
     * 编辑查询条件
     */
    function editCondition() {
        try {
            pagectrl.element.dependEasyui$checkHasSelectedSingleRow(conditionID, function (selectedRow) {
                var index = $(conditionID).datagrid("getRowIndex", selectedRow);
                $(conditionID).datagrid("updateRow", { index: index, row: { options: "" } });
                $(conditionID).datagrid("beginEdit", index);
            }, "请选中你要编辑的查询条件");
        } catch (e) {
            pagectrl.func.alert(e.message, "错误", pagectrl.alertIcon.error);
        }
    }

    /**
     * 保存查询条件编辑结果
     */
    function endEditCondition() {
        try {
            if ($(dialogID).find("div #dt_panel2 form").form("validate")) {
                $.each($(conditionID).datagrid("getRows"), function (index, value) {
                    $(conditionID).datagrid("endEdit", index);
                });
            }
        } catch (e) {
            pagectrl.func.alert(e.message, "错误", pagectrl.alertIcon.error);
        }
    }

    /**
     * 打开属性编辑窗口
     */
    function openConditionPropertyDialog() {
        try {
            pagectrl.element.dependEasyui$checkHasSelectedSingleRow(conditionID, function (selectedRow) {
                $(conditionID).datagrid("endEdit", $(conditionID).datagrid("getRowIndex", selectedRow));
                var canSubmit = false;
                var div = $("<div/>");
                div.css("padding", "5px");
                div.dialog({
                    title: "编辑控件属性",
                    width: 400,
                    height: 600,
                    buttons: [{
                        text: '确定',
                        iconCls: 'icon-ok',
                        handler: function () {
                            "use strict";
                            if (canSubmit) {

                                //获取选中行的行下标
                                let rowIndex = $(conditionID).datagrid("getRowIndex", selectedRow);

                                //获取数据
                                let data = getConditionsString(div);

                                //更新行数据
                                $(conditionID).datagrid("updateRow", {
                                    index: rowIndex,
                                    row: { options: data }
                                });
                                //关闭窗口
                                div.dialog("close");
                            } else {
                                pagectrl.func.alert("请等待数据加载完成", "错误", pagectrl.alertIcon.error);
                            }
                        }
                    }, {
                        text: '关闭',
                        iconCls: 'icon-cancel',
                        handler: function () {
                            //关闭窗口
                            div.dialog("close");
                        }
                    }], onLoad: function () {
                        canSubmit = true;
                    },
                    onClose: function () {
                        //关闭时摧毁该窗口
                        div.dialog("destroy");
                    }
                }).dialog("open").dialog("refresh", "/Home/EditConditionOptions?type={0}".format([selectedRow.controlType]));

            }, "你为啥子不选你要添加属性的查询条件喃？瓜的嗦？");
        } catch (e) {
            pagectrl.func.alert(e.message, "错误", pagectrl.alertIcon.error);
        }
    }

    /**
     *  获取条件options的字符串
     * @param {type} div 容器
     */
    function getConditionsString(div) {
        "use strict";
        try {
            var trs = div.find("tr");
            var params = {};
            $.each(trs, function (index, item) {
                var tds = $(item).find("td");
                var optionName = tds[1].textContent;
                var type = $(tds[2]).find("input[data-tag]");

                if (type.hasClass("easyui-numberbox")) {
                    params[optionName] = {};
                    params[optionName].value = type.numberbox("getValue");
                    params[optionName].type = "number";
                    return true;
                }

                if (type.hasClass("easyui-textbox")) {
                    params[optionName] = {};
                    params[optionName].value = type.textbox("getText");
                    params[optionName].type = "text";
                    return true;
                }

                if (type.length > 1 && $(type[0]).attr("type") === "radio") {
                    params[optionName] = [];
                    params[optionName].value = $(tds[2]).find("input[data-tag]:checked").length === 0 ? "" : $(tds[2]).find("input[data-tag]:checked").val();
                    params[optionName].type = "bool";
                    return true;
                }
            });

            var ret = [];

            for (let key in params) {
                let v = params[key];
                if (v.value != "") {
                    if (v.type === "number" || v.type === "bool") {
                        ret.push(key + ":" + params[key].value);
                        continue;
                    }

                    if (v.type === "text") {
                        ret.push(key + ":\"" + params[key].value + "\"");
                        continue;
                    }
                }
            }

            return ret.join(",");

        } catch (e) {
            pagectrl.func.alert(e.message, "错误", pagectrl.alertIcon.error);
        }
    }

    return {
        createCondition: createCondition,
        delCondition: delCondition,
        editCondition: editCondition,
        endEditCondition: endEditCondition,
        openConditionPropertyDialog: openConditionPropertyDialog
    };
};