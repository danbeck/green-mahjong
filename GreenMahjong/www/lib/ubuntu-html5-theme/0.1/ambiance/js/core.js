/*
 * Copyright (C) 2013 Adnane Belmadiaf <daker@ubuntu.com>
 * License granted by Canonical Limited
 *
 * This file is part of ubuntu-html5-ui-toolkit.
 *
 * This package is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 3 of the
 * License, or
 * (at your option) any later version.

 * This package is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU Lesser General Public
 * License along with this program. If not, see
 * <http://www.gnu.org/licenses/>
 */

/**
 * @module UbuntuUI
 */

/**
 * UbuntuUI is the critical Ubuntu HTML5 framework class. You need to construct an UbuntuUI object and initialize it to have an Ubuntu HTML5 app. You then use this object to access Ubuntu HTML5 objects (and object methods) that correspond to the Ubuntu HTML5 DOM elements.

Note: The UbuntuUI object is "UI" in all API doc examples.
 * @class UbuntuUI
 * @constructor
 * @example
      var UI = new UbuntuUI();
      window.onload = function () {
        UI.init();
        UI.pagestack.push('pageid');
        [...]
      };
 */
var UbuntuUI = (function () {

    PAGESTACK_BACK_ID = 'ubuntu-pagestack-back';

    function __hasPageStack(document) {
        return document.querySelectorAll("[data-role='pagestack']") != null;
    };

    function __hasTabs(document) {
         return document.querySelectorAll("[data-role='tabs']") != null;
    };

    function __createBackButtonListItem(d) {
        var a = d.createElement('a');
        a.setAttribute('href', '#');
        a.setAttribute('data-role', 'back');

        a.setAttribute('id', PAGESTACK_BACK_ID + '-' + Math.random());

        var img = d.createElement('img');
        img.setAttribute('src', '/usr/share/ubuntu-html5-ui-toolkit/0.1/ambiance/img/back@18.png');

        // TODO: translation?
        img.setAttribute('alt', 'Back');
        a.appendChild(img);
        var span = d.createElement('span');
        var text = d.createTextNode('Back');
        span.appendChild(text);
        a.appendChild(span);

        var li = d.createElement('li');
        li.appendChild(a);

        return li;
    };

    function __appendBackButtonToFooter(self, d, footer) {
        var li = __createBackButtonListItem(d);
        var ul = null;
        if (footer.querySelectorAll('ul').length == 0) {
            ul = d.createElement('ul');
        } else {
            ul = footer.querySelectorAll('ul')[0];
        }
        ul.appendChild(li);

        if (footer.querySelectorAll('nav').length == 0) {
            var nav = d.createElement('nav');
            nav.appendChild(ul);
            footer.appendChild(nav);
        }

        var a = li.querySelector('a');
        a.onclick = function (e) {
            if (self._pageStack.depth() > 1){
                self._pageStack.pop();
            }
            e.preventDefault();
        };
    }

    function UbuntuUI() {
        var U = this;
        U.isTouch = "ontouchstart" in window;
        U.touchEvents = {
            touchStart: ['touchstart','mousedown'],
            touchMove: ['touchmove','mousemove'],
            touchEnd: ['touchend','mouseup'],
            touchLeave: ['mouseleave'],
        };
    };

    UbuntuUI.prototype = {
        __setupPageStack: function (d) {
            // TODO validate no more than one page stack etc.
            // d.querySelectorAll("[data-role='pagestack']")

            // FIXME: support multiple page stack & complex docs?
            var pagestacks = d.querySelectorAll("[data-role='pagestack']");
            if (pagestacks.length == 0)
                return;
            var pagestack = pagestacks[0];

            this._pageStack = new Pagestack(pagestack);

            var pages = pagestack.querySelectorAll("[data-role='page']");
            if (pages.length > 0) {
                this._pageStack.push(pages[0].getAttribute('id'));
            }

            var immediateFooters = [].filter.call(pagestack.children,
                function (e) {
                    return e.nodeName.toLowerCase() === 'footer';
                });
            if (immediateFooters.length !== 0) {
                // There is a main footer for the whole pagestack,
                // FIXME: only consider the first (there should be only 1 anyway)
                var footer = immediateFooters[0];
                __appendBackButtonToFooter(this, d, footer);
                return;
            }

            // try to find subpages & append back button there
            for (var idx = 0; idx < pages.length; ++idx) {
                var page = pages[idx];

                // TODO: only add the footer for now, but need to sync w/ title
                //  , properties & header
                var footer;
                if (page.querySelectorAll("[data-role='footer']").length == 0) {
                    footer = d.createElement('footer');
                    footer.setAttribute('data-role', 'footer');
                    footer.setAttribute('class', 'revealed');

                    page.appendChild(footer);
                } else {
                    // TODO: validate footer count: should be 1 footer
                    footer = page.querySelectorAll("[data-role='footer']")[0];
                }
                __appendBackButtonToFooter(this, d, footer);
            }
        },

        __setupPage: function (document) {
            if (this._pageStack != null)
                return;
            if (__hasPageStack(document)) {
                this.__setupPageStack(document);
            }
        },

        __getTabInfosDelegate: function () {
            var self = this;
            var __createTouchObject = function(event) {
                return {
                    identifier: event.timeStamp,
                    target: event.target,
                    screenX: event.screenX,
                    screenY: event.screenY,
                    clientX: event.clientX,
                    clientY: event.clientY,
                    pageX: event.pageX,
                    pageY: event.pageY,
                };
            };
            return {
                get isTouch() {
                    return self.isTouch;
                },
                registerTouchEvent: function(eventId,
                                             element,
                                             callback) {
                    if ( ! eventId
                         || typeof(eventId) !== 'object'
                         || eventId.length === 0) {
                        console.log('Invalid or empty eventId for registerTouchEvent: ' + eventId.toString() + ' ' + typeof(eventId));
                        return;
                    }

                    for (var i = 0; i < eventId.length; ++i) {
                        element.addEventListener(eventId[i], callback);
                    }
                },
                touchEvents: {
                    get touchStart() {
                        return self.touchEvents.touchStart;
                    },
                    get touchMove() {
                        return self.touchEvents.touchMove;
                    },
                    get touchEnd() {
                        return self.touchEvents.touchEnd;
                    },
                    get touchLeave() {
                        return self.touchEvents.touchLeave;
                    },
                },
                translateTouchEvent: function(event) {
                    var touch = __createTouchObject(event);
                    var translatedTouchEvent = event;
                    translatedTouchEvent.changedTouches = [touch];
                    // keep the properties even for e.g. 'touchend'
                    translatedTouchEvent.touches = [touch];
                    translatedTouchEvent.targetTouches = [touch];
                    return translatedTouchEvent;
                }
            };
        },

        __setupToolbars: function(document) {
            var toolbars =
                document.querySelectorAll('footer[data-role="footer"]');
            for (var i = 0; i < toolbars.length; ++i) {
                var id = toolbars[i].getAttribute('id');
                if ( !id)
                    continue;
                var toolbar = new Toolbar(
                    id, this.__getTabInfosDelegate());
            }
        },

        __setupTabs: function (document) {
            if (this._tabs != null)
                return;
            if (__hasTabs(document)) {
                if (typeof Tabs != 'undefined' && Tabs) {
                    var apptabsElements = document.querySelectorAll('[data-role=tabs]');
                    if (apptabsElements.length == 0)
                        return;
                    this._tabs = new Tabs(apptabsElements[0],
                                          this.__getTabInfosDelegate());

                    this._tabs.onTabChanged(function (e) {
                        if (!e || !e.infos)
                            return;
                        if (e.infos.tabId) {
                            (new Tab(e.infos.tabId)).activate();
                        }
                    }.bind(this));
                }
             }
        },

        /**
         * Required call that initializes the UbuntuUI object
         * @method {} init
         */
        init: function () {
            this.__setupTabs(document);
            this.__setupPage(document);
            this.__setupToolbars(document);
        },

        i18n: function () {
            if (typeof i18n != 'undefined' && i18n ) {
                return new i18n();
            }
            else {
                console.error('i18n error.');
            }
        },

        /**
         * Gets an Ubuntu Page object
         * @method page
         * @param {ID} id - The element's id attribute
         * @return {Page} - The Page with the specified id
         */
        page: function (id) {
            if (typeof Page != 'undefined' && Page ) {
                return new Page(id);
            }
            else {
                console.error('Could not find the Page element. You might be missing the "page.js" Page definition script. Please add a <script> declaration to include it.');
            }
        },

        /**
         * Gets an Ubuntu Tab object
         * @method tab
         * @param {ID} id - The element's id attribute
         * @return {Tab} - The Tab with the specified id
         */
        tab: function (id) {
            if (typeof Tab != 'undefined' && Tab ) {
                return new Tab(id);
            }
            else {
                console.error('Could not find the Tab element. You might be missing the "tab.js" Tab definition script. Please add a <script> declaration to include it.');
            }
        },

        /**
         * Gets an Ubuntu Shape object
         * @method shape
         * @param {ID} id - The element's id attrubute
         * @return {Shape} - The Shape with the specified id
         */
        shape: function (id) {
            if (typeof Shape != 'undefined' && Shape ) {
                return new Shape(id);
            }
            else {
                console.error('Could not find the Shape element. You might be missing the "shape.js" Shape definition script. Please add a <script> declaration to include it.');
            }
        },

        /**
         * Gets an Ubuntu Button object
         * @method button
         * @param {ID} id - The element's id attribute
         * @return {Button} - The Button with the specified id
         */
        button: function (id) {
            if (typeof Button != 'undefined' && Button) {
                return new Button(id);
            }
            else {
                console.error('Could not find the Button element. You might be missing the "button.js" Button definition script. Please add a <script> declaration to include it.');
            }
        },

        /**
         * Gets an Ubuntu Progress object
         * @method progress
         * @param {ID} id - The element's id attrubute
         * @return {Progress} - The Progress with the specified id
         */
        progress: function (id) {
            if (typeof Progress != 'undefined' && Progress) {
                return new Progress(id);
            }
        },

        /**
         * Gets an Ubuntu Dialog object
         * @method dialog
         * @param {ID} id - The element's id attribute
         * @return {Dialog} - The Dialog with the specified id
         */
        dialog: function (id) {
            if (typeof Dialog != 'undefined' && Dialog) {
                return new Dialog(id);
            }
            else {
                console.error('Could not find the Dialog element. You might be missing the "dialog.js" Dialog definition script. Please add a <script> declaration to include it.');
            }
        },

        /**
         * Gets an Ubuntu Popover object
         * @method popover
         * @param {Element} el - The element to which the Popover's position is relative
         * @param {ID} id - The element's id attribute
         * @return {Popover} - The Popover with the specified id
         */
        popover: function (elem, id) {
            if (typeof Popover != 'undefined' && Popover) {
                return new Popover(elem, id);
            }
            else {
                console.error('Could not find the Popover element. You might be missing the "popover.js" Popover definition script. Please add a <script> declaration to include it.');
            }
        },

        /**
         * Gets an Ubuntu Header object
         * @method header
         * @param {ID} id - The element's id attribute
         * @return {Header} - The Header with the specified id
         */
        header: function (id) {
            if (typeof Header != 'undefined' && Header) {
                return new Header(id);
            }
            else {
                console.error('Could not find the Header element. You might be missing the "header.js" Header definition script. Please add a <script> declaration to include it.');
            }
        },

        /**
         * Gets an Ubuntu Toolbar object
         * @method toolbar
         * @param {ID} id - The element's id attribute
         * @return {Toolbar} - The Toolbar with the specified id
         */
        toolbar: function (id) {
            if (typeof Toolbar != 'undefined' && Toolbar) {
                return new Toolbar(id, this.__getTabInfosDelegate());
            }
            else {
                console.error('Could not find the Toolbar element. You might be missing the "toolbar.js" Toolbar definition script. Please add a <script> declaration to include it.');
            }
        },

        /**
         * Gets an Ubuntu List
         * @method list
         * @param {Selector} selector - A selector that JavaScript querySelector method understands
         * @return {List}
         */
        list: function (selector) {
            if (typeof List != 'undefined' && List) {
                return new List(selector);
            }
            else {
                console.error('Could not find the List element. You might be missing the "list.js" List definition script. Please add a <script> declaration to include it.');
            }
        },

        /**
         * Gets an Ubuntu Option Selector
         * @method optionselector
         * @param {ID} id - The element's id attribute
         * @param {Boolean} expanded - Specifies whether the list is always expanded
         * @param {Boolean} multiSelection - If multiple choice selection is enabled the list is always expanded.
         * @return {OptionSelector}
         */
        optionselector: function (id, expanded, multiSelection) {
            if (typeof OptionSelector != 'undefined' && OptionSelector) {
                return new OptionSelector(id, expanded, multiSelection);
            }
            else {
                console.error('Could not find the OptionSelector element. You might be missing the "option-selector.js" OptionSelector definition script. Please add a <script> declaration to include it.');
            }
        },

        /**
         * Gets the DOM element from a given selector
         * @method element
         * @return {Element} - The DOM element
         * Gets the HTML element associated with an Ubuntu HTML5 JavaScript object
         */
        element: function(selector) {
            return document.querySelector(selector);
        },

        /**
         * Gets this UbuntuUI's single Pagestack object
         * @method pagestack
         * @return {Pagestack} - The Pagestack
         */
        get pagestack() {
            return this._pageStack;
        },

        /**
         * Gets this UbuntuUI's single Tabs object
         * @method tabs
         * @return {Tabs} - The Tabs
         */
        get tabs() {
            return this._tabs;
        },

    };

    return UbuntuUI;

})();
