function DataListOperate() {

    var operateDialog = $("#operate_dialog");

    /**
     * 开始创建datagrid
     */
    function toCTDatagrid() {
        operateDialog.dialog("resize", {
            width: 1024,
            height: 768
        }).dialog("setTitle", "添加datagrid").dialog("open").dialog("center").dialog("refresh", "/Home/AddDatagrid");
        return 0;
    }

    /**
     * 开始创建dialog
     */
    function toCTDialog() {
        operateDialog.dialog("resize", {
            width: 600,
            height: 400
        }).dialog("setTitle", "添加dialog").dialog("open").dialog("center");
        return 1;
    }

    return {
        toCTDatagrid: toCTDatagrid,
        toCTDialog: toCTDialog
    };
}