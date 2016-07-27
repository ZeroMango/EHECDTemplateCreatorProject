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
                cache: false,
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
                        operateDialog.dialog("clear").dialog("close");
                    }
                }]
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
            operateDialog.dialog("resize", {
                width: 1024,
                height: 768
            }).dialog("setTitle", "添加datagrid").dialog("open").dialog("center").dialog("refresh", "/Home/AddDatagrid");
        },

        /**
         * 开始创建dialog
         */
        toCTDialog: function () {
        },

        /**
         * 创建一个列属性
         */
        createGridColProperty: function () {
            try {
                $('#dt_dtgd').datagrid("appendRow", {
                    fieldName: "fieldName",
                    field: "字段名",
                    width: "列宽度",
                    align: "left",
                    operate: "添加formatter"
                });
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
        }

    };
}