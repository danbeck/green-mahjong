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
 * A Button.

 Note the Ubuntu CSS style classes: <em>positive</em>, <em>information</em>, <em>secondary</em>, and <em>negative</em>

 * @class Button
 * @constructor
 * @namespace UbuntuUI
 * @example
      <button data-role="button" id="buttonID">text</button>

      Javascript access:
      var button = UI.button("buttonID");
 */
var Button = function (id) {
    this.id =  id;
};

Button.prototype = {
    /**
     * Associate a function with the button's Click event
     * @method click
     * @param {Function} callback - The function to execute on click
     * @example
        UI.button("buttonid").click(function(){
         console.log("clicked");
        });
     */
    click: function (callback) {
        if ( ! document.getElementById(this.id)) {
            throw "Invalid button ID: " + String(this.id);
        }
        new FastButton(document.getElementById(this.id), callback);
    },
    /**
     * Returns the DOM element associated with the id this widget is bind to.
     * @method element
     * @return {DOMElement}
     * @example
        var mybutton = UI.button("buttonid").element();
     */
    element: function() {
        return document.getElementById(this.id);
    }
};
