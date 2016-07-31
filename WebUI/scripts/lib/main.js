$(function () {
    main = MainCtrl();
    main.init();
});

function MainCtrl() {

    var layout = $("#main_layout");
    var dl = $("#dl");   
    var operateDialog = $("#operate_dialog");
    var dotype = 0;
    var showid = "#layout_center";

    var datagridCache = {};

    /**
     * 初始化
     */
    var init = function () {
        try {

            //初始化右侧菜单
            dl.datalist({
                valueField: "value",
                textField: "text",
                checkbox: true,
                lines: true,
                data: [{
                    text: "Datagrid",
                    value: "dt"
                }, {
                    text: "Dialog",
                    value: "dia"
                }],
                onDblClickRow: function (index, row) {
                    switch (row.value) {
                        case "dt":
                            dotype = dataListOperate.toCTDatagrid();
                            break;

                        case "dia":
                            dotype = dataListOperate.toCTDialog();
                            break;

                        default:
                            break;
                    }
                }
            });

            allReadyElementOperate.init();
            
            //初始化操作窗口
            operateDialog.dialog({
                closed: true,
                cache: true,
                modal: true,
                buttons: [{
                    text: '添加',
                    iconCls: 'icon-add',
                    handler: function () {
                        "use strict";
                        if (dotype === 0) {
                            let prop = {
                                columns: $("#dt_dtgd").datagrid("getRows"),
                                conditions: $("#dt_dttlgd").datagrid("getRows"),
                                opbtns: $("#dt_dttlgd2").datagrid("getRows")
                            };
                            var ret = realTimeOperate.enterCreateDataGrid(prop);
                            if (ret !== null) {                                
                                allReadyElementOperate.addCodeElement(ret);
                                operateDialog.dialog("close");
                            }
                        }
                    }
                }, {
                    text: '关闭',
                    iconCls: 'icon-cancel',
                    handler: function () {
                        operateDialog.dialog("close");
                    }
                }],
                onLoad: function () {
                    if (dotype === 0) {
                        //初始化添加datagrid的窗口元素
                        addDataGridModule.module();

                        //调整三个datagrid的位置
                        $("#dt_dtgd").datagrid().parent().parent().parent().css("margin", "5px");
                        $("#dt_dttlgd").datagrid().parent().parent().parent().css("margin", "5px");
                        $("#dt_dttlgd2").datagrid().parent().parent().parent().css("margin", "5px");
                    }
                },
                onClose: function () {
                    operateDialog.dialog("clear");
                }
            });

        } catch (e) {
            alert(e.message);
        }
    };

    var allReadyElementOperate = AllReadyElementOperate();

    //数据列表操作模块    
    var dataListOperate = DataListOperate();

    //添加datagrid的模块
    var addDataGridModule = AddDatagridControl();

    //查询条件操作模块
    var conditionOperate = ConditionOperate();

    //列属性操作模块
    var columnOperate = ColumnOperate();

    //实时显示的操作    
    var realTimeOperate = RealTimeOperate();

    //查询条件按钮操作模块
    var toolBtnOperate = DataGridToolOperate();

    return {
        //初始化方法
        init: init,
        //列属性操作模块
        columnOperate: columnOperate,
        //查询条件操作模块
        conditionOperate: conditionOperate,
        //查询条件按钮操作模块
        toolBtnOperate: toolBtnOperate
    }
}

