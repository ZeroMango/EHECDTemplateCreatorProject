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
                cache: false,
                modal: true,
                buttons: [{
                    text:'添加',
                    iconCls:'icon-add',
                    handler: function () {

                    }
                },{
                    text:'关闭',
                    iconCls:'icon-cancel',
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
    var operate = {

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
            }).dialog("setTitle", "添加datagrid").dialog("open").dialog("center").dialog("refresh","http://www.baidu.com");
        },

        /**
         * 开始创建dialog
         */
        toCTDialog: function () {
        }

    };
}