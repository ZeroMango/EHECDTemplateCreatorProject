var main;

$(function () {
    main = new MainCtrl();
    main.init();
});

function MainCtrl() { };

MainCtrl.prototype = MainCtrl = function () {

    var layout = $("#main_layout");
    var dl = $("#dl");
    var operateDialog = $("#operate_dialog");
    var dotype = 0;

    /**
     * 初始化添加grid的操作
     */
    this.AddDatagridControl = function () {

        //获取dialog高宽
        var width = $("#dt_panel").parent().innerWidth() - 10;
        var height = $("#dt_panel").parent().innerHeight() - 10;

        //初始化panel
        $("#dt_panel").panel({
            width: width,
            height: height,
            title: '配置datagrid属性',
            tools: "#tt"
        });

        //设置panel属性
        $("#dt_panel").panel("panel").css("margin", "5px");

        //初始化datagrid
        $('#dt_dtgd').datagrid({
            singleSelect: true,
            rownumbers: true,
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
                            editable:false,
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
                { field: 'operate', halign: "center", align: "center", title: '操作', width: 100 },
                { field: 'formatter', hidden: true }
            ]], fitColumns: true,
            onDblClickRow: function (index, row) {
                $(this).datagrid("beginEdit", index);
            }
        });
    };

    /**
     * 初始化
     */
    this.init = function () {
        var that = this;
        try {

            //初始化菜单
            dl.datalist({
                valueField: "value",
                textField: "text",
                checkbox: true,
                lines: true,
                onDblClickRow: function (index, row) {
                    that.operate.dbclickRow(index, row);
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
                        that.AddDatagridControl();
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

    //操作对象
    this.operate = {

        /**
         * 双击菜单选项时触发
         * @param {type} index 当前选中的选项下标
         * @param {type} row 当前选中的行对象
         */
        dbclickRow: function (index, row) {
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
        },

        /**
         * 开始创建datagrid
         */
        toCTDatagrid: function () {
            dotype = 0;
            operateDialog.dialog("resize", {
                width: 1024,
                height: 768
            }).dialog("setTitle", "添加datagrid").dialog("open").dialog("center").dialog("refresh", "/Home/AddDatagrid");
        },

        /**
         * 开始创建dialog
         */
        toCTDialog: function () {
            dotype = 1;
            operateDialog.dialog("resize", {
                width: 600,
                height: 400
            }).dialog("setTitle", "添加dialog").dialog("open").dialog("center");
        },

        /**
         * 创建一个列属性
         */
        createGridColProperty: function () {
            try {
                var btnid = "btn{0}".format([pagectrl.fuc.uuid()]);
                $('#dt_dtgd').datagrid("appendRow", {
                    columnName: "columnName",
                    field: "字段名",
                    width: "100",
                    align: "left",
                    operate: "<a id=\"{0}\" href=\"#\">编辑字段formatter</a>".format([btnid]),
                    formatter: ""
                });

                $('#' + btnid).linkbutton({ iconCls: 'icon-add', height: 20 });
            } catch (e) {
                pagectrl.fuc.alert(e.message, "异常", pagectrl.alertIcon.error, null);
            }
        },

        /**
         * 删除一个选中的列属性
         */
        delGridColProperty: function () {
            try {                
                pagectrl.element.dependEasyui$checkHasSelectedSingleRow('#dt_dtgd', function (selectedRow) {
                    $('#dt_dtgd').datagrid("deleteRow", $('#dt_dtgd').datagrid("getRowIndex", selectedRow));
                }, "请选中你要删除的列属性");
            } catch (e) {
                pagectrl.fuc.alert(e.message, "异常", pagectrl.alertIcon.error, null);
            }
        },

        /**
         * 编辑列属性
         */
        editGridColProperty: function () {
            try {
                pagectrl.element.dependEasyui$checkHasSelectedSingleRow('#dt_dtgd', function (selectedRow) {
                    $('#dt_dtgd').datagrid("beginEdit", $('#dt_dtgd').datagrid("getRowIndex", selectedRow));
                }, "请选中你要编辑的列属性");
            } catch (e) {
                pagectrl.fuc.alert(e.message, "异常", pagectrl.alertIcon.error, null);
            }
        },

        /**
         * 结束编辑列属性
         */
        endEditGridColProperty: function () {
            try {
                if (operateDialog.find("form").form("validate")) {
                    $.each($('#dt_dtgd').datagrid("getRows"), function (index, value) {
                        var id = $(value.operate).attr("id");                        
                        $('#dt_dtgd').datagrid("endEdit", index);
                        $('#' + id).linkbutton({ iconCls: 'icon-add', height: 20 });
                    });
                }
            } catch (e) {
                pagectrl.fuc.alert(e.message, "异常", pagectrl.alertIcon.error, null);
            }
        }

    };
}