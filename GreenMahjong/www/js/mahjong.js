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
    
     // 2. Schicht
             2, 2, 2, 2, 2, 2,
             2, 2, 2, 2, 2, 2,
             2, 2, 2, 2, 2, 2,
             2, 2, 2, 2, 2, 2,
             2, 2, 2, 2, 2, 2,
             2, 2, 2, 2, 2, 2,
             
     // 3. Schicht
                4, 4, 4, 4,
                4, 4, 4, 4,
                4, 4, 4, 4,
                4, 4, 4, 4,
                
    // 4. Schicht
                   6, 6,
                   6, 6,
                   
    // 5. Schicht
                    8
];


matchingGame.borderWidthRight = 3;
matchingGame.borderWidthBelow = 3;
//matchingGame.cardWidth = 80;
matchingGame.cardWidth = 48;
matchingGame.cardWidthWithoutBorder = matchingGame.cardWidth - matchingGame.borderWidthRight;

//matchingGame.cardHeight = 99;
matchingGame.cardHeight = 60;
matchingGame.cardHeightWithoutBorder = matchingGame.cardHeight - matchingGame.borderWidthBelow;

matchingGame.shiftValue = 3;


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
    
    ubuntuUI.button('newGameButton').click(function(e) {
        e.stopImmediatePropagation();
        startNewGame();
    });
    ubuntuUI.button('replayGameButton').click(function(e) {
        e.stopImmediatePropagation();
        restartGame();
    });
    ubuntuUI.button('undoButton').click(function(e) {
        e.stopImmediatePropagation();
        undo();
    });

    // var backButton = document.querySelector("li a[data-role=\"back\"]");
    startGame();
}


function startGame() {
     shuffleCards();
    
    var numberOfCards = matchingGame.deck.length;
    matchingGame.cardWidth = parseInt($(".card").css('width'));
    matchingGame.cardWidthWithoutBorder = matchingGame.cardWidth - matchingGame.borderWidthRight;
    matchingGame.cardHeight = parseInt($(".card").css('height'));
    matchingGame.cardHeightWithoutBorder = matchingGame.cardHeight - matchingGame.borderWidthBelow;
    var zIndexBase = 8;
    
    for (var i = 0; i < (numberOfCards - 1); i++) {
        $(".card:first-child").clone().appendTo("#cards");
    }

    $(".card").each(function(index) {
        
        var positionX = matchingGame.cardWidthWithoutBorder * (matchingGame.positionX[index] - 1);
        var positionY = (matchingGame.cardHeightWithoutBorder + matchingGame.cardHeightWithoutBorder * (matchingGame.positionY[index] - 1)) - (matchingGame.shift[index] * matchingGame.shiftValue);
        var zIndex = zIndexBase + matchingGame.shift[index];
        
        $(this).css({
            "left": positionX,
            "top": positionY,
            "z-index": zIndex
        });
        
        paintShadows($(this), positionX, positionY, zIndex);
        
        var pattern = matchingGame.deck[index];
        $(this).addClass(pattern);       
        pattern = getCardPattern(pattern);
        $(this).attr("data-pattern", pattern);
        $(this).click(selectCard);
    });
}

function getCardPattern(cardName){
    
    var cardJahreszeiten = ["cardFruehling", "cardSommer", "cardHerbst", "cardWinter"];
    var cardBlumen = ["cardBambus", "cardPflaume", "cardOrchidee", "cardChrysantheme"];
    
    if (cardJahreszeiten.indexOf(cardName) >= 0){
        return "cardJahreszeiten";
    } else if (cardBlumen.indexOf(cardName) >= 0){
        return "cardBlumen";
    }
    
    return cardName;
}

function shuffleCards(){
    matchingGame.deck = _.shuffle(matchingGame.deck);
}

function shuffle() {
    return 0.5 - Math.random();
}

function selectCard() {
    if (!isCardSelectable($(this))){
        $(this).addClass("card-nonselectable");
        setTimeout(400);
        $(this).removeClass("card-nonselectable");
        return;
    }
    
    if ($(this)[0] === $(".card-selected")[0]){
        $(".card-selected").removeClass("card-selected");
        return;
    }
    
    $(this).addClass("card-selected");
    if ($(".card-selected").size() === 2) {
        setTimeout(checkPattern, 200);
    }
}

function isCardSelectable(selectedElement){
    var positionX = parseInt(selectedElement.css("left"));
    var positionY = parseInt(selectedElement.css("top"));
    var zIndex = parseInt(selectedElement.css("z-index"));
    var shifting = zIndex * matchingGame.shiftValue;
    
    var numberOfLeftNeighbors = getNumberOfLeftNeighbors(positionX, positionY, zIndex);   
    var numberOfRightNeighbors = getNumberOfRightNeighbors(positionX, positionY, zIndex);
    var numberOfHigherOverlaps = getNumberOfHigherOverlaps(positionX, positionY, zIndex, shifting);
    
    return ((numberOfLeftNeighbors === 0 || numberOfRightNeighbors === 0) && numberOfHigherOverlaps === 0);
}

function getNumberOfAboveNeighbors(positionX, positionY, zIndex){
    return $(".card").filter(function() {
    return (($(this).css("visibility") === "visible") && ((parseInt($(this).css("top")) + matchingGame.cardHeightWithoutBorder) === positionY) && (parseInt($(this).css("z-index")) === zIndex) && (parseInt($(this).css("left")) === positionX));
    }).length;
}

function getRightNeigbors(positionX, positionY, zIndex){
    return $(".card").filter(function() {
    return (($(this).css("visibility") === "visible") && Math.abs(parseInt($(this).css("top")) - positionY) < matchingGame.cardHeightWithoutBorder) && (parseInt($(this).css("z-index")) === zIndex) && (parseInt($(this).css("left")) - matchingGame.cardWidthWithoutBorder === positionX);
    });
}

function getNumberOfRightNeighbors(positionX, positionY, zIndex){
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

function getBeneathNeighbors(positionX, positionY, zIndex){
    return $(".card").filter(function() {
    return (($(this).css("visibility") === "visible") && ((parseInt($(this).css("top")) - matchingGame.cardHeightWithoutBorder) === positionY) && (parseInt($(this).css("z-index")) === zIndex) && (parseInt($(this).css("left")) === positionX));
    });
}

function getNumberOfHigherOverlaps(positionX, positionY, zIndex, shifting) {
    return $(".card").filter(function() {
        var shiftingOfActualCard = parseInt($(this).css("z-index")) * matchingGame.shiftValue;
        var shiftingDifference = Math.abs(shifting - shiftingOfActualCard);
        var isHigherOverlap = (($(this).css("visibility") === "visible") 
                && (Math.abs(parseInt($(this).css("top")) - positionY) < (matchingGame.cardHeightWithoutBorder - shiftingDifference)) 
                && (parseInt($(this).css("z-index")) > zIndex)
                && (Math.abs(parseInt($(this).css("left")) - positionX) < matchingGame.cardWidthWithoutBorder));
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
    var removedCards = $(".card-removed");
    matchingGame.undoList.unshift(removedCards);
    $(".card-removed").css({"visibility": "hidden"});   
    paintShadowsForNeighbors($(".card-removed"));   
    $(".card-removed").removeClass("card-removed");
}


function paintShadowsForNeighbors(elements){
    elements.each(function() {
        var positionX = parseInt($(this).css("left"));
        var positionY = parseInt($(this).css("top"));
        var zIndex = parseInt($(this).css("z-index"));
        var rightNeigbors = getRightNeigbors(positionX, positionY, zIndex);
        var beneathNeigbors = getBeneathNeighbors(positionX, positionY, zIndex);
        
        rightNeigbors.each(function() {
            var posX = parseInt($(this).css("left"));
            var posY = parseInt($(this).css("top"));
            var zIdx = parseInt($(this).css("z-index"));
            paintShadows($(this), posX, posY, zIdx);
        });
        
        beneathNeigbors.each(function() {
            var posX = parseInt($(this).css("left"));
            var posY = parseInt($(this).css("top"));
            var zIdx = parseInt($(this).css("z-index"));
            paintShadows($(this), posX, posY, zIdx);
        });
    });
}

function paintShadows(element, positionX, positionY, zIndex){   
    var numberOfLeftNeighbors = getNumberOfLeftNeighbors(positionX, positionY, zIndex);
        if (numberOfLeftNeighbors === 0){
            element.addClass("cardWithoutLeftNeighbor");
        } else {
            element.removeClass("cardWithoutLeftNeighbor");
        }
        
        var numberOfAboveNeighbors = getNumberOfAboveNeighbors(positionX, positionY, zIndex);
        if (numberOfAboveNeighbors === 0){
            element.addClass("cardWithoutAboveNeighbor");
        }  else {
            element.removeClass("cardWithoutAboveNeighbor");
        }
}


function startNewGame() {
    $("#cards").empty();
    $("#cards").append('<div class="card"></div>');
    startGame();
}


function restartGame() {
    var numberOfRemovedPatterns = matchingGame.undoList.length;
    for (var i = 0; i < numberOfRemovedPatterns; i++) {
        undo();
    }
}


function undo() {
    if (matchingGame.undoList.length >= 1) {
        (matchingGame.undoList[0]).css({"visibility": "visible"});
        paintShadowsForNeighbors((matchingGame.undoList[0]));
        matchingGame.undoList[0].each(function() {
            var positionX = parseInt($(this).css("left"));
        });
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