window.onload = function () {
    var UI = new UbuntuUI();
    UI.init();
    
    UI.pagestack.push("main");
    
    UI.button('pressme').click(function () {
        UI.dialog('mydialog').show();
    });
    
    UI.button('yes').click(function () {
        UI.dialog('mydialog').hide();
    });
    
    [].forEach.call(document.querySelectorAll('[data-role="list"] li a'),
                    function (a) {
                        a.onclick = function (e) {
                            UI.pagestack.push("item-view");
                        };
                    });
};

