$(function () {
    /**
     * 文档加载完成后初始化一个全局变量
     * 用于对文档进行脚本的控制操作，该
     * 模块用于特定的文档，请注意变量名
     * 不要重复，模块名也不要重复以保证
     * 唯一性
     */
    操作模块变量名 = 操作模块().initModule();
});

function 操作模块() {

    /**
     * 初始化模块内容
     */
    function initModule() {
        try {
            /**
            /*请注意命名规范：
            /*初始化datagrid的方法名字是按照如下规范生成的
            /*【initDataGrid$这个是datagrid的名字()这里是生成的guid】
            /*initDataGrid$这段是固定的，后面跟datagrid的名字，你可以
            /*更改，也可以沿用这个名字以保证一致性
            */
            initDataGrid$f6c3ffdcc83247b098767b622633d5df();
        } catch (e) {
            //这里请自行处理异常
        }
    }

    /**
    /* 初始化datagrid
    */
    function initDataGrid$f6c3ffdcc83247b098767b622633d5df() {
        try {
            $("#请自己设置datagridID").datagrid({
                singleSelect: true,//默认是单选
                rownumbers: true,//默认是显示行号
                fit: true,//默认填充列表
                fitColumns: true,//默认填充列表列
                idField: "ID",//默认是ID字段
                pagination: true,//默认是要分页
                columns: [[
                    { field: "字段名", halign: "left", align: "left", title: "columnName", width: 100, formatter: function (value, row, index) { return formatName(row.sName); } }
, { field: "字段名", halign: "left", align: "left", title: "columnName", width: 100 }
                ]]
            });

            initDatagridBtn$8a1b47443efa44b6924a35ce2d00ff9c();
        } catch (e) {
        }
    }

    /**
    /* 初始化datagrid的操作按钮
    */
    function initDatagridBtn$8a1b47443efa44b6924a35ce2d00ff9c() {
        try {
            $(".标识符").on("click", function () {
                alert('这里是你的实际要绑定的js操作');
            });

        } catch (e) {
        }
    }


    return {
        initModule: initModule
    };
}
