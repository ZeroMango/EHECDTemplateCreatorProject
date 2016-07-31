function GeneratorCachePool() {
    var pool = [];


    function getPool() {
        return pool;
    }

    function pushDataToPool(data) {
        pool.push(data);
    }

    function removeItem(index) {
        if (pagectrl.func.isNumber(index) && index <= pool.length - 1) {
            pool.splice(index, 1);
        }
    }

    return {
        getPool: getPool,
        pushDataToPool: pushDataToPool,
        removeItem: removeItem
    }
}