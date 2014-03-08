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
 * One of the navigation pattern that can be used within an Ubuntu App is the flat navigation. Tabs are the standard way to provide such a navigation pattern from within your application.

Tabs are defined from within the Header part of your application HTML. See the Header class for more information.

Declare the Header and Tabs in HTML as a direct child of the top level Page as a sibling to the content div.

 * @class Tabs
 * @constructor
 * @namespace UbuntuUI
 * @example
      <body>
        <div data-role="mainview">

          <header data-role="header">
            <ul data-role="tabs">
              <li data-role="tabitem" data-page="main">
                Main
              </li>
              <li data-role="tabitem" data-page="page2">
                Two
              </li>
            </ul>
          </header>

          <div data-role="content">
	    <div data-role="tab" id="main">
              [...]
	    </div>

	    <div data-role="tab" id="page2">
              [...]
	    </div>
          </div>

        </div>
      </body>

      JavaScript:
      UI.tabs.METHOD();
*/
var Tabs = (function () {
    var pageX,
        pageY,
        isScrolling,
        deltaX,
        deltaY,
        offsetX,
        resistance,
        tabsWidth,
        activeTab,
        navigationTimer,
        t2,
        startTimestamp;

    var STATES = {
        basic: 0,
        transitioning_to_navigation: 1,
        navigating: 2,
    };
    var state = STATES.basic;

    function Tabs (tabs, touchInfoDelegate) {
        if (tabs == null || touchInfoDelegate == null) {
            return;
        }
        this._touchDown = false;
        this._tabs = tabs;

        this._infos = {
            width: this.__getTabHeadersWidth(),
            count: this._tabs.querySelectorAll('li').length
        };
        this._touchInfoDelegate = touchInfoDelegate;

        var touchEvents = touchInfoDelegate.touchEvents;

        touchInfoDelegate.registerTouchEvent(
            touchEvents.touchStart,
            this._tabs,
            this.__onTouchStart.bind(this));

        touchInfoDelegate.registerTouchEvent(
            touchEvents.touchMove,
            this._tabs,
            this.__onTouchMove.bind(this));

        touchInfoDelegate.registerTouchEvent(
            touchEvents.touchEnd,
            this._tabs,
            this.__onTouchEnd.bind(this));

        // initialize default page
        this.__setupInitialTabVisibility();
    };

    Tabs.prototype = {
        /**
         * Return the index of the selected tab
         * @property selectedTabIndex
         * @return {Integer} - The index of the element in the list of tabs or -1
         */
        get selectedTabIndex() {
            return [].prototype.slice.call(this._tabs.querySelector('ul').children).indexOf(activeTab);
        },

        /**
         * Return the page associated with the currently selected tab
         *
         * @deprecated
         *
         * @property currentPage
         * @return {Element} - Page DOM element associated with the currently selected tab or null
         */
        get currentPage() {
            return this.selectedTab ? this.selectedTab.querySelector('page') : null;
        },

        /**
         * Return the currently selected tab element
         *
         * @property selectedTab
         * @return {Element} - The currently selected element or null
         */
        get selectedTab() {
            var selected = null;
            if (activeTab) {
                try {
                    selected = document.getElementBydId(activeTab.getAttribute('data-page'));
                }
                catch(e) {};
            }
            return selected;
        },

        /**
         * Return the number of tab elements in the header
         * @property count
         * @return {Integer} - Number of tab elements
         */
        get count() {
            return this.tabChildren.length;
        },

        /**
         * Return the list of DOM elements of the tab
         *
         * @deprecated
         *
         * @property tabChildren
         * @return {Elements} - List of DOM elements in the tab
         */
        get tabChildren() {
            return this._tabs.querySelectorAll('li');
        },

        /**
         * @private
         */
        __setupInitialTabVisibility: function() {
            var tab = this._tabs.querySelector('[data-role="tabitem"]:first-child');
            tab.classList.add('active');
            var updateDisplayStyle = function(tab, value) {
                var targetPage = document.getElementById(tab.getAttribute('data-page'));
                if (targetPage)
                    targetPage.style.display=value;
            };
            updateDisplayStyle(tab, 'block');
            [].slice.
                call(this._tabs.querySelectorAll('[data-role="tabitem"]:not(:first-child)')).
                forEach(function(element) {
                    updateDisplayStyle(element, 'none');
                });
        },

        /**
         * @private
         */
        __getScroll: function () {
            var translate3d = this._tabs.style.webkitTransform.match(/translate3d\(([^,]*)/);
            return parseInt(translate3d ? translate3d[1] : 0)
        },

        /**
         * @private
         */
        __getTabHeadersWidth: function() {
            return Array.prototype.slice.call(document.querySelectorAll('header li')).reduce(function(prev, cur) { return prev + cur.clientWidth;}, 0);
        },

        /**
         * @private
         */
        __getHeaderWidth: function() {
            return this._tabs.clientWidth;
        },

        /**
         * @private
         */
        __clearInternalState: function() {
            if (navigationTimer) window.clearTimeout(navigationTimer);
            if (t2) window.clearTimeout(t2);
            navigationTimer = undefined;
            t2 = undefined;
            isScrolling = undefined;
            tabsWidth = this._tabs.offsetWidth;
            resistance = 10;
            startTimestamp = 0;
        },

        /**
         * @private
         */
        __onTouchStart: function (e) {
            if (!this._tabs) return;

            e.preventDefault();

            this.__clearInternalState();

            if (state === STATES.basic) {
                state = STATES.transitioning_to_navigation;
                this.__showNavigation();
            }

            var _e = this._touchInfoDelegate.translateTouchEvent(e);
            pageX = _e.touches[0].pageX;
            pageY = _e.touches[0].pageY;

            startTimestamp = _e.timeStamp;

            this._tabs.style['-webkit-transition-duration'] = 0;

            this._touchDown = true;
        },

        /**
         * @private
         */
        __onTouchMove: function (e) {
            if (!this._touchDown) {
                return;
            }

            e.preventDefault();

            var _e = this._touchInfoDelegate.translateTouchEvent(e);
            deltaX = _e.touches[0].pageX - pageX;
            deltaY = _e.touches[0].pageY - pageY;

            // TODO: account for DPR
            var MIN_JITTER_THRESHOLD = 20;

            var plusDeltaX = Math.abs(deltaX);
            var plusDeltaY = Math.abs(deltaY);

            // Account for clicks w/ slight touch jitter
            isScrolling = plusDeltaY > plusDeltaX &&
                plusDeltaY > MIN_JITTER_THRESHOLD;
            if (isScrolling) return;

            offsetX = (deltaX / resistance) + this.__getScroll();

            var firstTab = this._tabs.querySelector('li:first-child');
            var maxRightScrollReached = 
                firstTab.getBoundingClientRect().left >= 0 &&
                deltaX > 0;

            var lastTab = this._tabs.querySelector('li:last-child');
            var maxLeftScrollReached = 
                lastTab.getBoundingClientRect().right <= this.__getHeaderWidth() &&
                deltaX < 0;

            if (!maxRightScrollReached && !maxLeftScrollReached) {
                this._tabs.style.webkitTransform = 'translate3d(' + offsetX + 'px,0,0)';
            }
        },

        /**
         * @private
         */
        __onTouchEnd: function (e) {
            if (!this._tabs || isScrolling) return;

            e.preventDefault();
            this._touchDown = false;

            var _e = this._touchInfoDelegate.translateTouchEvent(e);

            var MIN_JITTER_THRESHOLD = 20;
            if (state === STATES.transitioning_to_navigation) {
                state = STATES.navigating;
            }
            else if (state === STATES.navigating &&
                     Math.abs((_e.changedTouches[0].pageX - pageX)) < MIN_JITTER_THRESHOLD) {
                this.__onClicked(_e);
                // Timer should have been cancelled, back to basic
                state = STATES.basic;
            }

            var self = this;
            navigationTimer = window.setTimeout(function () {
                self.__endNavigation();
                state = STATES.basic;
            }, 3000);
        },

        /**
         * @private
         */
        __endNavigation: function () {
            if (state !== STATES.navigating) return;

            var activeTab = document.querySelector('[data-role="tabitem"].active');
            if (! activeTab) return;

            var offsetX = activeTab.offsetLeft;
            this._tabs.style['-webkit-transition-duration'] = '.3s';
            this._tabs.style.webkitTransform = 'translate3d(-' + offsetX + 'px,0,0)';

            [].forEach.call(document.querySelectorAll('[data-role="tabitem"]:not(.active)'), function (el) {
                el.classList.toggle('inactive');
            });
        },

        /**
         * @private
         */
        __showNavigation: function () {
            if (state !== STATES.transitioning_to_navigation) return;

            // TODO constraint a bit the selector
            [].forEach.call(document.querySelectorAll('[data-role="tabitem"]:not(.active)'), function (el) {
                el.classList.toggle('inactive');
            });
        },

        /**
         * @private
         */
        __updateActiveTab: function(newActiveTab, oldActiveTab) {
            // TODO avoid reflow
            oldActiveTab.classList.remove('inactive');
            oldActiveTab.classList.remove('active');
            newActiveTab.classList.remove('inactive');
            newActiveTab.classList.add('active');
        },

        /**
         * @private
         */
        __onTouchLeave: function (e) {},

        /**
         * @private
         */
        __dispatchTabChangedEvent: function (tabId) {
            this._evt = document.createEvent('Event');
            this._evt.initEvent('tabchanged',true,true);
            this._evt.infos = {tabId: tabId};
            this._tabs.dispatchEvent(this._evt);
        },

        /**
         * @private
         */
        __onClicked: function (e) {
            if (state !== STATES.navigating)
                return;
            if (e.changedTouches.length === 0)
                return;
            var touch = e.changedTouches[0];
            var selectedTab = document.elementFromPoint(touch.pageX, touch.pageY);
            if (selectedTab == null)
                return;
            if (selectedTab.getAttribute("data-role") !== 'tabitem')
                return;
            if ((selectedTab.className).indexOf('inactive') > -1) {
                window.clearTimeout(t2);

                activeTab = this._tabs.querySelector('[data-role="tabitem"].active');
                offsetX = this.offsetLeft;
                this._tabs.style['-webkit-transition-duration'] = '.3s';
                this._tabs.style.webkitTransform = 'translate3d(-' + offsetX + 'px,0,0)';

                this.__updateActiveTab(selectedTab, activeTab);

                [].forEach.call(this._tabs.querySelectorAll('[data-role="tabitem"]:not(.active)'), function (e) {
                    e.classList.remove('inactive');
                });

                var targetPageId = selectedTab.getAttribute('data-page');
                this.activate(targetPageId);
                this.__dispatchTabChangedEvent(targetPageId);
            } else {

                [].forEach.call(this._tabs.querySelectorAll('[data-role="tabitem"]:not(.active)'), function (el) {
                    el.classList.toggle('inactive');
                });
                t2 = window.setTimeout(function () {
                    [].forEach.call(this._tabs.querySelectorAll('[data-role="tabitem"]:not(.active)'), function (el) {
                        el.classList.toggle('inactive');
                    });
                }, 3000);
            }
            e.preventDefault();
        },

        /**
         * @private
         */
        activate: function (id) {
            if (!id || typeof (id) !== 'string')
                return;
            activeTab = this._tabs.querySelector('[data-page="'+ id +'"]');
            if (!activeTab)
                return;

            [].forEach.call(this._tabs.querySelectorAll('[data-role="tabitem"]'), function (e) {
                e.classList.remove('active');
                e.classList.remove('inactive');
            });

            activeTab.classList.add('active');

            offsetX = activeTab.offsetLeft;
            this._tabs.style['-webkit-transition-duration'] = '.3s';
            this._tabs.style.webkitTransform = 'translate3d(-' + offsetX + 'px,0,0)';
        },

        /**
         * @private
         */
        onTabChanged: function(callback){
            this._tabs.addEventListener("tabchanged", callback);
        }
    };


    return Tabs;
})();
