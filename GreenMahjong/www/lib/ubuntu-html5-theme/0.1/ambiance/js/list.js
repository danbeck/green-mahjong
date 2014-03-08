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
 * <http://www.gnu.org/licenses/>.
 */

/**
 * A List comes with various options, including: a <em>header</em>, main text (pushed left), an icon (pushed left), and a secondary label (pushed right).
 * @class List
 * @constructor
 * @namespace UbuntuUI
 * @example
     <section data-role="list" id="testlist">
       <header>My header text</header>
       <ul>
         <li>
           <a href="#">Main text, to the left</a>
         </li>
         <li>
           <a href="#">Main text</a>
           <label>Right text</label>
         </li>
         <li>
           <aside>
             <img src="someicon.png">
           </aside>
           <a href="#">Main text</a>
           <label>Right</label>
         </li>
       </ul>
      </section>

      JavaScript access:
        var list = UI.list('[id="testlist"]');
 */
var List = (function () {
    var LIST_DATA_ROLE = 'list';

    var __addUlIfNotFound = function (list) {
        if (list) {
            var uls = list.querySelectorAll('ul');
            if (uls == null || uls.length == 0) {
                var ul = document.createElement('ul');
                list.appendChild(ul);
            }
        }
    };

    var List = function (selector) {
        var list = document.querySelector(selector);
        if (list == null || list.nodeName.toLowerCase() !== 'section' || list.getAttribute('data-role') != LIST_DATA_ROLE) {
            throw new Error('Element with selector "' + selector + '" does not exist or not declared as a "list" <section>');
        }
        this._selector = selector;
        this._list = list;

        __addUlIfNotFound(this._list);
    };

    List.prototype = {
        /**
         * Add or Set the List Header
         * @method setHeader
         * @param {String} text - The header text
         */ 
        setHeader: function (text) {
            if (typeof (text) == 'string') {
                var header = this._list.querySelectorAll('header');
                if (header) {
                    if (header.length > 1) {
                        // more than one <header> detected
                        throw new Error("More than one <header> tag detected");
                    }
                    if (header.length == 1)
                        header = header[0];
                    else
                        header = null;
                }

                if (!header)
                    header = document.createElement('header');

                header.innerText = text;
            }
        },
            /**
         * Append an item to a list
         * @method append
         * @param {String} text - The main text, flushed left (no markup)
         * @param {[String]} label - Additional text, flushed right (no markup)
         * @param {[ID]} id - An id attribute value set for the new list item (must be unique in DOM)
         * @param {[Function]} onclick - The click callback function
         * @param {[Object*]} user_data - Additional data that is passed to the click callback
         * @return {Element} - The created list item, or null on failure ot create
         */
        append: function (text, label, id, onclick, user_data) {
            var li = document.createElement('li');
            var a = document.createElement('a');

            a.setAttribute('href', '#');
            if (onclick && typeof (onclick) == 'function') {
                li.addEventListener('click', function (event) {
                    onclick(event ? event.target : null, user_data);
                    if (event)
                        event.preventDefault();
                });
            }
            //FIXME: no real checks on text content
            a.innerText = text;
            li.appendChild(a);

            if (label && typeof (label) == 'string') {
                var n = document.createElement('label');
                n.innerText = label;
                li.appendChild(n);
            }

            if (id && typeof (id) == 'string') {
                if (!document.getElementById(id))
                    li.setAttribute('id', id);
            }
            this._list.querySelector('ul').appendChild(li);

            return li;
        },
        /**
         * Gets a list item &lt;li&gt; by its index, where index counting starts from 1
         * @method at
         * @param {Number} index
         * @return The list item, or null on failure 
         */
        at: function (index) {
            if (typeof (index) != 'number')
                return null;
            return this._list.querySelector('ul').querySelector('li:nth-child(' + index + ')');
        },
        /**
         * Removes a list item &lt;li&gt; by its index, where index counting starts from 1
         * @method remove
         * @param {Number} index
         */
        remove: function (index) {
            var item = this.at(index);
            if (item) {
                item.parentNode.removeChild(item);
            }
        },
        /**
         * Removes all items from a list
         * @method removeAllItems
         */
        removeAllItems: function () {
            if (this._list.querySelector('ul'))
                this._list.querySelector('ul').innerHTML = '';
        },
        /**
         * Iterates over all list items and runs a provided function on each
         * @method forEach
         * @param {Function} func - The function to run on each list item
         */
        forEach: function (func) {
            if (typeof (func) !== 'function')
                return;
            var items = this._list.querySelector('ul').querySelectorAll('li');
            Array.prototype.forEach.call(items, function (element, index) {
                func(element, index);
            });
        },
        /**
         * Returns the DOM element associated with the selector this widget is bind to.
         * @method element
         * @return {DOMElement}
         * @example
            var mylist = UI.list("#listid").element();
        */
        element: function () {
            return this._list;
        }
    };

    return List;
})();
