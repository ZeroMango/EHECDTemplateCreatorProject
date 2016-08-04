function AllReadyElementOperate() {
    var showID = "#layout_center";
    var datalistID = "#adl";
    var generatorCachePool = GeneratorCachePool();
    var generatorCodeModule = GeneratorCodeFromServer();

    function initAREDataList() {
        try {
            //初始化左侧菜单
            $(datalistID).datalist({
                valueField: "value",
                textField: "text",
                checkbox: true,
                fitColumns: true,
                lines: true,
                toolbar: [' ', ' ', ' ', ' ', ' ', ' ', '-', {
                    iconCls: 'icon-save', 
                    handler: function () {
                        var pool = generatorCachePool.getPool();
                        if (pool.length > 0) {
                            generatorCodeModule.generatorCode(generatorCachePool.getPool());
                        } else {
                            pagectrl.func.alert("没有可以生成的元素", "注意", pagectrl.alertIcon.info);
                        }
                    }
                }, '-'],
                onDblClickRow: function (index, row) {
                    $(datalistID).datalist("deleteRow", index);
                    $(generatorCachePool.getPool()[index].id).remove();
                    generatorCachePool.removeItem(index);
                }
            });
        } catch (e) {
            pagectrl.func.alert(e.message, "错误", pagectrl.alertIcon.error);
        }
    }

    function addCodeElement(data) {
        try {            
            var rows = [];
            $.each(generatorCachePool.getPool(), function (index, item) {
                if (item.type === "datagrid") {                    
                    generatorCachePool.getPool().splice(index, 1);
                }
            });
            rows.push({
                value: "grid",
                text: "DataGrid"
            });
            generatorCachePool.pushDataToPool(data);
            $(datalistID).datalist("loadData", rows);
        } catch (e) {
            pagectrl.func.alert(e.message, "错误", pagectrl.alertIcon.error);
        }
    }

    return {
        init: initAREDataList,
        addCodeElement: addCodeElement
    }
}