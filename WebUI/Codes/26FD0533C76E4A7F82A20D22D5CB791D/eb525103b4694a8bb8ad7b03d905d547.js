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
            initDataGrid$bd497cb6c203457a99c76a0edb1d5082();
        }catch (e){
            //这里请自行处理异常
        }
    }

    /**
    /* 初始化datagrid
    */
    function initDataGrid$bd497cb6c203457a99c76a0edb1d5082(){
        try{
            initDatagridBtn$9e3d350cc20d49f0a6be47edcd42594a();
        } catch (e) {
        }
    }

    /**
    /* 初始化datagrid的操作按钮
    */
    function initDatagridBtn$9e3d350cc20d49f0a6be47edcd42594a(){
        try{
            $(".标识符").on("click",function(){
                 alert('这里是你的实际要绑定的js操作');
            });

            $(".标识符").on("click",function(){
                 alert('这里是你的实际要绑定的js操作');
            });

            $(".标识符").on("click",function(){
                 alert('这里是你的实际要绑定的js操作');
            });

        } catch (e) {
        }
    }


    return{
        initModule:initModule
    };
}
