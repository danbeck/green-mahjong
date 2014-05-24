var matchingGame = {};
matchingGame.deck = [
    'cardZahl1', 'cardZahl1', 'cardZahl1', 'cardZahl1',
    'cardZahl2', 'cardZahl2', 'cardZahl2', 'cardZahl2',
    'cardZahl3', 'cardZahl3', 'cardZahl3', 'cardZahl3',
    'cardZahl4', 'cardZahl4', 'cardZahl4', 'cardZahl4',
    'cardZahl5', 'cardZahl5', 'cardZahl5', 'cardZahl5',
    'cardZahl6', 'cardZahl6', 'cardZahl6', 'cardZahl6',
    'cardZahl7', 'cardZahl7', 'cardZahl7', 'cardZahl7',
    'cardZahl8', 'cardZahl8', 'cardZahl8', 'cardZahl8',
    'cardZahl9', 'cardZahl9', 'cardZahl9', 'cardZahl9',
    'cardBambus1', 'cardBambus1', 'cardBambus1', 'cardBambus1',
    'cardBambus2', 'cardBambus2', 'cardBambus2', 'cardBambus2',
    'cardBambus3', 'cardBambus3', 'cardBambus3', 'cardBambus3',
    'cardBambus4', 'cardBambus4', 'cardBambus4', 'cardBambus4',
    'cardBambus5', 'cardBambus5', 'cardBambus5', 'cardBambus5',
    'cardBambus6', 'cardBambus6', 'cardBambus6', 'cardBambus6',
    'cardBambus7', 'cardBambus7', 'cardBambus7', 'cardBambus7',
    'cardBambus8', 'cardBambus8', 'cardBambus8', 'cardBambus8',
    'cardBambus9', 'cardBambus9', 'cardBambus9', 'cardBambus9',
    'cardMuenze1', 'cardMuenze1', 'cardMuenze1', 'cardMuenze1',
    'cardMuenze2', 'cardMuenze2', 'cardMuenze2', 'cardMuenze2',
    'cardMuenze3', 'cardMuenze3', 'cardMuenze3', 'cardMuenze3',
    'cardMuenze4', 'cardMuenze4', 'cardMuenze4', 'cardMuenze4',
    'cardMuenze5', 'cardMuenze5', 'cardMuenze5', 'cardMuenze5',
    'cardMuenze6', 'cardMuenze6', 'cardMuenze6', 'cardMuenze6',
    'cardMuenze7', 'cardMuenze7', 'cardMuenze7', 'cardMuenze7',
    'cardMuenze8', 'cardMuenze8', 'cardMuenze8', 'cardMuenze8',
    'cardMuenze9', 'cardMuenze9', 'cardMuenze9', 'cardMuenze9',
    'cardNordwind', 'cardNordwind', 'cardNordwind', 'cardNordwind',
    'cardSuedwind', 'cardSuedwind', 'cardSuedwind', 'cardSuedwind',
    'cardOstwind', 'cardOstwind', 'cardOstwind', 'cardOstwind',
    'cardWestwind', 'cardWestwind', 'cardWestwind', 'cardWestwind',
    'cardDracheGruen', 'cardDracheGruen', 'cardDracheGruen', 'cardDracheGruen',
    'cardDracheRot', 'cardDracheRot', 'cardDracheRot', 'cardDracheRot',
    'cardDracheWeiss', 'cardDracheWeiss', 'cardDracheWeiss', 'cardDracheWeiss',
    'cardFruehling', 'cardSommer', 'cardHerbst', 'cardWinter',
    'cardBambus', 'cardPflaume', 'cardOrchidee', 'cardChrysantheme'
];

matchingGame.undoList = [];

matchingGame.positionX = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    4, 5, 6, 7, 8, 9, 10, 11,
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    4, 5, 6, 7, 8, 9, 10, 11,
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    // 2. Schicht
    5, 6, 7, 8, 9, 10,
    5, 6, 7, 8, 9, 10,
    5, 6, 7, 8, 9, 10,
    5, 6, 7, 8, 9, 10,
    5, 6, 7, 8, 9, 10,
    5, 6, 7, 8, 9, 10,
    // 3. Schicht
    6, 7, 8, 9,
    6, 7, 8, 9,
    6, 7, 8, 9,
    6, 7, 8, 9,
    // 4. Schicht
    7, 8,
    7, 8,
    // 5. Schicht
    7.5
];

matchingGame.positionY = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    3.5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3.5, 3.5,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    6, 6, 6, 6, 6, 6, 6, 6,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    // 2. Schicht
    1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2,
    3, 3, 3, 3, 3, 3,
    4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 5,
    6, 6, 6, 6, 6, 6,
    // 3. Schicht
    2, 2, 2, 2,
    3, 3, 3, 3,
    4, 4, 4, 4,
    5, 5, 5, 5,
    // 4. Schicht
    3, 3,
    4, 4,
    // 5. Schicht
    3.5
];

matchingGame.shift = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    // 3. Schicht
    2, 2, 2, 2,
    2, 2, 2, 2,
    2, 2, 2, 2,
    2, 2, 2, 2,
    // 4. Schicht
    3, 3,
    3, 3,
    // 5. Schicht
    4
];

//matchingGame.cardWidthWithoutBorder = matchingGame.cardWidth - matchingGame.resolution.borderWidthRight;
//matchingGame.cardHeightWithoutBorder = matchingGame.cardHeight - matchingGame.resolution.borderWidthBelow;

matchingGame.resolution = null;

if (cordovaUsed()) {
// This is the event that fires when Cordova is fully loaded
    document.addEventListener("deviceready", onDeviceReady, false);
} else {
// This is the event that then the browser window is loaded
    window.onload = onDeviceReady;
}


matchingGame.theme = 0;

matchingGame.themes = ["fruits", "classic"];
matchingGame.resolution = null;

matchingGame.resolutions = {
    verysmallscreen: {borderWidthRight: 2,
        borderWidthBelow: 3,
        cardWidth: 40,
        cardHeight: 50,
        shiftValue: 3},
    smallscreen: {borderWidthRight: 3,
        borderWidthBelow: 3,
        cardWidth: 48,
        cardHeight: 60,
        shiftValue: 2},
    bigscreen: {borderWidthRight: 8,
        borderWidthBelow: 7,
        cardWidth: 80,
        cardHeight: 100,
        shiftValue: 4},
    verybigscreen: {borderWidthRight: 12,
        borderWidthBelow: 11,
        cardWidth: 114,
        cardHeight: 141,
        shiftValue: 4}
};

function registerMediaQueryListListener() {

    var verybigScreenMediaQueryList = window.matchMedia("(min-width: 1600px)");
    var bigScreenMediaQueryList = window.matchMedia("(min-width: 1130px) and (max-width:1599px)");
    var smallScreenMediaQueryList = window.matchMedia("(min-width: 640px) and (max-width:1129px)");
    var verysmallScreenMediaQueryList = window.matchMedia("(max-width: 639px)");

    checkAndSetResolution();

    verybigScreenMediaQueryList.addListener(function(mediaquerylist) {
        if (mediaquerylist.matches) {
            matchingGame.resolution = matchingGame.resolutions.verybigscreen;
            redrawGame();
        }
    });

    bigScreenMediaQueryList.addListener(function(mediaquerylist) {
        if (mediaquerylist.matches) {
            matchingGame.resolution = matchingGame.resolutions.bigscreen;
            redrawGame();
        }
    });

    smallScreenMediaQueryList.addListener(function(mediaquerylist) {
        if (mediaquerylist.matches) {
            matchingGame.resolution = matchingGame.resolutions.smallscreen;
            redrawGame();
        }
    });

    verysmallScreenMediaQueryList.addListener(function(mediaquerylist) {
        if (mediaquerylist.matches) {
            matchingGame.resolution = matchingGame.resolutions.verysmallscreen;
            redrawGame();
        }
    });

    window.onorientationchange = function() {
        console.log("orientationchange event");
        checkAndSetResolution();
        redrawGame();
    };

    function checkAndSetResolution() {

        if (verybigScreenMediaQueryList.matches) {
            matchingGame.resolution = matchingGame.resolutions.verybigscreen;
        }
        if (bigScreenMediaQueryList.matches) {
            matchingGame.resolution = matchingGame.resolutions.bigscreen;
        }

        if (smallScreenMediaQueryList.matches) {
            matchingGame.resolution = matchingGame.resolutions.smallscreen;
        }
        if (verysmallScreenMediaQueryList.matches) {
            matchingGame.resolution = matchingGame.resolutions.verysmallscreen;
        }

    }
}
/**
 * Entry point to the app. It initializes the Ubuntu SDK HTML5 theme
 * and connects events to handlers
 */
function onDeviceReady() {

//    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
//        var ww = ($(window).width() < window.screen.width) ? $(window).width() : window.screen.width; //get proper width
//        var mw = 1180; // min width of site
//        var ratio = ww / mw; //calculate ratio
//        if (ww < mw) { //smaller than minimum size
//            $('#Viewport').attr('content', 'initial-scale=' + ratio + ', maximum-scale=' + ratio + ', minimum-scale=' + ratio + ', user-scalable=yes, width=' + ww);
//        } else { //regular size
//            $('#Viewport').attr('content', 'initial-scale=1.0, maximum-scale=2, minimum-scale=1.0, user-scalable=yes, width=' + ww);
//        }
//    }

    $('#newGameButton').click(function(e) {
        e.stopImmediatePropagation();
        startNewGame();
    });
    $('#replayGameButton').click(function(e) {
        e.stopImmediatePropagation();
        restartGame();
    });
    $('#undoButton').click(function(e) {
        e.stopImmediatePropagation();
        undo();
    });
    $('#themeButton').click(function(e) {
        e.stopImmediatePropagation();
        changeTheme();
    });

    $("html").click(function(e) {
        console.log("clicked on board");
        $("div.game-buttons").slideToggle({direction: "down"}, 300);
    });

//var mql = window.matchMedia("(min-width: 480px)");

    registerMediaQueryListListener();
//
//    $("link[href='css/mahjong.css']").after($("<link href='" + resolution.css + "' rel='stylesheet'>"));
    // var backButton = document.querySelector("li a[data-role=\"back\"]");
    startGame();

    setTimeout(function() {
        $("div.game-buttons").slideToggle({direction: "down"}, 300);
    }, 1500);
}

function redrawGame() {
    console.log("redraw!");
    matchingGame.cardWidth = parseInt($(".card").css('width'));
    matchingGame.cardWidthWithoutBorder = matchingGame.cardWidth - matchingGame.resolution.borderWidthRight;
    matchingGame.cardHeight = parseInt($(".card").css('height'));
    matchingGame.cardHeightWithoutBorder = matchingGame.cardHeight - matchingGame.resolution.borderWidthBelow;
    var zIndexBase = 8;

    var positionXShadow;
    var positionYShadow;
    var zIndexShadow;

    var shadowShift = matchingGame.cardWidthWithoutBorder / 8;
    $(".card").each(function(index) {

        var positionX = matchingGame.cardWidthWithoutBorder * (matchingGame.positionX[index] - 1) - getShiftValueX(matchingGame.shift[index]);
        var positionY = (matchingGame.cardHeightWithoutBorder + matchingGame.cardHeightWithoutBorder * (matchingGame.positionY[index] - 1)) - getShiftValueY(matchingGame.shift[index]);
        var zIndex = zIndexBase + matchingGame.shift[index];

        $(this).css({
            "left": positionX,
            "top": positionY,
            "z-index": zIndex
        });

        positionXShadow = positionX - shadowShift;
        positionYShadow = positionY - shadowShift;
        zIndexShadow = zIndex - 1;

        $(".shadow").eq(index).css({
            "left": positionXShadow,
            "top": positionYShadow,
            "z-index": zIndexShadow
        });
    });

}
function startGame() {
    var firstDate = new Date();
    shuffleCards();
    var secondDate = new Date();
    console.log("time taking for shuffling: " + (secondDate - firstDate));

    var numberOfCards = matchingGame.deck.length;
    matchingGame.cardWidth = parseInt($(".card").css('width'));
    matchingGame.cardWidthWithoutBorder = matchingGame.cardWidth - matchingGame.resolution.borderWidthRight;
    matchingGame.cardHeight = parseInt($(".card").css('height'));
    matchingGame.cardHeightWithoutBorder = matchingGame.cardHeight - matchingGame.resolution.borderWidthBelow;
    var zIndexBase = 8;

    for (var i = 0; i < (numberOfCards - 1); i++) {
        //$(".card:first-child").clone().appendTo("#cards");
        $("#cards").append('<div class="card"></div>');
        $("#cards").append('<div class="shadow"></div>');
    }


    var thirdDate = new Date();
    console.log("time taking for cloning: " + (thirdDate - secondDate));

    var positionX;
    var positionY;
    var zIndex;
    var positionXShadow;
    var positionYShadow;
    var zIndexShadow;
    var pattern;
    var shadowShift = matchingGame.cardWidthWithoutBorder / 8;
    $(".card").each(function(index) {

        positionX = matchingGame.cardWidthWithoutBorder * (matchingGame.positionX[index] - 1) - getShiftValueX(matchingGame.shift[index]);
        positionY = (matchingGame.cardHeightWithoutBorder + matchingGame.cardHeightWithoutBorder * (matchingGame.positionY[index] - 1)) - getShiftValueY(matchingGame.shift[index]);
        zIndex = zIndexBase + matchingGame.shift[index];

        positionXShadow = positionX - shadowShift;
        positionYShadow = positionY - shadowShift;
        zIndexShadow = zIndex - 1;

        console.log("zIndex: " + zIndex + ", zIndexShadow: " + zIndexShadow);

        $(this).css({
            "left": positionX,
            "top": positionY,
            "z-index": zIndex
        });

        $(".shadow").eq(index).css({
            "left": positionXShadow,
            "top": positionYShadow,
            "z-index": zIndexShadow
        });

        pattern = matchingGame.deck[index];
        $(this).addClass(pattern);
        pattern = getCardPattern(pattern);
        $(this).attr("data-pattern", pattern);
        $(this).click(selectCard);
    });


    var fourthDate = new Date();
    console.log("time for painting position and shadow: " + (fourthDate - thirdDate));

}

function getCardPattern(cardName) {

    var cardJahreszeiten = ["cardFruehling", "cardSommer", "cardHerbst", "cardWinter"];
    var cardBlumen = ["cardBambus", "cardPflaume", "cardOrchidee", "cardChrysantheme"];

    if (cardJahreszeiten.indexOf(cardName) >= 0) {
        return "cardJahreszeiten";
    } else if (cardBlumen.indexOf(cardName) >= 0) {
        return "cardBlumen";
    }

    return cardName;
}

function shuffleCards() {
    matchingGame.deck = _.shuffle(matchingGame.deck);
}

function shuffle() {
    return 0.5 - Math.random();
}

function selectCard(e) {
    e.stopPropagation();
    if (!isCardSelectable($(this))) {
        return;
    }

    if ($(this)[0] === $(".card-selected")[0]) {
        $(".card-selected").removeClass("card-selected");
        return;
    }

    $(this).addClass("card-selected");
    if ($(".card-selected").size() === 2) {
        //setTimeout(checkPattern, 20);
        checkPattern();
    }
}

function isCardSelectable(selectedElement) {
    var positionX = parseInt(selectedElement.css("left"));
    var positionY = parseInt(selectedElement.css("top"));
    var zIndex = parseInt(selectedElement.css("z-index"));
    var shiftingX = getShiftValueX(zIndex);
    var shiftingY = getShiftValueY(zIndex);

    var numberOfLeftNeighbors = getNumberOfLeftNeighbors(positionX, positionY, zIndex);
    var numberOfRightNeighbors = getNumberOfRightNeighbors(positionX, positionY, zIndex);
    var numberOfHigherOverlaps = getNumberOfHigherOverlaps(positionX, positionY, zIndex, shiftingX, shiftingY);

    return ((numberOfLeftNeighbors === 0 || numberOfRightNeighbors === 0) && numberOfHigherOverlaps === 0);
}

function getShiftValueX(zIndex) {
    return zIndex * matchingGame.resolution.borderWidthRight;
}

function getShiftValueY(zIndex) {
    return zIndex * matchingGame.resolution.borderWidthBelow;
}

function getNumberOfAboveNeighbors(positionX, positionY, zIndex) {
    return $(".card").filter(function() {
        return (($(this).css("visibility") === "visible") && ((parseInt($(this).css("top")) + matchingGame.cardHeightWithoutBorder) === positionY) && (parseInt($(this).css("z-index")) === zIndex) && (parseInt($(this).css("left")) === positionX));
    }).length;
}

function getRightNeigbors(positionX, positionY, zIndex) {
    return $(".card").filter(function() {
        return (($(this).css("visibility") === "visible") && Math.abs(parseInt($(this).css("top")) - positionY) < matchingGame.cardHeightWithoutBorder) && (parseInt($(this).css("z-index")) === zIndex) && (parseInt($(this).css("left")) - matchingGame.cardWidthWithoutBorder === positionX);
    });
}

function getNumberOfRightNeighbors(positionX, positionY, zIndex) {
    return getRightNeigbors(positionX, positionY, zIndex).length;
}

function getNumberOfLeftNeighbors(positionX, positionY, zIndex) {
    return $(".card").filter(function() {
        var isNeighbour = (($(this).css("visibility") === "visible")
                && (Math.abs(parseInt($(this).css("top")) - positionY) < matchingGame.cardHeightWithoutBorder)
                && (parseInt($(this).css("z-index")) === zIndex)
                && ((parseInt($(this).css("left")) + matchingGame.cardWidthWithoutBorder) === positionX));
        return isNeighbour;
    }).length;
}

function getBeneathNeighbors(positionX, positionY, zIndex) {
    return $(".card").filter(function() {
        return (($(this).css("visibility") === "visible") && ((parseInt($(this).css("top")) - matchingGame.cardHeightWithoutBorder) === positionY) && (parseInt($(this).css("z-index")) === zIndex) && (parseInt($(this).css("left")) === positionX));
    });
}

function getNumberOfHigherOverlaps(positionX, positionY, zIndex, shiftingX, shiftingY) {
    return $(".card").filter(function() {
        var zIndexActualCard = parseInt($(this).css("z-index"));
        var shiftingXActualCard = getShiftValueX(zIndexActualCard);
        var shiftingYActualCard = getShiftValueY(zIndexActualCard);
        var shiftingDifferenceX = Math.abs(shiftingX - shiftingXActualCard);
        var shiftingDifferenceY = Math.abs(shiftingY - shiftingYActualCard);

        var isHigherOverlap = (($(this).css("visibility") === "visible")
                && (Math.abs(parseInt($(this).css("top")) - positionY) < (matchingGame.cardHeightWithoutBorder - shiftingDifferenceY))
                && (parseInt($(this).css("z-index")) > zIndex)
                && (Math.abs(parseInt($(this).css("left")) - positionX) < (matchingGame.cardWidthWithoutBorder - shiftingDifferenceX)));
        return isHigherOverlap;
    }).length;
}

function checkPattern() {
    if (isMatchPattern()) {
        $(".card-selected").removeClass("card-selected").addClass("card-removed");
        removeTookCards();
    } else {
        $(".card-selected").removeClass("card-selected");
    }
}

function isMatchPattern() {
    var cards = $(".card-selected");
    var pattern = $(cards[0]).data("pattern");
    var anotherPattern = $(cards[1]).data("pattern");
    return (pattern === anotherPattern);
}

function removeTookCards() {
    var index;
    $(".card-removed").each(function(index) {
        index = $(".card").index($(this));
        $(".shadow").eq(index).css({"visibility": "hidden"});
    });

    var removedCards = $(".card-removed");
    matchingGame.undoList.unshift(removedCards);
    $(".card-removed").css({"visibility": "hidden"});
    $(".card-removed").removeClass("card-removed");

    console.log("Länge undolist: " + (matchingGame.undoList.length * 2) + ", Länge .card: " + $(".card").length);
    if ((matchingGame.undoList.length * 2) === $(".card").length) {
        showWinningMessage();
    }
}

function showWinningMessage() {
    console.log("Spiel gewonnen");
    $("div.game-buttons").slideToggle({direction: "down"}, 300);
    $("div#winningMessage").show();
}
function startNewGame() {
    console.log("in startNewGame");
    $("#cards").empty();
    $("#cards").append('<div class="card"></div>');
    $("#cards").append('<div class="shadow"></div>');
    matchingGame.undoList = [];
    $("div#winningMessage").hide();
    startGame();
}

function restartGame() {
    $("div#winningMessage").hide();
    var numberOfRemovedPatterns = matchingGame.undoList.length;
    for (var i = 0; i < numberOfRemovedPatterns; i++) {
        undo();
    }
}

function changeTheme() {
    if (matchingGame.theme === 1)
        matchingGame.theme = 0;
    else
        matchingGame.theme = 1;

    console.log(matchingGame.theme);
    console.log(matchingGame.themes[matchingGame.theme]);
    $("html").css("background-image", "url(images/background_" + matchingGame.themes[matchingGame.theme] + ".jpg)");


    var resolution = "";
    if (matchingGame.resolution === matchingGame.resolutions.verysmallscreen)
        resolution = "verysmallscreen";
    if (matchingGame.resolution === matchingGame.resolutions.smallscreen)
        resolution = "smallscreen";
    if (matchingGame.resolution === matchingGame.resolutions.bigscreen)
        resolution = "bigscreen";
    if (matchingGame.resolution === matchingGame.resolutions.verybigscreen)
        resolution = "verybigscreen";

    $(".card").css("background-image", "url(images/mahjong_" + resolution + "_" + matchingGame.themes[matchingGame.theme] + ".png)");
}

function undo() {
    if (matchingGame.undoList.length >= 1) {
        var cardsToUndo = matchingGame.undoList[0];

        cardsToUndo.each(function(index) {
            index = $(".card").index($(this));
            $(".shadow").eq(index).css({"visibility": "visible"});
        });

        (matchingGame.undoList[0]).css({"visibility": "visible"});
        matchingGame.undoList.shift();
    }
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
