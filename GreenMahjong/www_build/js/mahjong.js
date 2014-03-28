
if (cordovaUsed()) {
// This is the event that fires when Cordova is fully loaded
    document.addEventListener("deviceready", onDeviceReady, false);
} else {
// This is the event that then the browser window is loaded
    window.onload = onDeviceReady;
}


/**
 * Entry point to the app. It initializes the Ubuntu SDK HTML5 theme
 * and connects events to handlers
 */
function onDeviceReady() {
    var ubuntuUI = new UbuntuUI();

    //needed because of a bug with "toolbar"
    UI = ubuntuUI;
    ubuntuUI.init();

    // Set up the app by pushing the main view
    ubuntuUI.pagestack.push("mainPage");
    
    var toolbar = ubuntuUI.toolbar("footer");
    toolbar.touch(function(e) {
        var el = e.srcElement || e.target;
        if (el.id && /footer/i.test(el.id)) {
            toolbar.toggle();
        }
    });

    ubuntuUI.button('newGameButton').click(function(e) {
        e.stopImmediatePropagation();
        startNewGame();
    });
    ubuntuUI.button('replayGameButton').click(function(e) {
        e.stopImmediatePropagation();
        replayGame();
    });
    ubuntuUI.button('undoButton').click(function(e) {
        e.stopImmediatePropagation();
        undo();
    });

    // var backButton = document.querySelector("li a[data-role=\"back\"]");


}

function startNewGame() {
    console.log("Hier kommt der Code, um eine neues Spiel zu starten");
}


function replayGame() {
    console.log("Hier kommt der Code, um das Spiel neu zu spielen");
}


function undo() {
    console.log("Hier kommt der Code für die undo funktion.");
}



function showAlert(message) {
    if (cordovaUsed())
        navigator.notification.alert(message);
    else
        alert(message);
}


function cordovaUsed() {
    return navigator.notification;
}