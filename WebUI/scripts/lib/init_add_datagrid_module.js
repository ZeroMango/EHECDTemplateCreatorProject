/**
* 初始化添加grid的操作
*/
function AddDatagridControl() {

    function module() {
        //获取dialog高宽
        var width = $("#dt_panel").parent().innerWidth() - 10;
        var height = $("#dt_panel").parent().innerHeight() / 2 - 10;

        //#region 列属性配置

        //初始化列属性panel
        $("#dt_panel").panel({
            width: width,
            height: height - 30,
            title: '配置datagrid属性',
            tools: "#tt"
        });

        //配置标题
        $("#dt_panel i").width(width - 2);

        //设置列属性panel属性
        $("#dt_panel").panel("panel").css("margin", "5px");

        //初始化列属性datagrid
        $('#dt_dtgd').datagrid({
            singleSelect: true,
            rownumbers: true,
            width: width - 13,
            height: height - 95,
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
            height: height / 2 + 15,
            title: '配置datagrid操作菜单条件',
            tools: "#tt2"
        });

        //重置容器宽度
        $("#dt_panel2 i").width(width - 2);

        //设置操作菜单条件panel外边距
        $("#dt_panel2").panel("panel").css("margin", "5px");

        //初始化操作菜单条件datagrid
        $('#dt_dttlgd').datagrid({
            singleSelect: true,
            rownumbers: true,
            width: width - 13,
            height: height / 2 - 50,
            columns: [[
                { field: 'conditionDes', halign: "center", title: '条件描述', width: 100, editor: { type: "textbox", options: { required: true } } },
                { field: 'fieldName', halign: "center", title: '字段名称', width: 100, editor: { type: "textbox", options: { required: true } } },
                {
                    field: 'controlType', halign: "center", title: '控件类型', width: 100, editor: {
                        type: "combobox", options: {
                            required: true,
                            valueField: 'id',
                            textField: 'text',
                            editable: false,
                            data: [{
                                "id": "textbox",
                                "text": "textbox",
                                "selected": true
                            }, {
                                "id": "numberbox",
                                "text": "numberbox",
                                "selected": true
                            }, {
                                "id": "combo",
                                "text": "combo"
                            }, {
                                "id": "combobox",
                                "text": "combobox"
                            }, {
                                "id": "combotree",
                                "text": "combotree"
                            }, {
                                "id": "combogrid",
                                "text": "combogrid"
                            }, {
                                "id": "datebox",
                                "text": "datebox"
                            }, {
                                "id": "datetimebox",
                                "text": "datetimebox"
                            }, {
                                "id": "calendar",
                                "text": "calendar"
                            }]
                        }
                    }
                },
                { field: 'options', halign: "left", align: "left", title: '属性', width: 180 }
            ]], fitColumns: true,
            onDblClickRow: function (index, row) {
                $(this).datagrid("updateRow", { index: index, row: { options: "" } });
                //双击行开始编辑
                $(this).datagrid("beginEdit", index);
            }
        });

        //#endregion

        //#region 操作菜单操作配置

        //初始化操作菜单操作panel
        $("#dt_panel3").panel({
            width: width,
            height: height / 2 + 15,
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
            height: height / 2 - 50,
            columns: [[                
                { field: 'operateField', halign: "center", title: '标识符', width: 100, editor: { type: "textbox", options: { required: true } } },
                { field: 'operateText', halign: "center", title: '按钮文本', width: 100, editor: { type: "textbox", options: { required: true } } },
                {
                    field: 'operateIcon', halign: "center", title: '按钮图标', width: 100, editor: {
                        type: "combobox", options: {
                            required: true,
                            valueField: 'id',
                            textField: 'text',
                            editable: false,
                            data: [{
                                "id": "icon-add",
                                "text": "icon-add",
                                "selected": true
                            }, {
                                "id": "icon-edit",
                                "text": "icon-edit"
                            }, {
                                "id": "icon-clear",
                                "text": "icon-clear"
                            }, {
                                "id": "icon-remove",
                                "text": "icon-remove"
                            }, {
                                "id": "icon-save",
                                "text": "icon-save"
                            }, {
                                "id": "icon-cut",
                                "text": "icon-cut"
                            }, {
                                "id": "icon-ok",
                                "text": "icon-ok"
                            }, {
                                "id": "icon-no",
                                "text": "icon-no"
                            }, {
                                "id": "icon-cancel",
                                "text": "icon-cancel"
                            }, {
                                "id": "icon-reload",
                                "text": "icon-reload"
                            }, {
                                "id": "icon-search",
                                "text": "icon-search"
                            }, {
                                "id": "icon-print",
                                "text": "icon-print"
                            }, {
                                "id": "icon-help",
                                "text": "icon-help"
                            }]
                        }
                    }
                }
            ]], fitColumns: true,
            onDblClickRow: function (index, row) {
                //双击行开始编辑
                $(this).datagrid("beginEdit", index);
            }
        });

        //#endregion
    }
   
    return {
        module:module
    };
}