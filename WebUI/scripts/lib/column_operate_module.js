
function ColumnOperate() {

    var dialogID = "#operate_dialog";

    /**
     * 创建一个列属性
     */
    function createGridColProperty() {
        try {
            $('#dt_dtgd').datagrid("appendRow", {
                columnName: "columnName",
                field: "字段名",
                width: "100",
                align: "left",
                formatter: ""
            });
        } catch (e) {
            pagectrl.func.alert(e.message, "异常", pagectrl.alertIcon.error, null);
        }
    }

    /**
     * 删除一个选中的列属性
     */
    function delGridColProperty() {
        try {
            pagectrl.element.dependEasyui$checkHasSelectedSingleRow('#dt_dtgd', function (selectedRow) {
                $('#dt_dtgd').datagrid("deleteRow", $('#dt_dtgd').datagrid("getRowIndex", selectedRow));
            }, "请选中你要删除的列属性");
        } catch (e) {
            pagectrl.func.alert(e.message, "异常", pagectrl.alertIcon.error, null);
        }
    }

    /**
     * 编辑列属性
     */
    function editGridColProperty() {
        try {
            pagectrl.element.dependEasyui$checkHasSelectedSingleRow('#dt_dtgd', function (selectedRow) {
                $('#dt_dtgd').datagrid("beginEdit", $('#dt_dtgd').datagrid("getRowIndex", selectedRow));
            }, "请选中你要编辑的列属性");
        } catch (e) {
            pagectrl.func.alert(e.message, "异常", pagectrl.alertIcon.error, null);
        }
    }

    /**
     * 结束编辑列属性
     */
    function endEditGridColProperty() {
        try {
            if ($(dialogID).find("div #dt_panel form").form("validate")) {
                $.each($('#dt_dtgd').datagrid("getRows"), function (index, value) {
                    $('#dt_dtgd').datagrid("endEdit", index);
                });
            }
        } catch (e) {
            pagectrl.func.alert(e.message, "异常", pagectrl.alertIcon.error, null);
        }
    }

    /**
     * 打开列属性formatter
     */
    function openColumnFormatterDialog() {
        try {
            pagectrl.element.dependEasyui$checkHasSelectedSingleRow("dt_dtgd", function (selectedRow) {

                var div = $("<div/>");
                div.css("padding", "5px");
                var divid = pagectrl.func.uuid();
                div.attr("id", divid);

                var textbox = $("<input/>");
                div.append(textbox);

                div.dialog({
                    closed: true,
                    modal: true,
                    width: 300,
                    height: 300,
                    title: "字段formatter",
                    buttons: [{
                        text: '确定',
                        iconCls: 'icon-add',
                        handler: function () {
                            "use strict";

                            //格式化的脚本
                            var formatterString = textbox.textbox("getText");

                            if (formatterString && formatterString.length > 0) {
                                //获取选中行的行数据
                                let rowData = $("#dt_dtgd").datagrid("getSelected");
                                //获取选中行的行下标
                                let rowIndex = $("#dt_dtgd").datagrid("getRowIndex", rowData);
                                //更新行数据
                                $("#dt_dtgd").datagrid("updateRow", {
                                    index: rowIndex,
                                    row: { formatter: formatterString }
                                });
                                //关闭窗口
                                div.dialog("close");
                            } else {
                                pagectrl.func.alert("请输入你要设置的formatter内容", "fuck you", pagectrl.alertIcon.info);
                            }
                        }
                    }],
                    onClose: function () {
                        //关闭时摧毁该窗口
                        div.dialog("destroy");
                    }
                });

                div.dialog("open");

                textbox.textbox({
                    width: 275,
                    height: 208,
                    multiline: true
                });

                textbox.textbox("setText", selectedRow.formatter);

            }, "你为啥子不选一行？");
        } catch (e) {
            pagectrl.func.alert("打开字段格式化窗口出错:{0}".format(e.message), "异常", pagectrl.alertIcon.error);
        }
    }

    return {
        createGridColProperty: createGridColProperty,
        delGridColProperty: delGridColProperty,
        editGridColProperty: editGridColProperty,
        endEditGridColProperty: endEditGridColProperty,
        openColumnFormatterDialog: openColumnFormatterDialog
    };
};