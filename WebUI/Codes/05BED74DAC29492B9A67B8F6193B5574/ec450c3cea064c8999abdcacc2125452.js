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
            initDataGrid$1cc8eac6038f48eeb81fcdb68e6d1c04();
        }catch (e){
            //这里请自行处理异常
        }
    }

    /**
    /* 初始化datagrid
    */
    function initDataGrid$1cc8eac6038f48eeb81fcdb68e6d1c04(){
        try {
            $("#请自己设置datagridID").datagrid({
                //指定datagrid工具栏操作
                toolbar:"#请输入工具栏的ID",
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
                    { field: "字段名", halign: "left", align: "left", title: "columnName", width: 100 }
                ]]
            });

            //初始化datagrid操作的按钮点击事件
            initDatagridBtn$ebaea38488b64d9886e5d5846159ae50();

        } catch (e) {
        }
    }

    /**
    /* 初始化datagrid的操作按钮
    */
    function initDatagridBtn$ebaea38488b64d9886e5d5846159ae50(){
        try{
            $(".search").on("click",function(){
                 //执行查询操作
                 excuteFunc$search();
            });

            $(".edit").on("click",function(){
                 //执行编辑操作
                 excuteFunc$edit();
            });

            $(".delete").on("click",function(){
                 //执行删除操作
                 excuteFunc$delete();
            });

            $(".detail").on("click",function(){
                 //执行详情操作
                 excuteFunc$detail();
            });

        } catch (e) {
        }
    }

    /**
    /* 执行查询操作
    */
    function excuteFunc$search(){
        try{
        
        //请在这里实现你的操作方法
        
        } catch (e) {
        }
    }

    /**
    /* 执行编辑操作
    */
    function excuteFunc$edit(){
        try{
        
        //请在这里实现你的操作方法
        
        } catch (e) {
        }
    }

    /**
    /* 执行删除操作
    */
    function excuteFunc$delete(){
        try{
        
        //请在这里实现你的操作方法
        
        } catch (e) {
        }
    }

    /**
    /* 执行详情操作
    */
    function excuteFunc$detail(){
        try{
        
        //请在这里实现你的操作方法
        
        } catch (e) {
        }
    }


    return{
        initModule:initModule
    };
}
