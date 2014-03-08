/*
 * Copyright (C) 2013, 2014 Adnane Belmadiaf <daker@ubuntu.com>
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
 * <http://www.gnu.org/licenses/>.
 */

/**
 * One of the navigation pattern that can be used within an Ubuntu App is the deep navigation. This
 pattern is implemented by the Pagestack. A Pagestack contains one or more Pages. Each page displays full-screen. See the Pagestack class.

Each Page must have <em>id</em> and <em>data-title</em> attributes. The <em>id</em> attribute is used a unique reference to push the Page to the top of the Pagestack (see the Pagestack class). The <em>data-title</em> attribute is used to update the Header title as pages are pushed and poped.

 * @class Page
 * @constructor
 * @namespace UbuntuUI
 * @example
      </body>
        <div data-role="mainview">

          <header data-role="header">
          </header>

          <div data-role="content">
            <div data-role="pagestack">
              <div data-role="page" data-title="Main" id="main">
                [...]
              </div>
              <div data-role="page" data-title="My Data" id="data">
                [...]
              </div>
            </div>
          </div>

        </div>
      </body>

      JavaScript access:
      var page = UI.page("pageID");
 */
var Page = function (id) {
    this.id = id;
};

Page.prototype = {
    /**
     * Returns the DOM element associated with the selector this widget is bind to.
     * @method element
     * @example
       var mypage = UI.page("pageid").element();
    */
    element: function () {
        return document.getElementById(this.id);
    },

    /**
     * actions property.
     * @property {List} actions
     */
    get actions() {
        // TODO: Not implemented yet
        return [];
    },
    set actions(value) {
        // TODO: Not implemented yet
    },

    /**
     * title property.
     * @property {String} title
     */
    get title() {
        // TODO: Not implemented yet
        return "";
    },
    set title(value) {
        // TODO: Not implemented yet
    },

    /**
     * Deactivates the current page.
     * @method {} deactivate
     */
    deactivate: function () {
        this.__updateVisibleState('none', function (footer) {
            if (!footer)
                return;
            footer.style.display = 'none';
            footer.classList.remove('revealed');
        });
    },

    /**
     * Activates the current page.
     * @method {} activate
     */
    activate: function (id) {
        this.__hideVisibleSibling();
        this.__updateVisibleState('block', function (footer) {
            if (!footer)
                return;
            footer.style.display = 'block';
            footer.classList.add('revealed');
        });
        this.__updateHeaderTitle();
    },

    /**
     * @private
     */
    __updateHeaderTitle: function () {
        if (!this.element().getAttribute('data-title'))
            return;
        var header =
            document.querySelector('div[data-role="mainview"] header');
        if (!header)
            return;
        var ul = header.querySelector('ul');
        if (!ul) {
            ul = document.createElement('ul');
            ul.setAttribute('data-role', 'tabs');
            header.appendChild(ul);
        }

        var titles = header.querySelectorAll('ul li');
        for (var i = 0; i < titles.length; ++i) {
            ul.removeChild(titles[i]);
        }
        var li = document.createElement('li');
        li.setAttribute('data-role', 'tabitem');
        li.setAttribute('data-page', this.id);
        li.classList.add('active');
        var DEFAULT_TITLE = 'Unknown';
        var title = DEFAULT_TITLE;
        try {
            title = this.element().getAttribute('data-title');
        } catch (e) {}
        title = title || DEFAULT_TITLE;
        var text = document.createTextNode(title);
        li.appendChild(text);
        ul.appendChild(li);
    },

    /**
     * Validates that a given DOM node element is a Ubuntu UI Page.
     * @method {DOM Element} isPage
     * @return {Boolean} if the DOM element is a page
     */
    isPage: function (element) {
        return element.tagName === 'DIV' &&
            element.hasAttribute('data-role') &&
            element.getAttribute('data-role') === 'page';
    },

    /**
     * @private
     */
    __updateVisibleState: function (displayStyle, footerHandlerFunc) {
        if (!this.__isValidId(this.id))
            return;
        var page = document.getElementById(this.id);
        if (!this.isPage(page)) {
            return;
        }
        page.style.display = displayStyle;
        if (page.querySelector(this.__thisSelector + ' > footer')) {
            var footer = page.querySelector('footer');
            footerHandlerFunc(footer);
        }
    },

    /**
     * @private
     */
    __hideVisibleSibling: function () {
        if (!this.__isValidId(this.id))
            return;
        var page = document.getElementById(this.id);
        if (!this.isPage(page)) {
            return;
        }
        var children = page.parentNode.children;
        for (var idx = 0; idx < children.length; ++idx) {
            if (this.isPage(children[idx])) {
                children[idx].style.display = 'none';
            }
        }
    },

    /**
     * @private
     */
    __isValidId: function (id) {
        return id && typeof (id) === 'string';
    },

    /**
     * @private
     */
    get __thisSelector() {
        return "#" + this.id;
    }
};