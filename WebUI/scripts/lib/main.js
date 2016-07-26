var main;

$(function () {
    main = new MainCtrl();
    main.fuckyou();
});



function MainCtrl() { };

MainCtrl.prototype = MainCtrl = function () {
    this.fuckyou = function () {
        pagectrl.fuc.alert("asdfasdfad");
    };
}