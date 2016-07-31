/**
 * 生成代码模块
 */
function GeneratorCodeFromServer() {
    var url = "/Home/GeneratorCode";

    /**
     * 创建代码
     * @param {json} param 参数
     */
    function generatorCode(param) {
        try {
            pagectrl.func.post(url, param, function (result) {
                if (result.Succeeded) {
                    alert(result.Data);
                }
            }, function (result) {
                if (result.ErrUrl !== null) {
                    pagectrl.func.showErrorPage(result.ErrUrl);
                }
            });
        } catch (e) {
            pagectrl.func.alert(e.message, "异常", pagectrl.alertIcon.error, null);
        }
    }

    return {
        generatorCode: generatorCode
    };
}