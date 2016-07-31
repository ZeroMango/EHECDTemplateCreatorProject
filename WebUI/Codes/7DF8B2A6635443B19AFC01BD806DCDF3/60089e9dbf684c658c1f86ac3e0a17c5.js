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

        }catch (e){
            //这里请自行处理异常
        }
    }

    return{
        initModule:initModule
    };
}