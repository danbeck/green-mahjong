var matchingGame = matchingGame || {};
matchingGame.version = "2.0";
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

matchingGame.selectableCards = {};

matchingGame.matchingCards = {};


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

matchingGame.themes = ["fruits", "classic", "highvisibility"];
matchingGame.resolution = null;

matchingGame.resolutions = {
    verysmallscreen: {borderWidthRight: 2,
        borderWidthBelow: 2,
        cardWidth: 38,
        cardHeight: 48,
        shiftValue: 2},
    smallscreen: {borderWidthRight: 3,
        borderWidthBelow: 3,
        cardWidth: 45,
        cardHeight: 59,
        shiftValue: 3},
    bigscreen: {borderWidthRight: 8,
        borderWidthBelow: 7,
        cardWidth: 79,
        cardHeight: 99,
        shiftValue: 4},
    verybigscreen: {borderWidthRight: 12,
        borderWidthBelow: 11,
        cardWidth: 113,
        cardHeight: 140,
        shiftValue: 4}
};

function registerMediaQueryListListener() {

    var verybigScreenMediaQueryList = window.matchMedia("(min-width:1600px) and (min-height:1100px)");
    var bigScreenMediaQueryList = window.matchMedia("(min-width: 1130px) and (max-width:1599px) and (min-height:780px),(min-height:780px) and (max-height:1129px) and (min-width:1130px)");
    var smallScreenMediaQueryList = window.matchMedia("(min-width:640px) and (max-width:1129px) and (min-height:460px),(min-height:460px) and (max-height:779px) and (min-width:640px)");
    var verysmallScreenMediaQueryList = window.matchMedia("(max-height:459px), (max-width:639px)");

    checkAndSetResolution();

// Listen for orientation changes
    window.addEventListener("orientationchange", function() {
        checkAndSetResolution();
        redrawGame();
    }, false);

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
//    }

    var version = localStorage.getItem("version");
    if (version !== matchingGame.version) {
        localStorage.setItem("version", matchingGame.version);

//        $("div#versionInformationDialog").show();
//        $("html").fastClick(function() {
//            $("div#versionInformationDialog").hide();
//        });
    }

    var theme = localStorage.getItem("theme");
    if (theme) {
        matchingGame.theme = parseInt(theme);
        changeTheme(matchingGame.theme);
    }


    $('#newGameButton').fastClick(function(e) {
        e.stopImmediatePropagation();
        // startNewGame();
        hideMessages();
        $("#startScreen").slideDown(550);
    });
//    $('#replayGameButton').fastClick(function(e) {
//        e.stopImmediatePropagation();
//        restartGame();
//    });
    $('#undoButton').fastClick(function(e) {
        e.stopImmediatePropagation();
        hideMessages();
        undo();
    });
    $('#themeButton').fastClick(function(e) {
        e.stopImmediatePropagation();
        changeTheme();
    });

    $("html").fastClick(function(e) {
        $("div.game-buttons").slideToggle({direction: "down"}, 300);
    });
    $("#activateHints").fastClick(function(e) {
        e.stopImmediatePropagation();
        $("body").toggleClass("hint-on");
    });

    $("#aboutButton").fastClick(function(e) {
        e.stopImmediatePropagation();
        $("#startScreen").hide();
        $("#aboutScreen").show();
    });

    $("#closeAboutScreenButton").fastClick(function(e) {
        e.stopImmediatePropagation();
        $("#aboutScreen").hide();
        $("#startScreen").show();
    });

    $("#playTurtleLayout").fastClick(function(e) {
        e.stopImmediatePropagation();
        $("#startScreen").slideUp(550);
        $("#cards").attr("data-layout", "turtle");
        matchingGame.positionX = matchingGame.turtle.positionX;
        matchingGame.positionY = matchingGame.turtle.positionY;
        matchingGame.shift = matchingGame.turtle.shift;
        matchingGame.selectable = matchingGame.turtle.selectable;
        startNewGame();
    });

    $("#playFlowerLayout").fastClick(function(e) {
        e.stopImmediatePropagation();
        $("#startScreen").slideUp(550);
        $("#cards").attr("data-layout", "flower");
        matchingGame.positionX = matchingGame.flower.positionX;
        matchingGame.positionY = matchingGame.flower.positionY;
        matchingGame.shift = matchingGame.flower.shift;
        matchingGame.selectable = matchingGame.flower.selectable;
        startNewGame();
    });
    $("#playSpiderLayout").fastClick(function(e) {
        e.stopImmediatePropagation();
        $("#startScreen").slideUp(550);
        $("#cards").attr("data-layout", "spider");
        matchingGame.positionX = matchingGame.spider.positionX;
        matchingGame.positionY = matchingGame.spider.positionY;
        matchingGame.shift = matchingGame.spider.shift;
        matchingGame.selectable = matchingGame.spider.selectable;
        startNewGame();
    });

    $("#playCloudLayout").fastClick(function(e) {
        e.stopImmediatePropagation();
        $("#startScreen").slideUp(550);
        $("#cards").attr("data-layout", "cloud");
        matchingGame.positionX = matchingGame.cloud.positionX;
        matchingGame.positionY = matchingGame.cloud.positionY;
        matchingGame.shift = matchingGame.cloud.shift;
        matchingGame.selectable = matchingGame.cloud.selectable;
        startNewGame();
    });

//var mql = window.matchMedia("(min-width: 480px)");

    registerMediaQueryListListener();
//
//    $("link[href='css/mahjong.css']").after($("<link href='" + resolution.css + "' rel='stylesheet'>"));
    // var backButton = document.querySelector("li a[data-role=\"back\"]");

    setTimeout(function() {
        $("div.game-buttons").slideToggle({direction: "down"}, 300);
    }, 1500);
}

function redrawGame() {
//    matchingGame.cardWidth = parseInt($(".card").css('width'));
    matchingGame.cardWidth = matchingGame.resolution.cardWidth;
    matchingGame.cardWidthWithoutBorder = matchingGame.cardWidth - matchingGame.resolution.borderWidthRight;
//    matchingGame.cardHeight = parseInt($(".card").css('height'));
    matchingGame.cardHeight = matchingGame.resolution.cardHeight;
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

    setSpriteImageForTiles();
}
function startGame() {
//    var firstDate = new Date();
    shuffleCards();
//    var secondDate = new Date();

    var numberOfCards = matchingGame.deck.length;
    matchingGame.cardWidth = matchingGame.resolution.cardWidth;
    matchingGame.cardWidthWithoutBorder = matchingGame.cardWidth - matchingGame.resolution.borderWidthRight;
//    matchingGame.cardHeight = parseInt($(".card").css('height'));
    matchingGame.cardHeight = matchingGame.resolution.cardHeight;
    matchingGame.cardHeightWithoutBorder = matchingGame.cardHeight - matchingGame.resolution.borderWidthBelow;
    var zIndexBase = 8;

    for (var i = 0; i < (numberOfCards - 1); i++) {
        //$(".card:first-child").clone().appendTo("#cards");
        $("#cards").append('<div class="card"></div>');
        $("#cards").append('<div class="shadow"></div>');
    }


    var thirdDate = new Date();

    var positionX;
    var cardPositionX;
    var positionY;
    var cardPositionY;
    var shift;
    var cardZIndex;
    var selectable;
    var positionXShadow;
    var positionYShadow;
    var zIndexShadow;
    var pattern;
    var shadowShift = matchingGame.cardWidthWithoutBorder / 7;
    $(".card").each(function(index) {

        shift = matchingGame.shift[index];
        positionX = matchingGame.positionX[index];
        positionY = matchingGame.positionY[index];
        selectable = matchingGame.selectable[index];
        cardPositionX = matchingGame.cardWidthWithoutBorder * (positionX - 1) - getShiftValueX(shift);
        cardPositionY = (matchingGame.cardHeightWithoutBorder + matchingGame.cardHeightWithoutBorder * (positionY - 1)) - getShiftValueY(shift);
        cardZIndex = zIndexBase + shift;

        positionXShadow = cardPositionX - shadowShift;
        positionYShadow = cardPositionY - shadowShift;
        zIndexShadow = cardZIndex - 1;

        $(this).css({
            "left": cardPositionX,
            "top": cardPositionY,
            "z-index": cardZIndex
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
        $(this).attr("data-position-x", positionX);
        $(this).attr("data-position-y", positionY);
        $(this).attr("data-shift", shift);
        $(this).attr("data-selectable", selectable);
        $(this).fastClick(selectCard);
    });

    initMatchingCards();

    var fourthDate = new Date();
    console.log("time for painting position and shadow: " + (fourthDate - thirdDate));
    setSpriteImageForTiles();
}

function initMatchingCards() {

    var selectable;
    var pattern;
    var selectableCardsByPattern = [];

    matchingGame.selectableCards = {};
    matchingGame.matchingCards = {};

    $(".card").each(function() {
        selectable = $(this).data("selectable");
        if (selectable) {
            pattern = $(this).data("pattern");
            if (matchingGame.selectableCards[pattern] !== undefined) {
                selectableCardsByPattern = matchingGame.selectableCards[pattern];
                selectableCardsByPattern.push($(this));
            } else {
                selectableCardsByPattern = [$(this)];
                matchingGame.selectableCards[pattern] = selectableCardsByPattern;
            }
        }
    });

    updateMatchingCards();
}

function getNumberOfOverlappingCards(positionX, positionY, shift) {
    var overlappingCards = $(".card[data-position-x=" + positionX + "][data-position-y=" + positionY + "]");
    overlappingCards = overlappingCards.filter(function() {
        return (parseInt($(this).data("shift")) > shift);
    });

    return overlappingCards.length;
}

function getExistBlockingNeighbours(positionX, positionY, shift) {
    var positionXOfNeighbour;

    var blockingNeighboursWithSamePositionY = $(".card[data-position-y=" + positionY + "][data-shift=" + shift + "]");
    blockingNeighboursWithSamePositionY = blockingNeighboursWithSamePositionY.filter(function() {
        positionXOfNeighbour = $(this).data("position-x");
        return (positionXOfNeighbour < positionX || positionXOfNeighbour > positionX);
    });
    if (blockingNeighboursWithSamePositionY.length > 0) {
        return true;
    }

    return false;
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
    var positionX = selectedElement.data("position-x");
    var positionY = selectedElement.data("position-y");
    var shift = selectedElement.data("shift");

    var numberOfLeftNeighbors = getNumberOfLeftNeighbors(positionX, positionY, shift);
    var numberOfRightNeighbors = getNumberOfRightNeighbors(positionX, positionY, shift);
    var numberOfHigherOverlaps = getNumberOfHigherOverlaps(positionX, positionY, shift);

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

function getRightNeigbors(positionX, positionY, shift) {
    return $(".card").filter(function() {
        return (($(this).css("visibility") === "visible")
                && ($(this).data("position-x") - positionX === 1)
                && (Math.abs($(this).data("position-y") - positionY) < 1)
                && ($(this).data("shift") === shift));
    });
}

function getNumberOfRightNeighbors(positionX, positionY, shift) {
    return getRightNeigbors(positionX, positionY, shift).length;
}

function getLeftNeighbours(positionX, positionY, shift) {
    return $(".card").filter(function() {
        var isNeighbour = (($(this).css("visibility") === "visible")
                && (($(this).data("position-x") - positionX) === -1)
                && (Math.abs($(this).data("position-y") - positionY) < 1)
                && ($(this).data("shift") === shift));
        return isNeighbour;
    });
}

function getNumberOfLeftNeighbors(positionX, positionY, shift) {
    return getLeftNeighbours(positionX, positionY, shift).length;
}

function getBeneathNeighbors(positionX, positionY, zIndex) {
    return $(".card").filter(function() {
        return (($(this).css("visibility") === "visible") && ((parseInt($(this).css("top")) - matchingGame.cardHeightWithoutBorder) === positionY) && (parseInt($(this).css("z-index")) === zIndex) && (parseInt($(this).css("left")) === positionX));
    });
}

function getUnderlayingNeighbours(positionX, positionY, shift) {
    return $(".card").filter(function() {
        var isUnderlayingNeighbour = (($(this).css("visibility") === "visible")
                && (Math.abs($(this).data("position-y") - positionY) < 1)
                && ($(this).data("shift") - shift === -1)
                && (Math.abs($(this).data("position-x") - positionX) < 1));
        return isUnderlayingNeighbour;
    });
}

function getNumberOfHigherOverlaps(positionX, positionY, shift) {
    return $(".card").filter(function() {
        var isHigherOverlap = (($(this).css("visibility") === "visible")
                && (Math.abs($(this).data("position-y") - positionY) < 1)
                && ($(this).data("shift") > shift)
                && (Math.abs($(this).data("position-x") - positionX) < 1));
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
    removeCardsFromSelectableCards(removedCards);
    matchingGame.undoList.unshift(removedCards);

    var animatedDivs = $(".card-removed").clone().removeAttr("data-pattern data-position-x data-position-y data-shift data-selectable")
            .css("z-index", 20).removeClass("card-removed");
    $("#cards").append(animatedDivs);
    animatedDivs.addClass('animated hinge');
    animatedDivs.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).remove();
    });

    $(".card-removed").css({"visibility": "hidden"});
    $(".card-removed").removeClass("card-removed");
    updateSelectableAndMatchingCards(removedCards);
    if (isWinningGame()) {
        showWinningMessage();
    }

    function animateCards(cards) {
    }
}

function isWinningGame() {
    return (matchingGame.undoList.length * 2) === $(".card").length;
}
function removeCardsFromSelectableCards(removedCards) {
    var pattern;
    var selectableCardsByPattern;

    pattern = $(removedCards[0]).data("pattern");
    console.log("pattern to remove: " + pattern);

    selectableCardsByPattern = matchingGame.selectableCards[pattern];
    if (selectableCardsByPattern !== undefined) {
        selectableCardsByPattern.forEach(function(matchingCard) {
            console.log("remove class card-matching");
            matchingCard.removeClass("card-matching");
        });
    }
    selectableCardsByPattern = removeCardsFromArray(removedCards, selectableCardsByPattern);
    matchingGame.selectableCards[pattern] = selectableCardsByPattern;
}

function removeCardsFromArray(cardsToRemove, cards) {
    var positionXCardToRemove;
    var positionYCardToRemove;
    var shiftCardToRemove;

    var positionX;
    var positionY;
    var shift;
    var cardToRemove;
    var resultingCards = [];
    var isCardToRemove;
    console.log("cards");
    console.dir(cards);
    console.log("cardsToRemove");
    console.dir(cardsToRemove);

    if (cards === undefined) {
        return [];
    }

    cards.forEach(function(card) {
        positionX = card.data("position-x");
        positionY = card.data("position-y");
        shift = card.data("shift");
        isCardToRemove = false;
        cardsToRemove.each(function() {
            cardToRemove = $(this);
            positionXCardToRemove = cardToRemove.data("position-x");
            positionYCardToRemove = cardToRemove.data("position-y");
            shiftCardToRemove = cardToRemove.data("shift");
            console.log("Positionen von cardToRemove: " + positionXCardToRemove + ", " + positionYCardToRemove + ", " + shiftCardToRemove);
            if (positionXCardToRemove === positionX && positionYCardToRemove === positionY && shiftCardToRemove === shift) {
                isCardToRemove = true;
            }
        });
        if (!isCardToRemove) {
            resultingCards.push(card);
        }
    });

    console.log("Ergebnis: ");
    console.dir(resultingCards);
    return resultingCards;
}

function updateSelectableAndMatchingCards(removedCards) {
    var neighbours;
    var leftNeighbours;
    var rightNeighbours;
    var underlayingNeighbours;

    var positionX;
    var positionY;
    var shift;

    removedCards.each(function() {
        positionX = $(this).data("position-x");
        positionY = $(this).data("position-y");
        shift = $(this).data("shift");
        leftNeighbours = getLeftNeighbours(positionX, positionY, shift);
        rightNeighbours = getRightNeigbors(positionX, positionY, shift);
        underlayingNeighbours = getUnderlayingNeighbours(positionX, positionY, shift);

        var allNeighbours = leftNeighbours.add(rightNeighbours).add(underlayingNeighbours);
        if (neighbours !== undefined) {
            neighbours = neighbours.add(allNeighbours);
        }
        else {
            neighbours = allNeighbours;
        }
    });

    var selectable;
    var pattern;
    var selectableCardsByPattern;
    neighbours.each(function() {
        selectable = isCardSelectable($(this));
        if (!selectable) {
            removeCardsFromSelectableCards($(this));
            return;
        }
        pattern = $(this).data("pattern");
        selectableCardsByPattern = matchingGame.selectableCards[pattern];
        if (selectableCardsByPattern !== undefined) {
            console.log(selectableCardsByPattern);
            console.log("index des Objekts: " + pattern + ", boolescher Wert " + cardArrayContainsCard(selectableCardsByPattern, $(this)));
        }
        if (selectableCardsByPattern === undefined) {
            selectableCardsByPattern = [$(this)];
            matchingGame.selectableCards[pattern] = selectableCardsByPattern;
        } else if (!cardArrayContainsCard(selectableCardsByPattern, $(this))) {
            selectableCardsByPattern.push($(this));
        }
    });

    updateMatchingCards();
}

function updateMatchingCards() {
    var existsMatch = false;
    matchingGame.matchingCards = {};
    for (pattern in matchingGame.selectableCards) {
        selectableCardsByPattern = matchingGame.selectableCards[pattern];
        if (selectableCardsByPattern.length > 1) {
            existsMatch = true;
            matchingGame.matchingCards[pattern] = selectableCardsByPattern;
            selectableCardsByPattern.forEach(function(matchingCard) {
                matchingCard.addClass("card-matching");
            });
//            console.log("match: " + pattern);
        }
    }

    if (!existsMatch && !isWinningGame()) {
        showLoseMessage();
    }
}

function showLoseMessage() {
    $("div.game-buttons").slideToggle({direction: "down"}, 300);
    $("div#loseMessage").show();
}

function cardArrayContainsCard(cards, card) {
    var positionX = card.data("position-x");
    var positionY = card.data("position-y");
    var shift = card.data("shift");
    console.log("positionX: " + positionX + ", positionY: " + positionY + ", shift: " + shift);
    if (cards === undefined || cards.length === 0) {
        return false;
    }

    var containsCard = false;
    cards.forEach(function(otherCard) {
        //console.log("Vergleichsobjekt positionX: " + otherCard.data("position-x") + ", positionY: " + otherCard.data("position-y") + ", shift: " + otherCard.data("shift"));
        if (otherCard.data("position-x") === positionX && otherCard.data("position-y") === positionY && otherCard.data("shift") === shift) {
            containsCard = true;
        }
    });
    return containsCard;
}

function showWinningMessage() {
    $("div.game-buttons").slideToggle({direction: "down"}, 300);
    $("div#winningMessage").show();
}
function startNewGame() {
    $("#cards").empty();
    $("#cards").append('<div class="card"></div>');
    $("#cards").append('<div class="shadow"></div>');
    matchingGame.undoList = [];
    hideMessages();
    startGame();
}

function restartGame() {
    hideMessages();
    var numberOfRemovedPatterns = matchingGame.undoList.length;
    for (var i = 0; i < numberOfRemovedPatterns; i++) {
        undo();
    }
}

function hideMessages() {
    $("div#winningMessage").hide();
    $("div#loseMessage").hide();
}
function changeTheme(themeid) {
    if (themeid !== undefined) {
        matchingGame.theme = themeid;
    }
    else {
        if (matchingGame.theme === matchingGame.themes.length - 1)
            matchingGame.theme = 0;
        else
            matchingGame.theme = matchingGame.theme + 1;
    }


    localStorage.setItem("theme", matchingGame.theme);
    var matchingTheme = matchingGame.themes[matchingGame.theme];
    $("div#background").css("background-image", "url(images/background_" + matchingTheme + ".jpg)");
    $("div#cards").attr("data-theme", matchingTheme);
    setSpriteImageForTiles();
}

function setSpriteImageForTiles() {

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
        var pattern = (matchingGame.undoList[0]).data("pattern");
        console.log("pattern to undo: " + pattern);

        cardsToUndo.each(function(index) {
            matchingGame.selectableCards[pattern].push($(this));
            index = $(".card").index($(this));
            $(".shadow").eq(index).css({"visibility": "visible"});
        });

        (matchingGame.undoList[0]).css({"visibility": "visible"});
        updateSelectableAndMatchingCards(cardsToUndo);
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
