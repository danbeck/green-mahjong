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

var UbuntuUI = (function () {

    PAGESTACK_BACK_ID = 'ubuntu-pagestack-back';

    function __hasPageStack(document) {
        return document.querySelectorAll("[data-role='pagestack']") != null;
    };

    function __createBackButtonListItem(d) {
	var a = d.createElement('a');
	a.setAttribute('href', '#');
	a.setAttribute('data-role', 'back');

	a.setAttribute('id', PAGESTACK_BACK_ID + '-' + Math.random());

	var img = d.createElement('img');
	img.setAttribute('src', 'lib/ubuntu-html5-theme/0.1/ambiance/img/back@18.png');

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
        new FastButton(a, function (e) {
            if (self._pageStack.depth() > 1)
		self._pageStack.pop();
            e.preventDefault();
	});
//                .bind(self);
    };

    function UbuntuUI() {
        var U = this;
        U.isTouch = "ontouchstart" in window;
        U.touchEvents = {
            touchStart: U.isTouch ? 'touchstart' : 'mousedown',
            touchMove: U.isTouch ? 'touchmove' : 'mousemove',
            touchEnd: U.isTouch ? 'touchend' : 'mouseup',
            touchLeave: U.isTouch ? null : 'mouseleave' //we manually detect leave on touch devices, so null event here
        };
    };

    UbuntuUI.prototype = {
        __setupPageStack: function (d) {
            // TODO validate no more than one page stack etc.
            // d.querySelectorAll("[data-role='pagestack']")

            this._pageStack = new Pagestack();

	    // FIXME: support multiple page stack & complex docs?
	    var pagestacks = d.querySelectorAll("[data-role='pagestack']");
	    if (pagestacks.length == 0)
		return;
	    var pagestack = pagestacks[0];
	    var immediateFooters = [].filter.call(pagestack.children,
						  function(e) {
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
	    var pages = pagestack.querySelectorAll("[data-role='page']");
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
            if (__hasPageStack(document)) {
                this.__setupPageStack(document);
	    }
        },

        init: function () {
            this.__setupPage(document);
        },

        button: function (id) {
            if (typeof Button != 'undefined' && Button) {
                return new Button(id);
            }
        },

        dialog: function (id) {
            if (typeof Dialog != 'undefined' && Dialog) {
                return new Dialog(id);
            }
        },

        popover: function (elem, id) {
            if (typeof Popover != 'undefined' && Popover) {
                return new Popover(elem, id);
            }
        },

        tabs: function (selector) {
            if (typeof Tabs != 'undefined' && Tabs) {
                return new Tabs(selector);
            }
        },

        toolbar: function (id) {
            if (typeof Toolbar != 'undefined' && Toolbar) {
                return new Toolbar(id);
            }
        },

        list: function (selector) {
            if (typeof List != 'undefined' && List) {
                return new List(selector);
            }
        },

        get pagestack() {
            return this._pageStack;
        }
    };

    return UbuntuUI;

})();
