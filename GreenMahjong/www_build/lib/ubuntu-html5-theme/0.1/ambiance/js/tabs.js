/*
 * Copyright (C) 2013 Adnane Belmadiaf <daker@ubuntu.com>
 * License granted by Canonical Limited
 *
 * This file is part of ubuntu-html5-theme.
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
 * <http://www.gnu.org/licenses/>.
 */

/* Tabs */
var Tabs = function (selector) {
    var tabs,
        pageX,
        pageY,
        isScrolling,
        deltaX,
        deltaY,
        offsetX,
        resistance,
        tabsWidth;

    tabs = document.querySelector(selector);

    var getScroll = function () {
        var translate3d = tabs.style.webkitTransform.match(/translate3d\(([^,]*)/);
        return parseInt(translate3d ? translate3d[1] : 0)
    };

    var setTouchInProgress = function (val) {

        //Add or remove event listeners depending on touch status
        if (val === true) {
            tabs.addEventListener(UI.touchEvents.touchMove, onTouchMove);
            tabs.addEventListener(UI.touchEvents.touchEnd, onTouchEnd);

            //we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
            if (UI.touchEvents.touchLeave) {
                tabs.addEventListener(UI.touchEvents.touchLeave, onTouchLeave);
            }
        } else {
            tabs.removeEventListener(UI.touchEvents.touchMove, onTouchMove, false);
            tabs.removeEventListener(UI.touchEvents.touchEnd, onTouchEnd, false);

            //we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
            if (UI.touchEvents.touchLeave) {
                tabs.removeEventListener(UI.touchEvents.touchLeave, onTouchLeave, false);
            }
        }
    };

    var onTouchStart = function (e) {
        if (!tabs) return;

        isScrolling = undefined;
        tabsWidth = tabs.offsetWidth;
        resistance = 1;

        if (!UI.isTouch) {
            e.touches = [{
                pageX: e.pageX,
                pageY: e.pageY
            }];
        }
        pageX = e.touches[0].pageX;
        pageY = e.touches[0].pageY;

        tabs.style['-webkit-transition-duration'] = 0;
        setTouchInProgress(true);
    };

    var onTouchMove = function (e) {
        if (!UI.isTouch) {
            e.touches = [{
                pageX: e.pageX,
                pageY: e.pageY
            }];
        }
        deltaX = e.touches[0].pageX - pageX;
        deltaY = e.touches[0].pageY - pageY;
        pageX = e.touches[0].pageX;
        pageY = e.touches[0].pageY;

        console.log(pageY);
        console.log(pageX);

        if (typeof isScrolling == 'undefined') {
            isScrolling = Math.abs(deltaY) > Math.abs(deltaX);
        }

        if (isScrolling) return;
        offsetX = (deltaX / resistance) + getScroll();

        e.preventDefault();
        tabs.style.webkitTransform = 'translate3d(' + offsetX + 'px,0,0)';
    };

    var onTouchEnd = function (e) {
        if (!tabs || isScrolling) return;

        offsetX = 0 * tabsWidth;
        tabs.style['-webkit-transition-duration'] = '.2s';
        tabs.style.webkitTransform = 'translate3d(' + offsetX + 'px,0,0)';
        setTouchInProgress(false);
    };

    var onTouchLeave = function (e) {};

    tabs.addEventListener(UI.touchEvents.touchStart, onTouchStart);
    tabs.addEventListener(UI.touchEvents.touchMove, onTouchMove);
    tabs.addEventListener(UI.touchEvents.touchEnd, onTouchEnd);
    tabs.addEventListener(UI.touchEvents.touchLeave, onTouchEnd);
};
