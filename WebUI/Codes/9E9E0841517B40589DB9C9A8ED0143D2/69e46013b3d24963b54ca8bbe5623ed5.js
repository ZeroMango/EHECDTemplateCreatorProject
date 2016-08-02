$(function(){
    /**
     * 文档加载完成后初始化一个全局变量
     * 用于对文档进行脚本的控制操作，该
     * 模块用于特定的文档，请注意变量名
     * 不要重复，模块名也不要重复以保证
     * 唯一性
     */
    操作模块变量名 = 操作模块().initModule();
});

function 操作模块(){

    /**
     * 初始化模块内容
     */
    function initModule(){
        try{
            /**
            /*请注意命名规范：
            /*初始化datagrid的方法名字是按照如下规范生成的
            /*【initDataGrid$这个是datagrid的名字()这里是生成的guid】
            /*initDataGrid$这段是固定的，后面跟datagrid的名字，你可以
            /*更改，也可以沿用这个名字以保证一致性
            */
            initDataGrid$a71c9c7288f245b582f2adb547d56cb5();
        }catch (e){
            //这里请自行处理异常
        }
    }

    /**
    /* 初始化datagrid
    */
    function initDataGrid$a71c9c7288f245b582f2adb547d56cb5(){
        try {
            $("#请自己设置datagridID").datagrid({
                //默认是单选
                singleSelect: true,
                //默认是显示行号
                rownumbers: true,
                //默认填充列表
                fit: true,
                //默认填充列表列
                fitColumns: true,
                //默认是ID字段
                idField: "ID",
                //默认是要分页
                pagination: true,
                /*以下为可选配置*/
                //是否显示斑马线效果
                striped: false,
                //同一行中显示数据。设置为true可以提高加载性能
                nowrap: true,
                columns: [[
                    //是否显示checkbox，这个根据需要设置，默认不显示
                    //{ field: 'checkbox', checkbox: true },
                    { field: "字段名", halign: "left", align: "left", title: "columnName", width: 100 },
                    { field: "字段名", halign: "left", align: "left", title: "columnName", width: 100 },
                    { field: "字段名", halign: "left", align: "left", title: "columnName", width: 100 },
                    { field: "字段名", halign: "left", align: "left", title: "columnName", width: 100 },
                    { field: "字段名", halign: "left", align: "left", title: "columnName", width: 100 }
                ]]
            });

            //初始化datagrid操作的按钮点击事件
            initDatagridBtn$511bc9b99a0c4fc9bb3258fe124a12b6();

        } catch (e) {
        }
    }

    /**
    /* 初始化datagrid的操作按钮
    */
    function initDatagridBtn$511bc9b99a0c4fc9bb3258fe124a12b6(){
        try{
        } catch (e) {
        }
    }


    return{
        initModule:initModule
    };
}
