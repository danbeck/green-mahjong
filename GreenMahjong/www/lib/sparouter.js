
window.sparouter = (function () {

    function RootingError(message) {
        this.message = message;
        this.toString = function () {
            "The following error occured: " + message;
        };
    }

    function Sparouter(newurl, oldurl) {
        this.newurl = newurl;
        this.oldurl = oldurl;
        this.pagesListeners = {};
    }

    Sparouter.prototype.changePage = function (page) {
        this.allPagesInvisible();
        this.showPage(page);
    };

    Sparouter.prototype.showPage = function (page) {
        this.page(page).style.display = "block";
    };

    Sparouter.prototype.hidePage = function (page) {
        this.page(page).style.display = "none";
    };

    Sparouter.prototype.page = function (page) {
        return window.document.querySelector("div[data-page=" + page + "]");
    };

    Sparouter.prototype.allPagesInvisible = function () {
        var datapages = window.document.querySelectorAll("div[data-page]");
        for (var i = 0; i < datapages.length; i++) {
            datapages[i].style.display = "none";
        }
    };

    Sparouter.prototype.onpage = function (page, callback) {
        this.pagesListeners[page] = callback;
        return this;
    };

    Sparouter.prototype.init = function (callback) {
        this.initpage = callback();

        return this;
    };

    Sparouter.prototype.start = function () {
        var that = this;

        initRouter();
        handleLinks();
        handleBackLinks();

        function initRouter() {
            if (this.initpage)
                window.location.replace("#" + this.initpage());
            else {
                loadDefaultPage();
            }
        }

        function loadDefaultPage() {
            var pages = window.document.querySelectorAll("div[data-page]");
            if (pages.length > 0) {
                var hash = pages[0].getAttribute("data-page");
                window.location.replace("#" + hash);
            }
            else
                throw new RootingError("No div[data-page] elements exist in the HTML");

        }
        function handleLinks() {
            var aLinks = window.document.querySelectorAll("a[href^='#']");
            for (var i = 0; i < aLinks.length; i++) {
                aLinks[i].addEventListener("click", function (e) {
                    e.preventDefault();
                    var hash = this.getAttribute("href");
                    var options = this.getAttribute("data-page-options");
                    var effect = this.getAttribute("data-transition-effect");
                    that.goToHash = hash;
                    that.options = options;
                    that.transitionEffect = effect;
                    if (this.hasAttribute("data-remove-from-browser-history")) {
                        window.location.replace(hash);
                    }
                    else {
                        window.location.hash = hash;
                    }
                });
            }
        }
        function handleBackLinks() {
            var backbuttons = window.document.querySelectorAll("a[data-back]");
            for (var i = 0; i < backbuttons.length; i++) {
                addBackButtonListener(backbuttons[i]);
            }

            function addBackButtonListener(backButton) {
                backButton.addEventListener("click", function (e) {
                    e.preventDefault();
                    var options = this.getAttribute("data-page-options");
                    var effect = this.getAttribute("data-transition-effect");
                    var dataBack = backButton.getAttribute("data-back");
                    if (dataBack !== "") {
                        var dataBackAsInt = parseInt(dataBack);
                        that.options = options;
                        that.transitionEffect = effect;

//                        for (; dataBackAsInt !== 0; dataBackAsInt++) {
//                        history.go(dataBackAsInt);
//                            console.log("back!");
//                        history.back();
//                        history.back();
                        history.go(dataBackAsInt);
//
//                        }
                    }
                });


            }
        }

        window.onpopstate = function (event) {
            console.log("onpopstate: ", +document.location + ", state: " + JSON.stringify(event.state));
        };
        window.onhashchange = function (event) {
            console.log("onhashchange: ", +document.location + ", hash:" + document.location.hash +
                    ", oldurl:" + event.oldURL + ", newurl:" + event.newURL + ", state: " + JSON.stringify(event.state));

            event.preventDefault();
            if (wasBackButtonPressed()) {
                // Browser-back
                console.log("back button pressed!");
            }
            changePageOrCallPageListener(document.location.hash.substring(1));

            function defaultChangePageBehaviorOveridden(hash) {
                return that.pagesListeners[hash];
            }
            function changePageOrCallPageListener(hash) {
                if (defaultChangePageBehaviorOveridden(hash))
                    callCustomChangePageListener(hash);
                else
                    that.changePage(hash);

            }
            function wasBackButtonPressed() {
                // in this case, the gotToHash local variable which was saved in the "click"-phase
                // of the rooter is the same as the URL we are going to.
                return document.location.hash !== that.goToHash;
            }

            function callCustomChangePageListener(hash) {
                var callbackfunc = that.pagesListeners[hash];
                var newPage = callbackfunc({hash: hash, effect: null, options: that.options});
                if (newPage)
                    that.changePage(newPage);
            }
        };
    };

    var sparouter = function () {

        return new Sparouter();
    };
    return sparouter;

}());
