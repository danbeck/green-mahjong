/*
 * Copyright (C) 2014 Canonical Ltd
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
 * <http://www.gnu.org/licenses/>.
 */

/**
 * One of the navigation pattern that can be used within an Ubuntu App is the flat navigation. Tabs are the standard way to provide such a navigation pattern from within your application.

A Tab represents the UI element that hosts your tab content. This UI element is being activated by the user selecting it as part of the Header element.

 * @class Tab
 * @constructor
 * @namespace UbuntuUI
 * @example
      </body>

        <div data-role="mainview">
          <header data-role="header" id="headerID">
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

      JavaScript access:
      var tab = UI.tab("tabID");
 */
var Tab = function (id) {
    this.id =  id;
};

Tab.prototype = {
    /**
     * Returns the DOM element associated with the selector this widget is bind to.
     * @method element
     * @return {DOMElement}
     * @example
       var mytab = UI.tab("tabid").element();
    */
    element: function () {
        return document.getElementById(this.id);
    },

    /**
     * Deactivates the current tab.
     * @method {} deactivate
     */
    deactivate: function () {
        this.__updateVisibleState('none', function(footer) {
            if (!footer)
                return;
            footer.style.display = 'none';
            footer.classList.remove('revealed');
        });
    },

    /**
     * Activates the current tab.
     * @method {} activate
     */
    activate: function (id) {
        console.log('actiatin');
        this.__hideVisibleSibling();
        this.__updateVisibleState('block', function(footer) {
            if (!footer)
                return;
            footer.style.display = 'block';
            footer.classList.add('revealed');
        });
    },

    /**
     * Validates that a given DOM node element is a Ubuntu UI Tab.
     * @method {DOM Element} isTab
     * @return {Boolean} if the DOM element is a tab
     */
    isTab: function (element) {
        return element.tagName.toLowerCase() === 'div' &&
            element.hasAttribute('data-role') &&
            element.getAttribute('data-role') === 'tab';
    },

    /**
     * @private
     */
    __updateVisibleState: function(displayStyle, footerHandlerFunc) {
        if (!this.__isValidId(this.id))
            return;
        var tab = document.getElementById(this.id);
        if (!this.isTab(tab)) {
            return;
        }
        tab.style.display = displayStyle;
        if (tab.querySelector(this.__thisSelector + ' > footer')) {
            var footer = tab.querySelector('footer');
            footerHandlerFunc(footer);
        }
    },

    /**
     * @private
     */
    __hideVisibleSibling: function() {
        if (!this.__isValidId(this.id))
            return;
        var tab = document.getElementById(this.id);
        if (!this.isTab(tab)) {
            return;
        }
        var children = tab.parentNode.children;
        for (var idx = 0; idx < children.length; ++idx) {
            if (this.isTab(children[idx])) {
                children[idx].style.display = 'none';
            }
        }
    },

    /**
     * @private
     */
    __isValidId: function (id) {
        return id && typeof(id) === 'string';
    },

    /**
     * @private
     */
    get __thisSelector () {
        return "#" + this.id;
    }
};
