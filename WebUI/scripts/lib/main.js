$(function () {
    main = MainCtrl();
    main.init();
});



function MainCtrl() {

    var layout = $("#main_layout");
    var dl = $("#dl");
    var operateDialog = $("#operate_dialog");
    var dotype = 0;

    /**
     * 初始化
     */
    var init = function () {
        try {

            //初始化菜单
            dl.datalist({
                valueField: "value",
                textField: "text",
                checkbox: true,
                lines: true,
                onDblClickRow: function (index, row) {
                    operate.dbclickRow(index, row);
                }
            });

            //加载菜单项
            dl.datalist("loadData", [{
                text: "Datagrid",
                value: "dt"
            }, {
                text: "Dialog",
                value: "dia"
            }]);

            //初始化操作窗口
            operateDialog.dialog({
                closed: true,
                cache: true,
                modal: true,
                buttons: [{
                    text: '添加',
                    iconCls: 'icon-add',
                    handler: function () {

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
                        AddDatagridControl();
                        //调整两个datagrid的位置
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

    //操作模块
    var operate = (function Operate() {
        /**
        * 双击菜单选项时触发
        * @param {type} index 当前选中的选项下标
        * @param {type} row 当前选中的行对象
        */
        function dbclickRow(index, row) {
            switch (row.value) {
                case "dt":
                    this.toCTDatagrid();
                    break;

                case "dia":
                    this.toCTDialog();
                    break;

                default:
                    break;
            }
        }

        /**
         * 开始创建datagrid
         */
        function toCTDatagrid() {
            dotype = 0;
            operateDialog.dialog("resize", {
                width: 1024,
                height: 768
            }).dialog("setTitle", "添加datagrid").dialog("open").dialog("center").dialog("refresh", "/Home/AddDatagrid");
        }

        /**
         * 开始创建dialog
         */
        function toCTDialog() {
            dotype = 1;
            operateDialog.dialog("resize", {
                width: 600,
                height: 400
            }).dialog("setTitle", "添加dialog").dialog("open").dialog("center");
        }

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
                if (operateDialog.find("form").form("validate")) {
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
                                    //获取对应的操作按钮的id
                                    let btnid = $(rowData.operate).attr("id");
                                    //获取选中行的行下标
                                    let rowIndex = $("#dt_dtgd").datagrid("getRowIndex", rowData);
                                    //更新行数据
                                    $("#dt_dtgd").datagrid("updateRow", {
                                        index: rowIndex,
                                        row: { formatter: formatterString }
                                    });
                                    //重新初始化操作按钮，不然样式要丢失
                                    $('#' + btnid).linkbutton({ iconCls: 'icon-add', height: 20 });
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
            dbclickRow: dbclickRow,
            toCTDatagrid: toCTDatagrid,
            toCTDialog: toCTDialog,
            createGridColProperty: createGridColProperty,
            delGridColProperty: delGridColProperty,
            editGridColProperty: editGridColProperty,
            endEditGridColProperty: endEditGridColProperty,
            openColumnFormatterDialog: openColumnFormatterDialog
        };
    })();

    /**
     * 初始化添加grid的操作
     */
    function AddDatagridControl() {

        //获取dialog高宽
        var width = $("#dt_panel").parent().innerWidth() - 10;
        var height = $("#dt_panel").parent().innerHeight() / 2 - 10;

        //#region 列属性配置

        //初始化列属性panel
        $("#dt_panel").panel({
            width: width,
            height: height,
            title: '配置datagrid属性',
            tools: "#tt"
        });

        //配置标题
        $("#dt_panel i").width(width - 1);

        //设置列属性panel属性
        $("#dt_panel").panel("panel").css("margin", "5px");

        //初始化列属性datagrid
        $('#dt_dtgd').datagrid({
            singleSelect: true,
            rownumbers: true,
            width: width - 13,
            height: height - 90,
            columns: [[
                { field: 'columnName', halign: "center", title: '列名', width: 100, editor: { type: "textbox", options: { required: true } } },
                { field: 'field', halign: "center", title: '对应字段', width: 100, editor: { type: "textbox", options: { required: true } } },
                { field: 'width', halign: "center", title: '宽度', width: 100, editor: { type: "numberbox", options: { required: true } } },
                {
                    field: 'align', halign: "center", title: '对齐方式', width: 100, editor: {
                        type: "combobox", options: {
                            required: true,
                            valueField: 'id',
                            textField: 'text',
                            editable: false,
                            data: [{
                                "id": "center",
                                "text": "center",
                                "selected": true
                            }, {
                                "id": "left",
                                "text": "left"
                            }, {
                                "id": "right",
                                "text": "right"
                            }]
                        }
                    }
                },
                { field: 'formatter', halign: "center", align: "left", title: 'formatter', width: 180 }
            ]], fitColumns: true,
            onDblClickRow: function (index, row) {
                //双击行开始编辑
                $(this).datagrid("beginEdit", index);
            }
        });

        //#endregion

        //#region 操作菜单条件配置

        //初始化操作菜单条件panel
        $("#dt_panel2").panel({
            width: width,
            height: height /2 ,
            title: '配置datagrid操作菜单条件',
            tools: "#tt2"
        });

        //配置标题
        $("#dt_panel2 i").width(width - 2);

        //设置操作菜单条件panel属性
        $("#dt_panel2").panel("panel").css("margin", "5px");

        //初始化操作菜单条件datagrid
        $('#dt_dttlgd').datagrid({
            singleSelect: true,
            rownumbers: true,
            width: width - 13,
            height: height /2 - 90,
            columns: [[
                { field: 'columnName', halign: "center", title: '列名', width: 100, editor: { type: "textbox", options: { required: true } } },
                { field: 'field', halign: "center", title: '对应字段', width: 100, editor: { type: "textbox", options: { required: true } } },
                { field: 'width', halign: "center", title: '宽度', width: 100, editor: { type: "numberbox", options: { required: true } } },
                {
                    field: 'align', halign: "center", title: '对齐方式', width: 100, editor: {
                        type: "combobox", options: {
                            required: true,
                            valueField: 'id',
                            textField: 'text',
                            editable: false,
                            data: [{
                                "id": "center",
                                "text": "center",
                                "selected": true
                            }, {
                                "id": "left",
                                "text": "left"
                            }, {
                                "id": "right",
                                "text": "right"
                            }]
                        }
                    }
                },
                { field: 'formatter', halign: "center", align: "left", title: 'formatter', width: 180 }
            ]], fitColumns: true,
            onDblClickRow: function (index, row) {
                //双击行开始编辑
                $(this).datagrid("beginEdit", index);
            }
        });

        //#endregion

        //#region 操作菜单操作配置

        //初始化操作菜单操作panel
        $("#dt_panel3").panel({
            width: width,
            height: height / 2,
            title: '配置datagrid操作菜单操作',
            tools: "#tt3"
        });

        //配置标题
        $("#dt_panel3 i").width(width - 2);

        //设置操作菜单条件panel属性
        $("#dt_panel3").panel("panel").css("margin", "5px");

        //初始化操作菜单条件datagrid
        $('#dt_dttlgd2').datagrid({
            singleSelect: true,
            rownumbers: true,
            width: width - 13,
            height: height / 2 - 90,
            columns: [[
                { field: 'columnName', halign: "center", title: '列名', width: 100, editor: { type: "textbox", options: { required: true } } },
                { field: 'field', halign: "center", title: '对应字段', width: 100, editor: { type: "textbox", options: { required: true } } },
                { field: 'width', halign: "center", title: '宽度', width: 100, editor: { type: "numberbox", options: { required: true } } },
                {
                    field: 'align', halign: "center", title: '对齐方式', width: 100, editor: {
                        type: "combobox", options: {
                            required: true,
                            valueField: 'id',
                            textField: 'text',
                            editable: false,
                            data: [{
                                "id": "center",
                                "text": "center",
                                "selected": true
                            }, {
                                "id": "left",
                                "text": "left"
                            }, {
                                "id": "right",
                                "text": "right"
                            }]
                        }
                    }
                },
                { field: 'formatter', halign: "center", align: "left", title: 'formatter', width: 180 }
            ]], fitColumns: true,
            onDblClickRow: function (index, row) {
                //双击行开始编辑
                $(this).datagrid("beginEdit", index);
            }
        });

        //#endregion
    }

    return {
        //初始化方法
        init: init,
        //操作模块
        operate: operate
    }
}

