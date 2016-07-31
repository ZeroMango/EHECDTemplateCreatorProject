function DataGridToolOperate() {

    var dialogID = "#operate_dialog";
    var gridID = "#dt_dttlgd2";

    /**
     * 创建一个操作按钮属性
     */
    function createOperateBtnProperty() {
        try {
            $(gridID).datagrid("appendRow", {                
                operateField: "标识符",
                operateText:"操作按钮",
                operateIcon: "icon-search"
            });
        } catch (e) {
            pagectrl.func.alert(e.message, "异常", pagectrl.alertIcon.error, null);
        }
    }

    /**
     * 删除一个选中的操作按钮属性
     */
    function delOperateBtnProperty() {
        try {
            pagectrl.element.dependEasyui$checkHasSelectedSingleRow(gridID, function (selectedRow) {
                $(gridID).datagrid("deleteRow", $(gridID).datagrid("getRowIndex", selectedRow));
            }, "请选中你要删除的操作按钮属性");
        } catch (e) {
            pagectrl.func.alert(e.message, "异常", pagectrl.alertIcon.error, null);
        }
    }

    /**
     * 编辑操作按钮属性
     */
    function editOperateBtnProperty() {
        try {
            pagectrl.element.dependEasyui$checkHasSelectedSingleRow(gridID, function (selectedRow) {
                $(gridID).datagrid("beginEdit", $(gridID).datagrid("getRowIndex", selectedRow));
            }, "请选中你要编辑的操作按钮属性");
        } catch (e) {
            pagectrl.func.alert(e.message, "异常", pagectrl.alertIcon.error, null);
        }
    }

    /**
     * 结束编辑操作按钮属性
     */
    function endEditOperateBtnProperty() {
        try {
            if ($(dialogID).find("div #dt_panel3 form").form("validate")) {
                $.each($(gridID).datagrid("getRows"), function (index, value) {
                    $(gridID).datagrid("endEdit", index);
                });
            }
        } catch (e) {
            pagectrl.func.alert(e.message, "异常", pagectrl.alertIcon.error, null);
        }
    }

    return {
        createOperateBtnProperty: createOperateBtnProperty,
        delOperateBtnProperty: delOperateBtnProperty,
        editOperateBtnProperty: editOperateBtnProperty,
        endEditOperateBtnProperty: endEditOperateBtnProperty       
    };
}